---
name: no-comments
description: "Audit comments in a diff or files: remove narration, history (\"changed X to Y\", \"previously…\", dates, ticket chatter), commented-out code and stale comments; tighten the rest. Keeps concise, current comments that explain a non-obvious why, a constraint, or a public contract. Defers to the coding-standards skill for style. Spawns comment-sicko, fixes accepted findings, and offers encodings for claimed constraints."
disable-model-invocation: true
---

# No comments

Not zero comments: no bad ones. A comment stays when it is concise, true today, and explains something the code can't (a non-obvious why, a constraint, a public contract). Everything else goes, and history goes in the commit message. A wrong comment is fixed or deleted in the same change. Style (density, doc-comment format, `TODO` convention) follows the **coding-standards** skill when it is installed.

Spawn comment-sicko. Act on accepted findings. Defer to its fresh perspective.

## Scope

Use the caller's files or diff. Otherwise use the current diff against the base branch, default `main`, including the working tree.

## Steps

1. Spawn an Agent with `subagent_type: "jstack:comment-sicko"`. Pass the scope. Pick each subagent's reasoning level (`effort`) for the job, per the Subagents section of the **j-mode** skill. Do not restate its rules.
2. Inspect its report and diff. Reject application-code edits, scope escapes, deletions of comments its keep rule protects, rewrites that change meaning, and `MUST KILL` flags with misstated reasons. Audit lint and TypeScript suppressions it missed: ones that hide a correctness or safety problem stay actionable `MUST KILL`s. Before accepting a verdict on a thin `IMPORTANT` or `do not remove` comment, check its claim with the **how** or **why** skill (read `${CLAUDE_PLUGIN_ROOT}/skills/how/SKILL.md` or `${CLAUDE_PLUGIN_ROOT}/skills/why/SKILL.md` and follow it): a claim that holds is a keep or a rewrite, a refuted one goes. Revert and rerun one rejected report with the failure named. Reject a second, report it open, and fail `/jstack:no-comments`.
3. Fix trivial accepted flags directly by deleting a dead path, dropping a parameter, or using the real API. If any fix needs a shape, follow the **architect** skill (`${CLAUDE_PLUGIN_ROOT}/skills/architect/SKILL.md`) once for the accepted set and surrounding code. Stop at the sketch. Architect shapes. Step 4 implements.
4. Implement the smallest root-cause fix in scope. Remove every named workaround. If the root cause is out of scope, land the smallest in-scope fix and report the rest open. The **principle-fix-root-causes** and **principle-redesign-from-first-principles** skills guide intent only. Neither authorizes widening the fence nor fixing instances outside it. Never bolt on symptom guards.
5. A constraint comment (`do not remove`, `do not change wording`, `talk to X before changing`) whose claim holds is a keep. When code could enforce the constraint instead (a type, runtime check, test, or CI lint), offer the cheapest in-scope encoding and wait for interactive approval; unattended and eval runs need the caller's pre-approval. If approved, encode it and delete the comment. Otherwise keep the comment and report the constraint as unenforced.
6. Report the kept, rewritten and deleted counts, reruns, architect sketch, fixes, encoding offers, encodings, unenforced constraints, and other open work.
