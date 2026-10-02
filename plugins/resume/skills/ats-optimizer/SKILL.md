---
name: ats-optimizer
description: Checks a resume against a job description the way an applicant tracking system would, scoring keyword match, finding missing or near-miss terms and parse problems, and placing keywords where they count. Use when the user mentions ATS, keyword optimization or automated screening, asks whether a resume will pass, or says a resume is not working or not getting interviews. To rewrite a resume for one posting, use tailor.
metadata:
  author: jrmatherly
  version: "1.0"
---

# ATS optimizer

Measure how well a resume matches a job description on the terms an applicant
tracking system (ATS) searches and ranks by, then close the gap with keywords
the candidate can honestly claim. An ATS parses the resume into structured
data, searches it for the posting's terms and ranks candidates by match, so a
resume fails either because it cannot be parsed or because the terms are
absent.

## Inputs to gather

- The resume, as a file or pasted text.
- The target job description. Without one there is nothing to match against:
  ask for it, or limit the work to the parse check in step 1 and say so.
- The user's situation where it changes the advice: career change, recent
  graduate, executive level, employment gap.

## Process

1. **Parse check.** Load the **formatter** skill and check file format,
   layout, section headers and contact block against its document setup,
   ATS-safe rules and header names. List each problem that would stop text
   being read. That skill owns the formatting rules; do not restate them in
   the report beyond the specific problems found.
2. **Extract keywords** from the job description, by type (below). If the
   posting has already been broken down with the **job-description-analyzer**
   skill, use that output.
3. **Rank them.** Critical: in the title, listed as required, or repeated.
   Important: listed once, or as preferred.
4. **Match** each keyword against the resume (below).
5. **Score** the keyword match.
6. **Sort the gaps** with the user: terms they have but did not write down,
   terms they have under another name, and terms they do not have.
7. **Place** the first two groups (below) and write exact before/after text.
8. **Re-score** with the proposed changes applied.
9. Before producing output, read
   [templates/ats-report.md](templates/ats-report.md) and follow it.

If the user has access to an ATS scanner or their target company's parser
preview, suggest running the final file through it.

This skill measures and closes a keyword gap. When the user wants the whole
resume reworked for one posting (summary, ordering, emphasis), use the
**tailor** skill and run this check on the result.

## Keyword types

| Type | Examples |
| --- | --- |
| Hard skills | Languages (Python, Java, SQL), tools and platforms (Salesforce, AWS, Excel), certifications (PMP, CPA, CFA), methodologies (Agile, Six Sigma, SDLC) |
| Soft skills | Leadership, collaboration, communication, problem-solving, analytical thinking, project management, stakeholder management |
| Industry terms | B2B, SaaS, e-commerce; enterprise, SMB, mid-market; ARR, MRR, churn rate |

## Match analysis

For each keyword record:

1. Whether the exact phrase appears in the resume.
2. Whether a synonym or variation appears instead ("risk mitigation" for
   "risk management"). Count this as a near miss, not a match.
3. How many times it appears.
4. Where it appears: summary, skills or experience.

## Scoring

```
Keyword match = (keywords matched / keywords ranked) x 100
```

The keywords ranked are every Critical and Important keyword from step 3. An
exact match counts; a near miss and a missing term do not. Example: 20
keywords ranked and 15 matched exactly gives a keyword match of 75%. Treat 80%
or more as the working target for a strong match.

Call this number "keyword match", never "match score": it measures wording,
and the **job-description-analyzer** skill's match score measures
qualification. The two are not comparable.

Give the overall score out of 100 as the keyword match, lowered when parse
problems would stop matched keywords being read, and state what lowered it.
Present both as estimates: each ATS product scores differently and none
publishes its formula.

## Placement

1. **Professional summary.** Work the 5-8 most important keywords naturally
   into a 3-4 sentence paragraph, for example "Data Scientist with 5+ years
   using Python, SQL, and machine learning to drive business insights...".
2. **Skills section.** List keywords explicitly, in the posting's exact
   phrasing, grouped by category if there are many.
3. **Experience bullets.** Fold keywords into achievement statements. For the
   bullets themselves use the **bullet-writer** skill.

Density: critical keywords 2-4 times across the resume, important keywords 1-2
times, each in a different place and context. Keep the posting's exact phrase
at least once; other mentions may vary ("led team", "team leadership").

## Rules

- Add a keyword only where the candidate has the skill or experience behind
  it. Never invent employers, titles, dates, degrees, metrics or skills to
  raise a score. Report a term the candidate lacks as a gap, not an edit. Any
  number in a suggested bullet comes from the user; an estimate is labelled
  and confirmed with them first.
- Use the posting's terminology. "Programming, databases, making charts" does
  not match a posting that asks for "Python, SQL, Data Visualization".
- No keyword stuffing. "Python, Python programming, Python developer, Python
  expert" becomes "Python, SQL, JavaScript, React, Node.js", with each term
  then used naturally in bullets. The result must still read well to a person.
- Report file size and text extraction only when the actual file was
  inspected; otherwise mark them "not checked".

## Done when

- The keyword match is at the target, or the remaining gaps are real gaps the
  user has been told about.
- Every section would be recognized by a parser and no parse problem is open.
- Keywords meet the density above and the text reads naturally.
- File format and name are ready for submission.

For industry keyword emphasis and for career changers, recent graduates,
executives and employment gaps, see
[references/industries-and-cases.md](references/industries-and-cases.md).

## Resources

- [templates/ats-report.md](templates/ats-report.md) - the report format.
  Read before every report.
- [references/industries-and-cases.md](references/industries-and-cases.md) -
  what to emphasize by industry and how the approach changes for career
  changers, recent graduates, executives and employment gaps. Read when one
  of those applies.
