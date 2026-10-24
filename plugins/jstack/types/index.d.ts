export type StepState = 'todo' | 'done' | 'skip'
export type Step = { text: string; state: StepState; reason?: string }
export type Board = { playbook: string; steps: Step[]; current: number }

export type Tokens = { input: number; output: number; cacheRead: number; cacheWrite: number }
export type Limit = { kind: string; percentUsed: number; resetsAt?: string }
export type Meter = {
  // SessionUsage.startedAt of the last main turn; a new value means the engine restarted the count
  startedAt: number | null
  costUsd: number | null
  tokens: Tokens
  turns: number
  busyMs: number
  contextPercent: number | null
  limits: Limit[]
  // agentId to model and agent type, for the subagents still running
  running: Record<string, { model: string; type: string }>
  done: number
  // Names from $.command.list(), so a button whose command is absent is hidden
  commands: string[]
  levelPath: string | null
  // Ponytail's task board page, set when Ponytail is installed; its band module rebuilds the file after every turn
  boardPath: string | null
  hasCheck: boolean
  // Hindsight coding memory's config file, when it is installed; its kill switch is read on every draw, as the Level file is
  memoryConfig: string | null
  // Persisted in $.store: the metrics row shown, and the running agents listed one per line
  details: boolean
  agentsOpen: boolean
}

declare module 'claude-code' {
  interface PluginState {
    jstack: { board: Board | null; meter: Meter }
  }
}
