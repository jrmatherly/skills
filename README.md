# skills

Personal [Agent Skills](https://agentskills.io/) for coding agents (Claude Code,
Codex, Amp, Cursor and others), installed with the
[Skills CLI](https://github.com/vercel-labs/skills). Companion to
[jrmatherly/dotfiles](https://github.com/jrmatherly/dotfiles), whose
`agents/instructions.md` refers to these skills.

## Skills

| Skill | Use it for |
| --- | --- |
| [`coding-standards`](skills/coding-standards/SKILL.md) | Naming and comment conventions in any language, deferring to the codebase's existing style |

## Install

This repo is private; the CLI uses the Git, GitHub CLI or SSH access you already
have. Install globally (for every project) so each agent picks the skills up:

```shell
npx skills add jrmatherly/skills -g            # choose skills and agents interactively
npx skills add jrmatherly/skills -g --all      # every skill, every detected agent
npx skills add jrmatherly/skills --list        # just list what's in the repo
```

Keep them current with `npx skills update`, and check what's installed with
`npx skills ls -g`.

## Add a skill

1. Create `skills/<name>/SKILL.md` (or run `npx skills init skills/<name>`).
2. Give it YAML frontmatter:
   - `name` — lowercase letters, numbers and single hyphens, max 64 characters,
     matching the folder name
   - `description` — what the skill does **and when to use it**, with the
     keywords an agent would match on (max 1024 characters)
3. Keep `SKILL.md` under ~500 lines; move detail into `references/`, and put
   runnable helpers in `scripts/`, referenced with relative paths.
4. Add it to the table above, commit, push, and run `npx skills update`.

See the [Agent Skills specification](https://agentskills.io/specification) for
the full format.
