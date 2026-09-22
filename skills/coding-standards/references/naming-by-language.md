# Naming and doc comments by language

Defaults from each language's official or most widely adopted style guide. The
existing codebase and its linter configuration still take precedence.

## JavaScript / TypeScript

- `camelCase` for variables, functions, methods and properties.
- `PascalCase` for classes, interfaces, type aliases, enums and React/Vue
  components.
- `UPPER_SNAKE_CASE` for true module-level constants; `camelCase` for other
  `const` bindings.
- No `I` prefix on interfaces and no Hungarian prefixes.
- File names: follow the project (commonly `kebab-case.ts`; components often
  `PascalCase.tsx`).
- Doc comments: `/** … */` JSDoc/TSDoc on exported functions, classes and
  types.
- Sources: [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html),
  [TSDoc](https://tsdoc.org/).

## Python

- `snake_case` for functions, methods, variables and modules/files.
- `PascalCase` (CapWords) for classes and exceptions (exceptions end in
  `Error`).
- `UPPER_SNAKE_CASE` for module-level constants.
- A single leading underscore marks internal names (`_helper`).
- Doc comments: docstrings in triple double quotes, with a one-line summary
  first, on public modules, classes, functions and methods.
- Sources: [PEP 8](https://peps.python.org/pep-0008/),
  [PEP 257](https://peps.python.org/pep-0257/).

## Go

- `MixedCaps` / `mixedCaps`, never underscores. Capitalised names are exported;
  lower-case names are package-private.
- Acronyms keep one case: `HTTPClient`, `userID`, `ServeHTTP`.
- Getters drop `Get` (`Owner()`, setter `SetOwner()`); one-method interfaces
  are named method + `er` (`Reader`, `Stringer`).
- Package names are short, lower-case, single words; don't repeat the package
  name in identifiers (`bytes.Buffer`, not `bytes.BytesBuffer`).
- Short receiver names (one or two letters), consistent across methods.
- Doc comments: full sentences that start with the name being documented
  (`// Serve handles …`), directly above the declaration.
- Sources: [Effective Go](https://go.dev/doc/effective_go),
  [Go Doc Comments](https://go.dev/doc/comment).

## Rust

- `snake_case` for functions, methods, variables, modules and crates' files.
- `UpperCamelCase` for types, traits and enum variants; acronyms count as one
  word (`Uuid`, `HttpClient`).
- `SCREAMING_SNAKE_CASE` for constants and statics.
- Conversion methods follow `as_` (cheap borrow), `to_` (expensive), `into_`
  (consuming); getters usually drop `get_`.
- Doc comments: `///` for items, `//!` for modules and crates; include examples
  where useful.
- Source: [Rust API Guidelines — Naming](https://rust-lang.github.io/api-guidelines/naming.html).

## C# / .NET

- `PascalCase` for types, methods, properties, events, public fields,
  namespaces and constants.
- `camelCase` for parameters and locals; `_camelCase` for private fields is a
  common convention — follow the project.
- Interfaces start with `I` (`IDisposable`); acronyms of three or more letters
  are Pascal-cased (`HtmlParser`, `IOStream` for two letters).
- Async methods end in `Async`.
- Doc comments: `///` XML documentation (`<summary>`, `<param>`, `<returns>`)
  on public members.
- Source: [.NET naming guidelines](https://learn.microsoft.com/en-us/dotnet/standard/design-guidelines/naming-guidelines).

## Shell (bash / zsh)

- `lower_snake_case` for functions and local variables.
- `UPPER_SNAKE_CASE` for constants and environment variables; declare
  constants `readonly`.
- Script files: `lower-case` or `snake_case`, with or without an extension —
  follow the repo.
- Comments: a header describing the script's purpose and usage; a comment above
  any non-obvious function.
- Source: [Google Shell Style Guide](https://google.github.io/styleguide/shellguide.html).
