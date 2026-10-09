export type StepState = 'todo' | 'done' | 'skip'
export type Step = { text: string; state: StepState; reason?: string }
export type Board = { playbook: string; steps: Step[]; current: number }

declare module 'claude-code' {
  interface PluginState {
    jstack: { board: Board | null }
  }
}
