# skills

Personal [Agent Skills](https://agentskills.io/) for coding agents (Claude Code, Codex, Amp, Cursor and others), installed with the [Skills CLI](https://github.com/vercel-labs/skills), plus a Claude Code plugin marketplace.

Companion to [jrmatherly/dotfiles](https://github.com/jrmatherly/dotfiles), whose setup installs both and whose `agents/instructions.md` refers to these skills.

## Skills

| Skill | Use it for |
| --- | --- |
| [`coding-standards`](skills/coding-standards/SKILL.md) | Naming and comment conventions in any language, deferring to the codebase's existing style |
| [`supabase-prompts`](skills/supabase-prompts/SKILL.md) | Supabase's published AI prompts (SQL style, migrations, declarative schemas, functions, RLS, Edge Functions, Next.js auth, Realtime), routed by task |

## Claude Code plugins

| Plugin | Use it for |
| --- | --- |
| [`jstack`](plugins/jstack) | Jason's agent workflows: the `j-mode` router and its playbooks, design and review panels (`architect`, `arena`, `interrogate`, `swarm`), `how`/`why` investigations, verification, and 24 `principle-*` skills. Run `/jstack:j-mode`. |
| [`resume`](plugins/resume) | Resumes and the job search: ATS checks, bullets and metrics, tailoring to a posting, cover letters, LinkedIn, interview prep, offers and negotiation |

### jstack

jstack's skills set `disable-model-invocation`, so they stay out of Claude's automatic skill choice: run them as `/jstack:<name>`, and `j-mode` reads the others by path. `/jstack:setup-jstack` picks the model per role (Claude tiers, plus a Codex reviewer when `codex` is installed). Its `j-mode` scripts need [Bun](https://bun.com).

jstack also ships a mod (a hooks module) that draws a band above the prompt. The band shows:

- the j-mode step row
- one line with the context fill (green, yellow from 60%, red from 85%), a Level menu for Ponytail, an Actions menu and a More toggle. Actions holds Simplify, Review, Remember, Board (opens Ponytail's task board page when Ponytail is installed), Check (runs `pnpm check` in the session's folder when its `package.json` has a `check` script) and Memory (when `~/.hindsight/coding-agent.json` exists: starts Hindsight's daemon and Control Plane with the embed and profile that config names, `uvx hindsight-embed@<embedVersion> -p <daemonProfile> ui start --hostname 127.0.0.1`, then opens the port recorded in `~/.hindsight/profiles/<daemonProfile>.ui.port`). A menu entry whose slash command is not installed is left out.
- with More on, stat tiles for the cost, tokens (in, out and cached apart), turns, agent time, the 5h and 7d quota with reset times and, with Hindsight installed, the memory state (on, off when the config's `disabled` kill switch is set, n/a when the file won't parse; Memory refuses to start the daemon while it is off)
- a separate row counting running and finished subagents, which expands to one line per agent (type and model)

The More and agents choices persist through `$.store`. The mobile app has no Select, so it gets no menus. The mod needs Claude Code 2.1.299 or later (`Text tabular`) and was tested on 2.1.310.

What the mod touches: the only processes it starts are `pnpm check` and macOS `open` on Ponytail's board page, each on a pick. The only files it reads are Ponytail's `.ponytail-active` level flag and the session folder's `package.json`. It makes no network or model calls, and its private tool `mcp__jstack__step` costs no model call. `claude plugin validate plugins/jstack` lists what it can reach:

```text
calls: $.command.list, $.command.run, $.env.get, $.fs.exists, $.fs.read,
$.process.run, $.session.cwd, $.session.id, $.session.usage, $.state.get,
$.state.set, $.store.get, $.store.set, $.tool.register, $.ui.resolve, $.ui.toast
```

### resume

`resume` holds 22 skills for resumes and the job search around them. Claude picks them from the request, or run one as `/resume:<name>`:

| Area | Skills |
| --- | --- |
| Resume | `ats-optimizer`, `formatter`, `bullet-writer`, `quantifier`, `section-builder`, `tailor`, `version-manager` |
| By role | `tech-resume-optimizer`, `executive-resume-writer`, `academic-cv-builder`, `creative-portfolio-resume`, `career-changer-translator` |
| Applications | `job-description-analyzer`, `cover-letter-generator`, `application-form-filler`, `cold-email-writer`, `linkedin-profile-optimizer`, `portfolio-case-study-writer`, `reference-list-builder` |
| Interviews and offers | `interview-prep-generator`, `salary-negotiation-prep`, `offer-comparison-analyzer` |

A typical order for one application:

1. `version-manager`, once, to set up the master resume
2. `job-description-analyzer`
3. the by-role skill, if one applies
4. `tailor`, then `ats-optimizer`, then `formatter`
5. `cover-letter-generator` or `application-form-filler`
6. `interview-prep-generator`
7. `salary-negotiation-prep` and `offer-comparison-analyzer`

`section-builder` takes a general resume review with no posting in hand.

They are a one-time fork of [ResumeSkills](https://github.com/Paramchoudhary/ResumeSkills) (MIT, at `74ae19e`), rewritten in this repo's style and edited here by hand: no upstream sync. The upstream notice is kept in [`plugins/resume/LICENSE`](plugins/resume/LICENSE).

`scripts/check-resume` validates the plugin: frontmatter that parses as YAML with exactly `name`, `description` and `metadata`, links, every bundled file wired, sibling skill names (bold lowercase tokens are reserved for them) and `claude plugin validate`. Nothing runs it automatically, so run it after editing a skill. It needs `ruby` (the macOS system one is enough).

## Install

This repo is public: both installers clone it anonymously over HTTPS, no GitHub account or credential needed.

**Claude Code.** The marketplace is this repo:

```shell
claude plugin marketplace add jrmatherly/skills
claude plugin install jstack@jrmatherly-skills
claude plugin install resume@jrmatherly-skills
```

The plugins have no `version`, so updates follow this repo's commits: `claude plugin marketplace update jrmatherly-skills`.

**Skills CLI** (Codex, Amp and other agents). Install skills by name, globally:

```shell
npx skills add jrmatherly/skills -g -s coding-standards   # one skill
npx skills add jrmatherly/skills --list                   # what's in the repo
```

Avoid `--all`: the CLI also finds the plugins' skills under `plugins/`. jstack's 54 are written for Claude Code (its tools, `${CLAUDE_PLUGIN_ROOT}` paths), and with resume's 22 they would all land in every agent. The resume skills are plain Markdown, so another agent can take one by name (`-s tailor`). Keep skills current with `npx skills update`, and check what's installed with `npx skills ls -g`.

## Checks

`.github/workflows/check.yml` runs on every pull request and push to `main`: shellcheck over the scripts, hooks and tests, `scripts/check-resume`, `scripts/check-jstack --no-types` (validate and `claude plugin test`, no login needed) and the j-mode scripts' Bun tests, plus a gitleaks job over the whole history. The job installs the current Claude Code release on purpose: a validate or test failure after a Claude Code update is news about the mod, not noise. The type-check and the full `scripts/sync-jstack` stay local, since they need the declarations `/plugin-authoring` writes.

Contributing from a clone: run `git config core.hooksPath .githooks` once, so the gitleaks pre-push hook scans what you push (it skips with a note when gitleaks is not installed).

## Add a skill

1. Create `skills/<name>/SKILL.md` (or run `npx skills init skills/<name>`).
2. Give it YAML frontmatter:
   - `name`: lowercase letters, numbers and single hyphens, max 64 characters, matching the folder name
   - `description`: what the skill does **and when to use it**, with the keywords an agent would match on (max 1024 characters)
3. Keep `SKILL.md` under ~500 lines; move detail into `references/`, and put runnable helpers in `scripts/`, referenced with relative paths.
4. Add it to the Skills table, commit, push, and run `npx skills update`.

See the [Agent Skills specification](https://agentskills.io/specification) for the full format.

## supabase-prompts: synced from upstream

`skills/supabase-prompts/references/` and its `LICENSE` are Supabase's [AI prompts](https://supabase.com/docs/guides/ai-tools/ai-prompts) (`examples/prompts/` in supabase/supabase, Apache-2.0), never edited by hand. `scripts/sync-supabase-prompts` fetches them at the commit pinned in the script and swaps their Cursor-rules frontmatter for a one-line source notice. It only replaces the directory when upstream is still a flat set of `.md` files with a root `LICENSE`, each file starts with a heading once stripped, and `SKILL.md` links every prompt and none that upstream removed. `SKILL.md` itself is hand-written: the routing table, and the notes on where the prompts contradict each other.

To update: read `git log -p <old>..<new> -- examples/prompts` upstream, set `commit=` in the script to the new full SHA, run it, review `git diff skills/supabase-prompts`, and re-check the "Where the prompts disagree" notes in `SKILL.md` against what changed.

## jstack: generated from upstream

`plugins/jstack/` is generated, never edited by hand. `scripts/sync-jstack` fetches upstream at the commit pinned in `jstack/upstream`, keeps its skills, agents and `LICENSE`, applies `jstack/substitutions.tsv` (whole-word renames such as `poteto-mode` to `j-mode` and Cursor to Claude Code tool names), then `jstack/patches/*.patch` in order (`10-router`, `20-runtime`, `30-models`, `40-comments`, `50-skill-refs`, `60-safety`, `70-reflect`, `80-mod`, `90-band`). It regenerates `bun.lock`, and only replaces `plugins/jstack/` when the checks below pass.

Four upstream skills are dropped: `make-bot-ui`, which drives Cursor's hosted agents; `poteto-help`, which describes Cursor Custom Modes and links docs the sync never copies; `ketchup-video`, which needs a video renderer; and `statechart`, which installs npm packages with unpinned transitive dependencies plus TLC and Java, about 305 MB, on first use.

The checks:

- `scripts/check-jstack`: no upstream names or Cursor-only references left, skill names match their folders, links resolve, every `**name** skill` and `**name** principle skill` reference is a real skill folder (plus the separately installed `coding-standards`), no skill or agent grants itself `allowed-tools`, `hooks`, `mcpServers` or `permissionMode`, no symlinks, the upstream license notice is intact, and `claude plugin validate` passes
- upstream's Bun tests (`bun test orch watch-pr`) and `jstack/tests/worktree-audit.sh`
- `tsc --noEmit` over `hooks/`, `types/` and `tests/` against the engine's own declarations (see Refresh the mod types), then `claude plugin test` on a copy that holds only the mod (neither `claude plugin validate` nor `claude plugin test` type-checks, and the upstream `bun:test` files cannot load in the test sandbox)

Sync runs upstream code (Bun's install and tests), so it's fenced in: the pin must be a full 40-character SHA (a short one can be shadowed by an upstream tag of the same name) and is checked after checkout, an upstream that ships `bunfig.toml`, `.npmrc` or symlinks is refused before Bun runs, and installs use `--production --ignore-scripts` (only `commander`, no install scripts). The plugin's own runtime install in `j-mode/scripts/bootstrap.ts` uses the same flags (`60-safety`).

### Update from upstream

1. Set `commit=` in `jstack/upstream` to the new upstream commit's full SHA, after reading what changed upstream (`git log -p <old>..<new> -- pstack`).
2. Run `scripts/sync-jstack`. A patch that no longer applies stops it with the patch's name, leaving `plugins/jstack/` untouched.
3. Refresh that patch (below), re-run, review `git diff plugins/`, commit.

### Change or refresh a patch

Patches are authored against the tree the earlier steps produce. Patch `NN` is diffed against upstream + substitutions + every patch numbered below it (move later patches aside while you work):

```shell
base=$(mktemp -d)/jstack-base
JSTACK_NO_CHECK=1 scripts/sync-jstack --out "$base"   # skip check and tests
cp -R "$base" "${base%-base}-edit"
# …edit files under …/jstack-edit…
(cd "$(dirname "$base")" && git diff --no-index jstack-base jstack-edit) \
  | sed -E 's#^(---|\+\+\+) (a|b)/jstack-(base|edit)/#\1 \2/#; s#^diff --git a/jstack-(base|edit)/(.*) b/jstack-(base|edit)/#diff --git a/\2 b/#' \
  > jstack/patches/NN-area.patch
```

A new file diffs as `a/jstack-edit/… b/jstack-edit/…`. The second `sed` rule rewrites that header so `git apply` creates the file. Without it `git apply` stops with `inconsistent new filename`.

Keep one area per patch, so an upstream change breaks one patch, not all. The exception is `NN-reflect`: learnings from a `/jstack:reflect` pass land there as one patch per pass, never as edits under `plugins/jstack/` (the next sync would discard them). `scripts/sync-jstack --no-patches --out DIR` gives the tree before any patch. A new substitution row can shift text a patch is anchored to: rebuild each patch against the new table rather than editing hunks by hand.

### Refresh the mod types

`check-jstack` type-checks the mod against the declarations Claude Code itself writes. `/plugin-authoring`, run once in a session, leaves `claude-code.d.ts` for the installed version under `/tmp/claude-<uid>/bundled-skills/<version>/…/plugin-authoring/types/`. The script resolves the file in this order and says which it used (`check-jstack: declarations from <path>`):

1. `JSTACK_CLAUDE_TYPES=<file>`, when set.
2. The temp copy matching `claude --version`, copied to `~/.cache/jstack/claude-code-<version>.d.ts` as it is found: macOS's `tmp_cleaner` empties `/tmp` after 3 idle days.
3. That cache entry for the running version.
4. The newest cache entry of any version, with a one-line drift warning.

After `claude update`, run `/plugin-authoring` again; until then the check runs against the last cached version and warns. A machine that never ran it fails with that instruction. `check-jstack --no-types <dir>` skips the type-check and the lookup but still validates and tests the mod (CI uses it). The file is Anthropic's, not MIT: the engine's own publishing steps gitignore the copy it writes beside a mod, and `jstack/types/claude-code.d.ts` (a local copy, if you keep one) is ignored here for the same reason. `jstack/tests/check-jstack-types.sh` covers the resolution order.

## Attribution and license

Everything here that is not listed below (the `coding-standards` skill, the scripts, the jstack patches, this README) is MIT-licensed, see [`LICENSE`](LICENSE). The resume plugin and supabase-prompts carry their own notices, named in their sections above.

jstack is a fork of [pstack](https://github.com/cursor/plugins/tree/main/pstack) by Lauren Tan, MIT-licensed; the upstream notice is kept in [`plugins/jstack/LICENSE`](plugins/jstack/LICENSE). Pinned upstream: `cursor/plugins@e73df471cd4bd918367e99f3dd9c51bd53ddf5f0` (pstack 0.15.32).
