# Application tracker template

One row per application. Keep it in the format the user already uses (a
spreadsheet in `Applications/`, or a Markdown table); the columns are what
matter. Add the row when the version is created and update it when the user
reports news.

```markdown
| Company | Role | Resume version | Cover letter | Applied | Method | Status | Follow-up | Notes |
| ------- | ---- | -------------- | ------------ | ------- | ------ | ------ | --------- | ----- |
| [Company] | [Job title] | [File name] | [File name or "None"] | [Date] | [Portal / Referral / Direct] | [Status] | [Date] | [Contacts, context] |
```

Column notes:

- **Resume version** and **Cover letter**: the exact file names sent.
- **Method**: portal, referral or direct.
- **Status**: for example Drafted, Applied, Interview, Offer, Rejected,
  Withdrawn.
- **Follow-up**: the next date to act on.
- **Notes**: contacts, referral names, interview rounds, feedback.

Illustrative rows:

```markdown
| Company | Role | Resume version | Cover letter | Applied | Method | Status | Follow-up | Notes |
| ------- | ---- | -------------- | ------------ | ------- | ------ | ------ | --------- | ----- |
| Google | PM | Smith_PM_Google_Jan2024.pdf | Google_PM_CoverLetter.docx | 1/15/24 | Portal | Interview | 2/1/24 | 2nd round 2/1 |
| Meta | PM | Smith_PM_Meta_Jan2024.pdf | Meta_PM_CoverLetter.docx | 1/18/24 | Referral | Applied | 1/25/24 | Referral from John |
| Startup | PM | Smith_PM_Startup_Jan2024.pdf | None | 1/20/24 | Direct | Rejected | - | Too senior |
```
