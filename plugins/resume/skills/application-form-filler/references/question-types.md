# Question types

Format and rules for each kind of application question. Lengths are in the
tables in `SKILL.md`.

## Experience and background

Prompts like:

- "How many years of experience do you have with [technology]?"
- "Describe your experience with [domain]"
- "What backend frameworks have you used?"

```
[Technology/skill] - [X years]. [One sentence on what it was used for, with a
specific project or context]. [Optional: secondary tools in the same category].
```

- Lead with the most used or most relevant technology.
- Anchor every claim to a real project or role.
- For "describe your experience" questions, cover one project per sentence.
- If the experience is indirect (an adjacent domain), say so and pivot to what
  is relevant.

## Why this company or role

Prompts like:

- "Why do you want to work at [Company]?"
- "What interests you about this role?"
- "Why are you a good fit?"

```
[Specific thing about the company/role that's genuinely interesting - not
generic]. [How that connects to something the candidate has actually worked
on]. [Optional: one line on why this domain, not just this company].
```

- Must be specific to this company. No boilerplate.
- Research the company before answering if needed.
- Connect to real work, not aspirations.
- Don't repeat the job description back to them.

## Portfolio and work samples

Prompts like:

- "Include any other samples of work you're proud of"
- "Link to relevant projects or repositories"
- "Describe a project you've built end-to-end"

List projects with one-line descriptions and links, most relevant first.

```
[Project name] ([live URL] | [GitHub URL]) - [one line: what it is and one
proof point]. [Stack if relevant].
```

- Include only projects relevant to the role. Don't pad to look prolific.
- Always include links the user supplied; prefer a live demo over a
  repository, and a repository over nothing.
- If the project has paying users or measurable usage, say so, once.

## Technical skills

Prompts like:

- "Which frontend frameworks have you used most extensively?"
- "Rate your proficiency in Python"
- "Describe your experience with cloud infrastructure"

For open-text fields:

```
[Primary skill] - [X years]. [Specific use: what was built with it, in what
context].
[Secondary skill] - [X years]. [Same].
[Note any relevant gaps honestly].
```

- Years plus context beats years alone.
- Acknowledge gaps rather than hiding them.
- For stacks used but not recently, note it.
- For rating and dropdown fields, pick the accurate level, not the highest.

## Open-ended ("tell us about yourself")

Prompts like:

- "Tell us about yourself"
- "Describe your professional background"
- "What are you looking for in your next role?"

```
Current role + what the work is (1 sentence).
Relevant prior experience, briefly (1 sentence).
What is wanted next / why this role (1-2 sentences, specific to the company).
Optional: one relevant project or side work (1 sentence).
```

- Start with the current role, not education.
- End on the forward-looking note: what is wanted, not where the user has
  been.
- No trait statements; just facts and projects.

## Situational and behavioral

Prompts like:

- "Describe a time you solved a complex technical problem"
- "Tell us about a project you led end-to-end"
- "How do you handle working across multiple teams?"

Condensed STAR, with no labels, just flow:

```
[Context in one sentence]. [What the candidate specifically did - 2
sentences]. [Outcome with a metric if possible - 1 sentence].
```

- Be specific: name the project, the technology, the team size.
- Don't generalize ("I always approach problems by...").
- End with the result, not the lesson learned; that is for the interview.
- For fuller STAR stories, use the **interview-prep-generator** skill.

## Opinion and vision

Prompts like:

- "Which technologies do you think are most important for the future?"
- "What would you learn if you had unlimited time?"
- "Where do you see AI/[domain] in 5 years?"

Give a real opinion: pick one or two things and explain the reasoning briefly.

- Have an actual point of view. Vague answers are forgettable.
- Ground the opinion in domain knowledge or real experience.
- Don't hedge everything: commit to a view and acknowledge it is one
  perspective.
- The opinion is the user's. Offer a draft view based on their background and
  ask them to confirm or replace it.
