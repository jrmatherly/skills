import { atom, read, update } from 'claude-code'
import type { EngineInterface, On } from 'claude-code'

import type { Meter } from '../types'

const EMPTY: Meter = {
  startedAt: null,
  costUsd: null,
  tokens: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
  turns: 0,
  busyMs: 0,
  contextPercent: null,
  limits: [],
  running: {},
  done: 0,
  commands: [],
  levelPath: null,
  hasCheck: false,
  details: false,
  agentsOpen: false,
}
const meter = atom({ plugin: 'jstack', key: 'meter' } as const, EMPTY)
const LEVELS = ['off', 'lite', 'full', 'ultra']
const PONYTAIL = 'ponytail:ponytail'
const COMMANDS = [
  { value: 'simplify', label: 'Simplify', command: 'simplify' },
  { value: 'review', label: 'Review', command: 'code-review' },
  { value: 'remember', label: 'Remember', command: 'remember:remember' },
]
const QUOTA: Record<string, string> = { five_hour: '5h quota', seven_day: '7d quota' }

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
// `claude-opus-5-5`, `us.anthropic.claude-opus-5-5-v1` and the alias `opus` all read as `opus`
const family = (model: string) => model.replace(/^.*?claude-/, '').split('-')[0]!
const contextColor = (percent: number) => (percent >= 85 ? 'error' : percent >= 60 ? 'warning' : 'success')
async function toggle($: EngineInterface, key: 'details' | 'agentsOpen'): Promise<void> {
  const m = await update($, meter, prev => ({ ...prev, [key]: !prev[key] }))
  await $.store.set(key, m[key])
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
let checking = false
async function check($: EngineInterface): Promise<void> {
  if (checking) {
    $.ui.toast('pnpm check is already running')
    return
  }
  checking = true
  try {
    const r = await $.process.run(['pnpm', 'check'], { cwd: await $.session.cwd(), timeoutMs: 300000 })
    // pnpm writes its script banner and ELIFECYCLE to stderr; the tool's own output is on stdout
    $.ui.toast(r.exitCode === 0 ? 'pnpm check passed' : `pnpm check failed: ${(r.stdout.trim() || r.stderr.trim()).slice(-200)}`)
  } catch (err) {
    $.ui.toast(`pnpm check could not run: ${err instanceof Error ? err.message : String(err)}`)
  } finally {
    checking = false
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
  const details = (await $.store.get('details')) === true
  const agentsOpen = (await $.store.get('agentsOpen')) === true
  await update($, meter, prev => ({ ...(reset ? EMPTY : prev), commands, levelPath, hasCheck, details, agentsOpen }))
}

export function registerMeter(on: On): void {
  on('turn.complete', async ($, e, next) => {
    const usage = e.agentId === undefined ? await $.session.usage().catch(() => null) : null
    await update($, meter, prev => {
      // Only a change from a known value restarts: the first reading must not drop agents spawned in this turn
      const restarted = usage !== null && typeof usage.startedAt === 'number' && prev.startedAt !== null && usage.startedAt !== prev.startedAt
      const m = restarted ? { ...prev, tokens: EMPTY.tokens, turns: 0, busyMs: 0, running: {}, done: 0 } : prev
      const u = e.usage
      const tokens = u
        ? {
            input: m.tokens.input + u.input_tokens,
            output: m.tokens.output + u.output_tokens,
            cacheRead: m.tokens.cacheRead + u.cache_read_input_tokens,
            cacheWrite: m.tokens.cacheWrite + u.cache_creation_input_tokens,
          }
        : m.tokens
      if (e.agentId !== undefined) {
        if (!(e.agentId in m.running)) return { ...m, tokens }
        const { [e.agentId]: _, ...running } = m.running
        return { ...m, tokens, running, done: m.done + 1 }
      }
      const counted = { ...m, tokens, turns: m.turns + 1, busyMs: m.busyMs + e.durationMs }
      if (!usage) return counted
      return { ...counted, startedAt: usage.startedAt, costUsd: usage.cost?.usd ?? m.costUsd, contextPercent: usage.context.percent ?? m.contextPercent, limits: usage.rateLimits }
    })
    return next(e)
  }).catch(($, e, next) => next(e))

  on('agent.spawn', async ($, e, next) => {
    const r = await next(e)
    const { agentId } = r
    // A resumed agent was already counted done once; it is not a new run
    if (agentId !== undefined && e.resume === undefined) await update($, meter, m => ({ ...m, running: { ...m.running, [agentId]: { model: r.model, type: e.subagentType } } }))
    return r
  }).catch(($, e, next) => next(e))

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey) return next(e)
    const m = await read($, meter)
    const ponytail = m.commands.includes(PONYTAIL)
    const [active, below] = await Promise.all([ponytail && m.levelPath ? readLevel($, m.levelPath) : null, next(e)])
    const elements = $.ui.resolve(e)
    const { Box, Text, Button } = elements
    // Mobile's table has no Select, so the menus are left out there
    const Select = 'Select' in elements ? elements.Select : null
    const tiles: { key: string; label: string; value: string; sub?: string; color?: 'error' | 'warning'; isDim?: boolean }[] = [
      { key: 'cost', label: 'cost', value: m.costUsd === null ? 'n/a' : `$${m.costUsd.toFixed(2)}`, isDim: m.costUsd === null },
      { key: 'tokens', label: 'tokens', value: `${short(m.tokens.input + m.tokens.cacheWrite)} in · ${short(m.tokens.output)} out`, sub: `${short(m.tokens.cacheRead)} cached` },
      { key: 'turns', label: 'turns', value: `${m.turns}` },
      { key: 'time', label: 'agent time', value: elapsed(m.busyMs) },
      ...m.limits.map(l => ({
        key: `limit-${l.kind}`,
        label: QUOTA[l.kind] ?? l.kind,
        value: `${l.percentUsed}%`,
        sub: l.resetsAt ? `resets ${clockTime(l.resetsAt)}` : undefined,
        color: l.percentUsed >= 95 ? ('error' as const) : l.percentUsed >= 80 ? ('warning' as const) : undefined,
      })),
    ]
    const actions = [
      ...COMMANDS.filter(c => m.commands.includes(c.command)).map(c => ({ value: c.value, label: c.label, run: () => $.command.run({ command: c.command }) })),
      ...(m.hasCheck ? [{ value: 'check', label: 'Check', run: () => check($) }] : []),
    ]
    const running = Object.entries(m.running)
    return (
      // The engine's own tree (`below`) refuses to sit under a Box with `width`, so the root has none
      <Box flexDirection="column">
        <Box key="controls" flexDirection="row" flexWrap="wrap" columnGap={2}>
          {m.contextPercent === null ? (
            <Text key="context" dimColor>context n/a</Text>
          ) : (
            <Text key="context" tabular color={contextColor(m.contextPercent)}>{`context ${Math.round(m.contextPercent)}%`}</Text>
          )}
          {Select && ponytail ? (
            <Select key="level" label="Level" options={LEVELS.map(l => ({ value: l, label: l }))} value={active ?? 'off'} onSelect={l => $.command.run({ command: PONYTAIL, args: l })} />
          ) : null}
          {Select && actions.length > 0 ? (
            // value stays '' so the control reads as a menu; picking '…' does nothing
            <Select key="actions" label="Actions" options={[{ value: '', label: '…' }, ...actions]} value="" onSelect={v => actions.find(a => a.value === v)?.run()} />
          ) : null}
          <Button key="details" plain label={m.details ? 'Less' : 'More'} onPress={() => toggle($, 'details')} />
        </Box>
        {m.details && (m.turns > 0 || m.costUsd !== null) ? (
          // No width: Desktop shrinks every cell of a sized row to an ellipsis, so the row wraps instead
          <Box key="metrics" flexDirection="row" flexWrap="wrap" columnGap={3} rowGap={1}>
            {tiles.map(t => (
              <Box key={`tile-${t.key}`} flexDirection="column">
                <Text size="caption" dimColor>{t.label}</Text>
                <Text weight="semibold" tabular color={t.color} dimColor={t.isDim}>{t.value}</Text>
                {t.sub ? <Text size="caption" dimColor tabular>{t.sub}</Text> : null}
              </Box>
            ))}
          </Box>
        ) : null}
        {running.length + m.done > 0 ? (
          <Box key="agents-row" flexDirection="column">
            <Box flexDirection="row" columnGap={1}>
              <Text wrap="truncate-end">{`agents · ${running.length} running · ${m.done} done`}</Text>
              <Button key="agents" plain label={m.agentsOpen ? '▾' : '▸'} onPress={() => toggle($, 'agentsOpen')} />
            </Box>
            {m.agentsOpen
              ? running.map(([id, a]) => (
                  <Box key={`agent-${id}`} paddingLeft={2}>
                    <Text wrap="truncate-end">{`${a.type} · ${family(a.model)}`}</Text>
                  </Box>
                ))
              : null}
          </Box>
        ) : null}
        {below}
      </Box>
    )
  }).catch(($, e, next) => next(e))
}
