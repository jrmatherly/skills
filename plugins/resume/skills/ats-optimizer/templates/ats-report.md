# ATS report template

Mark each line with a text status: `OK`, `MISSING`, `NEAR MISS` or `ISSUE`.
The bracketed text and the sample lines show the shape; replace all of it with
findings from the actual resume and posting.

```markdown
# ATS compatibility report

## Overall score: [X]/100
[One line: keyword match, and what lowered it if anything]

### File format check
- Format: [DOCX / PDF / not checked]
- Text extraction: [success / failed / not checked]
- File size: [size / not checked]

### Formatting issues
- OK: no tables or columns detected
- ISSUE: contact info in page header (move to body)
- ISSUE: two different font sizes in skills section

### Keyword analysis

Job requirements vs your resume:

**Critical keywords (must have):**
- OK: Project Management - found 3x
- OK: Agile/Scrum - found 2x
- MISSING: Stakeholder Management (mentioned 5x in posting)
- MISSING: Budget Management (mentioned 3x in posting)

**Important keywords:**
- OK: Cross-functional teams - found 1x
- NEAR MISS: "Risk management" - resume has "risk mitigation"
- OK: Process improvement - found 2x

**Keyword match: 4 of 7 (57%)**
Target: 80%+

### Recommended changes

**1. Add missing keywords**

In Professional Summary, change:
"Experienced project manager with proven track record..."

To:
"Experienced project manager with proven track record in stakeholder
management and budget oversight..."

In Experience, add bullets:
"Managed stakeholder communication across 3 departments and executive
leadership team"
"Directed budget management for $2.5M project portfolio"

**2. Fix formatting**
- Move contact information from page header to body
- Make all skills section items the same font size (currently 10pt and 11pt)

**3. Strengthen existing keywords**
Change "risk mitigation" to "risk management" for an exact match

### Gaps
- [Keyword the candidate does not have, and what the posting asks for]

### Needs confirmation
- [Fact or number in a suggested edit that the user has not yet confirmed]

### Estimated new keyword match: 7 of 7 (100%)
```

Suggested edits in section 1 are allowed only for experience the user has
confirmed. A number the user has not confirmed appears in a suggested edit as
a bracketed placeholder such as `[$N]`, never as a figure, and is listed under
"Needs confirmation". A missing keyword the candidate cannot claim goes under
"Gaps" and stays unmatched in the new keyword match.
