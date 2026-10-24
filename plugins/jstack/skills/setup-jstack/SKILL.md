---
name: setup-jstack
description: Configure which models jstack uses per role and at what reasoning effort. Writes a rule that overrides the skill defaults. Use for /setup-jstack, "configure jstack models", "jstack budget", or changing jstack's model choices.
---

# Setup jstack

Write `~/.claude/rules/jstack-models.md`, a rule Claude Code loads in every session (it has no `paths` frontmatter), that sets jstack's model and reasoning effort per role.

## Models

An Agent call takes `model` (`opus`, `sonnet`, `haiku`, `fable`, or a full model ID such as `claude-opus-5-5`) and `effort` (`low`, `medium`, `high`, `xhigh`, `max`). A role value is `<model> <effort>`, such as `opus medium`. The value `inherit` runs the role on the parent's model and effort (omit both). Review seats may also be `codex`.

### Codex seats

A `codex` entry in a reviewer or judge list runs that seat through Codex instead of an Agent call: write the seat's filled-in prompt to a temp file and run `codex exec -s read-only - < "$file"` (stdin, never a quoted argument: the prompt contains the code under review, and the shell would expand any `$(…)` or backtick in it), so the panel gets a reviewer from another model family. Treat its output like any other seat's. Offer `codex` only when `command -v codex` succeeds, and only in read-only roles (`interrogate reviewers`, `arena cross-judge pool`, `reflect tooling`); runner and worker roles write code and stay on Agent models.

## Steps

### 1. Load current state

If `~/.claude/rules/jstack-models.md` exists, read it and treat its `# budget:` line and role values as the current choices. A model-only value from an older rule, such as `opus`, keeps its model and takes the budget's effort. Otherwise start from the step 5 table.

### 2. Ask for a budget

Use AskUserQuestion with these labels, naming the current budget when the rule records one. With no rule, say that `small` matches the skill defaults.

- `unlimited — max reasoning`
- `large — xhigh reasoning`
- `medium — high reasoning`
- `small — medium reasoning (default)`

### 3. Apply it

Start from the step 5 table. The budget sets the effort token of every real model value, panel entries included, to `max`, `xhigh`, `high`, or `medium`; `inherit` and `codex` do not change. On a re-run, keep any role the user changed by hand. Add `codex` to the read-only lists in step 5 only if `command -v codex` succeeds.

### 4. Show the roles and confirm

Show every role with its value. Ask (AskUserQuestion) whether to accept or change specific roles, offering `opus`, `sonnet`, `haiku`, `fable`, `inherit`, and `codex` where allowed, each real model paired with an effort and the budget's effort preselected. Panel roles (`arena runners`, `architect runners`, `interrogate reviewers`) are lists: one seat per entry, so the list length sets the count. `arena cross-judge pool` is a list Arena picks one entry from, preferring one whose family differs from the parent's. `swarm workers` is every worker's model unless a race assigns one per arm.

### 5. Write the rule

Overwrite the whole file (re-runs stay idempotent). Shape, at the `small` budget:

```
# jstack model configuration. One line per role, `<model> <effort>`. Delete a line to fall back to the skill default.
# `inherit`: the role runs on the parent's model and effort (omit both). `codex`: a read-only seat run by `codex exec`.
# budget: small (medium)
feature, refactoring: sonnet medium
bug-fix: sonnet medium
perf-issue: sonnet medium
hillclimb: sonnet medium
judgment and prose: opus medium
hardest tasks: opus medium
how explorer: haiku medium
how explainer: opus medium
why investigators: haiku medium
why synthesizer: opus medium
reflect tooling: sonnet medium
reflect judgment, divergent, synthesizer: opus medium
arena runners: opus medium, sonnet medium
arena cross-judge pool: opus medium, sonnet medium
swarm workers: sonnet medium
architect runners: opus medium, sonnet medium
interrogate reviewers: opus medium, sonnet medium
```

### 6. Confirm

Tell the user the rule was written and applies to new sessions. Re-running this skill updates it.
