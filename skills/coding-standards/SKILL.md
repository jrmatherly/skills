---
name: coding-standards
description: Naming and comment conventions for writing or editing code in any language. Use when naming variables, functions, types, files or constants; when writing, reviewing or cleaning up comments, docstrings or doc comments; or when a change needs to match a codebase's existing style. Covers JavaScript/TypeScript, Python, Go, Rust, C#/.NET and shell.
metadata:
  author: jrmatherly
  version: "1.0"
---

# Coding standards: naming and comments

## Order of precedence

1. **The existing codebase.** Match the conventions already used in the file,
   then the module, then the repo — even where they differ from the defaults
   below. Check nearby code before naming anything or writing a comment.
2. **Project configuration.** Linters, formatters and style configs
   (`.editorconfig`, ESLint/Biome, Ruff, `rustfmt`, `gofmt`, `.NET` analyzers)
   are authoritative where they speak.
3. **The language's own idioms.** See
   [references/naming-by-language.md](references/naming-by-language.md).
4. **The general rules below**, when nothing above decides it.

Never reformat or rename code you weren't asked to touch just to apply these
conventions.

## Naming

- **Say what it is, not how it's stored.** `retryCount`, not `intValue`;
  `users`, not `userList`. No type prefixes or Hungarian notation.
- **Functions and methods are verbs**: `fetchInvoices`, `parse_config`,
  `Close()`. Pure accessors may be nouns where the language expects it (Go
  getters drop the `Get` prefix; C# uses properties).
- **Booleans read as a yes/no question**: `isEnabled`, `hasAccess`,
  `canRetry`, `should_prune`. Avoid negatives like `notReady` — use `isReady`.
- **Include units and meaning**: `timeoutMs`, `max_bytes`, `retryDelay`
  (typed as a duration where the language has one).
- **Scope sets length.** Short names (`i`, `k`, `err`) for tiny scopes; the
  wider the scope or the more public the symbol, the more descriptive the name.
- **Don't abbreviate** unless the abbreviation is more familiar than the word
  (`id`, `url`, `http`, `config`, `ctx`). Treat acronyms as words in camel/Pascal
  case unless the language says otherwise (`HttpClient` in C#, `HTTPClient` in
  Go — see the reference).
- **Constants name their purpose**, not their value: `MAX_UPLOAD_BYTES`, not
  `TEN_MB`.
- **One word per concept** across a codebase — don't mix `fetch`/`get`/`load`
  for the same kind of operation.
- **File and folder names** follow the ecosystem: see the reference.

## Comments

- **Explain why, not what.** The code says what it does; a comment adds the
  intent, constraint, trade-off or non-obvious reason. If a comment only
  restates the code, delete it or improve the names instead.
- **Match the file's comment density.** A sparsely commented file shouldn't
  suddenly get a comment on every line.
- **Document public APIs** with the language's doc-comment format (JSDoc/TSDoc,
  docstrings, Go doc comments, `///` rustdoc, XML docs) — what it does, its
  inputs and outputs, errors, and side effects. Start with a one-line summary.
- **Keep comments true.** When you change code, update or remove the comments
  it affects. A wrong comment is worse than none.
- **No commented-out code** — version control keeps history. No change logs,
  author names or dates in comments either.
- **Mark follow-ups consistently** with the project's convention; if none,
  `TODO(<owner or issue>): <what and why>`.
- **Links over essays.** For anything long (an algorithm, a spec, an incident),
  link to the source or ticket and summarise in a line.
- Only add license or file headers where the project already uses them.

## Before finishing

- Names you introduced follow the codebase and language conventions.
- Every new comment says something the code can't.
- Comments near the code you changed are still accurate.
