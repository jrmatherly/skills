#!/usr/bin/env python3
"""Resolve diff3 conflict blocks word by word (for scripts/rebase-jstack-patches).

pstack writes each paragraph as one long line, so a one-word upstream edit and
a one-word patch edit in the same paragraph conflict as whole lines. This
re-merges each conflict block with one token per line and keeps the result
when that merge is clean. A block that still conflicts is left as it was.
Needs diff3-style markers (merge.conflictStyle=diff3).

usage: wordmerge.py FILE...   (exit 1 when any block is left unresolved)
WORDMERGE_FAVOR=theirs|ours settles a same-word clash for that side; in a
rebase "theirs" is the patch and "ours" is upstream.
"""
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path

BLOCK = re.compile(
    r"^<<<<<<< [^\n]*\n(.*?)^\|\|\|\|\|\|\| [^\n]*\n(.*?)^=======\n(.*?)^>>>>>>> [^\n]*\n",
    re.S | re.M,
)

NL = "\u2424"
FAVOR = [f"--{os.environ['WORDMERGE_FAVOR']}"] if os.environ.get("WORDMERGE_FAVOR") else []


def tokens(text):
    # A newline is a token too (written as NL), so merge() can restore the lines
    return "".join((NL if t == "\n" else t) + "\n" for t in re.findall(r"\n|[^\s]+|[^\S\n]+", text))


def merge(ours, base, theirs):
    with tempfile.TemporaryDirectory() as d:
        paths = []
        for name, text in (("ours", ours), ("base", base), ("theirs", theirs)):
            p = Path(d, name)
            p.write_text(tokens(text))
            paths.append(str(p))
        r = subprocess.run(["git", "merge-file", "-p", *FAVOR, *paths], capture_output=True, text=True)
    if r.returncode != 0:
        return None
    return "".join("\n" if t == NL else t for t in r.stdout.split("\n")[:-1])


def main():
    left = 0
    for name in sys.argv[1:]:
        path = Path(name)
        text = path.read_text()

        def resolve(m):
            nonlocal left
            merged = merge(m.group(1), m.group(2), m.group(3))
            if merged is None:
                left += 1
                return m.group(0)
            return merged

        new = BLOCK.sub(resolve, text)
        if new != text:
            path.write_text(new)
        print(f"{name}: {len(BLOCK.findall(new))} conflict(s) left")
    sys.exit(1 if left else 0)


if __name__ == "__main__":
    main()
