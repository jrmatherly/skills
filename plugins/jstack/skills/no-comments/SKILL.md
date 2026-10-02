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

1. Spawn an Agent with `subagent_type: "jstack:comment-sicko"`. Pass the scope. Do not restate its rules.
2. Inspect its report and diff. Reject application-code edits, scope escapes, deletions of comments its own keep rule protects, rewrites that change meaning, misstated `MUST KILL` reasons, and flags that treat kept intentional code as guilty. Reshape flags on our-code surprises stay actionable. Do not restore those comments. A keep survives only with proof it is about something we cannot change. Audit missed scoped lint and TypeScript suppressions. Correctness or safety suppressions stay actionable `MUST KILL`s. Restore deletions only with exact exceptions and scoped proof. Before accepting thin `IMPORTANT` or `do not remove` kills or keeps, run `/how` or `/why` on their symbol. If a kill is ambiguous, do not restore. If a keep is refuted or still ambiguous, delete it. Revert and rerun one rejected report with the failure named. Reject a second, report it open, and fail `/no-comments`.
3. Fix trivial accepted flags directly by deleting a dead path, dropping a parameter, or using the real API. If any fix needs a shape, run `/architect` once for the accepted set and surrounding code. Stop at the sketch. Architect shapes. Step 4 implements.
4. Implement the smallest root-cause fix in scope. Remove every named workaround. If the root cause is out of scope, land the smallest in-scope fix and report the rest open. The **principle-fix-root-causes** and **principle-redesign-from-first-principles** skills guide intent only. Neither authorizes widening the fence nor fixing instances outside it. Never bolt on symptom guards.
5. Constraint comments say `do not remove`, `do not change wording`, or `talk to X before changing`. Leave keeps about things we cannot change. Offer the cheapest in-scope type, runtime, test, or CI lint. Wait for interactive approval. Unattended and eval require caller pre-approval. If approved, encode then delete. Otherwise delete, report the constraint open, and sketch out-of-scope work.
6. Report the deletion count, restored comments, reruns, architect sketch, fixes, encoding offers, encodings, unenforced constraints, and other open work.
