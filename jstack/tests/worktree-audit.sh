#!/bin/bash
# RED/GREEN test for worktree-audit.sh's Claude Code transcript lookup
set -u
audit="$(cd "$(dirname "$1")" && pwd -P)/$(basename "$1")"; t=$(mktemp -d); t=$(cd "$t" && pwd -P)
git -c init.defaultBranch=main init -q "$t/repo" && cd "$t/repo" && git commit -q --allow-empty -m init
git worktree add -q "$t/wt-a" -b a && git worktree add -q "$t/wt-b" -b b
slug() { printf '%s' "$1" | sed 's/[^A-Za-z0-9]/-/g'; }
mkdir -p "$t/home/.claude/projects/$(slug "$t/repo")" "$t/home/.claude/projects/$(slug "$t/wt-b")"
# wt-a: mentioned from the main repo's session; wt-b: its own session (cwd)
printf '{"type":"user","cwd":"%s"}\n' "$t/wt-a/" > "$t/home/.claude/projects/$(slug "$t/repo")/s1.jsonl"
printf '{"type":"user","cwd":"%s"}\n' "$t/wt-b" > "$t/home/.claude/projects/$(slug "$t/wt-b")/s2.jsonl"
fail=0
check() { # <label> <audit output>: both worktrees must show a chat date
  for w in wt-a wt-b; do
    line=$(printf '%s\n' "$2" | grep "/$w\$")
    chat=$(printf '%s' "$line" | awk -F'\t' '{print $7}')
    if [ -z "$chat" ] || [ "$chat" = "-" ]; then echo "FAIL $1 $w: LAST_CHAT='$chat'"; fail=1; else echo "PASS $1 $w: LAST_CHAT=$chat"; fi
  done
}
# No remote: the script resolves MERGED against origin/HEAD unless told the base
check "-b main" "$(HOME="$t/home" bash "$audit" -b main "$t/repo" 2>/dev/null)"
# With a bare origin whose HEAD is main, the default resolution must work without -b
git init -q --bare "$t/origin.git" && git remote add origin "$t/origin.git" && git push -q origin main && git remote set-head origin main
check "origin/HEAD" "$(HOME="$t/home" bash "$audit" "$t/repo" 2>/dev/null)"
rm -rf "$t"; exit $fail
