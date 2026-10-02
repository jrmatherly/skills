---
name: application-form-filler
description: Writes direct, copy-pasteable answers to job application form fields on Greenhouse, Lever, Ashby, Workday or any other ATS, drawn from the user's CV and the job description. Use when the user is filling in a job application and says "fill this out", "what do I write here" or "answer this application question", mentions a "job application form", or needs a reply to prompts like "tell us about yourself" or "why do you want to work here".
metadata:
  author: jrmatherly
  version: "1.0"
---

# Application form filler

Answer application form questions directly and specifically. A form answer is
not a cover letter crammed into a text box: each field has a purpose, so answer
that purpose and stop. The result should read as if a real person typed it, not
as a filled-in template.

## Inputs to gather

1. **The job description** - mirror its language and priorities.
2. **The user's CV or profile** - the source for real projects, roles, years
   and metrics.
3. **The exact question and field type** - single line, short answer,
   textarea, dropdown or rating, plus any character or word limit the form
   shows.

If the CV or the job description is missing, ask for it before writing.

## Truthfulness

Never invent employers, titles, dates, degrees, metrics, skills, projects or
links. State years of experience honestly and pick the accurate level on
rating and dropdown fields: inflated ratings fall apart in technical
interviews. Where experience is indirect, dated or missing, say so. An
estimated number must be derived from the user's facts, labelled as an estimate
and confirmed with the user before it goes into an answer. Factual and legal
fields (work authorization, visa sponsorship, salary expectation, notice
period, start date, demographic and disability questions) are never inferred:
ask the user and enter exactly what they say.

## Process

1. Read the question and answer exactly what was asked.
2. Classify it using the table below and apply that type's shape.
3. Anchor every claim to a real project or role from the CV.
4. For company-specific questions, research the company first if the provided
   material has nothing specific to say about it.
5. Size the answer to the field (see length calibration). A limit shown on the
   form overrides these targets.
6. Check the draft against
   [references/common-mistakes.md](references/common-mistakes.md).
7. Before producing output, read
   [templates/answer-format.md](templates/answer-format.md) and follow it.

## Question types

| Type | Typical prompt | Shape of the answer | Length |
| --- | --- | --- | --- |
| Experience / background | "Describe your experience with [domain]" | Skill, years, one sentence of project context | 2-4 sentences |
| Why this company / role | "Why do you want to work at [Company]?" | A specific thing about the company, tied to real past work | Under 150 words |
| Portfolio / work samples | "Link to relevant projects" | List: name, links, one line with one proof point | List, no prose |
| Technical skills | "Which frameworks have you used most?" | Per skill: years plus what was built with it | 1-2 sentences per skill |
| Open-ended | "Tell us about yourself" | Current role, relevant past, what is wanted next | 100-200 words |
| Situational / behavioral | "Describe a time you..." | Condensed STAR without labels, ending on the result | 150-250 words |
| Opinion / vision | "Where do you see [domain] in 5 years?" | One or two committed views with brief reasoning | 100-150 words |

The answer format, rules and example prompts for each type are in
[references/question-types.md](references/question-types.md). Read the
section for the type being answered.

## Length calibration by field

| Field | Target |
| --- | --- |
| Single-line text | 1 sentence |
| Short answer | 2-4 sentences |
| Long answer / textarea | 100-250 words |
| "Describe your experience" in a textarea | 150-300 words |
| Portfolio / links section | List format, no prose |

When in doubt, go shorter. Form answers get skimmed; aim for clear and
memorable, not comprehensive.

## Rules for every answer

- First person, active voice, facts and projects.
- No trait statements ("I'm passionate about...", "I'm a fast learner"). Let
  the described work show the trait.
- Be specific to this company and role. Don't repeat the job description back.
- Include only what is relevant to this role. Never pad.
- State a gap plainly and move on, without apology or over-qualifying.

## Resources

- [templates/answer-format.md](templates/answer-format.md) - read before every
  output: how to present one or several answers for copy-paste.
- [references/question-types.md](references/question-types.md) - read the
  section for the question type in hand: format, rules and example prompts.
- [references/common-mistakes.md](references/common-mistakes.md) - read when
  reviewing a draft: the five frequent failures with fixes.
