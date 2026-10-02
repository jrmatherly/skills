---
name: cold-email-writer
description: Writes a short, personalized cold outreach email to a hiring manager, founder or recruiter that reads like a person who noticed something specific about the company, not a cover letter or a pitch. Use when the user asks for a "cold email", an "intro email" or "outreach", wants to "reach out" or "contact the hiring manager", or wants to introduce themselves to a company without a referral.
metadata:
  author: jrmatherly
  version: "1.0"
---

# Cold email writer

Write a cold email that sounds like a smart person who noticed something
specific about the company, not a candidate broadcasting credentials. Cold
emails fail when they read like cover letters; aim for the feel of a colleague
mentioning something interesting they read.

## Inputs to gather

1. **Company angle.** Read the company's website, job description or About
   page and find one specific thing worth mentioning. If the user gave a job
   description but no company site, ask for it or fetch it before writing.
2. **Recipient name.** Look on the team page or LinkedIn, or ask the user.
   "Hi [Name]" beats "Hi Hiring Manager".
3. **The user's background**: current role, relevant past work, and the one or
   two projects that best fit the role's domain, with links.
4. **Stack overlap.** Mention it only where the match is real.
5. **Location and experience.** Whether the user is in a different country
   from the company, and how their years of experience compare with what the
   role lists.
6. **Portfolio URL and reply address.**

## Truthfulness

Never invent employers, titles, dates, degrees, metrics, skills, projects or
proof points. The hook must come from something actually read in the company's
material, and every claim about the user from what they provided. An estimated
number must be derived from the user's facts, labelled as an estimate and
confirmed with the user before it goes into the email.

## Structure

Write the parts in this order. Skeleton wording for each is in the template.

| Part | Length | What it does |
| --- | --- | --- |
| Subject | 1 line | `Quick intro - [First Last]`. No clickbait, no role title |
| Hook | 2-3 sentences | What specifically pulled the user in about this company |
| Location disclosure | 1-2 sentences | Only if in a different country: say so early and casually |
| Experience gap | 1-2 sentences | Only if the role lists more years: state it once and redirect to shipped work |
| Body | 3-5 sentences | Current role, relevant past, one or two projects |
| Connection | 1-2 sentences | Bridge from the background to what the role wants |
| Portfolio link | 1 line | `More about me: [URL]`, with no elaboration |
| Closing | 2-3 sentences | Low-pressure and confident, then first name and email |

## Rules

- **Hook**: specific to this company. Good sources are a number or stat from
  their materials, a product decision that shows domain understanding, or a
  technical insight from the job description. Generic compliments, vague
  mission talk and flattery are not hooks.
- **Body**: mention work as context, not as proof of greatness. No achievement
  listings ("I increased X by Y%"); let a project and its one proof point
  speak. Say what the user does, not their job title. If the current company
  is remote with a European or international team, say so explicitly. Two
  projects at most, the most relevant only.
- **Connection**: phrase it as an observation or a belief ("I feel like I'd be
  a strong fit"), not a claim of certainty.
- **Gaps**: acknowledge directly and move on. Never apologize.
- **Closing**: not desperate, not corporate. Avoid "I look forward to hearing
  from you", "Please find attached my resume", "I would love the opportunity
  to..." and "I am excited to potentially join...".
- **Length**: 200-300 words is ideal; 150 minimum, so substance is not
  stripped for brevity; 400 maximum. Longer is fine only if every sentence
  earns its place. Cut anything that could be said to any company.

For good and bad versions of each part and a complete sample email, see
[references/examples-and-mistakes.md](references/examples-and-mistakes.md).

## Output

Before producing output, read
[templates/cold-email.md](templates/cold-email.md) and follow it. Deliver the
final email in one plain code block so it copies cleanly.

## Before delivering

- The opening names something only this company could be told.
- The recipient is addressed by name where one was found.
- Every fact about the user traces to their material.
- No phrase from the avoid list appears.
- Word count is within 150-400.

## Resources

- [templates/cold-email.md](templates/cold-email.md) - read before every
  output: the email layout and skeleton wording for each part.
- [references/examples-and-mistakes.md](references/examples-and-mistakes.md) -
  read when drafting or reviewing: hook examples, common mistakes with fixes,
  and a full example email.
