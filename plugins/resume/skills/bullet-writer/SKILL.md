---
name: bullet-writer
description: Rewrites weak resume bullets as achievement statements with a strong verb, a specific action and a measurable result, using the X-Y-Z, STAR and CAR structures. Use when the user asks to write or improve resume bullet points, says improve my bullets, make my resume stronger or results-driven, or shares bullets that are passive, vague or list duties instead of achievements.
metadata:
  author: jrmatherly
  version: "1.0"
---

# Resume bullet writer

Turn bullets that list duties ("Responsible for managing team", "Helped with
customer service") into bullets that show what the person did and what came of
it ("Led cross-functional team of 12 to deliver $2M product, increasing revenue
by 35%"). A strong bullet is active, specific and shows a result.

## Inputs to gather

- The existing bullets, or a description of the role if there are none.
- The target role or job description, so bullets can be ranked by relevance.
- The facts behind each bullet. Ask before rewriting:
  - What exactly did you do, and with what tools or methods?
  - At what scale: team size, budget, customers, users, volume?
  - What changed as a result, and from what to what?
  - What did it mean for the business?

## Process

1. Take the weak bullet and name what is wrong with it (see the mistakes
   below).
2. Ask the clarifying questions above for whatever is missing. Batch them
   across bullets instead of asking one bullet at a time.
3. Pick a structure and draft the bullet from the user's answers.
4. Cut to length, keeping the most impressive facts.
5. Run the strength checklist.
6. Before producing output, read
   [templates/bullet-improvements.md](templates/bullet-improvements.md) and
   follow it.

When the user has no numbers to hand, use the **quantifier** skill: it owns
finding metrics and estimating them. Do not estimate here.

## Structures

**X-Y-Z**: "Accomplished [X] as measured by [Y] by doing [Z]". X is the
achievement, Y the measure, Z the actions.

```
Before: Managed social media accounts
After:  Grew Instagram following by 250% (5K to 17.5K) by implementing daily
        content calendar and influencer partnerships
```

**STAR**: situation, task, action, result. Collect the full story, then
condense it to action and result for the resume.

```
Story:  Inherited underperforming sales team (S) with 65% quota attainment.
        Tasked with improving performance within Q1 (T). Implemented new
        training program and revised commission structure (A). Achieved 92%
        quota attainment by Q2, generating $1.8M additional revenue (R).
Bullet: Revitalized underperforming sales team through training program and
        commission restructure, improving quota attainment from 65% to 92%
        and generating $1.8M additional revenue
```

**CAR**: challenge, action, result. A shorter alternative to STAR.

```
Reduced customer churn (C) by implementing proactive outreach program (A),
retaining 85% of at-risk accounts worth $500K ARR (R)
```

The figures in every example in this skill are illustrations of shape, not
values to reuse.

## Mistakes to fix

| Mistake | Signs | Fix |
| --- | --- | --- |
| Passive language | "Was responsible for", "Helped with", "Assisted in", "Participated in" | Open with an active verb |
| No metrics | "Improved website performance", "Managed large team" | Add the measure and the scale |
| Duty, not achievement | "Responsible for customer support" | State what was delivered |
| Too vague | "Worked with stakeholders", "Improved processes" | Say who, how many, how often, what changed |
| Too long | A bullet that lists every responsibility of the job | Keep the strongest facts |

Before/after pairs for each are in
[references/examples.md](references/examples.md).

## Strength checklist

Every finished bullet has:

- A strong action verb first, from
  [references/action-verbs.md](references/action-verbs.md)
- At least one number, where the user has one
- A specific outcome or result
- Context of scale: team size, budget, users or similar
- One to two lines, no more
- The shape of an achievement, not a duty
- Relevance to the target role
- Natural phrasing when read aloud

## Rules

- Never invent employers, titles, dates, metrics, tools or outcomes. Every
  fact in a rewritten bullet comes from the user. Where a number is missing,
  leave a visible placeholder such as `[N]` and ask; estimates go through the
  **quantifier** skill, labelled as estimates and confirmed by the user.
- Do not inflate the user's role. "Contributed to" stays a contribution unless
  the user says they led it.
- Vary the opening verb across bullets in the same role.
- Order bullets within a role by relevance to the target job.

For entry-level candidates, career changers and employment gaps, see
[references/special-situations.md](references/special-situations.md).

## Resources

- [templates/bullet-improvements.md](templates/bullet-improvements.md) - the
  output format. Read before every rewrite.
- [references/action-verbs.md](references/action-verbs.md) - action verbs by
  category. Read when choosing or varying an opening verb.
- [references/examples.md](references/examples.md) - weak and strong bullets
  by profession, before/after pairs for each mistake, and a worked rewrite.
  Read when calibrating for a role.
- [references/special-situations.md](references/special-situations.md) -
  entry-level candidates, career changers and employment gaps. Read when one
  applies.
