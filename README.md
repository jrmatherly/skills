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
| [`supabase-prompts`](skills/supabase-prompts/SKILL.md) | Supabase's published AI prompts (SQL style, migrations, declarative schemas, functions, RLS, Edge Functions, Next.js auth, Realtime), routed by task |

## Claude Code plugins

| Plugin | Use it for |
| --- | --- |
| [`jstack`](plugins/jstack) | Jason's agent workflows: the `j-mode` router and its playbooks, design and review panels (`architect`, `arena`, `interrogate`, `swarm`), `how`/`why` investigations, verification, and 23 `principle-*` skills. Run `/jstack:j-mode`. |
| [`resume`](plugins/resume) | Resumes and the job search: ATS checks, bullets and metrics, tailoring to a posting, cover letters, LinkedIn, interview prep, offers and negotiation |

jstack's skills set `disable-model-invocation`, so they stay out of Claude's
automatic skill choice: run them as `/jstack:<name>`, and `j-mode` reads the
others by path. `/jstack:setup-jstack` picks the model per role (Claude tiers,
plus a Codex reviewer when `codex` is installed). Its `j-mode` scripts need
[Bun](https://bun.com).

`resume` holds 22 skills for resumes and the job search around them. Claude
picks them from the request, or run one as `/resume:<name>`:

| Area | Skills |
| --- | --- |
| Resume | `ats-optimizer`, `formatter`, `bullet-writer`, `quantifier`, `section-builder`, `tailor`, `version-manager` |
| By role | `tech-resume-optimizer`, `executive-resume-writer`, `academic-cv-builder`, `creative-portfolio-resume`, `career-changer-translator` |
| Applications | `job-description-analyzer`, `cover-letter-generator`, `application-form-filler`, `cold-email-writer`, `linkedin-profile-optimizer`, `portfolio-case-study-writer`, `reference-list-builder` |
| Interviews and offers | `interview-prep-generator`, `salary-negotiation-prep`, `offer-comparison-analyzer` |

A typical order for one application: `version-manager` (set up the master
resume once) → `job-description-analyzer` → the by-role skill if one applies →
`tailor` → `ats-optimizer` → `formatter` → `cover-letter-generator` or
`application-form-filler` → `interview-prep-generator` →
`salary-negotiation-prep` and `offer-comparison-analyzer`. `section-builder`
takes a general resume review with no posting in hand.

They are a one-time fork of
[ResumeSkills](https://github.com/Paramchoudhary/ResumeSkills) (MIT, at
`74ae19e`), rewritten in this repo's style and edited here by hand: no upstream
sync. The upstream notice is kept in
[`plugins/resume/LICENSE`](plugins/resume/LICENSE). `scripts/check-resume`
validates the plugin: frontmatter that parses as YAML with exactly `name`,
`description` and `metadata`, links, every bundled file wired, sibling skill
names (bold lowercase tokens are reserved for them) and
`claude plugin validate`. Nothing runs it automatically, so run it after
editing a skill. It needs `ruby` (the macOS system one is enough).

## Install

This repo is private: both installers use the Git access you already have. For
HTTPS that means a credential your git credential helper has stored (e.g.
`gh auth login` then `gh auth setup-git`, or Git Credential Manager); SSH works
too.

**Claude Code** — the marketplace is this repo:

```shell
claude plugin marketplace add jrmatherly/skills
claude plugin install jstack@jrmatherly-skills
claude plugin install resume@jrmatherly-skills
```

jstack ships a mod (a hooks module) that draws a band above the prompt: the
j-mode step row, then the session's cost, tokens, turns, agent time, context
and rate-limit quota, the running subagents by model, and buttons for the
Ponytail level, Simplify, Review, Check (`pnpm check` in the session's
directory) and Remember. It needs Claude Code 2.1.299 or later (`Text
tabular`) and was tested on 2.1.309. `claude plugin validate plugins/jstack`
lists what it can reach as `calls: $.clock.now, $.command.list,
$.command.run, $.env.get, $.fs.read, $.process.run, $.session.cwd,
$.session.id, $.session.usage, $.state.get, $.state.set, $.store.get,
$.store.set, $.tool.register, $.ui.resolve, $.ui.toast`. The only process it
starts is `pnpm check`, on a button press; the only file it reads is
Ponytail's `.ponytail-active` level flag; no network or model calls. Its
private tool `mcp__jstack__step` costs no model call. A button whose slash
command is not installed is not drawn.

The plugins have no `version`, so updates follow this repo's commits:
`claude plugin marketplace update jrmatherly-skills`.

**Skills CLI** (Codex, Amp and other agents) — install skills by name, globally:

```shell
npx skills add jrmatherly/skills -g -s coding-standards   # one skill
npx skills add jrmatherly/skills --list                   # what's in the repo
```

Avoid `--all`: the CLI also finds the plugins' skills under `plugins/`.
jstack's 46 are written for Claude Code (its tools, `${CLAUDE_PLUGIN_ROOT}`
paths), and with resume's 22 they would all land in every agent. The resume
skills are plain Markdown, so another agent can take one by name
(`-s tailor`). Keep skills current with `npx skills update`, and check what's
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

## supabase-prompts: synced from upstream

`skills/supabase-prompts/references/` and its `LICENSE` are Supabase's
[AI prompts](https://supabase.com/docs/guides/ai-tools/ai-prompts)
(`examples/prompts/` in supabase/supabase, Apache-2.0), never edited by hand.
`scripts/sync-supabase-prompts` fetches them at the commit pinned in the
script and swaps their Cursor-rules frontmatter for a one-line source notice.
It only replaces the directory when upstream is still a flat set of `.md`
files with a root `LICENSE`, each file starts with a heading once stripped,
and `SKILL.md` links every prompt and none that upstream removed.
`SKILL.md` itself is hand-written: the routing table, and the notes on where
the prompts contradict each other.

To update: read `git log -p <old>..<new> -- examples/prompts` upstream, set
`commit=` in the script to the new full SHA, run it, review
`git diff skills/supabase-prompts`, and re-check the "Where the prompts
disagree" notes in `SKILL.md` against what changed.

## jstack: generated from upstream

`plugins/jstack/` is generated, never edited by hand. `scripts/sync-jstack`
fetches upstream at the commit pinned in `jstack/upstream`, keeps its skills,
agents and `LICENSE` (dropping `make-bot-ui`, which drives Cursor's hosted
agents), applies `jstack/substitutions.tsv` (whole-word renames such as
`poteto-mode` → `j-mode` and Cursor → Claude Code tool names), then
`jstack/patches/*.patch` in order (`10-router`, `20-runtime`, `30-models`,
`40-comments`, `50-skill-refs`, `60-safety`, `70-reflect`, `80-mod`, `90-band`). It regenerates
`bun.lock`, and only replaces `plugins/jstack/` when these pass:

- `scripts/check-jstack`: no upstream names or Cursor-only references left,
  skill names match their folders, links resolve, every `**name** skill` and
  `**name** principle skill` reference is a real skill folder (plus the
  separately installed `coding-standards`), no skill or agent grants itself
  `allowed-tools`, `hooks`, `mcpServers` or `permissionMode`, no symlinks, the
  upstream license notice is intact, and `claude plugin validate` passes
- upstream's Bun tests (`bun test orch watch-pr`) and
  `jstack/tests/worktree-audit.sh`
- `tsc --noEmit` over `hooks/`, `types/` and `tests/` against
  `jstack/types/claude-code.d.ts`, then `claude plugin test` on a copy that
  holds only the mod (neither `claude plugin validate` nor `claude plugin
  test` type-checks, and the upstream `bun:test` files cannot load in the
  test sandbox)

Sync runs upstream code (Bun's install and tests), so it's fenced in: the pin
must be a full 40-character SHA (a short one can be shadowed by an upstream tag
of the same name) and is checked after checkout, an upstream that ships
`bunfig.toml`, `.npmrc` or symlinks is refused before Bun runs, and installs
use `--production --ignore-scripts` (only `commander`, no install scripts). The
plugin's own runtime install in `j-mode/scripts/bootstrap.ts` uses the same
flags (`60-safety`).

### Update from upstream

1. Set `commit=` in `jstack/upstream` to the new upstream commit's full SHA,
   after reading what changed upstream (`git log -p <old>..<new> -- pstack`).
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
  | sed -E 's#^(---|\+\+\+) (a|b)/jstack-(base|edit)/#\1 \2/#; s#^diff --git a/jstack-(base|edit)/(.*) b/jstack-(base|edit)/#diff --git a/\2 b/#' \
  > jstack/patches/NN-area.patch
```

A new file diffs as `a/jstack-edit/… b/jstack-edit/…`. The second `sed`
rule rewrites that header so `git apply` creates the file. Without it
`git apply` stops with `inconsistent new filename`.

Keep one area per patch, so an upstream change breaks one patch, not all.
The exception is `NN-reflect`: learnings from a `/jstack:reflect` pass land
there as one patch per pass, never as edits under `plugins/jstack/` (the next
sync would discard them).
`scripts/sync-jstack --no-patches --out DIR` gives the tree before any patch.
A new substitution row can shift text a patch is anchored to: rebuild each
patch against the new table rather than editing hunks by hand.

### Refresh the mod types

`jstack/types/claude-code.d.ts` is the mods API as the installed Claude Code
declares it. After `claude update`, run `/plugin-authoring` once in a session,
copy the `claude-code.d.ts` it names over this file and commit. `check-jstack`
prints a one-line warning while the two versions differ.

### Attribution

jstack is a fork of [pstack](https://github.com/cursor/plugins/tree/main/pstack)
by Lauren Tan, MIT-licensed; the upstream notice is kept in
[`plugins/jstack/LICENSE`](plugins/jstack/LICENSE). Pinned upstream:
`cursor/plugins@12d587dfb20741cafc376c42c696c5f6e2a64487` (pstack 0.15.5).
