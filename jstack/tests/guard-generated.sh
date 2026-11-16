#!/bin/bash
# .claude/hooks/guard-generated.sh: an Edit or Write under a generated tree is
# denied with a reason, however the path is spelled, and every other path
# passes with no output.
set -euo pipefail

root="$(cd "$(dirname "$0")/../.." && pwd -P)"
hook="$root/.claude/hooks/guard-generated.sh"
fail() { echo "guard-generated.sh: $*" >&2; exit 1; }
command -v jq > /dev/null || { echo "guard-generated.sh: skipped, jq not found"; exit 0; }

run() { jq -n --arg f "$1" '{tool_name: "Edit", tool_input: {file_path: $f}}' | bash "$hook"; }

for f in "$root/plugins/jstack/skills/j-mode/SKILL.md" "$root/skills/supabase-prompts/references/x.md" \
  "$root/skills/supabase-prompts/LICENSE" "$root/./plugins/jstack/LICENSE" "$root/jstack/../plugins/jstack/LICENSE" \
  "$root/.claude/worktrees/w/plugins/jstack/LICENSE" "$root/PLUGINS/jstack/LICENSE"; do
  [ "$(run "$f" | jq -r '.hookSpecificOutput.permissionDecision')" = deny ] || fail "$f was not denied"
done
for f in jstack/patches/10-router.patch skills/supabase-prompts/SKILL.md plugins/jstack-notes/x.md plugins/resume/x.md; do
  [ -z "$(run "$root/$f")" ] || fail "$f was denied"
done
[ -z "$(echo '{"tool_name":"Edit","tool_input":{}}' | bash "$hook")" ] || fail "input with no file_path was denied"
if echo 'not json' | bash "$hook" > /dev/null 2>&1; then fail "unreadable input was allowed"; fi

echo "guard-generated.sh: ok"
