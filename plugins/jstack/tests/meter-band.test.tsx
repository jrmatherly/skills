import { expect, mock, test } from 'claude-code/testing'
import type { Engine } from 'claude-code/testing'
import type { On, RenderPropsOf, SessionUsage } from 'claude-code'

const BAND: RenderPropsOf['AbovePrompt'] = { hasSurvey: false, isWorking: false, maxRows: 10, bodyColumns: 160, scroll: { offset: 0, bodyRows: 10 }, view: {} }
const COMMANDS = ['simplify', 'code-review', 'remember:remember', 'ponytail:ponytail']
const USAGE: SessionUsage = {
  startedAt: 0,
  context: { tokens: 76000, window: 200000, percent: 38 },
  rateLimits: [{ kind: 'five_hour', percentUsed: 12, resetsAt: '2026-10-22T15:40:00Z' }, { kind: 'seven_day', percentUsed: 60 }],
  cost: { usd: 0.42 },
}
type World = { commands?: string[]; usage?: SessionUsage; spawned?: { model: string; agentId: string }[]; hasPackage?: boolean; scripts?: string; details?: boolean }
function world(on: On, w: World = {}) {
  const ran: unknown[] = []
  const toasts: string[] = []
  const spawned = [...(w.spawned ?? [])]
  const files: Record<string, string> = { '/home/u/.claude/.ponytail-active': 'full\n' }
  if (w.hasPackage !== false) files['/home/u/package.json'] = w.scripts ?? '{"scripts":{"check":"x"}}'
  mock.env(on, { HOME: '/home/u' })
  const saved = new Map<string, unknown>(w.details ? [['details', true]] : [])
  on('store.get', ($, e) => ({ value: saved.get(e.key) }))
  on('store.set', ($, e) => { saved.set(e.key, e.value); return { value: undefined } })
  // The step module's session.start and SessionStart hooks run first and need these
  on('session.id', () => ({ value: 'S1' }))
  on('tool.register', ($, e) => ({ value: { tool: 'mcp__jstack__' + e.name } }))
  on('session.start', () => ({ cwd: '/home/u' }))
  on('session.cwd', () => ({ value: '/home/u' }))
  on('classic.SessionStart', () => ({}))
  on('command.list', () => ({ value: (w.commands ?? COMMANDS).map(name => ({ name, description: '', source: 'plugin' }) as never) }))
  on('command.run', ($, e) => { ran.push({ command: e.command, args: e.args }); return { text: '' } })
  on('session.usage', () => ({ value: w.usage ?? USAGE }))
  on('fs.read', ($, e) => (e.path in files ? { value: files[e.path]! } : ({ deny: 'missing' } as never)))
  on('agent.spawn', () => ({ ...(spawned.shift() ?? { model: 'opus' }) }))
  on('turn.complete', () => ({ text: '' }))
  on('ui.toast', ($, e) => { toasts.push(e.text); return { value: undefined } })
  on('ui.render', () => ({ type: 'Text', props: {}, children: ['below'] }))
  return { ran, toasts, saved }
}

const start = ($: Engine) => $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/home/u' })
const USAGE_1 = { model: 'claude-opus-5-5', input_tokens: 1000, output_tokens: 200, cache_read_input_tokens: 3000, cache_creation_input_tokens: 0 }
const turn = ($: Engine, extra: Record<string, unknown> = {}) =>
  $.turn.complete({ answer: '', durationMs: 65000, isAborted: false, reason: 'answer', turnId: 't1', usage: USAGE_1, ...extra } as never)
const spawn = ($: Engine, subagentType = 'Explore') => $.agent.spawn({ subagentType, description: 'look', prompt: 'look', tool_use_id: 'tu', background: true, fork: false, parentModel: 'opus' } as never)
const mount = ($: Engine, surface: 'terminal' | 'desktop' = 'terminal', props = BAND) =>
  $.ui.mount({ plugin: 'jstack', surface, component: 'AbovePrompt', props })

const PASS = { exitCode: 0, stdout: '', stderr: '', isStdoutTruncated: false, isStderrTruncated: false }

test('collapsed by default: context, the two menus and More, no metrics', async ($, on) => {
  world(on)
  await start($)
  await turn($)
  for (const surface of ['terminal', 'desktop'] as const) {
    const ui = await mount($, surface)
    expect((await ui.find({ type: 'Text', text: 'context 38%' }))?.props.color).toBe('success')
    expect(await ui.find({ type: 'Text', text: /^cost/ })).toBeUndefined()
    expect((await ui.find({ key: 'level' }))?.props.value).toBe('full')
    const options = (await ui.find({ key: 'actions' }))?.props.options as { label: string }[]
    expect(options.map(o => o.label)).toEqual(['…', 'Simplify', 'Review', 'Remember', 'Check'])
    expect((await ui.find({ key: 'details' }))?.props.label).toBe('More')
    expect(await ui.find({ type: 'Text', text: 'below' })).toBeDefined()
    await ui.unmount()
  }
})
test('More draws the metrics row, flips to Less and persists', async ($, on) => {
  const { saved } = world(on)
  await start($)
  await turn($)
  const ui = await mount($)
  await ui.press({ key: 'details' })
  for (const text of ['cost $0.42', 'tokens 1.0k in · 200 out · 3.0k cached', 'turns 1', 'agent time 1m 5s', '7d 60%']) {
    expect((await ui.find({ type: 'Text', text }))?.text).toBe(text)
  }
  expect(await ui.find({ type: 'Text', text: /^5h 12% ↻ \d{1,2}:40 [AP]M$/ })).toBeDefined()
  expect((await ui.find({ key: 'details' }))?.props.label).toBe('Less')
  expect(saved.get('details')).toBe(true)
  await ui.unmount()
})
test('a stored details: true starts expanded', async ($, on) => {
  world(on, { details: true })
  await start($)
  await turn($)
  const ui = await mount($)
  expect(await ui.find({ type: 'Text', text: 'cost $0.42' })).toBeDefined()
  expect((await ui.find({ key: 'details' }))?.props.label).toBe('Less')
})
test('context is warning from 60, error from 85, and n/a dim before a reading', async ($, on) => {
  const usage = { ...USAGE, context: { window: 200000 } as SessionUsage['context'] }
  world(on, { usage })
  await start($)
  let ui = await mount($)
  expect((await ui.find({ type: 'Text', text: 'context n/a' }))?.props.dimColor).toBe(true)
  await ui.unmount()
  for (const [percent, color] of [[70, 'warning'], [90, 'error']] as const) {
    usage.context = { window: 200000, percent }
    await turn($)
    ui = await mount($)
    expect((await ui.find({ type: 'Text', text: `context ${percent}%` }))?.props.color).toBe(color)
    await ui.unmount()
  }
})
test('a limit at 96% draws in the error colour, 85% in warning', async ($, on) => {
  world(on, { details: true, usage: { ...USAGE, rateLimits: [{ kind: 'five_hour', percentUsed: 96 }, { kind: 'seven_day', percentUsed: 85 }] } })
  await start($)
  await turn($)
  const ui = await mount($)
  expect((await ui.find({ type: 'Text', text: '5h 96%' }))?.props.color).toBe('error')
  expect((await ui.find({ type: 'Text', text: '7d 85%' }))?.props.color).toBe('warning')
})
test('the Level menu runs Ponytail and the Actions menu runs its pick', async ($, on) => {
  const { ran } = world(on)
  let checks = 0
  on('process.run', () => { checks++; return { value: PASS } })
  await start($)
  const ui = await mount($)
  await ui.select({ key: 'level', value: 'lite' })
  await ui.select({ key: 'actions', value: 'simplify' })
  await ui.select({ key: 'actions', value: '' })
  await ui.select({ key: 'actions', value: 'check' })
  expect(ran).toEqual([{ command: 'ponytail:ponytail', args: 'lite' }, { command: 'simplify', args: '' }])
  expect(checks).toBe(1)
})
test('Check toasts the tail of a failure and a pass', async ($, on) => {
  const { toasts } = world(on)
  const results = [{ ...PASS, exitCode: 1, stdout: 'boom\n', stderr: 'ELIFECYCLE Command failed' }, PASS]
  on('process.run', () => ({ value: results.shift()! }))
  await start($)
  const ui = await mount($)
  await ui.select({ key: 'actions', value: 'check' })
  await ui.select({ key: 'actions', value: 'check' })
  expect(toasts).toEqual(['pnpm check failed: boom', 'pnpm check passed'])
})
test('a command missing from command.list leaves its action out', async ($, on) => {
  world(on, { commands: ['code-review'] })
  await start($)
  const ui = await mount($)
  const options = (await ui.find({ key: 'actions' }))?.props.options as { label: string }[]
  expect(options.map(o => o.label)).toEqual(['…', 'Review', 'Check'])
  expect(await ui.find({ key: 'level' })).toBeUndefined()
})
test('with nothing to act on there is no Actions menu', async ($, on) => {
  world(on, { commands: [], hasPackage: false })
  await start($)
  const ui = await mount($)
  expect(await ui.find({ key: 'actions' })).toBeUndefined()
  expect(await ui.find({ key: 'details' })).toBeDefined()
})
test('a package.json with other scripts but no check offers no Check', async ($, on) => {
  world(on, { scripts: '{"scripts":{"test":"x"}}' })
  await start($)
  const ui = await mount($)
  const options = (await ui.find({ key: 'actions' }))?.props.options as { label: string }[]
  expect(options.map(o => o.label)).toEqual(['…', 'Simplify', 'Review', 'Remember'])
})
test('the agents row summarises, then lists type and model family and persists', async ($, on) => {
  const { saved } = world(on, { spawned: [{ model: 'us.anthropic.claude-opus-5-5-v1', agentId: 'a1' }, { model: 'sonnet', agentId: 'a2' }] })
  await start($)
  await spawn($)
  await spawn($)
  const ui = await mount($)
  expect((await ui.find({ type: 'Text', text: /^agents/ }))?.text).toBe('agents · 2 running · 0 done')
  expect(await ui.find({ type: 'Text', text: 'Explore · opus' })).toBeUndefined()
  expect((await ui.find({ key: 'agents' }))?.props.label).toBe('▸')
  await ui.press({ key: 'agents' })
  expect(await ui.find({ type: 'Text', text: 'Explore · opus' })).toBeDefined()
  expect(await ui.find({ type: 'Text', text: 'Explore · sonnet' })).toBeDefined()
  expect((await ui.find({ key: 'agents' }))?.props.label).toBe('▾')
  expect(saved.get('agentsOpen')).toBe(true)
})
test('a finished agent counts as done once, and a resume is not a new run', async ($, on) => {
  world(on, { spawned: [{ model: 'claude-opus-5-5', agentId: 'a1' }, { model: 'sonnet', agentId: 'a2' }, { model: 'claude-opus-5-5', agentId: 'a1' }] })
  await start($)
  await spawn($)
  await spawn($)
  await turn($, { agentId: 'a1' })
  await turn($, { agentId: 'a1' })
  await $.agent.spawn({ subagentType: 'Explore', description: 'again', prompt: 'more', tool_use_id: 'tu', background: true, fork: false, parentModel: 'opus', resume: { agentId: 'a1' } } as never)
  await turn($, { agentId: 'a1' })
  const ui = await mount($)
  expect((await ui.find({ type: 'Text', text: /^agents/ }))?.text).toBe('agents · 1 running · 1 done')
})
test('the band yields to a survey', async ($, on) => {
  world(on, { details: true })
  await start($)
  await turn($)
  const ui = await mount($, 'terminal', { ...BAND, hasSurvey: true })
  expect(await ui.find({ type: 'Text', text: /cost|context/ })).toBeUndefined()
  expect(await ui.find({ key: 'details' })).toBeUndefined()
  expect(await ui.find({ type: 'Text', text: 'below' })).toBeDefined()
})
test('a /clear restarts the counters and keeps the menus and the details choice', async ($, on) => {
  world(on, { details: true, usage: { startedAt: 0, context: { window: 200000 }, rateLimits: [] } })
  await start($)
  await turn($)
  await $.classic.SessionStart({ source: 'clear' })
  let ui = await mount($)
  expect(await ui.find({ type: 'Text', text: /^turns/ })).toBeUndefined()
  expect(await ui.find({ key: 'actions' })).toBeDefined()
  await ui.unmount()
  await turn($)
  ui = await mount($)
  expect(await ui.find({ type: 'Text', text: 'turns 1' })).toBeDefined()
  expect(await ui.find({ type: 'Text', text: 'cost n/a' })).toBeDefined()
})
test('a new SessionUsage.startedAt restarts the counters without a classic hook', async ($, on) => {
  const usage = { ...USAGE }
  world(on, { usage, details: true })
  await start($)
  await turn($)
  await turn($)
  usage.startedAt = 99
  await turn($)
  const ui = await mount($)
  expect(await ui.find({ type: 'Text', text: 'turns 1' })).toBeDefined()
  expect(await ui.find({ type: 'Text', text: 'tokens 1.0k in · 200 out · 3.0k cached' })).toBeDefined()
})
test('the first startedAt reading keeps the agents spawned before it', async ($, on) => {
  world(on, { spawned: [{ model: 'opus', agentId: 'a1' }] })
  await start($)
  await spawn($)
  await turn($)
  const ui = await mount($)
  expect((await ui.find({ type: 'Text', text: /^agents/ }))?.text).toBe('agents · 1 running · 0 done')
})
test('the metrics row wraps with no width, and below sits directly under the root', async ($, on) => {
  world(on, { details: true })
  await start($)
  await turn($)
  for (const surface of ['terminal', 'desktop'] as const) {
    const ui = await mount($, surface)
    const metrics = await ui.find({ key: 'metrics' })
    expect(metrics?.props.flexWrap).toBe('wrap')
    expect('width' in (metrics?.props ?? { width: 0 })).toBe(false)
    const root = JSON.parse(JSON.stringify(await ui.drawn())) as { children: { children?: unknown[] }[] }
    expect(root.children.some(c => c.children?.[0] === 'below')).toBe(true)
    await ui.unmount()
  }
})
test('expanded before the first turn draws no metrics row', async ($, on) => {
  world(on, { details: true })
  await start($)
  const ui = await mount($)
  expect(await ui.find({ key: 'metrics' })).toBeUndefined()
  expect(await ui.find({ key: 'actions' })).toBeDefined()
})
test('the step row draws above the meter, and the band below comes last', async ($, on) => {
  world(on, { details: true })
  await start($)
  await turn($)
  await $.tool.call({ tool: 'mcp__jstack__step', op: 'set', playbook: 'Feature', steps: ['Name the shape'] })
  const ui = await mount($)
  const drawn = JSON.stringify(await ui.drawn())
  const at = (text: string) => drawn.indexOf(text)
  expect(at('Feature · step 1/1') >= 0 && at('Feature · step 1/1') < at('context 38%') && at('context 38%') < at('cost $0.42') && at('cost $0.42') < at('"below"')).toBe(true)
  await ui.unmount()
})
