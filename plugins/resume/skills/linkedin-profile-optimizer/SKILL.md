---
name: linkedin-profile-optimizer
description: Optimizes a LinkedIn profile for recruiter search, visibility and engagement by rewriting the headline, About and Experience sections, adding keywords and skills, and aligning the profile with the resume. Use when the user asks to "optimize my LinkedIn", improve a "LinkedIn profile" or "LinkedIn headline", sync a resume with LinkedIn, or attract recruiters and job opportunities.
metadata:
  author: jrmatherly
  version: "1.0"
---

# LinkedIn profile optimizer

Rewrite a LinkedIn profile so recruiters searching for the user's target role
find it, and so it reads as a person worth contacting. A profile is not a
pasted resume: it is always-on, addressed to every recruiter at once, and has
room for voice.

## Inputs to gather

- The current profile: pasted text of each section or LinkedIn's PDF export.
  Ask for it; do not assume its contents.
- The resume, as the factual source for titles, dates and achievements.
- Target roles, industries and locations, and one or more job descriptions
  for those roles to mine keywords from.
- Whether the search is open or must stay hidden from the current employer.
- What cannot be seen from text: photo, banner, connection count,
  recommendations, Featured items. Ask rather than guess.

## Truthfulness

Never invent employers, titles, dates, degrees, metrics, skills,
certifications or recommendations. Add a keyword or skill only if the user's
experience supports it. An estimated number must be derived from the user's
facts, labelled as an estimate and confirmed with the user before it goes into
the profile. Titles, dates and core metrics must match the resume.

## How LinkedIn differs from a resume

| Aspect | Resume | LinkedIn |
| --- | --- | --- |
| Length | 1-2 pages | Room for more detail |
| Tone | Formal | More conversational, first person |
| Keywords | Specific to one job | Industry-wide |
| Audience | One employer | All recruiters |
| Updates | Per application | Kept current |
| Personality | Minimal | Show more |

When syncing from a resume:

- **Keep the same**: core achievements and metrics, job titles and dates, key
  skills and qualifications, the overall career narrative.
- **Expand**: detail and context in descriptions, bullets per role,
  personality and voice.
- **Adjust**: tone (more conversational), keywords (broader than one job),
  and add a call to action with contact details.

## Process

1. **Assess the current profile** against the completeness checklist in
   [references/search-and-visibility.md](references/search-and-visibility.md).
   Note missing sections and weak ones.
2. **Build the keyword list** from target job descriptions, profiles of
   people in the target role, and industry terminology: job title and its
   variations, key skills, tools, methodologies, certifications. Keep only
   terms that are true of the user. The **job-description-analyzer** skill
   can extract them.
3. **Rewrite the headline** first; it carries the most search weight. Use
   `[Role] | [Key expertise] | [Value proposition]` within the character
   limit. Never use it for "Looking for opportunities" or "Open to work".
4. **Rewrite the About section**: a hook in the first line (only the opening
   shows before "see more"), who the user is and what they do, key
   achievements and specialties, what they want next, a keyword-bearing
   skills line, and a call to action.
5. **Improve each Experience entry**: a 2-3 sentence role description, 4-6
   achievement bullets, the role's skills, and media to attach. For bullet
   wording, use the **bullet-writer** skill.
6. **Recommend skills** to add, reorder and pin, grouped as job-specific,
   tools, methodologies, soft skills and industry terms.
7. **Advise on the rest**: photo, banner, Featured, recommendations,
   recruiter visibility settings and posting. Match the Open to Work
   visibility to how discreet the search must be.
8. **Place keywords** in priority order: headline, About (several times,
   naturally), Experience, Skills. Prefer the exact phrases recruiters use.

Section-by-section specifications, limits and examples for steps 3-7 are in
[references/profile-sections.md](references/profile-sections.md). Read it
before rewriting any section. Settings, the checklist, keyword placement and
content strategy are in
[references/search-and-visibility.md](references/search-and-visibility.md).

LinkedIn changes its limits, settings and feature names. Treat the figures in
the references as a starting point and confirm against LinkedIn's current
help pages, or ask the user what the editor shows, before relying on one.

## Output

Before producing output, read
[templates/optimization-report.md](templates/optimization-report.md) and
follow it. Write the headline and About section in full, ready to paste.

## Resources

- [templates/optimization-report.md](templates/optimization-report.md) - read
  before every output: the report structure.
- [references/profile-sections.md](references/profile-sections.md) - read
  before rewriting: per-section requirements, formulas, limits and examples
  for photo, banner, headline, About, Experience, Skills, Featured and
  recommendations.
- [references/search-and-visibility.md](references/search-and-visibility.md) -
  read for the assessment and the advice steps: keyword sourcing and
  placement, completeness checklist, recruiter visibility settings and
  content strategy.
