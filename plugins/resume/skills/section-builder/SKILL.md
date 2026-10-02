---
name: section-builder
description: Builds and optimizes individual resume sections (professional summary, skills, experience, education, certifications, projects and other additions) and sets their order for the user's career stage and target role. Use when the user mentions "resume sections", "skills section", "summary section", "experience section" or "what to include", wants a resume reviewed or one part improved with no specific posting in hand, or is unsure what belongs in a section.
metadata:
  author: jrmatherly
  version: "1.0"
---

# Section builder

Decide which sections a resume needs, in what order, and what goes in each,
based on the user's career stage and target role. Draft the sections the user
asks for from the facts they supply.

## Inputs

- **Career stage**: entry level (0-2 years), mid-career (3-10), senior (10+),
  and whether the user is changing careers or returning to work.
- **Target role** and its type (technical, executive, general).
- **The existing resume or the raw facts** for each section in scope.
- **Scope**: one section or the whole resume.

Ask for whatever is missing. Never invent employers, titles, dates, degrees,
metrics or skills; an estimated number must be derived from facts the user
gave, labelled as an estimate and confirmed before it goes into the resume.

## Process

1. Establish career stage and target role.
2. Choose the section order (below).
3. For each section in scope, apply its rules below and draft it.
4. Run the closing checks.
5. Before producing output, read
   [templates/section-recommendations.md](templates/section-recommendations.md)
   and follow it.

## Section order

| Profile         | Order                                                             |
| --------------- | ----------------------------------------------------------------- |
| Standard        | Contact, Summary (optional), Skills, Experience, Education, Additional |
| Technical       | Contact, Skills, Experience, Projects, Education, Certifications   |
| Recent graduate | Contact, Education, Skills, Experience/Internships, Projects, Activities |
| Executive       | Contact, Executive Summary, Career Highlights, Experience, Board Roles, Education |
| Career changer  | Contact, Summary (explaining the transition), Skills (transferable), Experience (reframed), Bridge Experience, Education |

## Professional summary

Include one for career changers (to explain the transition), senior
professionals (to distill a long career), people returning to the workforce
(to address the gap) and highly specialized roles (to stress fit). Skip it for
entry-level candidates with little experience, for a straightforward career
progression, or when space is tight.

Formula: `[Title/identity] + [Years/experience] + [Key skills] + [Value
proposition]`

- State what the user offers, not what they want; no objective statements.
- No third person ("John is a ...").
- No stock phrases: "Seeking a challenging position", "Hard-working team
  player", "Results-oriented professional".

For a model summary at each career stage, see
[references/section-formats.md](references/section-formats.md).

## Skills

| Format             | Best for                                             |
| ------------------ | ---------------------------------------------------- |
| Simple list        | ATS optimization, tight space                        |
| Categorized        | Technical roles, extensive skill sets                |
| Proficiency levels | Roles that require a specific proficiency; use with care and only with honest levels |

Include technical and hard skills (programming languages, software and tools,
methodologies such as Agile or Lean, platforms such as Salesforce or SAP,
certifications), functional skills (project management, financial analysis,
data analysis, market research) and industry knowledge (domain expertise,
regulatory knowledge, industry certifications).

Exclude Microsoft Office (assumed), anything "basic", skills the user couldn't
discuss in an interview, outdated technologies, and soft skills as list items
(show those through experience bullets instead).

## Experience

| Stage                    | Recent roles | Older roles | Focus                         |
| ------------------------ | ------------ | ----------- | ----------------------------- |
| Entry level (0-2 years)  | 3-5 bullets  | -           | Relevant projects, initiative and learning; quantify where possible |
| Mid-career (3-10 years)  | 4-6 bullets  | 2-3 bullets | Achievements over duties; strong metrics throughout |
| Senior (10+ years)       | 5-6 bullets  | 2-3 bullets | Leadership and strategy; increasing scope |

Name the layout in the output: standard (reverse-chronological), functional
(grouped by skill) or hybrid. Write each bullet as an achievement with a
metric and its impact; for the wording use the **bullet-writer** skill and for
missing numbers the **quantifier** skill.

## Education

| Stage       | Include                                                        |
| ----------- | -------------------------------------------------------------- |
| Entry level | Degree, major, school, year; GPA if 3.5 or higher; honors and awards; relevant coursework; academic projects; study abroad |
| Mid-career  | Degree, major, school, year; GPA only if exceptional; no coursework (experience replaces it) |
| Senior      | Degree and school; the year may be omitted to limit age bias; professional development is more relevant |

## Additional sections

| Section              | Include when                                           |
| -------------------- | ------------------------------------------------------ |
| Projects             | Entry level with limited work experience; career changers showing new skills; technical roles with personal projects |
| Volunteer            | The work is relevant, shows leadership, or fills an employment gap meaningfully |
| Languages            | Relevant to the role or company and beyond basic conversational; state proficiency accurately |
| Publications/patents | Academic positions, research roles, technical thought leadership |
| Awards/recognition   | Significant industry awards, company-wide recognition, relevant honors |

The same reference has the layout of every section, and covers multiple roles
at one company, short tenures and contract or freelance work.

## Closing checks

- Section order fits the target role, and every section supports that role.
- The summary, if included, is concise and targeted.
- Skills are relevant and organized.
- Experience bullets are achievement-focused.
- Education detail suits the career stage.
- Additional sections add value; none is filler.
- Formatting is consistent throughout (see the **formatter** skill).
- Nothing irrelevant or outdated remains.
- Total length is one to two pages.

## Resources

- [templates/section-recommendations.md](templates/section-recommendations.md) -
  the output shape; read before every response.
- [references/section-formats.md](references/section-formats.md) - read when
  drafting a summary, laying out skills, experience, education,
  certifications or an additional section, or handling an unusual employment
  situation.
