---
paths:
  - "plugins/jstack/**"
  - "jstack/**"
  - "scripts/*jstack*"
---

# jstack is a generated fork

`plugins/jstack/` is output. `scripts/sync-jstack` rebuilds it from upstream pstack at the commit in `jstack/upstream`, then applies `jstack/substitutions.tsv` and `jstack/patches/*.patch` in order. A hand edit there is lost at the next sync, and a hook refuses Edit and Write on it.

Change an input instead, then run `scripts/sync-jstack` and review `git diff plugins/`:

- A whole-word rename goes in `jstack/substitutions.tsv`.
- What is copied, renamed or dropped goes in `scripts/sync-jstack`, with the reason as a comment and in the README's dropped list.
- Everything else goes in the patch that owns its area:

| Patch | Area |
| --- | --- |
| `10-router` | j-mode as the router, `j-agent`, the skills j-mode names |
| `20-runtime` | Cursor runtime to Claude Code: tools, paths, transcripts, worktrees |
| `30-models` | `<model> <effort>` role values, the `setup-jstack` rewrite, Codex seats |
| `40-comments` | The comment policy: keep a non-obvious why |
| `50-skill-refs` | Skills are read by path, since they set `disable-model-invocation` |
| `60-safety` | Install flags, approval before filing, Codex prompts over stdin, and `setup-jstack` without the verification-skill offers |
| `70-reflect` | Learnings from `/jstack:reflect` passes (README, "Change or refresh a patch") |
| `80-mod`, `90-band` | The hooks module and the band above the prompt |
| `95-invocation` | `j-mode` stays on the Skill tool |
| `97-context` | The Load context playbook, run when j-mode is loaded without a task |

A new area gets a new numbered file. Keep one area per patch, so an upstream change breaks one patch.

Patch `NN` is a diff against upstream, plus substitutions, plus every lower-numbered patch. To edit one, follow the README's "Change or refresh a patch". Never edit hunks by hand, and rebuild the patches after adding a substitution row, since it can shift the text they anchor to.

When upstream has moved, use the `upstream-sync` skill.
