---
name: tech-resume-optimizer
description: Optimizes resumes for software engineering, data, DevOps/SRE and technical product roles by restructuring the skills section, rewriting bullets around scale, impact and technology, and shaping projects, education and GitHub links. Use when the user asks for a "tech resume", "software engineer resume", "developer resume", "technical resume", "SWE resume" or "technical PM resume", or is applying for developer or other technical jobs.
metadata:
  author: jrmatherly
  version: "1.0"
---

# Tech resume optimizer

Rework a resume for a technical role (software engineer, data engineer,
DevOps/SRE, technical product manager) so that it carries the right skill
keywords and shows technical depth, scale and business impact to an engineer
or technical recruiter.

This skill covers only what is specific to technical resumes. For general
bullet-writing technique use the **bullet-writer** skill, for layout and ATS
formatting the **formatter** skill, and for finding numbers the **quantifier**
skill.

## Inputs to gather

- The current resume, in full.
- The target role and level, and the job description when there is one. With
  a job description, run the **job-description-analyzer** skill first and use
  its required stack in the steps below.
- Links: GitHub, portfolio or personal site, LinkedIn, tech blog.
- The facts behind each role and project: what was built, with which
  technologies, at what scale (users, requests, data volume, uptime), and
  what changed as a result. Ask for these; do not infer them.

## Rules

- **Truthfulness.** Never invent employers, titles, dates, degrees, metrics,
  technologies or projects. An estimated number must be derived from facts the
  user gave, labelled as an estimate and confirmed with the user before it
  goes into the resume. The numbers in the bundled examples are illustrative.
- **Interview-proof.** List only technologies the user can discuss in depth.
  Every project and bullet must be something the user can explain: the
  architecture, the decisions, the story behind the result. Flag any item that
  looks like a one-time touch and ask whether to keep it.
- **Two readers.** The resume must match keyword filters and convince a
  technical reader. For the filter: exact skill names as the job description
  writes them and standard section headers (the **formatter** skill has the
  formatting rules). For the reader: technical depth, metrics and scale,
  problem-solving and evidence of systems understanding.

## What technical readers look for

Check the draft against these, in this order of weight:

1. Relevant technical skills: languages, frameworks, tools.
2. Scale and impact: users, transactions, data size.
3. Problem-solving ability.
4. System design understanding.
5. Collaboration.
6. Growth trajectory.

## Process

1. **Set the section order.** Contact information (with GitHub and
   portfolio), professional summary (optional), technical skills, work
   experience, projects (they matter most early in a career), education,
   certifications (if relevant).
2. **Fix the contact block.** Name, city and state, email, phone, LinkedIn,
   GitHub (expected for software engineering roles), portfolio or site, tech
   blog if there is one. Remove street address, photo and unrelated social
   media.
3. **Restructure the skills section.** Pick a layout and prune the list using
   [references/skills-section.md](references/skills-section.md). Order each
   line by relevance to the target role, not alphabetically.
4. **Rewrite experience bullets** with the technical bullet formula:

   ```
   [Action verb] + [technical what] + [scale/impact] + [technology used]
   ```

   Replace "worked on", "helped" and "built features" with what was designed
   or built, how big it was and what it changed. For each weak bullet, ask the
   user for the missing scale or outcome before rewriting. For the kinds of
   metric to ask about and worked examples per role, see
   [references/bullet-examples.md](references/bullet-examples.md).
5. **Build or trim the projects section.** It matters most for junior
   engineers, career changers, bootcamp graduates and anyone with employment
   gaps. For the entry format and what qualifies, see
   [references/projects-and-education.md](references/projects-and-education.md).
6. **Format education** for the user's path (degree, bootcamp or self-taught)
   using the same reference.
7. **Handle the stack match.**
   - Where the user matches the target stack: lead with those technologies in
     the skills section and bullets, and quantify experience with them.
   - Where the match is partial: name the similar technology the user does
     have, emphasize the transferable concept and show evidence of learning
     quickly. Example: for a role asking for a Python framework the user has
     not used, "Extensive Python web framework experience (Django); quick to
     ramp on new frameworks".
   - Record each real gap in the report rather than papering over it.
8. **Review the GitHub profile** if the user links one. Recommend: pin the
   best six repositories, most relevant first; add a profile README; keep
   recent visible activity; give every pinned project a README covering what
   it does, technologies used, how to run it, screenshots or a demo, and the
   user's own contribution on collaborative projects.
9. **Produce the report.** Before producing output, read
   [templates/optimization-report.md](templates/optimization-report.md) and
   follow it.

## Before finishing

- Every technology in the skills section appears in at least one bullet or
  project, or the user confirmed it belongs.
- Every rewritten bullet names a technology and a scale or outcome the user
  supplied or confirmed.
- No skill bars, ratings, tables or graphics.
- Gaps against the target stack are listed, each with a way to address it.

## Resources

- [references/skills-section.md](references/skills-section.md) - layouts for
  the skills section, what belongs in each category and what to leave out.
  Read at step 3.
- [references/bullet-examples.md](references/bullet-examples.md) - metric
  types and before/after bullets for software, data, DevOps/SRE and technical
  PM roles. Read at step 4.
- [references/projects-and-education.md](references/projects-and-education.md)
  has the project entry format and examples, and education formats for
  degree, bootcamp and self-taught paths. Read at steps 5 and 6.
- [templates/optimization-report.md](templates/optimization-report.md) - the
  output shape. Always read before producing output.
