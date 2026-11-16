#!/bin/bash
# jstack/wordmerge.py: two edits to one long line merge, a same-word clash
# is left alone unless a side is favoured, and other lines survive untouched.
set -euo pipefail

tool="$(cd "$(dirname "$0")/.." && pwd -P)/wordmerge.py"
dir="$(mktemp -d)"
trap 'rm -rf "$dir"' EXIT
fail() { echo "wordmerge.sh: $*" >&2; exit 1; }

block() {
  printf 'before\n<<<<<<< ours\n%s\n||||||| base\n%s\n=======\n%s\n>>>>>>> theirs\nafter\n' "$1" "$2" "$3"
}

block "Trace the code with Cursor's loop." "Run how with Cursor's loop." "Run how with Claude Code's loop." > "$dir/clean"
python3 "$tool" "$dir/clean" > /dev/null || fail "two separate word edits did not merge"
[ "$(cat "$dir/clean")" = "$(printf "before\nTrace the code with Claude Code's loop.\nafter")" ] \
  || fail "merged text is wrong: $(cat "$dir/clean")"

block "default opus." "default grok." "default sonnet." > "$dir/clash"
cp "$dir/clash" "$dir/favoured"
python3 "$tool" "$dir/clash" > /dev/null && fail "a same-word clash exited 0"
cmp -s "$dir/clash" "$dir/favoured" || fail "an unresolved block was rewritten"

WORDMERGE_FAVOR=theirs python3 "$tool" "$dir/favoured" > /dev/null || fail "WORDMERGE_FAVOR=theirs did not settle the clash"
[ "$(cat "$dir/favoured")" = "$(printf 'before\ndefault sonnet.\nafter')" ] || fail "favoured text is wrong: $(cat "$dir/favoured")"

echo "wordmerge.sh: ok"
