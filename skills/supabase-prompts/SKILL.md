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
| A schema change, in a project with `supabase/schemas/` | [references/declarative-database-schema.md](references/declarative-database-schema.md) |
| A schema change, in a project with only `supabase/migrations/` | [references/database-create-migration.md](references/database-create-migration.md) |
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
   docs win. Supabase's own `supabase` skill, where installed, says how to
   check them.
3. **The prompts.**

## Where the prompts disagree

Each prompt was written to stand alone, so they don't line up everywhere:

- **Declarative schema or migrations, never both.** The two schema-change
  prompts describe different workflows. Use the one the project already uses;
  the declarative prompt lists the few cases that still need a hand-written
  migration.
- **The RLS prompt describes a policies-only chat assistant.** Its rules for
  policies apply everywhere. Its rules for the reply (only `CREATE POLICY` or
  `ALTER POLICY` statements, Markdown output, no inline SQL comments, decline
  anything else) are that assistant's, not rules for a migration or schema
  file, where the migration prompt's commenting rule applies.
- **Take the design from the Realtime prompt, not its SQL.** Its trigger
  functions repeat `AS $$` and use `SECURITY DEFINER` without
  `set search_path = ''`, its insert policy on `realtime.messages` uses
  `USING` where the RLS prompt requires `WITH CHECK`, and it calls
  `auth.uid()` unwrapped. Write that SQL to the function, RLS and SQL style
  prompts instead.

## Source

The references are Supabase's
[AI prompts](https://supabase.com/docs/guides/ai-tools/ai-prompts)
(`examples/prompts/` in [supabase/supabase](https://github.com/supabase/supabase),
Apache-2.0, see [LICENSE](LICENSE)), unchanged except that the Cursor-rules
frontmatter is removed. `scripts/sync-supabase-prompts` in this repo refreshes
them from a pinned upstream commit, so they are never edited by hand.
