---
name: formatter
description: Lays out a resume so it parses cleanly in applicant tracking systems and scans quickly for a human reader, covering page length, margins, fonts, spacing, section order, headers, the contact block, dates and file format. Use when the user asks to format a resume, fix a messy or hard-to-read resume, or mentions resume layout, resume design, clean resume, professional format or ATS-friendly formatting.
metadata:
  author: jrmatherly
  version: "1.0"
---

# Resume formatter

Lay out a resume for its two readers: an applicant tracking system (ATS) that
parses text, and a recruiter who scans quickly. One clean, simple layout serves
both. This skill covers layout and typography only. For bullet wording use the
**bullet-writer** skill, for what goes in each section the **section-builder**
skill, and for keyword matching the **ats-optimizer** skill.

## Inputs to gather

- The resume, as a file or pasted text. Pasted text hides fonts, margins,
  columns, tables and header/footer use, so ask about them instead of guessing.
- Years of experience and level (sets page length).
- How it will be submitted: an online application form, or email / direct send.
- Whether the user wants a review, or the resume re-laid-out.

## Process

1. Check the document setup and the ATS-safe rules below. List every violation.
2. Check section order and header names.
3. Check each section's internal layout against
   [references/section-layouts.md](references/section-layouts.md).
4. Check visual hierarchy and white space.
5. Check file format and file name.
6. Before producing output, read
   [templates/formatting-review.md](templates/formatting-review.md) and follow
   it.
7. If asked to re-lay-out the resume, apply the fixes and return the full text
   in the layouts from the reference, then note the settings (font, sizes,
   margins) that plain text cannot show.

For a diagnosis of a typical problem (wall of text, half-empty page, creative
template), see [references/common-mistakes.md](references/common-mistakes.md).

## Document setup

| Setting | Value |
| --- | --- |
| Page length | 0-5 years: 1 page. 5-15 years: 1-2 pages. 15+ years: 2 pages, 3 at most for executives |
| Margins | 0.5" to 1" on all sides, never under 0.5" |
| Fonts | Sans-serif: Arial, Calibri, Helvetica, Verdana. Serif: Times New Roman, Georgia, Garamond |
| Name size | 16-20pt |
| Section header size | 12-14pt |
| Body size | 10-12pt, never under 10pt |
| Line spacing | 1.0 to 1.15 |
| Paragraph spacing | 6-12pt after |
| Section spacing | 12-16pt between sections |

## ATS-safe rules

Do:

- Single-column layout, one font family, the same formatting for the same
  kind of element throughout.
- Simple bullet symbols: round bullet, hyphen or asterisk.
- Bold and italic sparingly.
- Contact details in the document body.
- Standard section headers (below).

Don't:

- Tables, text boxes or multi-column layouts.
- Anything important in the page header or footer: many parsers skip them.
- Images, graphics, charts, skill bars or progress indicators.
- Text embedded in an image, or a scanned PDF.
- Unusual fonts, special characters or emoji.
- Color as the only carrier of essential information.

## Section order and headers

Default order:

1. Contact information
2. Professional summary (optional)
3. Skills or technical skills
4. Professional experience
5. Education
6. Certifications (if relevant)
7. Additional (volunteer work, languages and similar)

Recommend a different order only with a reason tied to the user's situation,
and state the reason.

Use header names a parser recognizes: `Professional Experience` or
`Work Experience`, `Education`, `Skills` or `Technical Skills`,
`Professional Summary` or `Summary`, `Certifications`, `Projects`. Replace
inventive names such as "Where I've Been", "My Journey", "What I Bring to the
Table" or "Academic Pursuits" with the standard one. Plain descriptive headers
that the role-specific skills call for ("Core Competencies", "Career
Highlights", "Executive Profile", "Relevant Experience") stay as they are.

## Visual hierarchy and white space

- Prominence runs name, then section headers, then job titles and company
  names, then bullets. Build it with font size, bold (name, titles, headers),
  capitals for section headers and consistent spacing.
- Good white space: between sections, after headings, between bullets, around
  the margins.
- Bad white space: large gaps between sections, uneven spacing, a half-empty
  page, wide margins that waste room.

## File format and naming

- Online application: `.docx` parses most reliably; `.pdf` is fine when it was
  exported from a word processor and its text is selectable. Never `.pages` or
  `.odt`.
- Email or direct send: `.pdf`, which preserves the layout.
- Name the file so a recruiter can tell whose it is: never
  `resume_final_v2_FINAL.docx`, `resume (1).pdf` or `Untitled document.docx`.
  When the user keeps several versions, follow the naming convention in the
  **version-manager** skill; for a single resume `FirstName_LastName_Resume`
  is enough.

## Rules

- Change layout, not facts. Never add, alter or invent employers, titles,
  dates, degrees, metrics or skills while reformatting. If cutting for length
  means dropping content, propose the cuts and let the user decide.
- Consistency beats any single choice: one date format, one bullet symbol, one
  layout per section type.
- Report only what was observed. Mark settings that could not be inspected as
  "not checked" in the review.

## Resources

- [templates/formatting-review.md](templates/formatting-review.md) - the
  review format. Read before every review.
- [references/section-layouts.md](references/section-layouts.md) - layouts for
  the contact block, experience, skills and education, plus date and header
  styles. Read when checking or rebuilding a section.
- [references/common-mistakes.md](references/common-mistakes.md) - frequent
  formatting failures with fixes, and the pre-submission checklist. Read when
  diagnosing a resume or doing a final pass.
