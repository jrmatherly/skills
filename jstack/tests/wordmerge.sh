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
cp "$dir/clean" "$dir/clean.orig"
python3 "$tool" "$dir/clean" > /dev/null || fail "two separate word edits did not merge"
[ "$(cat "$dir/clean")" = "$(printf "before\nTrace the code with Claude Code's loop.\nafter")" ] \
  || fail "merged text is wrong: $(cat "$dir/clean")"

block "default opus." "default grok." "default sonnet." > "$dir/clash"
cp "$dir/clash" "$dir/favoured"
python3 "$tool" "$dir/clash" > /dev/null && fail "a same-word clash exited 0"
cmp -s "$dir/clash" "$dir/favoured" || fail "an unresolved block was rewritten"

WORDMERGE_FAVOR=theirs python3 "$tool" "$dir/favoured" > /dev/null || fail "WORDMERGE_FAVOR=theirs did not settle the clash"
[ "$(cat "$dir/favoured")" = "$(printf 'before\ndefault sonnet.\nafter')" ] || fail "favoured text is wrong: $(cat "$dir/favoured")"

# Several lines, a blank line, a tab and trailing spaces come back byte for byte
block "$(printf 'one X.  \n\n\ttwo three.')" "$(printf 'one.  \n\n\ttwo three.')" "$(printf 'one.  \n\n\ttwo three Y.')" > "$dir/lines"
python3 "$tool" "$dir/lines" > /dev/null || fail "a multi-line block did not merge"
printf 'before\none X.  \n\n\ttwo three Y.\nafter\n' | cmp -s - "$dir/lines" || fail "multi-line text is wrong: $(cat -et "$dir/lines")"

# One block merges and the next clashes: the first is kept, the second untouched, exit 1
{ block "red cat sat" "blue cat sat" "blue cat stood"; block "default opus." "default grok." "default sonnet."; } > "$dir/two"
out=$(python3 "$tool" "$dir/two") && fail "a file with one clash left exited 0"
[ "$out" = "$dir/two: 1 conflict(s) left" ] || fail "wrong count: $out"
{ printf 'before\nred cat stood\nafter\n'; block "default opus." "default grok." "default sonnet."; } | cmp -s - "$dir/two" \
  || fail "mixed file is wrong: $(cat "$dir/two")"

# The markers git itself writes, with the labels a rebase gives them
printf 'ctx\nfoo X bar baz\n' > "$dir/o"; printf 'ctx\nfoo bar baz\n' > "$dir/b"; printf 'ctx\nfoo bar baz Y\n' > "$dir/t"
git merge-file -p --diff3 -L HEAD -L 'parent of 1a2b3c4 (20-runtime.patch)' -L '1a2b3c4 (20-runtime.patch)' "$dir/o" "$dir/b" "$dir/t" > "$dir/git" \
  && fail "git merge-file made no conflict to test with"
python3 "$tool" "$dir/git" > /dev/null || fail "git's own diff3 block did not merge"
[ "$(cat "$dir/git")" = "$(printf 'ctx\nfoo X bar baz Y')" ] || fail "git block text is wrong: $(cat "$dir/git")"

# Markers with no base section are still a conflict
printf 'a\n<<<<<<< ours\nfoo X\n=======\nfoo Y\n>>>>>>> theirs\nb\n' > "$dir/twoway"
python3 "$tool" "$dir/twoway" > /dev/null && fail "markers without a base section exited 0"

# A block the tool cannot split safely is left alone: the text's own
# stand-in character, or a ======= line (a setext heading)
block "show X the ␤ glyph" "show the ␤ glyph" "show the ␤ glyph Y" > "$dir/nl"
block "$(printf 'Title\n=======\nfoo X bar')" "$(printf 'Title\n=======\nfoo bar')" "$(printf 'Title\n=======\nfoo bar Y')" > "$dir/setext"
for f in nl setext; do
  cp "$dir/$f" "$dir/$f.orig"
  WORDMERGE_FAVOR=theirs python3 "$tool" "$dir/$f" > /dev/null && fail "$f: an unsafe block exited 0"
  cmp -s "$dir/$f" "$dir/$f.orig" || fail "$f: an unsafe block was rewritten"
done

# CRLF files keep their line endings
block "one X two three" "one two three" "one two three Y" | sed $'s/$/\r/' > "$dir/crlf"
python3 "$tool" "$dir/crlf" > /dev/null || fail "a CRLF block did not merge"
printf 'before\r\none X two three Y\r\nafter\r\n' | cmp -s - "$dir/crlf" || fail "CRLF line endings were rewritten: $(cat -et "$dir/crlf")"

# A file that cannot be read does not stop the ones after it
cp "$dir/clean.orig" "$dir/after"
python3 "$tool" "$dir/missing" "$dir/after" > /dev/null && fail "a missing file exited 0"
grep -q '<<<<<<<' "$dir/after" && fail "a missing file stopped the files after it"

WORDMERGE_FAVOR="patch" python3 "$tool" "$dir/clash" > /dev/null 2>&1 && fail "a mistyped WORDMERGE_FAVOR was accepted"

echo "wordmerge.sh: ok"
