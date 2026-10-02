---
name: career-changer-translator
description: Translates a career changer's experience into the language of a new industry by identifying transferable skills, reframing achievements for the target role, finding gaps and bridge experiences, and drafting the story behind the move. Use when the user mentions a "career change", "switching careers", a "new industry", "transferable skills" or a "career pivot", or wants their experience translated for a different field.
metadata:
  author: jrmatherly
  version: "1.0"
---

# Career changer translator

Help someone moving to a new field or function present their existing
experience in that field's language, close the gaps a recruiter will see, and
explain the move convincingly.

A career changer's experience does not map directly to the new role, lacks
its keywords, and competes against candidates with direct experience whom
recruiters see as the safer choice. The output must answer that: lead with
transferable skills, speak the target industry's language, show bridge
experience and make the change make sense.

For general bullet-writing technique use the **bullet-writer** skill, and for
layout and ATS formatting the **formatter** skill.

## Inputs to gather

- Current field, function and years of experience, with the current resume
  or a description of each role.
- Target field and role. With a job description, run the
  **job-description-analyzer** skill first and use its requirements and
  vocabulary as the translation target.
- Anything already done toward the move: certifications, courses, volunteer
  or freelance work, side projects, professional memberships.
- Why the user wants the change, in their own words.
- The facts behind each achievement to be reframed: team sizes, volumes,
  budgets, results. Ask for these; do not infer them.

## Rules

- **Truthfulness.** Translation changes vocabulary and emphasis, never the
  facts. Never invent employers, titles, dates, degrees, metrics, skills or
  bridge experience, and never relabel a job title as one the user did not
  hold. An estimated number must be derived from facts the user gave,
  labelled as an estimate and confirmed with the user before it goes into a
  document. The numbers in the bundled examples are illustrative.
- **Translate everything.** No source-industry jargon survives in the
  resume unless the target industry uses the same term.
- **Lead with skills, not titles.** Old job titles signal the old field; the
  summary and skill groupings carry the new one.
- **Value, not apology.** Present the previous background as a distinct
  perspective the target field benefits from.
- **Check current requirements.** Before recommending a certification,
  course or entry route, research whether it is current and valued in the
  user's target market, or ask the user.

## Process

1. **Identify transferable skills.** Map the user's experience to the
   categories in
   [references/transferable-skills.md](references/transferable-skills.md),
   keep the ones the target role needs, and state why each is relevant.
2. **Build the language translation table.** Pair each source-industry term
   in the user's material with the target industry's term. For worked tables
   and reframed bullets (teaching, military, retail, hospitality,
   healthcare), see
   [references/translation-examples.md](references/translation-examples.md).
   For other fields, derive the vocabulary from the job description or
   research current postings.
3. **Reframe key bullets.** Rewrite each in target language with scope and
   outcome, asking the user for missing figures. Record what changed and why
   for each.
4. **Analyze gaps.** List the target-role requirements the user does not yet
   meet and a way to bridge each. Bridge experience can come from volunteer
   work in the target field, freelance or consulting projects,
   certifications, side projects, professional organizations and coursework.
   Bridge work the user has done goes on the resume; bridge work they have
   not done goes in the report as a suggestion only. For common entry routes
   into tech, finance and healthcare, see
   [references/entry-paths-by-industry.md](references/entry-paths-by-industry.md).
5. **Recommend the resume structure.** Lead with a targeted summary, use a
   hybrid layout that groups experience by transferable function, and add a
   bridge experience section. For the summary formula, layout and examples,
   see [references/resume-structure.md](references/resume-structure.md).
6. **Draft the "why" story.** The user will be asked why they are changing,
   so answer it before the reader has to wonder. Use four beats:

   ```
   [DISCOVERY]: "Through [experience], I discovered my passion for [new field]..."
   [CONNECTION]: "I realized that my experience in [old field] gave me a unique perspective on [new field] because..."
   [ACTION]: "To prepare for this transition, I've [certifications, projects, volunteering]..."
   [VISION]: "I'm excited to bring my [transferable skill] expertise to [target company/industry] because..."
   ```

   Build it from reasons that pull toward the new field: a natural evolution
   of interests, an interest found through exposure or a specific
   experience, skills that translate naturally, industry changes that
   prompted a rethink, or growth unavailable on the current path. Steer the
   user away from reasons that push from the old one: burnout, hating the
   current job, wanting more money, or the new field seeming easier. Use the
   user's real reason; if it is one of the latter, find the true positive
   motive alongside it rather than making one up.
7. **Produce the report.** Before producing output, read
   [templates/career-change-translation.md](templates/career-change-translation.md)
   and follow it.

## Before finishing

- Each transferable skill has a stated reason it matters to the target role.
- Each reframed bullet keeps the original facts and uses only figures the
  user supplied or confirmed.
- Every gap has a concrete bridge suggestion.
- Recommend networking in the target field: referrals help career changers
  more than most candidates.

## Resources

- [references/transferable-skills.md](references/transferable-skills.md) -
  catalog of universal transferable skills by category. Read at step 1.
- [references/translation-examples.md](references/translation-examples.md) -
  term tables and before/after bullets for five common moves. Read at steps
  2 and 3.
- [references/entry-paths-by-industry.md](references/entry-paths-by-industry.md)
  lists entry points and bridge activities for moves into tech, finance and
  healthcare. Read at step 4 when the target is one of those.
- [references/resume-structure.md](references/resume-structure.md) - summary
  formula, hybrid layout and a bridge experience section. Read at step 5.
- [templates/career-change-translation.md](templates/career-change-translation.md)
  is the output shape. Always read before producing output.
