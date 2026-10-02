---
name: quantifier
description: Finds the numbers hiding in a person's experience and turns vague resume statements into quantified ones, with conservative, labelled estimates where exact data is missing. Use when the user asks to add metrics, quantify, add numbers or measure impact, has bullets without numbers, or says they have no data, don't have metrics or can't measure their impact.
metadata:
  author: jrmatherly
  version: "1.0"
---

# Resume quantifier

Find the numbers behind a person's work and put them into their resume:
"Managed projects" becomes "Managed 12 projects worth $2M". Numbers give a
reader scale and credibility. The aim is specific numbers that show scope and
impact, not impressive ones. Most work can be measured once the right
questions are asked, so ask before concluding a bullet has no number.

## Inputs to gather

- The resume or the bullets to quantify.
- The role and industry for each position, to pick likely metrics.
- The user's answers to the discovery questions below. This skill is a
  conversation: the numbers come from the user, not from the agent.

## Process

1. Count the bullets with and without a number.
2. For each bullet without one, pick the metric categories that could apply.
   For metrics typical of a role, see
   [references/metrics-by-role.md](references/metrics-by-role.md).
3. Ask the discovery questions, batched across bullets.
4. Where the user has no exact figure, derive an estimate from facts they did
   give, using
   [references/estimation-techniques.md](references/estimation-techniques.md).
   Show the arithmetic, label it an estimate and get the user's confirmation.
5. When the user says there is nothing to measure, work through
   [references/no-numbers-situations.md](references/no-numbers-situations.md).
6. Write the quantified bullet. Sentence shapes are in
   [references/sentence-patterns.md](references/sentence-patterns.md); for a
   full rewrite of the bullet's wording use the **bullet-writer** skill.
7. Check each number against the quality checklist and the numbers to avoid.
8. Before producing output, read
   [templates/quantification-report.md](templates/quantification-report.md)
   and follow it.

## Metric categories

| Category | What to look for | Example |
| --- | --- | --- |
| Money | Revenue generated, costs saved, budget managed, deal sizes, margin improved | "Reduced costs by $50K annually" |
| Time | Hours saved, cycle time reduced, project duration, response time, time to market | "Completed 6-month project in 4 months" |
| Percentages | Growth, improvement, efficiency gains, error reduction, conversion | "Increased conversion rate by 45%" |
| Volume and scale | Customers or users, projects, team size, transactions, items produced | "Built product used by 100K+ daily active users" |
| Quality | Satisfaction scores, error rates, accuracy, compliance, SLA adherence | "Improved accuracy from 85% to 98%" |
| Frequency | Per day, week or month; annual totals; meeting cadences; report cycles | "Delivered weekly reports to 50+ stakeholders" |

A before-and-after pair ("from X to Y") is the strongest form in any category.

## Discovery questions

Scale:

- How many people, projects or customers?
- What budget or revenue was involved?
- How large was the team?
- How many locations or regions?

Impact:

- What changed because of your work?
- What would have happened without you?
- What problems did you solve?
- What got better, faster or cheaper?

Comparison:

- How was it before, and how was it after?
- How did you compare with others, or with previous results?
- What was the baseline you improved on?

## Quality checklist

For each number:

- It is relevant to the claim, not just any number.
- Its scale is clear: the reader can tell what it counts.
- If estimated, it is conservative and defensible.
- It adds credibility, not confusion.
- The user can explain it in an interview.

## Numbers to avoid

- Numbers that make the candidate look bad
- Numbers the user cannot explain or defend
- Numbers that reveal confidential information
- Exaggerated or inflated numbers
- Numbers without context, such as "increased by 300%" with no baseline
- More than 2-3 numbers in one bullet

## Rules

- Never invent a metric, and never invent the employer, title, date or scope
  around it. An estimate is derived from facts the user gave, labelled as an
  estimate, and confirmed by the user before it goes into the resume.
- A vague answer ("most of them", "a lot") is not a number. Ask a follow-up
  instead of converting it into a percentage.
- A bullet with no defensible number stays unquantified and is listed under
  remaining questions. A number on every bullet is the target, not a licence
  to fill gaps.
- Keep the estimate marker (`~`, `+`, a range) in the resume text when the
  figure is not exact.

## Resources

- [templates/quantification-report.md](templates/quantification-report.md) -
  the output format. Read before every report.
- [references/metrics-by-role.md](references/metrics-by-role.md) - metrics
  typical of sales, marketing, customer service, operations, engineering,
  project management and HR. Read when choosing what to ask about.
- [references/estimation-techniques.md](references/estimation-techniques.md) -
  ways to reach a defensible figure without exact data. Read before proposing
  any estimate.
- [references/no-numbers-situations.md](references/no-numbers-situations.md) -
  answers to "I have no numbers". Read when the user says their work cannot
  be measured.
- [references/sentence-patterns.md](references/sentence-patterns.md) -
  sentence shapes for quantified bullets. Read when writing the result.
