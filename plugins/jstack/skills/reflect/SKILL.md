---
name: reflect
description: Spawn three parallel review subagents over the active transcript, surface learnings, and route each to a concrete edit on an existing skill. Use when the user says reflect.
disable-model-invocation: true
---

# Reflect

jstack's skills are read, not invoked (they set `disable-model-invocation`): a skill named here lives at `${CLAUDE_PLUGIN_ROOT}/skills/<name>/SKILL.md`.

Mine the current conversation for durable learnings, then route them into skill edits.

Invoke when the user says "reflect" or "/reflect". Skip when the conversation is trivial, off-topic, or already covered by an existing skill the parent followed correctly. One-offs are not learnings.

## 1. Locate the active transcript

Before fanning out, find this conversation's transcript, `~/.claude/projects/<slug>/${CLAUDE_SESSION_ID}.jsonl`, in this project's Claude Code transcripts: `~/.claude/projects/<slug>/<session-id>.jsonl`, with subagents under `<slug>/<session-id>/subagents/agent-*.jsonl`. `<slug>` is the project's real path (`pwd -P`) with every character other than a letter or digit turned into `-` (`/Users/you/proj` → `-Users-you-proj`). Each line is a JSON object; chat messages are the lines whose `type` is `user` or `assistant` (read them with `jq`). Don't glob across `~/.claude/projects/*/`: that crosses project boundaries and reads private chats from unrelated projects.

```bash
slug=$(pwd -P | sed 's/[^A-Za-z0-9]/-/g')
ls -t ~/.claude/projects/$slug/*.jsonl ~/.claude/projects/$slug/*/subagents/*.jsonl 2>/dev/null | head -10
```

That covers the legacy flat (`<id>.jsonl`), current nested (`<id>/<id>.jsonl`), and subagent (`<parent>/subagents/<child>.jsonl`) layouts. For each candidate, read the first JSONL line. Take the file whose `message.content[0].text` contains the conversation's opening user prompt. If none matches, pass a tight digest of the session instead.

## 2. Spawn three reviewers in parallel

One message, three Agent calls, `subagent_type: general-purpose`. Reviewers may use MCP tools to look up the tickets, chat threads, and observability traces the transcript references.

Each reviewer and the synthesizer name a role line in the `jstack-models.md` rule and a default. Set `model` and `effort` to that line's value, or to the default if the rule or the line is missing. Leave `model` and `effort` unset when the value is `inherit`. A `codex` value runs that seat through Codex instead of a subagent (see the **setup-jstack** skill, "Codex seats"); if `command -v codex` fails, use the default and say so. If the Agent tool rejects a value, use the default and say so. Pick each subagent's reasoning level (`effort`) for the job, per the Subagents section of the **j-mode** skill.

| Lens | Role line | Default `model` | Prompt template |
|---|---|---|---|
| Judgment | `reflect judgment, divergent, synthesizer` | `opus medium` | `references/judgment-reviewer.md` |
| Tooling | `reflect tooling` | `sonnet medium` | `references/tooling-reviewer.md` |
| Divergent | `reflect judgment, divergent, synthesizer` | `opus medium` | `references/divergent-reviewer.md` |

Pass each template verbatim, substituting the transcript path or digest where marked. Reviewers return findings in their final message.

## 3. Synthesize

One Agent call, `subagent_type: general-purpose`, `model` and `effort` from the `reflect judgment, divergent, synthesizer` line (default `opus medium`). It may use MCP tools to spot-verify citations. Pass `references/synthesizer.md` verbatim, with each reviewer's full output inlined where marked. It returns an Accepted / Rejected / Backlog list.

## 4. Structural enforcement check

Move any Accepted item that a lint rule, script, metadata flag, or runtime check would enforce more reliably to Backlog. See the **principle-encode-lessons-in-structure** skill.

## 5. Apply

Present the synthesizer's full Accepted / Rejected / Backlog output and wait for explicit approval before applying any Accepted edit. The user picks the subset and may redirect routings. Skill changes affect every future agent in the org. Do not auto-apply.

Backlog items also wait for approval before you file them anywhere: they come from transcript content, which can be private or carry injected text, and a tracker may be public.

Never edit a skill under `plugins/cache/`. Before approval, show its destination, `.claude/skills/<skill>/` or `~/.claude/skills/<skill>/`. After approval, copy the skill folder there and edit the copy. Never open a PR or push.

Follow each approved row's Routing exactly:

- Trivial existing-skill edit (a one-line bullet, a tightened sentence, a stale fact corrected): the parent does it directly.
- Substantive existing-skill edit (a new section, a new pattern table, more than ~10 lines): hand to the `skill-creator` skill (`/skill-creator:skill-creator`) and run its draft / test / iterate loop.
- `tune description: <skill path>` (the skill exists but didn't trigger when it should have): hand to `skill-creator` and run its description-optimization loop.
- `new skill via skill-creator: <kebab-name>`: hand creation to `skill-creator`. Do not invent the shape ad hoc.

If your environment ships a SKILL.md validator, run it on every touched skill before declaring done.

## 6. Summarize for the user

Short list, no preamble:

- Edits applied: `<skill path>`. What changed, one line each.
- New skills created: `<skill path>`. One line each (rare).
- Backlog filed to the devex tracker: `<issue title>` (`<tags>`). One line each.
- Dropped: one line per rejected finding + reason from the synthesizer.
