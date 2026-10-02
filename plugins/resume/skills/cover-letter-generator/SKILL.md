---
name: cover-letter-generator
description: Writes a personalized cover letter from the user's resume and a job description, matching tone to the company, connecting specific experience to the role's requirements and handling qualification gaps. Use when the user asks to "write a cover letter", wants an "application letter" or a "letter for a job", or needs to address specific job requirements in letter form.
metadata:
  author: jrmatherly
  version: "1.0"
---

# Cover letter generator

Write a cover letter that adds what the resume can't: evidence of company
research, a direct line from the user's experience to this employer's needs, and
an answer to "why you, why now, why here". A letter that could be sent to any
company is a failed letter.

## Inputs to gather

- The resume (or equivalent career history) and the full job description. Ask
  for whichever is missing before writing.
- Requirement match and gaps. If the job description has not been analyzed yet,
  run the **job-description-analyzer** skill first and carry over its match
  score, strengths and gaps.
- Company facts worth referencing: a recent launch, product, initiative, stated
  value. Research current information or ask the user; never write company
  facts from memory.
- Hiring manager's name and any referral or mutual connection, if the user has
  one.
- Contact details for the header.

## Truthfulness

Never invent employers, titles, dates, degrees, metrics, skills, referrals or
connections. Use only achievements found in the user's material. An estimated
number must be derived from facts the user gave, labelled as an estimate and
confirmed with the user before it goes into the letter. Company facts must come
from research or the user.

## Shape of the letter

- 250-400 words in 3-4 paragraphs, business-letter style.
- Tone: confident without arrogance, personal but professional. Match the
  company's culture; see
  [references/scenarios.md](references/scenarios.md) for industry and
  startup-versus-enterprise adjustments.

| Paragraph | Job | Length |
| --- | --- | --- |
| Opening | Hook, the position, why this company | 2-3 sentences |
| Body 1 | Strongest qualification matched to their top requirement | 3-4 sentences |
| Body 2 | Additional value, any gap handled, company fit | 3-4 sentences |
| Closing | Specific enthusiasm, call to action, thanks | 2-3 sentences |

## Process

1. **Pick the talking points.** From the analysis, choose the user's strongest
   match for the role's top requirement, one or two supporting strengths, and
   any gap obvious enough that a reader will notice it.
2. **Choose a hook.** Pick the one hook type the user's facts support best:
   specific company knowledge, mutual connection, problem-solver, impressive
   achievement or industry insight. A real referral always leads. Open with
   the company or the hook rather than with "I". Examples of each type and the
   openings to avoid are in
   [references/paragraph-examples.md](references/paragraph-examples.md).
3. **Write body 1** with the formula: their need + the user's exact experience
   + a specific result. Include at least one real metric or concrete
   achievement.
4. **Write body 2.** If there is a gap, address it without apology: name what
   the user is doing about it and the adjacent evidence that compensates. If
   there is none, add a further strength and a researched reason for wanting
   this company.
5. **Close** with enthusiasm for something specific, the contribution the user
   would make, a clear call to action and thanks.
6. **Handle special situations**: unknown hiring manager, referral,
   underqualified, overqualified, career change. See
   [references/scenarios.md](references/scenarios.md).
7. **Produce the output.** Before producing output, read
   [templates/cover-letter-output.md](templates/cover-letter-output.md) and
   follow it. It includes two alternative openings and interview talking
   points.

## Before delivering

- Opens with a hook, not "I am writing to apply".
- Mentions specific, verified company knowledge.
- Connects experience directly to the job's requirements.
- Includes at least one specific metric or achievement from the user's
  material.
- Addresses any obvious gap.
- Ends with a clear call to action.
- Is 250-400 words in 3-4 paragraphs, with no typos or grammatical errors.
- Reads as a letter that would make the hiring manager want an interview.

## Resources

- [templates/cover-letter-output.md](templates/cover-letter-output.md) - read
  before every output: the response structure and the letter layout.
- [references/paragraph-examples.md](references/paragraph-examples.md) - read
  when drafting: example hooks, body paragraphs and closings, with the phrases
  to avoid.
- [references/scenarios.md](references/scenarios.md) - read when the industry,
  company type or the user's situation (referral, gap, over- or
  underqualified, career change, unknown recipient) needs special handling.
