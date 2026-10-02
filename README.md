# skills

Personal [Agent Skills](https://agentskills.io/) for coding agents (Claude Code,
Codex, Amp, Cursor and others), installed with the
[Skills CLI](https://github.com/vercel-labs/skills), plus a private Claude Code
plugin marketplace. Companion to
[jrmatherly/dotfiles](https://github.com/jrmatherly/dotfiles), whose setup
installs both and whose `agents/instructions.md` refers to these skills.

## Skills

| Skill | Use it for |
| --- | --- |
| [`coding-standards`](skills/coding-standards/SKILL.md) | Naming and comment conventions in any language, deferring to the codebase's existing style |

## Claude Code plugins

| Plugin | Use it for |
| --- | --- |
| [`jstack`](plugins/jstack) | Jason's agent workflows: the `j-mode` router and its playbooks, design and review panels (`architect`, `arena`, `interrogate`, `swarm`), `how`/`why` investigations, verification, and 23 `principle-*` skills. Run `/jstack:j-mode`. |

jstack's skills set `disable-model-invocation`, so they stay out of Claude's
automatic skill choice: run them as `/jstack:<name>`, and `j-mode` reads the
others by path. `/jstack:setup-jstack` picks the model per role (Claude tiers,
plus a Codex reviewer when `codex` is installed). Its `j-mode` scripts need
[Bun](https://bun.com).

## Install

This repo is private: both installers use the Git access you already have. For
HTTPS that means a credential your git credential helper has stored (e.g.
`gh auth login` then `gh auth setup-git`, or Git Credential Manager); SSH works
too.

**Claude Code** — the marketplace is this repo:

```shell
claude plugin marketplace add jrmatherly/skills
claude plugin install jstack@jrmatherly-skills
```

The plugin has no `version`, so updates follow this repo's commits:
`claude plugin marketplace update jrmatherly-skills`.

**Skills CLI** (Codex, Amp and other agents) — install skills by name, globally:

```shell
npx skills add jrmatherly/skills -g -s coding-standards   # one skill
npx skills add jrmatherly/skills --list                   # what's in the repo
```

Avoid `--all`: the CLI also finds jstack's 46 skills under `plugins/`, which are
written for Claude Code (its tools, `${CLAUDE_PLUGIN_ROOT}` paths) and would land
in every agent. Keep skills current with `npx skills update`, and check what's
installed with `npx skills ls -g`.

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

## jstack: generated from upstream

`plugins/jstack/` is generated, never edited by hand. `scripts/sync-jstack`
fetches upstream at the commit pinned in `jstack/upstream`, keeps its skills,
agents and `LICENSE` (dropping `make-bot-ui`, which drives Cursor's hosted
agents), applies `jstack/substitutions.tsv` (whole-word renames such as
`poteto-mode` → `j-mode` and Cursor → Claude Code tool names), then
`jstack/patches/*.patch` in order (`10-router`, `20-runtime`, `30-models`,
`40-comments`). It regenerates `bun.lock`, and only replaces `plugins/jstack/`
when these pass:

- `scripts/check-jstack`: no upstream names or Cursor-only references left,
  skill names match their folders, links resolve, every skill a skill names
  exists, the upstream license notice is intact, and `claude plugin validate`
  passes
- upstream's Bun tests (`bun test orch watch-pr`) and `jstack/tests/*.sh`

### Update from upstream

1. Set `commit=` in `jstack/upstream` to the new upstream commit.
2. Run `scripts/sync-jstack`. A patch that no longer applies stops it with the
   patch's name, leaving `plugins/jstack/` untouched.
3. Refresh that patch (below), re-run, review `git diff plugins/`, commit.

### Change or refresh a patch

Patches are authored against the tree the earlier steps produce. Patch `NN` is
diffed against upstream + substitutions + every patch numbered below it (move
later patches aside while you work):

```shell
base=$(mktemp -d)/jstack-base
JSTACK_NO_CHECK=1 scripts/sync-jstack --out "$base"   # JSTACK_NO_CHECK: skip check + tests
cp -R "$base" "${base%-base}-edit"
# …edit files under …/jstack-edit…
(cd "$(dirname "$base")" && git diff --no-index jstack-base jstack-edit) \
  | sed -E 's#^(---|\+\+\+) (a|b)/jstack-(base|edit)/#\1 \2/#; s#^diff --git a/jstack-base/(.*) b/jstack-edit/#diff --git a/\1 b/#' \
  > jstack/patches/NN-area.patch
```

Keep one area per patch, so an upstream change breaks one patch, not all.

### Attribution

jstack is a fork of [pstack](https://github.com/cursor/plugins/tree/main/pstack)
by Lauren Tan, MIT-licensed; the upstream notice is kept in
[`plugins/jstack/LICENSE`](plugins/jstack/LICENSE). Pinned upstream:
`cursor/plugins@12d587d` (pstack 0.15.5).
