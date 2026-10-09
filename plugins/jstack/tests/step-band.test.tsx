import { expect, test } from 'claude-code/testing'
import type { Engine } from 'claude-code/testing'
import type { On, RenderPropsOf } from 'claude-code'

const TOOL = 'mcp__jstack__step'
const BAND: RenderPropsOf['AbovePrompt'] = { hasSurvey: false, isWorking: false, maxRows: 10, bodyColumns: 80, scroll: { offset: 0, bodyRows: 10 }, view: {} }
function world(on: On, saved = new Map<string, unknown>()) {
  on('store.get', ($, e) => ({ value: saved.get(e.key) }))
  on('store.set', ($, e) => { saved.set(e.key, e.value); return { value: undefined } })
  on('session.id', () => ({ value: 'S1' }))
  on('session.start', () => ({ cwd: '/work' }))
  on('classic.SessionStart', () => ({}))
  on('prompt.compose', () => ({ sections: [{ id: 'intro', text: 'engine', scope: 'shared' as const }] }))
  on('ui.render', () => ({ type: 'Text', props: {}, children: ['below'] }))
  return saved
}

const call = ($: Engine, input: Record<string, unknown>) => $.tool.call({ tool: TOOL, ...input })
const mount = ($: Engine, surface: 'terminal' | 'desktop', props = BAND) =>
  $.ui.mount({ plugin: 'jstack', surface, component: 'AbovePrompt', props })
const set = ($: Engine) => call($, { op: 'set', playbook: 'Feature', steps: ['Name the shape', 'Write the test', 'Implement'] })
test('session.start registers step upfront', async ($, on) => {
  world(on)
  const specs: unknown[] = []
  on('tool.register', ($, e) => { specs.push(e); return { value: { tool: 'mcp__jstack__' + e.name } } })
  await $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/work' })
  expect(specs[0]).toMatchObject({ name: 'step', isDeferred: false })
})
test('set, done and skip draw the row on both surfaces and save the list', async ($, on) => {
  const saved = world(on)
  const first = await set($)
  expect(first.result).toBe('Feature\n1. [ ] Name the shape\n2. [ ] Write the test\n3. [ ] Implement')
  for (const surface of ['terminal', 'desktop'] as const) {
    const ui = await mount($, surface)
    expect(await ui.find({ type: 'Text', text: 'Feature · step 1/3 · 0 done: Name the shape' })).toBeDefined()
    expect(await ui.find({ type: 'Text', text: 'below' })).toBeDefined()
    await ui.unmount()
  }
  await call($, { op: 'done', index: 1 })
  const skipped = await call($, { op: 'skip', index: 2, reason: 'covered by the existing suite' })
  expect(skipped.result).toContain('2. [-] Write the test (skip: covered by the existing suite)')
  const ui = await mount($, 'terminal')
  expect(await ui.find({ type: 'Text', text: 'Feature · step 3/3 · 1 done: Implement' })).toBeDefined()
  await ui.unmount()
  expect(saved.get('steps:S1')).toMatchObject({ playbook: 'Feature', current: 2 })
})
test('parallel done calls both land', async ($, on) => {
  world(on)
  await set($)
  await Promise.all([call($, { op: 'done', index: 1 }), call($, { op: 'done', index: 2 })])
  expect((await call($, { op: 'show' })).result).toBe('Feature\n1. [x] Name the shape\n2. [x] Write the test\n3. [ ] Implement')
})
test('an empty list draws nothing and the band below stays', async ($, on) => {
  world(on)
  const ui = await mount($, 'terminal')
  expect(await ui.find({ type: 'Text', text: /Feature/ })).toBeUndefined()
  expect(await ui.find({ type: 'Text', text: 'below' })).toBeDefined()
})
test('a long row is cut to bodyColumns', async ($, on) => {
  world(on)
  await call($, { op: 'set', playbook: 'Feature', steps: ['x'.repeat(200)] })
  const ui = await mount($, 'terminal', { ...BAND, bodyColumns: 40 })
  const row = await ui.find({ type: 'Text', text: /^Feature/ })
  expect(row?.text.length).toBe(40)
})
test('a bad op returns the help string', async ($, on) => {
  world(on)
  const out = await call($, { op: 'finish' })
  expect(out.result).toBe('step: unknown op "finish"; valid ops: set (playbook, steps), done (index), skip (index, reason), add (text), show')
})
test('set with no usable steps is refused', async ($, on) => {
  world(on)
  await set($)
  const refused = 'step: set needs playbook (string) and steps (non-empty string array)'
  expect((await call($, { op: 'set', playbook: 'Bug fix', steps: [1, ''] })).result).toBe(refused)
  expect((await call($, { op: 'set', playbook: 'Bug fix', steps: ['Reproduce', 1] })).result).toBe(refused)
  expect((await call($, { op: 'show' })).result).toContain('Feature')
})
test('an index outside the list is refused and nothing changes', async ($, on) => {
  world(on)
  expect((await call($, { op: 'done', index: 1 })).result).toBe('step: no list yet; call set first')
  await set($)
  expect((await call($, { op: 'done', index: 7 })).result).toBe('step: done needs index between 1 and 3')
  expect((await call($, { op: 'skip', index: 2 })).result).toBe('step: skip needs reason (string)')
  expect((await call($, { op: 'show' })).result).toContain('1. [ ] Name the shape')
})
test('a subagent call never touches the main list', async ($, on) => {
  world(on)
  await set($)
  const out = await call($, { op: 'done', index: 1, agentId: 'agent-7' })
  expect(out.result).toBe('step: ignored; the band shows the main session only, keep your own todolist')
  expect((await call($, { op: 'show' })).result).toContain('1. [ ] Name the shape')
})
test('the band yields to a survey', async ($, on) => {
  world(on)
  await set($)
  const ui = await mount($, 'terminal', { ...BAND, hasSurvey: true })
  expect(await ui.find({ type: 'Text', text: /Feature/ })).toBeUndefined()
  expect(await ui.find({ type: 'Text', text: 'below' })).toBeDefined()
})
test('a valid store record comes back after a resume', async ($, on) => {
  const record = { playbook: 'Bug fix', steps: [{ text: 'Reproduce', state: 'done' }, { text: 'Fix', state: 'todo' }], current: 1 }
  world(on, new Map([['steps:S1', record]]))
  await $.classic.SessionStart({ source: 'resume' })
  const ui = await mount($, 'terminal')
  expect(await ui.find({ type: 'Text', text: 'Bug fix · step 2/2 · 1 done: Fix' })).toBeDefined()
})
test('a bad store record after a resume draws nothing', async ($, on) => {
  const saved = world(on, new Map<string, unknown>([['steps:S1', { playbook: 'Bug fix', steps: [{ text: 'Fix', state: 'later' }], current: 0 }]]))
  await $.classic.SessionStart({ source: 'resume' })
  let ui = await mount($, 'terminal')
  expect(await ui.find({ type: 'Text', text: /Bug fix/ })).toBeUndefined()
  expect(await ui.find({ type: 'Text', text: 'below' })).toBeDefined()
  await ui.unmount()
  saved.set('steps:S1', 'old-format')
  await $.classic.SessionStart({ source: 'resume' })
  ui = await mount($, 'terminal')
  expect(await ui.find({ type: 'Text', text: /old-format|Bug fix/ })).toBeUndefined()
  expect(await ui.find({ type: 'Text', text: 'below' })).toBeDefined()
})
test('add appends a step and moves current onto it', async ($, on) => {
  world(on)
  await call($, { op: 'set', playbook: 'Feature', steps: ['Only'] })
  await call($, { op: 'done', index: 1 })
  expect((await call($, { op: 'add', text: 'One more' })).result).toBe('Feature\n1. [x] Only\n2. [ ] One more')
  const ui = await mount($, 'terminal')
  expect(await ui.find({ type: 'Text', text: 'Feature · step 2/2 · 1 done: One more' })).toBeDefined()
})
test('a set and a done in one turn answer what they did', async ($, on) => {
  world(on)
  const [, done] = await Promise.all([set($), call($, { op: 'done', index: 1 })])
  const shown = (await call($, { op: 'show' })).result as string
  expect(shown.includes('1. [x] Name the shape')).toBe((done.result as string).includes('1. [x] Name the shape'))
})
test('a SessionStart with no record for the session empties the band', async ($, on) => {
  const saved = world(on)
  await set($)
  saved.clear()
  await $.classic.SessionStart({ source: 'clear' })
  const ui = await mount($, 'terminal')
  expect(await ui.find({ type: 'Text', text: /Feature/ })).toBeUndefined()
  expect(await ui.find({ type: 'Text', text: 'below' })).toBeDefined()
})
test('a failing store write does not hide the change', async ($, on) => {
  on('store.get', () => ({ value: undefined }))
  on('store.set', () => { throw new Error('store full') })
  on('session.id', () => ({ value: 'S1' }))
  on('ui.render', () => ({ type: 'Text', props: {}, children: ['below'] }))
  const out = await call($, { op: 'set', playbook: 'Feature', steps: ['Only'] })
  expect(out.result).toBe('Feature\n1. [ ] Only')
})
test('a long row with wide characters is cut at a code point', async ($, on) => {
  world(on)
  await call($, { op: 'set', playbook: 'Feature', steps: ['🐛'.repeat(60)] })
  const ui = await mount($, 'terminal', { ...BAND, bodyColumns: 31 })
  const row = await ui.find({ type: 'Text', text: /^Feature/ })
  expect(row?.text.endsWith('🐛…')).toBe(true)
})
test('prompt.compose appends one session section listing the steps', async ($, on) => {
  world(on)
  await set($)
  await call($, { op: 'done', index: 1 })
  const composed = await $.prompt.compose({ model: 'm', promptModel: 'm', surfaces: ['terminal'], tools: [], outputStyle: null, traits: [] })
  const last = composed.sections[composed.sections.length - 1]
  expect(last).toMatchObject({ id: 'jstack:steps', scope: 'session' })
  expect(last?.text).toContain('1. [x] Name the shape')
})
