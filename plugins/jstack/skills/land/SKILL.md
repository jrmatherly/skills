---
name: land
description: Review a pull request, fix the confirmed findings, wait for green CI, hand the owner the merge command, then clean up and return to the default branch. Use for /jstack:land <PR number>.
disable-model-invocation: true
---

# Land

Take one pull request from review to merged. The owner merges. You do everything around it.

**Arguments:** a PR number, then any of these:

- `handoff`: write the session handoff as the last step. It is still written with `no-merge`.
- `no-merge`: stop after the fixes are pushed and CI is green. Skip steps 6 to 8.
- `then <instruction>`: carry on with the instruction once the chain is done. It comes last, and everything after `then` is the instruction.

With no PR number, use the open PR of the current branch. If there is none, say so and stop.

## Steps

Copy these into the todolist first.

1. **Preflight.** Read the PR: `gh pr view <N> --json state,isDraft,isCrossRepository,maintainerCanModify,headRefName`. Stop and report unless it is `OPEN`. A draft goes on only when the owner said to land it. A PR from a fork you cannot push to (`isCrossRepository` true, `maintainerCanModify` false) is reviewed and reported, not fixed. Stop when the working tree has uncommitted changes that are not yours to carry. Then get on the PR's branch (`gh pr checkout <N>`, or the worktree that already holds it).
2. **Review.** Run the `pr-review-toolkit:review-pr` skill on the PR when it is installed. Otherwise review the PR's diff yourself with the built-in `/code-review`. Say which one ran.
3. **Judge each finding.** Check every finding against the code before you act on it. Fix the ones you confirm. For each one you reject, say why in one line. A finding you can't settle is reported, never fixed on a guess.
4. **Fix and push.** Commit the fixes to the PR's branch under the repository's own commit rules and push. With no confirmed finding, push nothing. Note the head SHA the PR now has.
5. **Wait for CI.** Watch the checks on that head (`gh pr checks <N> --watch`, in the background when they run long) until they finish. `no checks reported` right after a push means they have not registered: wait and try once more, and if it still says so the repository has no CI on this PR, which you report. A red check is yours to diagnose and fix. Return to step 4. Stop and report after three failed rounds on the same check.
6. **Hand over the merge.** Never run the merge yourself. Read the PR again: `gh pr view <N> --json headRefOid,isDraft,mergeable,mergeStateStatus,reviewDecision`. If the head is not the SHA the checks ran on, return to step 5. Report a conflict, a draft, or a review the branch rules still require, since the owner's merge would fail on each. Then give the owner one command in its own code block: the merge the repository's rules name, or `gh pr merge <N> --<method> --match-head-commit <full sha>` with the repository's default method (`gh repo view --json viewerDefaultMergeMethod`, as `--merge`, `--squash` or `--rebase`). `--match-head-commit` makes the merge fail if the head moved after the checks ran. Wait for the owner to say it ran.
7. **Confirm the merge.** Read the PR back (`gh pr view <N> --json state,mergedAt`). Continue only when it reads merged. Otherwise say what it reads and wait.
8. **Clean up.** Switch to the default branch and pull. Delete the local branch when it exists. After a squash or rebase merge `git branch -d` refuses it as unmerged, and `-D` is right once step 7 read merged. If the branch lived in a worktree of its own, remove that worktree. Delete the remote branch only when the repository's rules say so and the merge left it behind. Follow any after-merge steps the repository's instruction files name.
9. **Tails.** With `handoff`, write the handoff with the `remember:remember` skill when it is installed, or the project's own handoff note. With `then`, start on that instruction as a new task.

**Reply:** the findings fixed and rejected, the head SHA that went green, the merge command and that the PR reads merged, what was cleaned up, and what you did not check.
