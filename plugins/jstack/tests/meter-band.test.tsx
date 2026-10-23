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
type World = { commands?: string[]; usage?: SessionUsage; spawned?: { model: string; agentId: string }[]; hasPackage?: boolean; scripts?: string }
function world(on: On, w: World = {}) {
  const ran: unknown[] = []
  const toasts: string[] = []
  const spawned = [...(w.spawned ?? [])]
  const files: Record<string, string> = { '/home/u/.claude/.ponytail-active': 'full\n' }
  if (w.hasPackage !== false) files['/home/u/package.json'] = w.scripts ?? '{"scripts":{"check":"x"}}'
  mock.env(on, { HOME: '/home/u' })
  mock.store(on)
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
  return { ran, toasts }
}

const start = ($: Engine) => $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/home/u' })
const USAGE_1 = { model: 'claude-opus-5-5', input_tokens: 1000, output_tokens: 200, cache_read_input_tokens: 3000, cache_creation_input_tokens: 0 }
const turn = ($: Engine, extra: Record<string, unknown> = {}) =>
  $.turn.complete({ answer: '', durationMs: 65000, isAborted: false, reason: 'answer', turnId: 't1', usage: USAGE_1, ...extra } as never)
const spawn = ($: Engine, subagentType: string) => $.agent.spawn({ subagentType, description: 'look', prompt: 'look', tool_use_id: 'tu', background: true, fork: false, parentModel: 'opus' } as never)
const mount = ($: Engine, surface: 'terminal' | 'desktop' = 'terminal', props = BAND) =>
  $.ui.mount({ plugin: 'jstack', surface, component: 'AbovePrompt', props })

test('one turn draws the metrics row on both surfaces above the band below', async ($, on) => {
  world(on)
  await start($)
  await turn($)
  for (const surface of ['terminal', 'desktop'] as const) {
    const ui = await mount($, surface)
    for (const text of ['cost $0.42', 'tokens 4.2k · 200 out', 'turns 1', 'agent time 1m 5s', 'context 38%', '7d 60%']) {
      expect((await ui.find({ type: 'Text', text }))?.text).toBe(text)
    }
    expect((await ui.find({ type: 'Text', text: /^5h 12% ↻ \d{1,2}:40 [AP]M$/ }))).toBeDefined()
    expect(await ui.find({ type: 'Text', text: 'below' })).toBeDefined()
    await ui.unmount()
  }
})
test('spawned agents are grouped by model and a finished one counts as done', async ($, on) => {
  world(on, { spawned: [{ model: 'claude-opus-5-5', agentId: 'a1' }, { model: 'sonnet', agentId: 'a2' }, { model: 'claude-sonnet-5', agentId: 'a3' }, { model: 'claude-opus-5-5', agentId: 'a1' }] })
  await start($)
  await spawn($, 'Explore')
  await spawn($, 'Explore')
  await spawn($, 'Explore')
  await turn($, { agentId: 'a1' })
  await turn($, { agentId: 'a1' })
  // A resume of a1 is not a new run, so it neither runs nor finishes again
  await $.agent.spawn({ subagentType: 'Explore', description: 'again', prompt: 'more', tool_use_id: 'tu', background: true, fork: false, parentModel: 'opus', resume: { agentId: 'a1' } } as never)
  await turn($, { agentId: 'a1' })
  const ui = await mount($)
  expect((await ui.find({ type: 'Text', text: /^agents/ }))?.text).toBe('agents · 2 running (sonnet ×2) · 1 done')
  // Subagent turns count neither as turns nor read usage, so no metrics row yet
  expect(await ui.find({ type: 'Text', text: /^turns/ })).toBeUndefined()
})
test('a limit at 96% draws in the error colour, 85% in warning', async ($, on) => {
  world(on, { usage: { ...USAGE, rateLimits: [{ kind: 'five_hour', percentUsed: 96 }, { kind: 'seven_day', percentUsed: 85 }] } })
  await start($)
  await turn($)
  const ui = await mount($)
  expect((await ui.find({ type: 'Text', text: '5h 96%' }))?.props.color).toBe('error')
  expect((await ui.find({ type: 'Text', text: '7d 85%' }))?.props.color).toBe('warning')
})
test('Check toasts the tail of a failure and a pass', async ($, on) => {
  const { toasts } = world(on)
  const results = [{ exitCode: 1, stdout: 'lint', stderr: 'boom\n', isStdoutTruncated: false, isStderrTruncated: false }, { exitCode: 0, stdout: '', stderr: '', isStdoutTruncated: false, isStderrTruncated: false }]
  on('process.run', () => ({ value: results.shift()! }))
  await start($)
  const ui = await mount($)
  await ui.press({ key: 'check' })
  await ui.press({ key: 'check' })
  expect(toasts).toEqual(['pnpm check failed: boom', 'pnpm check passed'])
})
test('the level pills run Ponytail and mark the active level; the buttons run their commands', async ($, on) => {
  const { ran } = world(on)
  await start($)
  const ui = await mount($)
  expect((await ui.find({ key: 'level-full' }))?.props.variant).toBe('primary')
  expect((await ui.find({ key: 'level-lite' }))?.props.variant).toBeUndefined()
  await ui.press({ key: 'level-lite' })
  await ui.press({ key: 'simplify' })
  await ui.press({ key: 'review' })
  await ui.press({ key: 'remember' })
  expect(ran).toEqual([
    { command: 'ponytail:ponytail', args: 'lite' },
    { command: 'simplify', args: '' },
    { command: 'code-review', args: '' },
    { command: 'remember:remember', args: '' },
  ])
})
test('a command missing from command.list hides its button', async ($, on) => {
  world(on, { commands: ['code-review', 'remember:remember'] })
  await start($)
  const ui = await mount($)
  expect(await ui.find({ key: 'simplify' })).toBeUndefined()
  expect(await ui.find({ key: 'level-off' })).toBeUndefined()
  expect(await ui.find({ key: 'review' })).toBeDefined()
  expect(await ui.find({ key: 'check' })).toBeDefined()
})
test('without a check script in package.json there is no Check button', async ($, on) => {
  world(on, { hasPackage: false })
  await start($)
  let ui = await mount($)
  expect(await ui.find({ key: 'check' })).toBeUndefined()
  expect(await ui.find({ key: 'simplify' })).toBeDefined()
  await ui.unmount()
})
test('a package.json with other scripts but no check draws no Check button', async ($, on) => {
  world(on, { scripts: '{"scripts":{"test":"x"}}' })
  await start($)
  const ui = await mount($)
  expect(await ui.find({ key: 'check' })).toBeUndefined()
})
test('the band yields to a survey', async ($, on) => {
  world(on)
  await start($)
  await turn($)
  const ui = await mount($, 'terminal', { ...BAND, hasSurvey: true })
  expect(await ui.find({ type: 'Text', text: /cost/ })).toBeUndefined()
  expect(await ui.find({ key: 'check' })).toBeUndefined()
  expect(await ui.find({ type: 'Text', text: 'below' })).toBeDefined()
})
test('a /clear restarts the counters and keeps the buttons', async ($, on) => {
  world(on, { usage: { startedAt: 0, context: { window: 200000 }, rateLimits: [] } })
  await start($)
  await turn($)
  await $.classic.SessionStart({ source: 'clear' })
  let ui = await mount($)
  expect(await ui.find({ type: 'Text', text: /^turns/ })).toBeUndefined()
  expect(await ui.find({ key: 'simplify' })).toBeDefined()
  await ui.unmount()
  await turn($)
  ui = await mount($)
  expect(await ui.find({ type: 'Text', text: 'turns 1' })).toBeDefined()
  expect(await ui.find({ type: 'Text', text: 'cost n/a' })).toBeDefined()
})
test('before the first turn only the buttons draw', async ($, on) => {
  world(on)
  await start($)
  const ui = await mount($)
  expect(await ui.find({ type: 'Text', text: /^(cost|turns|agents)/ })).toBeUndefined()
  expect(await ui.find({ key: 'check' })).toBeDefined()
  expect(await ui.find({ type: 'Text', text: 'below' })).toBeDefined()
})
test('without a session start the band draws only what is below', async ($, on) => {
  world(on)
  const ui = await mount($)
  expect(await ui.find({ key: 'check' })).toBeUndefined()
  expect(await ui.find({ type: 'Text', text: 'below' })).toBeDefined()
})
test('the step row draws above the meter, and the band below comes last', async ($, on) => {
  world(on)
  await start($)
  await turn($)
  await $.tool.call({ tool: 'mcp__jstack__step', op: 'set', playbook: 'Feature', steps: ['Name the shape'] })
  const drawn = JSON.stringify(await (await mount($)).drawn())
  const at = (text: string) => drawn.indexOf(text)
  expect(at('Feature · step 1/1') >= 0 && at('Feature · step 1/1') < at('cost $0.42') && at('cost $0.42') < at('"below"')).toBe(true)
})
