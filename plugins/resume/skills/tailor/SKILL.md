---
name: tailor
description: Customizes a resume for one specific job posting without changing the facts, by rewriting the summary, reordering skills, roles and bullets by relevance, and working the posting's keywords into existing bullets, then reporting every change made. Use when the user wants a resume tailored, customized or targeted to one posting ("tailor my resume", "customize my resume", "match this job description", "make my resume better for this job").
metadata:
  author: jrmatherly
  version: "1.0"
---

# Tailor

Tailoring is selection and emphasis, never invention. Treat the user's full
experience as a library of true achievements and pick the ones that best fit
what this employer is looking for.

## Inputs

- **The resume to tailor.** Prefer the master resume, which holds every
  bullet; see the **version-manager** skill. Work on a copy, never the master.
- **The job posting.**
- **The posting analysis** from the **job-description-analyzer** skill:
  ranked requirements, keywords with mention counts, match score and gaps. If
  there is none, run that skill first; do not analyze the posting here.

## Process

1. **Start from the analysis.** Note the top five requirements, the exact
   keyword phrases, the role's primary responsibilities and the company's
   priorities.
2. **Audit every section** of the resume with three questions:
   - Does this support the candidacy for this specific role?
   - Is there a better way to phrase this for this job?
   - Should this sit higher or lower?
3. **Rewrite the professional summary** to mirror the role's key requirements
   and name the exact job title or function.
4. **Reorder the skills section** so the most relevant skills come first, and
   add posting keywords the user genuinely has. Drop the least relevant skills
   only when space is needed.
5. **Adjust the experience section**, using whichever strategies apply:
   - *Reorder roles* when an earlier role is more relevant than the latest.
     Keep every role and its dates visible.
   - *Swap bullet order* so each role leads with the bullet that answers the
     posting's key requirement.
   - *Adjust bullet language* to use the posting's terms where they describe
     the same work.
6. **Adjust the rest**: relevant coursework, certifications to highlight,
   projects to include.
7. **Apply a scenario strategy** if one fits (below).
8. **Run the pre-submit checklist** (below), then re-check coverage: count how
   many of the posting's requirements the resume visibly evidenced before and
   how many it evidences now. Report both counts. Do not report a new match
   score: tailoring changes what the resume shows, not what the user has.
9. **Report and file.** Produce the change report, name and log the new
   version as the **version-manager** skill describes, and keep the report
   with it as notes for interview preparation.

For before-and-after examples of each adjustment, see
[references/tailoring-examples.md](references/tailoring-examples.md).

## The truth line

| Acceptable tailoring                  | Not acceptable                         |
| ------------------------------------- | -------------------------------------- |
| Reordering true information           | Adding skills the user doesn't have    |
| Emphasizing relevant experience       | Changing numbers or metrics            |
| Using industry-standard terminology   | Creating experiences                   |
| Adding context to vague statements    | Claiming titles the user didn't hold   |
| Matching the posting's language style | Listing certifications not earned      |

Never invent employers, titles, dates, degrees, metrics or skills. When a
bullet needs context or a number the resume doesn't contain, ask the user. An
estimated number must be derived from facts the user gave, labelled as an
estimate and confirmed with the user before it goes into the resume.

## Keyword integration

- Add a keyword only where it truthfully describes the user's work.
- Use the posting's exact phrasing when it is accurate.
- Place keywords naturally, in context, and across several locations: summary,
  skills, experience.
- Don't stuff: no term repeated over and over, and no bullet whose meaning has
  drifted from what actually happened.
- Readability beats keyword density.

## Scenario strategies

- **Technical role at a non-tech company.** They want technical skill and
  business acumen. Lead with technical achievements, put business impact in
  every technical bullet, and show translating technical concepts for business
  stakeholders if the user has done it.
- **Management role, with both IC and management history.** Show leadership
  without losing technical credibility. Emphasize leadership in the summary,
  lead each role with team-management bullets, and keep some technical bullets
  to show understanding of the work.
- **Startup, after big companies.** Show comfort with ambiguity and wearing
  many hats. Highlight cross-functional work, initiative and scrappy, creative
  problem-solving; de-emphasize rigid processes and large team structures.
- **Big company, after startups.** Show working within structure and at scale.
  Emphasize process improvement, work that scaled, collaboration across teams
  and metrics that show impact at scale.

## Pre-submit checklist

1. The summary names the exact job title or function.
2. The top five skills match the posting's top five requirements.
3. The most relevant experience is positioned first.
4. Each role's top bullet addresses a key requirement.
5. Posting keywords appear naturally throughout.
6. Company and industry terminology is used correctly.
7. Every claim is truthful.
8. The file is named per the **version-manager** convention.
9. ATS-safe formatting is intact; tailoring never trades it away (see the
   **formatter** skill).
10. The change report is saved for interview preparation.

## Output

Before producing output, read
[templates/tailored-resume-changes.md](templates/tailored-resume-changes.md)
and follow it. Deliver the tailored resume itself alongside the report when
the user asked for the document, not just the plan.

## Resources

- [templates/tailored-resume-changes.md](templates/tailored-resume-changes.md) -
  the change report shape; read before every tailoring run.
- [references/tailoring-examples.md](references/tailoring-examples.md) - read
  when rewriting a summary, reordering skills or roles, or rephrasing a bullet
  and a worked before-and-after would help.
