---
name: version-manager
description: Sets up and maintains a master resume as the single source of truth, organizes tailored versions by role, industry and seniority under one file naming convention, and tracks which version went to which employer. Use when the user mentions "resume versions", "master resume", "different versions", "track resumes" or "which resume", has many resume files to sort out, or is applying to many different roles.
metadata:
  author: jrmatherly
  version: "1.0"
---

# Version manager

Keep one master resume, derive every tailored version from it, name and file
versions consistently, and record what was sent where. This ends "which
version did I send?", stale resumes, and tailoring from the wrong base.

## Inputs

- **Where the resume files live**: a folder path to inspect, or a list of the
  files from the user. Report only on files actually seen or listed.
- **The existing master resume and application tracker**, if any.
- **The roles, industries and levels** the user is targeting, and roughly how
  many applications are planned.

## Decide what the request needs

| Situation                                   | Do                               |
| ------------------------------------------- | -------------------------------- |
| No master resume, or several "masters"      | Build the master                 |
| Many files, unclear which is current        | Audit and reorganize             |
| A new application                           | Create a tailored version        |
| A new job, project, skill or award          | Update the master                |
| "Which resume did I send to X?"             | Look it up in the tracker        |
| "Where do things stand?"                    | Produce the status report        |

## Build the master

The master holds everything: all experience, every bullet ever written, every
achievement, project and skill, at full detail and any length. It is never
sent; it is the source to select from.

1. Read [templates/master-resume.md](templates/master-resume.md) and follow
   it.
2. Merge every existing version into it: keep each distinct bullet and each
   summary variant, labelled by focus or role type.
3. Under each role, list the keywords that experience demonstrates.
4. Ask the user for anything missing. Never invent employers, titles, dates,
   degrees, metrics or skills; an estimated number must be derived from the
   user's facts, labelled as an estimate and confirmed before it is written.
5. Set `Last updated` to today's date, and again on every later edit.

## Audit and reorganize

1. List the files and identify the base, role and date of each.
2. Propose the folder layout and new names from
   [references/file-organization.md](references/file-organization.md).
3. Confirm with the user before moving or renaming anything. Archive old
   versions; never delete them.
4. Enter every version already sent into the tracker, asking the user for
   dates and statuses.

## Create a tailored version

1. Start from the master and copy it to a new file. Never edit the master for
   an application.
2. Analyze the posting with the **job-description-analyzer** skill.
3. Tailor the copy with the **tailor** skill: select the relevant bullets from
   the master, choose the fitting summary variant, reorder skills, add
   job-specific keywords.
4. Trim to the appropriate length.
5. Save under the naming convention, in the folder for its role type.
6. Add a row to the application tracker.

To choose what a version should emphasize, or how many versions to keep for
the user's situation, see
[references/version-strategy.md](references/version-strategy.md).

## Update the master

Update immediately for a new job or promotion, a completed major project, a
new skill or certification, a significant achievement, or an award.

Review quarterly with the user: add recent accomplishments, refresh metrics
with new data, refresh the skills section, remove outdated information, and
move tailored versions older than about six months to the archive.

After a master update, tell the user which base versions are now behind it.

## Track applications

Read [templates/application-tracker.md](templates/application-tracker.md) and
follow it. Add a row when a version is created for an application, and update
the row's status, follow-up date and notes whenever the user reports news.
Record only what the user confirms; never assume an application was sent.

## Rules

- One master, and every version pulls from it.
- Descriptive, dated file names; nothing like `resume_final_v2`.
- Every sent version has a tracker row.
- Keep the master current.
- Archive old versions instead of deleting them.
- Recommend a cloud backup of the whole resume folder.

## Status report

When asked for an overview or after an audit, read
[templates/version-status-report.md](templates/version-status-report.md) and
follow it. Build it from the master, the files and the tracker as they are
now; it is a snapshot, not a file to maintain.

## Resources

- [templates/master-resume.md](templates/master-resume.md) - the master resume
  structure; read before building or restructuring a master.
- [templates/application-tracker.md](templates/application-tracker.md) - the
  tracker columns; read before creating or updating the tracker.
- [templates/version-status-report.md](templates/version-status-report.md) -
  the overview shape; read before reporting on the state of the versions.
- [references/file-organization.md](references/file-organization.md) - folder
  layout and file naming convention; read before naming, saving or moving
  any resume file.
- [references/version-strategy.md](references/version-strategy.md) - what each
  kind of version emphasizes and how many versions to keep; read when
  planning versions for the user's search.
