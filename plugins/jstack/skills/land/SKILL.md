---
name: land
description: Review a pull request, fix the confirmed findings, wait for green CI, hand the owner the merge command, then clean up and return to the default branch. Use for /jstack:land <PR number>.
disable-model-invocation: true
---

# Land

Take one pull request from review to merged. The owner merges. You do everything around it.

**Arguments:** a PR number, then any of these in any order:

- `handoff`: write the session handoff as the last step.
- `no-merge`: stop after the fixes are pushed and CI is green.
- `then <instruction>`: carry on with the instruction once the chain is done.

With no PR number, use the open PR of the current branch. If there is none, say so and stop.

## Steps

Copy these into the todolist first.

1. **Review.** Run the `pr-review-toolkit:review-pr` skill on the PR when it is installed. Otherwise review the PR's diff yourself with the built-in `/code-review`. Say which one ran.
2. **Judge each finding.** Check every finding against the code before you act on it. Fix the ones you confirm. For each one you reject, say why in one line. A finding you can't settle is reported, never fixed on a guess.
3. **Fix and push.** Commit the fixes to the PR's branch under the repository's own commit rules and push. With no confirmed finding, push nothing.
4. **Wait for CI.** Watch the checks on the PR's head (`gh pr checks <N> --watch`) until they finish. A red check is yours to diagnose and fix. Return to step 3. Stop and report after three failed rounds on the same check.
5. **Hand over the merge.** Never run the merge yourself. Read the head (`gh pr view <N> --json headRefOid,headRefName,baseRefName`) and give the owner one command in its own code block: the merge the repository's rules name, or `gh pr merge <N> --merge --match-head-commit <full sha>` when they name none. `--match-head-commit` makes the merge fail if the head moved after the checks ran. Then wait for the owner to say it ran.
6. **Confirm the merge.** Read the PR back (`gh pr view <N> --json state,mergedAt`). Continue only when it reads merged.
7. **Clean up.** Switch to the default branch and pull. Delete the local branch. If the PR's branch lived in a worktree of its own, remove that worktree. Delete the remote branch only when the repository's rules say so and the merge left it behind. Follow any after-merge steps the repository's instruction files name.
8. **Tails.** With `handoff`, write the handoff with the `remember:remember` skill when it is installed, or the project's own handoff note. With `then`, start on that instruction as a new task.

**Reply:** the findings fixed and rejected, the head SHA that went green, the merge command and that the PR reads merged, what was cleaned up, and what you did not check.
