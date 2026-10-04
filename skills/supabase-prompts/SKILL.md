---
name: supabase-prompts
description: Supabase's published AI prompts for generating code against a Supabase project. Use when writing or reviewing Postgres SQL, migrations, database functions, row level security (RLS) policies or declarative schemas for Supabase, Supabase Edge Functions (Deno), Next.js server-side auth with @supabase/ssr, or Supabase Realtime (broadcast, presence, postgres changes).
metadata:
  author: jrmatherly
  version: "1.0"
---

# Supabase prompts

Supabase publishes one prompt per kind of code. Before writing that code, read
the matching prompt in full and follow it:

| Writing | Read |
| --- | --- |
| Any Postgres SQL: naming, layout, comments | [references/code-format-sql.md](references/code-format-sql.md) |
| A schema change, in a project that uses declarative schemas (`supabase/schemas/` exists, or `config.toml` sets `schema_paths`) | [references/declarative-database-schema.md](references/declarative-database-schema.md) |
| A schema change, in any other project | [references/database-create-migration.md](references/database-create-migration.md) |
| A database function or trigger | [references/database-functions.md](references/database-functions.md) |
| A row level security policy | [references/database-rls-policies.md](references/database-rls-policies.md) |
| An Edge Function | [references/edge-functions.md](references/edge-functions.md) |
| Auth in a Next.js app (`@supabase/ssr`, cookies, `proxy.ts`) | [references/nextjs-supabase-auth.md](references/nextjs-supabase-auth.md) |
| Realtime: broadcast, presence, moving off `postgres_changes` | [references/use-realtime.md](references/use-realtime.md) |

A task often needs several: a new table is the schema-change prompt plus the
SQL style, RLS and (for a trigger) function prompts.

## Order of precedence

1. **The project.** Its `CLAUDE.md` or `AGENTS.md`, its own copy of one of
   these prompts, and the conventions of its existing migrations and code.
2. **Current Supabase docs.** The prompts are a snapshot, and Supabase's CLI
   and APIs change between versions. Where a prompt and the docs disagree, the
   docs win, however absolute the prompt's wording. Supabase's own `supabase`
   skill, where installed, says how to check them, and wins over a prompt too.
3. **The prompts.**

## Where the prompts disagree

Each prompt was written to stand alone, so they don't line up everywhere:

- **A rule beats an example.** Several examples break a rule stated in the
  same prompt or another one: a policy `to authenticated, anon` against "one
  policy per role", policies with no `for` clause against "don't use
  `FOR ALL`", `app.listen` against the Edge Function handler contract. Follow
  the rule.
- **Declarative schema or migrations, never both.** The two schema-change
  prompts describe different workflows. Use the one the project already uses;
  the declarative prompt lists the few cases that still need a hand-written
  migration.
- **Don't compose a migration's filename.** The migration prompt spells out the
  timestamp format; create the file with `supabase migration new <name>`
  instead, then fill it in.
- **The RLS prompt describes a policies-only chat assistant.** Its rules for
  policies apply everywhere. Its rules for the reply (only `CREATE POLICY` or
  `ALTER POLICY` statements, Markdown output, no inline SQL comments, decline
  anything else) are that assistant's, not rules for a migration or schema
  file, where the migration prompt's commenting rule applies.
- **The Next.js prompt's "no exceptions" is about cookies.** Its absolutes
  cover `getAll`/`setAll` and never importing `@supabase/auth-helpers-nextjs`.
  They don't freeze the rest of its code: its proxy calls `auth.getUser()`
  where Supabase's
  [Next.js guide](https://supabase.com/docs/guides/auth/server-side/nextjs)
  has moved to `auth.getClaims()`, so read the guide before writing the proxy.
- **Take the design from the Realtime prompt, not its code.** Its trigger
  functions repeat `AS $$` and use `SECURITY DEFINER` without
  `set search_path = ''`, its insert policy on `realtime.messages` uses
  `USING` where the RLS prompt requires `WITH CHECK`, and it calls
  `auth.uid()` unwrapped: write that SQL to the function, RLS and SQL style
  prompts instead. Its React example uses `await` in a `useEffect` callback
  that isn't async, its migration example broadcasts to `<table>:<row id>`
  while the client listens on `messages:<room id>:changes`, and that example's
  policy (`using (true)`) lets every signed-in user receive every broadcast.

## Source

The references are Supabase's
[AI prompts](https://supabase.com/docs/guides/ai-tools/ai-prompts)
(`examples/prompts/` in [supabase/supabase](https://github.com/supabase/supabase),
Apache-2.0, see [LICENSE](LICENSE)), unchanged except that the Cursor-rules
frontmatter is replaced by a one-line source notice.
`scripts/sync-supabase-prompts` in
[jrmatherly/skills](https://github.com/jrmatherly/skills) refreshes them from
a pinned upstream commit, so they are never edited by hand.
