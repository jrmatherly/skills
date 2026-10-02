---
name: job-description-analyzer
description: Analyzes a job posting against the user's resume by sorting requirements into required and preferred, calculating a weighted match score, classifying gaps, flagging warning signs and producing a tailoring strategy, cover letter talking points and an apply-or-skip recommendation. Use when the user says "analyze this job posting", "am I qualified for this role", "match score" or "should I apply", or wants to understand a posting before tailoring a resume.
metadata:
  author: jrmatherly
  version: "1.0"
---

# Job description analyzer

Decide whether a posting is worth an application and what the application must
emphasize. Compare the posting with the user's real experience, score the
match, and produce a strategy that the **tailor** and
**cover-letter-generator** skills can act on.

## Inputs

- **The full posting text.** Ask the user to paste it if a link can't be read.
- **The user's resume** (the master resume if one exists). Without it, extract
  and classify the requirements only; do not score.
- **Optional context**: career goals, constraints (location, salary floor,
  work authorization), a referral or contact at the company.

## Process

1. **Extract requirements.** Sort each one into required, preferred, or soft
   skills and culture. For the wording that signals each class, see
   [references/requirement-classification.md](references/requirement-classification.md).
   Rank the five requirements the posting stresses most (title, position in
   the list, repetition); the **tailor** skill works from that ranking.
2. **Extract keywords** in three groups: hard skills, soft skills, industry
   and domain knowledge. Count how often each appears; repetition shows what
   the employer cares about most.
3. **Match each requirement to evidence.** Mark a requirement met only when
   the resume or the user supports it, and note the evidence ("You have: 6
   years"). Ask when the resume is silent rather than assuming either way.
4. **Calculate the match score** (below).
5. **Classify every unmet requirement** as a critical, major or minor gap
   (below). Check the dealbreaker list in the classification reference first.
6. **Scan for red flags and positive signals**, and list what the user should
   research about the company before applying. See
   [references/red-flags.md](references/red-flags.md).
7. **Build the strategy**: the top three strengths to lead with, the resume
   customization plan (experience order, exact phrases to add and where,
   bullets to strengthen) and cover letter talking points (opening hook
   options, requirement-to-evidence lines, optional wording for a major gap).
8. **Recommend**: apply or skip, a priority, reasons to apply, reasons to
   hesitate, and an application timeline. Do not rate the competition for the
   role: a posting does not show it.

For postings that are vague, cover several roles, are internal, or have been
reposted, see [references/edge-cases.md](references/edge-cases.md).

## Match score

```text
required %  = required requirements met / required requirements listed
preferred % = preferred requirements met / preferred requirements listed
match       = (required % x 0.7) + (preferred % x 0.3)

Example: 8 of 10 required (80%), 3 of 5 preferred (60%)
         (80 x 0.7) + (60 x 0.3) = 74%
```

Soft skills are reported but not scored. With no preferred requirements
listed, the match is the required percentage.

| Match   | Reading         | Advice                                         |
| ------- | --------------- | ---------------------------------------------- |
| 90-100% | Overqualified   | Warn that the employer may see a flight risk   |
| 75-89%  | Excellent fit   | Apply immediately                              |
| 60-74%  | Good fit        | Apply with a strong cover letter               |
| 50-59%  | Stretch role    | Apply only if the user is passionate about it  |
| <50%    | Under-qualified | Skip unless it is a dream job                  |

Steer the user toward a short list of well-matched postings (roughly 70-90%)
with a deeply customized application for each, rather than many untargeted
ones.

## Gap classes

| Class    | Meaning                     | Handling                                 |
| -------- | --------------------------- | ---------------------------------------- |
| Critical | Dealbreaker                 | Recommend not applying, whatever the score |
| Major    | Significant but addressable | Address it directly in the cover letter  |
| Minor    | Easy to learn               | Don't raise it; emphasize related skills |

## Rules

- **Truthfulness.** Never invent employers, titles, dates, degrees, metrics or
  skills. Suggested bullets, phrases and talking points may only restate what
  the user has actually done. An estimated number must be derived from facts
  the user gave, labelled as an estimate and confirmed with the user before it
  goes into a document. Gap wording ("currently learning SQL") must be true.
- **Add a keyword only where it truthfully describes the user's work.** A
  missing skill is a gap to report, not a phrase to insert.
- **Don't state company or market facts from memory.** Take salary, location
  and interview process from the posting. Research current news, reviews,
  tenure and pay data, or tell the user what to check; mark anything
  unverified as such.
- **A hook that cites company news or a mutual connection** needs a verified
  fact or a real contact supplied by the user. Otherwise offer only the
  problem-solver hook.
- Hand the resume changes to the **tailor** skill and the letter to the
  **cover-letter-generator** skill; this skill stops at the plan.

## Output

Before producing output, read
[templates/job-analysis-report.md](templates/job-analysis-report.md) and
follow it. For a filled-in report showing the expected depth, see
[references/example-report.md](references/example-report.md).

## Resources

- [templates/job-analysis-report.md](templates/job-analysis-report.md) - the
  report shape; read before every analysis.
- [references/requirement-classification.md](references/requirement-classification.md) -
  read when sorting requirements, extracting keywords or checking
  dealbreakers.
- [references/red-flags.md](references/red-flags.md) - read when scanning the
  posting for warning signs and listing company research.
- [references/edge-cases.md](references/edge-cases.md) - read for vague,
  multi-role, internal or reposted postings.
- [references/example-report.md](references/example-report.md) - read when
  unsure how detailed a section of the report should be.
