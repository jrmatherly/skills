# File organization

## Folder structure

```text
Resume/
|-- Master/
|   `-- LastName_Master_Resume.docx
|-- Tailored/
|   |-- ProductManagement/
|   |   |-- LastName_PM_Google_Jan2024.pdf
|   |   `-- LastName_PM_Meta_Jan2024.pdf
|   |-- Engineering/
|   |   |-- LastName_SWE_Startup_Feb2024.pdf
|   |   `-- LastName_SWE_Enterprise_Feb2024.pdf
|   `-- General/
|       `-- LastName_General_Base_2024.pdf
|-- CoverLetters/
|   |-- Google_PM_CoverLetter.docx
|   `-- Meta_PM_CoverLetter.docx
|-- Applications/
|   `-- ApplicationTracker.xlsx
`-- Archive/
```

- One subfolder of `Tailored/` per role type the user is targeting.
- `Master/` holds exactly one master file.
- `Archive/` receives old tailored versions; nothing is deleted.

Adapt the folder names to what the user already has when it is workable;
consistency matters more than these exact names.

## File naming convention

Pattern:

```text
[LastName]_[Role or type]_[Company]_[Date].[ext]
```

Examples:

- `Smith_PM_Google_Jan2024.pdf`
- `Smith_SWE_Stripe_Feb2024.docx`
- `Smith_DataScience_Base_2024.pdf` (a base version for a role type, kept as
  the starting point for tailoring; `Base` takes the company slot)
- `Smith_Master_Resume.docx` (the one master; its date lives in the file's
  `Last updated` line, not the name)

Rules:

- Every tailored and base file name carries a date.
- Use the role abbreviation consistently across files (`PM` everywhere, not
  `PM` in one and `ProductManager` in the next).
- The extension follows the submission channel; the **formatter** skill says
  which format to send.
- A file sent to an employer never says `Base` or `General`: copy the base
  version and name the copy for that company.
- No vague names such as `resume_final_v2`.
