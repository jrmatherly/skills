#!/bin/bash
# scripts/rebase-jstack-patches against a stub sync-jstack (no network): a
# word-level conflict merges by itself, a same-word clash stops the run,
# --continue finishes it, and a patch upstream made redundant is reported. A
# failed start, a hand-aborted rebase and staged markers never reach the patches.
set -euo pipefail

root="$(cd "$(dirname "$0")/../.." && pwd -P)"
dir="$(mktemp -d)"; dir="$(cd "$dir" && pwd -P)"
trap 'rm -rf "$dir"' EXIT
fail() { echo "rebase-patches.sh: $*" >&2; exit 1; }

mkdir -p "$dir/scripts" "$dir/jstack/patches" "$dir/old" "$dir/new"
cp "$root/scripts/rebase-jstack-patches" "$dir/scripts/"
cp "$root/jstack/wordmerge.py" "$dir/jstack/"
# The stub hands out the old tree when JSTACK_COMMIT is set, the new one otherwise
cat > "$dir/scripts/sync-jstack" << 'STUB'
#!/bin/bash
while [ $# -gt 0 ]; do [ "$1" = --out ] && out=$2; shift; done
src=new; [ -z "${JSTACK_COMMIT:-}" ] || src=old
mkdir -p "$out" && cp -R "$(dirname "$0")/../$src/." "$out/"
STUB
chmod +x "$dir/scripts/sync-jstack"

printf 'Run how with Cursor loop today.\n' > "$dir/old/doc.md"
printf 'default grok.\n' > "$dir/old/model.md"
printf 'same old\n' > "$dir/old/dup.md"
printf 'Trace the code with Cursor loop today.\n' > "$dir/new/doc.md"
printf 'default opus.\n' > "$dir/new/model.md"
printf 'same new\n' > "$dir/new/dup.md"

patch_for() { # <name> <file> <new content>: a patch against the old tree
  git init -q "$dir/p" && cp -R "$dir/old/." "$dir/p/" && git -C "$dir/p" add -A
  printf '%s\n' "$3" > "$dir/p/$2"
  git -C "$dir/p" diff > "$dir/jstack/patches/$1"; rm -rf "$dir/p"
}
patch_for 10-word.patch doc.md 'Run how with Claude loop today.'
patch_for 20-redundant.patch dup.md 'same new'
patch_for 30-clash.patch model.md 'default sonnet.'

export JSTACK_REBASE_DIR="$dir/work"
tool="$dir/scripts/rebase-jstack-patches"
old=0000000000000000000000000000000000000000
saved="$dir/saved"
cp -R "$dir/jstack/patches" "$saved"
unchanged() { diff -r "$saved" "$dir/jstack/patches" > /dev/null || fail "$1 rewrote the patches"; }

# A start that fails leaves nothing for --continue to pick up
mv "$dir/old/doc.md" "$dir/old/moved.md"
"$tool" "$old" > /dev/null 2>&1 && fail "patches that do not apply to the old tree started a rebase"
[ ! -e "$dir/work" ] || fail "a failed start left its scratch tree behind"
"$tool" --continue > /dev/null 2>&1 && fail "--continue ran with nothing in progress"
mv "$dir/old/moved.md" "$dir/old/doc.md"
unchanged "a failed start"

# A rebase someone aborted by hand must not be written back as finished
"$tool" "$old" > /dev/null && fail "a same-word clash did not stop the run"
git -C "$dir/work/tree" rebase --abort
"$tool" --continue > /dev/null 2>&1 && fail "--continue wrote back an aborted rebase"
unchanged "an aborted rebase"
"$tool" --abort

# Markers staged by hand stop the run again
"$tool" "$old" > /dev/null && fail "a same-word clash did not stop the run"
git -C "$dir/work/tree" add model.md
out=$("$tool" --continue) && fail "staged conflict markers were accepted"
[[ $out == *"stopped at 30-clash.patch"* ]] || fail "staged markers gave the wrong report: $out"
unchanged "staged conflict markers"
"$tool" --abort

out=$("$tool" "$old") && fail "a same-word clash did not stop the run"
[[ $out == *"word-merged in 10-word.patch"*doc.md*"stopped at 30-clash.patch"*model.md* ]] || fail "wrong stop report: $out"

(cd "$dir/work/tree" && WORDMERGE_FAVOR=theirs python3 "$dir/jstack/wordmerge.py" model.md > /dev/null) || fail "the clash did not settle for the patch"
out=$("$tool" --continue) || fail "--continue failed: $out"
[[ $out == *"20-redundant.patch came out empty"* ]] || fail "the redundant patch was not reported: $out"
[ ! -e "$dir/work" ] || fail "the scratch tree was left behind"

for p in 10-word.patch 30-clash.patch; do
  git -C "$dir/new" apply "$dir/jstack/patches/$p" || fail "$p does not apply to the new tree"
done
[ "$(cat "$dir/new/doc.md")" = "Trace the code with Claude loop today." ] || fail "doc.md is wrong: $(cat "$dir/new/doc.md")"
[ "$(cat "$dir/new/model.md")" = "default sonnet." ] || fail "model.md is wrong: $(cat "$dir/new/model.md")"

echo "rebase-patches.sh: ok"
