---
name: setup-jstack
description: Configure which models jstack uses per role and how much it spends. Writes a rule that overrides the skill defaults. Use for /setup-jstack, "configure jstack models", "jstack budget", or changing jstack's model choices.
---

# Setup jstack

Write `~/.claude/rules/jstack-models.md`, a rule Claude Code loads in every session (it has no `paths` frontmatter), that sets jstack's model per role.

## Models

An Agent call takes `model`: `opus`, `sonnet`, `haiku`, `fable`, a full model ID such as `claude-opus-5-5`, or `inherit` (the parent's model). There is no per-call reasoning setting, so the budget below picks models, not effort. Review seats may also be `codex`.

### Codex seats

A `codex` entry in a reviewer or judge list runs that seat through Codex instead of an Agent call: write the seat's filled-in prompt to a temp file and run `codex exec -s read-only - < "$file"` (stdin, never a quoted argument: the prompt contains the code under review, and the shell would expand any `$(…)` or backtick in it), so the panel gets a reviewer from another model family. Treat its output like any other seat's. Offer `codex` only when `command -v codex` succeeds, and only in read-only roles (`interrogate reviewers`, `arena cross-judge pool`, `reflect tooling`); runner and worker roles write code and stay on Agent models.

## Steps

### 1. Load current state

If `~/.claude/rules/jstack-models.md` exists, read it and treat its `# budget:` line and role values as the current choices. Otherwise start from the `large` table in step 5.

### 2. Ask for a budget

Use AskUserQuestion with these labels, naming the current budget when the rule records one:

- `unlimited — opus everywhere it helps`
- `large — opus for judgment, sonnet for code (default)`
- `medium — sonnet, opus only for synthesis`
- `small — sonnet and haiku`

### 3. Apply it

Start from the step 5 table for the chosen budget. On a re-run, keep any role the user changed by hand. Add `codex` to the read-only lists in step 5 only if `command -v codex` succeeds.

### 4. Show the roles and confirm

Show every role with its value. Ask (AskUserQuestion) whether to accept or change specific roles, offering `opus`, `sonnet`, `haiku`, `fable`, `inherit`, and `codex` where allowed. Panel roles (`arena runners`, `architect runners`, `interrogate reviewers`) are lists: one seat per entry, so the list length sets the count. `arena cross-judge pool` is a list Arena picks one entry from, preferring one whose family differs from the parent's. `swarm workers` is every worker's model unless a race assigns one per arm.

### 5. Write the rule

Overwrite the whole file (re-runs stay idempotent). `large` is the default; the other budgets change the values as noted.

```
# jstack model configuration. One line per role. Delete a line to fall back to the skill default.
# `inherit`: the role runs on the parent's model (omit `model`). `codex`: a read-only seat run by `codex exec`.
# budget: large
feature, refactoring: sonnet
bug-fix: sonnet
perf-issue: sonnet
hillclimb: sonnet
judgment and prose: opus
hardest tasks: opus
how explorer: haiku
how explainer: opus
why investigators: haiku
why synthesizer: opus
reflect tooling: sonnet
reflect judgment, divergent, synthesizer: opus
arena runners: opus, sonnet, sonnet
arena cross-judge pool: opus, sonnet
swarm workers: sonnet
architect runners: opus, sonnet, sonnet
interrogate reviewers: opus, sonnet, haiku
```

- `unlimited`: every `sonnet` above becomes `opus`; explorers and investigators become `sonnet`.
- `medium`: `judgment and prose`, `hardest tasks`, the explainer and the synthesizers stay `opus`; every other `opus` becomes `sonnet`.
- `small`: every `opus` becomes `sonnet`, every `sonnet` in a panel or worker role becomes `haiku`.

### 6. Confirm

Tell the user the rule was written and applies to new sessions. Re-running this skill updates it.
