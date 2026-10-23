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
  // agentId to model, for the subagents still running
  running: Record<string, string>
  done: number
  // Names from $.command.list(), so a button whose command is absent is hidden
  commands: string[]
  levelPath: string | null
  hasCheck: boolean
}

declare module 'claude-code' {
  interface PluginState {
    jstack: { board: Board | null; meter: Meter }
  }
}
