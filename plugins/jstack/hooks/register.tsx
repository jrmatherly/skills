import { atom, read, update } from 'claude-code'
import type { EngineInterface, Register } from 'claude-code'

import type { Board, Step } from '../types'

const board = atom({ plugin: 'jstack', key: 'board' } as const, null)
const OPS = 'set (playbook, steps), done (index), skip (index, reason), add (text), show'
const MARK = { todo: ' ', done: 'x', skip: '-' } as const
const STATES = new Set(Object.keys(MARK))
const NO_LIST = 'no list yet; call set first'
type Op = { op: 'set'; playbook: string; steps: string[] } | { op: 'done' | 'skip'; index: number; reason?: string } | { op: 'add'; text: string } | { op: 'show' }
function isStep(x: unknown): x is Step {
  if (typeof x !== 'object' || x === null) return false
  const s = x as Record<string, unknown>
  return typeof s.text === 'string' && typeof s.state === 'string' && STATES.has(s.state) && (s.reason === undefined || typeof s.reason === 'string')
}

// The store outlives this code, so a record from an older build must read as empty
function toBoard(x: unknown): Board | null {
  if (typeof x !== 'object' || x === null) return null
  const b = x as Record<string, unknown>
  if (typeof b.playbook !== 'string' || !Array.isArray(b.steps) || !b.steps.every(isStep)) return null
  return normalize(b.playbook, b.steps)
}
function normalize(playbook: string, steps: Step[]): Board {
  const current = steps.findIndex(s => s.state === 'todo')
  return { playbook, steps, current: current === -1 ? steps.length : current }
}
function show(b: Board): string {
  const lines = b.steps.map((s, i) =>
    `${i + 1}. [${MARK[s.state]}] ${s.text}${s.state === 'skip' && s.reason ? ` (skip: ${s.reason})` : ''}`)
  return [b.playbook, ...lines].join('\n')
}
function rowText(b: Board, columns: number): string {
  const done = b.steps.filter(s => s.state === 'done').length
  const step = b.steps[b.current]
  const text = step
    ? `${b.playbook} · step ${b.current + 1}/${b.steps.length} · ${done} done: ${step.text}`
    : `${b.playbook} · ${b.steps.length}/${b.steps.length} finished · ${done} done`
  // Cut by code point, not UTF-16 unit, so a wide character is never split
  return text.length > columns ? Array.from(text).slice(0, Math.max(0, columns - 1)).join('') + '…' : text
}
function parse(input: Record<string, unknown>, size: number): Op | string {
  const str = (k: string) => (typeof input[k] === 'string' && (input[k] as string).trim()) || undefined
  switch (input.op) {
    case 'set': {
      const playbook = str('playbook')
      const steps = (Array.isArray(input.steps) ? input.steps : []).map(s => (typeof s === 'string' ? s.trim() : ''))
      return playbook && steps.length && steps.every(s => s !== '')
        ? { op: 'set', playbook, steps }
        : 'set needs playbook (string) and steps (non-empty string array)'
    }
    case 'done':
    case 'skip': {
      if (size === 0) return NO_LIST
      const index = Number(input.index)
      if (!Number.isInteger(index) || index < 1 || index > size) return `${input.op} needs index between 1 and ${size}`
      if (input.op === 'skip' && !str('reason')) return 'skip needs reason (string)'
      return { op: input.op, index, reason: str('reason') }
    }
    case 'add': {
      if (size === 0) return NO_LIST
      const text = str('text')
      return text ? { op: 'add', text } : 'add needs text (string)'
    }
    case 'show':
      return size === 0 ? NO_LIST : { op: 'show' }
    default:
      return `unknown op ${JSON.stringify(input.op)}; valid ops: ${OPS}`
  }
}
function apply(prev: Board | null, op: Op): Board | null {
  if (op.op === 'set') return normalize(op.playbook, op.steps.map(text => ({ text, state: 'todo' as const })))
  if (!prev || op.op === 'show') return prev
  if (op.op === 'add') return normalize(prev.playbook, [...prev.steps, { text: op.text, state: 'todo' }])
  const steps = prev.steps.map((s, i) => (i === op.index - 1 ? { ...s, state: op.op, reason: op.reason } : s))
  return normalize(prev.playbook, steps)
}
const key = async ($: EngineInterface) => `steps:${await $.session.id()}`
async function save($: EngineInterface, b: Board): Promise<void> {
  await $.store.set(await key($), b)
}
async function load($: EngineInterface): Promise<void> {
  const raw = await $.store.get(await key($))
  await update($, board, () => toBoard(raw))
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.tool.register({
      name: 'step',
      description:
        'Mirror the j-mode playbook todolist into the band above the prompt. Call with op "set" (playbook, steps) when you open the todolist, ' +
        'then "done" (index) or "skip" (index, reason) per step, "add" (text) for a new step, "show" to print it. Indexes start at 1. No model call, nothing runs.',
      inputSchema: {
        type: 'object',
        required: ['op'],
        properties: {
          op: { type: 'string', enum: ['set', 'done', 'skip', 'add', 'show'] },
          playbook: { type: 'string', description: 'The playbook name, for set.' },
          steps: { type: 'array', items: { type: 'string' }, description: 'The step texts in order, for set.' },
          index: { type: 'integer', minimum: 1, description: 'The step number, for done and skip.' },
          reason: { type: 'string', description: 'Why the step is skipped, for skip.' },
          text: { type: 'string', description: 'The new step, for add.' },
        },
      },
      isDeferred: false,
    })
    return next(e)
  }).catch(($, e, next) => next(e))

  // Reload on every start: a resume keeps the session id and finds its record;
  // /clear and /branch start a new id with none, so the band empties by construction
  on('classic.SessionStart', async ($, e, next) => {
    await load($)
    return next(e)
  }).catch(($, e, next) => next(e))

  on('tool.call', { tool: 'mcp__jstack__step' }, async ($, e) => {
    if (e.agentId !== undefined) return { result: 'step: ignored; the band shows the main session only, keep your own todolist' }
    // The tool's arguments arrive flat on the event beside `tool`, so the event is the input
    const input = e as unknown as Record<string, unknown>
    // Parse and apply inside the updater, so two calls in one turn both land
    const out: { refusal: string | null } = { refusal: null }
    const after = await update($, board, prev => {
      // update reruns this on a version miss, so a refusal from the first pass must not survive
      out.refusal = null
      const op = parse(input, prev?.steps.length ?? 0)
      if (typeof op === 'string') {
        out.refusal = op
        return prev ?? null
      }
      return apply(prev ?? null, op)
    })
    if (out.refusal !== null) return { result: `step: ${out.refusal}` }
    // The atom is the truth within a session; a failed store write must not report the change as failed
    if (after) await save($, after).catch(() => undefined)
    return { result: after ? show(after) : `step: ${NO_LIST}` }
  }).catch(($, e, next) => ({ result: `step: the tool failed (${next.error.kind}); call show to read the list` }))

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey) return next(e)
    const b = await read($, board)
    if (!b || b.steps.length === 0) return next(e)
    const { Box, Text } = $.ui.resolve(e)
    const below = await next(e)
    return (
      <Box flexDirection="column">
        <Text color="suggestion" wrap="truncate-end">{rowText(b, e.props.bodyColumns)}</Text>
        {below}
      </Box>
    )
  }).catch(($, e, next) => next(e))

  on('prompt.compose', async ($, e, next) => {
    const composed = await next(e)
    const b = await read($, board)
    if (!b || b.steps.length === 0) return composed
    const text = `The playbook todolist this session, as the jstack step band shows it:\n${show(b)}`
    return { sections: [...composed.sections, { id: 'jstack:steps', text, scope: 'session' as const }] }
  }).catch(($, e, next) => next(e))
}
