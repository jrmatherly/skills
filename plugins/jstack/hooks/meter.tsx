import { atom, read, update } from 'claude-code'
import type { EngineInterface, On } from 'claude-code'

import type { Meter } from '../types'

const EMPTY: Meter = {
  costUsd: null,
  tokens: { total: 0, output: 0 },
  turns: 0,
  busyMs: 0,
  contextPercent: null,
  limits: [],
  running: {},
  done: 0,
  commands: [],
  levelPath: null,
  hasCheck: false,
}
const meter = atom({ plugin: 'jstack', key: 'meter' } as const, EMPTY)
const LEVELS = ['off', 'lite', 'full', 'ultra']
const PONYTAIL = 'ponytail:ponytail'
const COMMANDS = [
  { key: 'simplify', label: 'Simplify', command: 'simplify' },
  { key: 'review', label: 'Review', command: 'code-review' },
  { key: 'remember', label: 'Remember', command: 'remember:remember' },
]
const PLAIN = { plain: true as const }
const WINDOW: Record<string, string> = { five_hour: '5h', seven_day: '7d' }

const short = (n: number) => (n < 1000 ? `${n}` : n < 1e6 ? `${(n / 1e3).toFixed(1)}k` : `${(n / 1e6).toFixed(1)}M`)
function elapsed(ms: number): string {
  const s = Math.round(ms / 1000)
  if (s < 60) return `${s}s`
  if (s < 3600) return `${Math.floor(s / 60)}m ${s % 60}s`
  return `${Math.floor(s / 3600)}h ${Math.floor((s % 3600) / 60)}m`
}
function clockTime(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const h = d.getHours()
  return `${h % 12 || 12}:${String(d.getMinutes()).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`
}
// `claude-opus-5-5` and the alias `opus` both read as `opus`
const family = (model: string) => model.replace(/^claude-/, '').split('-')[0] ?? model
function agentsText(m: Meter): string {
  const counts = new Map<string, number>()
  for (const model of Object.values(m.running)) counts.set(family(model), (counts.get(family(model)) ?? 0) + 1)
  const running = Object.keys(m.running).length
  const models = [...counts].map(([f, n]) => (n > 1 ? `${f} ×${n}` : f)).join(', ')
  return `agents · ${running} running${models ? ` (${models})` : ''} · ${m.done} done`
}
async function readLevel($: EngineInterface, path: string): Promise<string> {
  try {
    const value = (await $.fs.read(path)).trim()
    return LEVELS.includes(value) ? value : 'off'
  } catch {
    return 'off'
  }
}
async function hasCheckScript($: EngineInterface): Promise<boolean> {
  try {
    const pkg = JSON.parse(await $.fs.read(`${await $.session.cwd()}/package.json`)) as { scripts?: Record<string, unknown> }
    return typeof pkg.scripts?.check === 'string'
  } catch {
    return false
  }
}
async function check($: EngineInterface): Promise<void> {
  try {
    const r = await $.process.run(['pnpm', 'check'], { cwd: await $.session.cwd(), timeoutMs: 300000 })
    $.ui.toast(r.exitCode === 0 ? 'pnpm check passed' : `pnpm check failed: ${(r.stderr.trim() || r.stdout.trim()).slice(-200)}`)
  } catch (err) {
    $.ui.toast(`pnpm check could not run: ${err instanceof Error ? err.message : String(err)}`)
  }
}

// register.tsx's session.start and SessionStart hooks call this, since a plugin may hook session.start once;
// a /clear also restarts the counters, as SessionUsage.startedAt does
export async function syncMeter($: EngineInterface, reset: boolean): Promise<void> {
  const commands = (await $.command.list()).map(c => c.name)
  const home = await $.env.get('HOME')
  const config = (await $.env.get('CLAUDE_CONFIG_DIR')) ?? (home ? `${home}/.claude` : null)
  const levelPath = config ? `${config}/.ponytail-active` : null
  const hasCheck = await hasCheckScript($)
  await update($, meter, prev => ({ ...(reset ? EMPTY : prev), commands, levelPath, hasCheck }))
}

export function registerMeter(on: On): void {
  on('turn.complete', async ($, e, next) => {
    const usage = e.agentId === undefined ? await $.session.usage().catch(() => null) : null
    await update($, meter, m => {
      const u = e.usage
      const tokens = u
        ? { total: m.tokens.total + u.input_tokens + u.output_tokens + u.cache_read_input_tokens + u.cache_creation_input_tokens, output: m.tokens.output + u.output_tokens }
        : m.tokens
      if (e.agentId !== undefined) {
        if (!(e.agentId in m.running)) return { ...m, tokens }
        const { [e.agentId]: _, ...running } = m.running
        return { ...m, tokens, running, done: m.done + 1 }
      }
      const counted = { ...m, tokens, turns: m.turns + 1, busyMs: m.busyMs + e.durationMs }
      if (!usage) return counted
      return { ...counted, costUsd: usage.cost?.usd ?? m.costUsd, contextPercent: usage.context.percent ?? m.contextPercent, limits: usage.rateLimits }
    })
    return next(e)
  }).catch(($, e, next) => next(e))

  on('agent.spawn', async ($, e, next) => {
    const r = await next(e)
    const { agentId } = r
    // A resumed agent was already counted done once; it is not a new run
    if (agentId !== undefined && e.resume === undefined) await update($, meter, m => ({ ...m, running: { ...m.running, [agentId]: r.model } }))
    return r
  }).catch(($, e, next) => next(e))

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey) return next(e)
    const m = await read($, meter)
    const ponytail = m.commands.includes(PONYTAIL)
    const [active, below] = await Promise.all([ponytail && m.levelPath ? readLevel($, m.levelPath) : null, next(e)])
    const { Box, Text, Button } = $.ui.resolve(e)
    const cells: { key: string; text: string; color?: 'error' | 'warning' }[] = [
      { key: 'cost', text: m.costUsd === null ? 'cost n/a' : `cost $${m.costUsd.toFixed(2)}` },
      { key: 'tokens', text: `tokens ${short(m.tokens.total)} · ${short(m.tokens.output)} out` },
      { key: 'turns', text: `turns ${m.turns}` },
      { key: 'time', text: `agent time ${elapsed(m.busyMs)}` },
      ...(m.contextPercent === null ? [] : [{ key: 'context', text: `context ${Math.round(m.contextPercent)}%` }]),
      ...m.limits.map(l => ({
        key: `limit-${l.kind}`,
        text: `${WINDOW[l.kind] ?? l.kind} ${l.percentUsed}%${l.resetsAt ? ` ↻ ${clockTime(l.resetsAt)}` : ''}`,
        color: l.percentUsed >= 95 ? ('error' as const) : l.percentUsed >= 80 ? ('warning' as const) : undefined,
      })),
    ]
    const buttons = [
      ...(ponytail ? LEVELS.map(l => ({ key: `level-${l}`, label: l, look: l === active ? { variant: 'primary' as const } : { ...PLAIN, dimColor: true }, onPress: () => $.command.run({ command: PONYTAIL, args: l }) })) : []),
      ...COMMANDS.filter(c => m.commands.includes(c.command)).map(c => ({ key: c.key, label: c.label, look: PLAIN, onPress: () => $.command.run({ command: c.command }) })),
      ...(m.hasCheck ? [{ key: 'check', label: 'Check', look: PLAIN, onPress: () => check($) }] : []),
    ]
    const running = Object.keys(m.running).length
    return (
      // The engine's own tree (`below`) refuses to sit under a Box with `width`, so only our rows get one
      <Box flexDirection="column">
        {m.turns > 0 || m.costUsd !== null ? (
          <Box flexDirection="row" gap={2} width={e.props.bodyColumns}>
            {cells.map(c => <Text key={c.key} tabular wrap="truncate-end" color={c.color}>{c.text}</Text>)}
          </Box>
        ) : null}
        {running + m.done > 0 ? <Text wrap="truncate-end">{agentsText(m)}</Text> : null}
        {buttons.length > 0 ? (
          <Box flexDirection="row" gap={1}>
            {buttons.map(b => (
              <Button key={b.key} label={b.label} {...b.look} onPress={b.onPress} />
            ))}
          </Box>
        ) : null}
        {below}
      </Box>
    )
  }).catch(($, e, next) => next(e))
}
