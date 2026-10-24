#!/bin/bash
# check-jstack resolves the engine's declarations from the override, the
# per-user temp folder, then its own cache, and --no-types skips them.
set -uo pipefail
root="$(cd "$(dirname "$0")/../.." && pwd -P)"
check="$root/scripts/check-jstack"
fx=$(mktemp -d)
trap 'rm -rf "$fx"' EXIT
fail=0
bad() { echo "FAIL $*" >&2; fail=1; }

mkdir -p "$fx/bin" "$fx/home" "$fx/tmp" "$fx/mod/.claude-plugin" "$fx/mod/hooks" "$fx/mod/types" "$fx/mod/tests" "$fx/mod/skills" "$fx/mod/agents"
cat > "$fx/bin/claude" <<'STUB'
#!/bin/bash
[ "$1" = --version ] && echo "9.9.9 (Claude Code)"
exit 0
STUB
printf '#!/bin/bash\nexit 0\n' > "$fx/bin/tsc"
chmod +x "$fx/bin/claude" "$fx/bin/tsc"
echo '{"name":"fixture"}' > "$fx/mod/.claude-plugin/plugin.json"
echo 'Copyright (c) 2026 Lauren Tan' > "$fx/mod/LICENSE"

decl() { mkdir -p "$(dirname "$1")" && echo "// Written by Claude Code $2." > "$1"; }
tmp_decl="$fx/tmp/bundled-skills/9.9.9/abc/plugin-authoring/types/claude-code.d.ts"
cache="$fx/home/.cache/jstack"

# run <name> <expected rc> [env assignments and flags...]; stderr lands in $err
run() {
  local name=$1 want=$2; shift 2
  err=$(cd "$fx" && env -i PATH="$fx/bin:/usr/bin:/bin" HOME="$fx/home" JSTACK_TYPES_TMP="$fx/tmp" "$@" "$check" "$fx/mod" 2>&1 > /dev/null)
  local rc=$?
  [ "$rc" = "$want" ] || bad "$name: rc $rc, wanted $want"$'\n'"$err"
}
has() { grep -qF -- "$2" <<< "$err" || bad "$1: stderr lacks '$2'"$'\n'"$err"; }
lacks() { grep -qF -- "$2" <<< "$err" && bad "$1: stderr has '$2'"$'\n'"$err"; }

run "no copy anywhere" 1 env
has "no copy anywhere" "run /plugin-authoring once"

decl "$tmp_decl" 9.9.9
run "tmp copy present" 0 env
has "tmp copy present" "declarations from $fx/tmp/"
[ -f "$cache/claude-code-9.9.9.d.ts" ] || bad "tmp copy present: no cache file written"

rm -rf "$fx/tmp/bundled-skills"
run "tmp gone, cache matches" 0 env
has "tmp gone, cache matches" "declarations from $cache/claude-code-9.9.9.d.ts"
lacks "tmp gone, cache matches" "is from"

rm -f "$cache/claude-code-9.9.9.d.ts"; decl "$cache/claude-code-9.9.8.d.ts" 9.9.8
run "cache older than claude" 0 env
has "cache older than claude" "is from 9.9.8, claude is 9.9.9"

run "override missing" 1 env JSTACK_CLAUDE_TYPES=/nonexistent
has "override missing" "JSTACK_CLAUDE_TYPES=/nonexistent: not found"

rm -rf "$cache"
err=$(cd "$fx" && env -i PATH="$fx/bin:/usr/bin:/bin" HOME="$fx/home" JSTACK_TYPES_TMP="$fx/tmp" "$check" --no-types "$fx/mod" 2>&1 > /dev/null); rc=$?
[ "$rc" = 0 ] || bad "--no-types: rc $rc, wanted 0"$'\n'"$err"

[ "$fail" = 0 ] && echo ok
exit $fail
