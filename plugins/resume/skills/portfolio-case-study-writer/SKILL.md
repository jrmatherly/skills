---
name: portfolio-case-study-writer
description: Turns resume bullets and project notes into structured portfolio case studies (overview, problem, process, solution, results, learnings) tuned to a product, design, engineering or marketing audience, with a list of the visuals to prepare. Use when the user asks for a case study, portfolio piece, project writeup or work samples, wants to expand resume bullets into a detailed writeup, or is building a portfolio website.
metadata:
  author: jrmatherly
  version: "1.0"
---

# Portfolio case study writer

Expand a resume bullet or a set of project notes into a case study for a
portfolio site. A resume says what was done; a case study shows how and why:
the thinking, the trade-offs and the person's own contribution.

Before producing output, read [templates/case-study.md](templates/case-study.md)
and follow it.

## Inputs to gather

Ask for whatever is missing before drafting:

- The resume bullet(s) or project to expand, and the target role or audience.
- Project facts: name, company, the user's role, timeline, team composition.
- The problem: business context, user pain points, goal or target metric,
  constraints.
- The process: research done, stakeholders, hypotheses, options considered,
  decisions and the reasons for them.
- The solution: what was delivered, key features or changes, technical
  implementation where relevant.
- Results: before and after numbers with the measurement timeframe, comparison
  to the goal, secondary effects, business impact.
- Learnings: what worked, what the user would do differently, surprises, skills
  developed.
- Visuals the user has or can make, and anything confidential that must be
  blurred, anonymized or left out.

## Truthfulness

Never invent employers, titles, dates, team sizes, research, decisions or
metrics. A number the user did not state must be derived from facts they gave,
labelled as an estimate and confirmed with them before it goes into the case
study. Where a fact is missing, ask; if the user cannot supply it, leave a
visible placeholder instead of filling the gap.

## Structure

Six sections, in this order:

| Section | Purpose | Include |
| --- | --- | --- |
| Overview | Hook the reader, give context | Project and company, role, timeline, team size, one-sentence impact summary |
| Problem | Show why the work mattered | Business context, user pain points, key metrics or goal, constraints |
| Process | Show thinking and method | Research, stakeholders, hypotheses, options considered, decisions and why |
| Solution | Show what was created | Visual artifacts, key features or changes, implementation if relevant, how each change answers a stated problem |
| Results | Prove impact with data | Quantified results with timeframe, comparison to goal, secondary metrics, business impact |
| Learnings | Show self-awareness | What worked, what to do differently, unexpected challenges, skills developed |

For a fully worked example of all six sections, see
[references/worked-example.md](references/worked-example.md).

## Depth and emphasis

Pick the length with the user:

- **Quick read (3-5 minutes):** the default, and essential for any portfolio.
- **Deep dive (10-15 minutes):** for readers who want the full process; offer
  it as a longer version or expandable detail, not instead of the quick read.

Weight the sections by the role the case study is aimed at:

| Role | Focus on |
| --- | --- |
| Product manager | Strategy and prioritization, stakeholder management, metrics and outcomes, technical trade-offs |
| UX / product designer | User research, design process, visual artifacts, usability improvements |
| Software engineer | Technical architecture, problem-solving approach, system design, code quality and performance |
| Marketing | Strategy and targeting, creative execution, channel performance, ROI and attribution |

Balance technical detail against business context for the expected reader: a
hiring manager outside the discipline needs the "why" before the "how".

## Visuals

The agent writes the text; the user supplies the images. Mark each spot with
an `[IMAGE: description]` placeholder and collect them in the visual asset
list at the end of the output.

- **Must have:** before/after comparisons, key screens or deliverables, process
  diagrams, results charts.
- **Nice to have:** user journey maps, wireframe evolution, research artifacts,
  team photos.
- Tell the user to size images consistently, caption every image, blur
  sensitive data and check the images read well on mobile.

## Process

1. Gather the inputs above; ask targeted questions for the gaps.
2. Agree the audience, role emphasis and depth.
3. Draft all six sections from the template, making the user's specific
   contribution explicit ("I" for their work, "we" for the team's).
4. Tie every solution element back to a problem named earlier, and every
   result to a number with a timeframe.
5. Add the visual asset list.
6. Run the checks below and fix what fails.

## Before finishing

- The problem statement is clear and shows user or customer focus.
- The process is explained, including options that were rejected.
- The user's own contributions are distinguishable from the team's.
- Results are quantified, and every number came from the user.
- Visual placeholders are in place and listed.
- The learnings are honest about challenges, not a second results section.
- Length fits the agreed depth (3-10 minute read for most portfolios).
- The text is proofread, and the user could discuss every claim in detail in
  an interview. Say so to the user: anything they can't defend should come out.

## Resources

- [templates/case-study.md](templates/case-study.md) - the output shape; read
  before writing any case study.
- [references/worked-example.md](references/worked-example.md) - a complete
  checkout-redesign case study, section by section; read when unsure how much
  detail a section should carry.
