#!/usr/bin/env python3
"""Resolve diff3 conflict blocks word by word (for scripts/rebase-jstack-patches).

pstack writes each paragraph as one long line, so a one-word upstream edit and
a one-word patch edit in the same paragraph conflict as whole lines. This
re-merges each conflict block with one token per line and keeps the result
when that merge is clean. A block that still conflicts is left as it was.
Needs diff3-style markers (merge.conflictStyle=diff3).

usage: wordmerge.py FILE...   (exit 1 when any conflict marker is left)
WORDMERGE_FAVOR=theirs|ours settles a same-word clash for that side; in a
rebase "theirs" is the patch and "ours" is upstream.
"""
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path

EOL = r"\r?\n"
BLOCK = re.compile(
    rf"^<<<<<<<(?: [^\n]*)?{EOL}(.*?)^\|\|\|\|\|\|\|(?: [^\n]*)?{EOL}(.*?)^======={EOL}(.*?)^>>>>>>>(?: [^\n]*)?{EOL}",
    re.S | re.M,
)
OPENING = re.compile(r"^<<<<<<<( |\r?$)", re.M)
SEPARATOR = re.compile(rf"^======={EOL}", re.M)
# Stands for a line break while each token sits on its own line
NL = "␤"
FAVOR = os.environ.get("WORDMERGE_FAVOR")


def tokens(text):
    return "".join((NL if t == "\n" else t) + "\n" for t in re.findall(r"\n|[^\s]+|[^\S\n]+", text))


def merge(ours, base, theirs):
    with tempfile.TemporaryDirectory() as d:
        paths = []
        for name, text in (("ours", ours), ("base", base), ("theirs", theirs)):
            p = Path(d, name)
            p.write_text(tokens(text), encoding="utf-8", newline="")
            paths.append(str(p))
        favor = [f"--{FAVOR}"] if FAVOR else []
        r = subprocess.run(["git", "merge-file", "-p", *favor, *paths], capture_output=True, encoding="utf-8")
    if r.returncode != 0:
        return None
    return "".join("\n" if t == NL else t for t in r.stdout.split("\n")[:-1])


def resolve(m):
    block = m.group(0)
    # A `=======` line of the text itself (a setext heading) makes the split
    # ambiguous, and text that already holds the stand-in would come back changed
    if len(SEPARATOR.findall(block)) != 1 or NL in block:
        return block
    eol = "\r\n" if "\r\n" in block else "\n"
    merged = merge(*(side.replace("\r\n", "\n") for side in m.groups()))
    return block if merged is None else merged.replace("\n", eol)


def main():
    if FAVOR not in (None, "", "ours", "theirs"):
        sys.exit(f"wordmerge.py: WORDMERGE_FAVOR must be ours or theirs, not {FAVOR!r}")
    left = 0
    for name in sys.argv[1:]:
        path = Path(name)
        try:
            # newline="": line endings pass through untouched
            with path.open(encoding="utf-8", newline="") as f:
                text = f.read()
        except (OSError, UnicodeDecodeError) as e:
            print(f"{name}: not read ({e})")
            left += 1
            continue
        new = BLOCK.sub(resolve, text)
        if new != text:
            with path.open("w", encoding="utf-8", newline="") as f:
                f.write(new)
        count = len(OPENING.findall(new))
        left += count
        print(f"{name}: {count} conflict(s) left")
    sys.exit(1 if left else 0)


if __name__ == "__main__":
    main()
