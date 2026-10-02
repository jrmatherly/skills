---
name: interview-prep-generator
description: Builds an interview prep pack from a resume and a target role, with predicted questions, a bank of STAR stories, a "tell me about yourself" pitch, answers to difficult questions and questions to ask the interviewers. Use when the user asks for "interview prep", wants to "prepare for an interview", needs "STAR stories", or wants practice "interview questions" or "behavioral questions" for a specific job.
metadata:
  author: jrmatherly
  version: "1.0"
---

# Interview prep generator

Turn the user's resume and a target role into a prep pack: the questions most
likely to come up, STAR stories that answer them, a tailored pitch, prepared
answers for the awkward questions and questions to ask back.

## Inputs to gather

- **Resume**, or the experience to draw stories from.
- **Job description**, or at least the title, level and company. Without a
  posting, work from the general question bank and say the predictions are
  generic.
- **Interview stage and format**, if known: recruiter screen, hiring manager,
  panel, technical round, and who the interviewers are.
- **Known concerns**: gaps, short tenures, a career change, the reason for
  leaving the current job.

Ask for anything missing that changes the output. Don't block on the optional
items.

## Process

1. **Analyze the role.** List the competencies the interview will test, each
   with the job-description line that shows it. For a full breakdown of the
   posting, run the **job-description-analyzer** skill first.
2. **Research the company.** Look up recent news, products and the company's
   interview style from current sources. Without a way to research, ask the
   user what they know and list the rest as items for them to look up. Never
   present remembered company facts as current.
3. **Predict questions.** Draw on the role analysis and
   [references/question-bank.md](references/question-bank.md). Sort into high
   probability (prepare thoroughly) and medium probability, and attach a story
   to each high-probability question.
4. **Bank the stories.** Aim for 8-10 stories that together cover leadership,
   problem-solving, collaboration, achievement and failure/growth; the
   situations to cover are in
   [references/story-bank.md](references/story-bank.md).
   Expand resume bullets into STAR stories as shown in
   [references/star-examples.md](references/star-examples.md). Ask the user for
   the context, their own actions and the outcome wherever the resume doesn't
   say. Tag each story with the competencies it can answer, so one story
   serves several questions.
5. **Cut each story to three lengths** (see below).
6. **Write the "tell me about yourself" pitch**: about two minutes, tailored
   to this role.
7. **Prepare the difficult questions** that apply (weakness, reason for
   leaving, failure, salary, and the user's known concerns), following
   [references/difficult-questions.md](references/difficult-questions.md).
8. **Draft questions to ask**, grouped by interviewer type. The lists and the
   kinds of question to avoid are in the question bank.
9. **List the answers to avoid**: topics the user should not volunteer,
   criticism of past employers found in their drafts, and the trap questions
   this role makes likely. Advise on what to leave out, never on what to
   misstate.
10. **Produce the pack.** Before producing output, read
   [templates/interview-prep.md](templates/interview-prep.md) and follow it.

## STAR structure

| Part      | Content                                 | Length        |
| --------- | --------------------------------------- | ------------- |
| Situation | The context                             | 1-2 sentences |
| Task      | The user's own responsibility           | 1 sentence    |
| Action    | What the user personally did            | 2-3 sentences |
| Result    | The outcome, with metrics, then impact  | 1-2 sentences |

- Actions are in the first person singular: what "I" did, not what "we" did.
- A spoken full answer runs 90 seconds to 2 minutes.

Each story gets three versions:

| Version   | Length     | Use for                    |
| --------- | ---------- | -------------------------- |
| Full      | 2 minutes  | "Tell me about a time ..." |
| Short     | 60 seconds | Follow-up questions        |
| One-liner | 15 seconds | "Give me an example"       |

## Rules

- **Stay truthful.** Stories, metrics and the pitch come only from what the
  user has told you or the resume says. Never invent employers, titles, dates,
  events, metrics or skills. An estimated number must be derived from facts
  the user gave, labelled as an estimate and confirmed with the user before it
  goes into the pack.
- A failure story is a real failure with a lesson and evidence the lesson was
  applied, not a disguised success.
- Answers about past employers stay positive and forward-looking. Flag
  anything in the user's draft answers that criticizes a former employer.
- For the number behind a salary answer, use the **salary-negotiation-prep**
  skill. Leave `$X-$Y` placeholders rather than guessing a range.
- Tell the user to practice the answers out loud and time them. The pack is a
  script to rehearse, not to read.

## Resources

- [templates/interview-prep.md](templates/interview-prep.md) - the output
  format. Read before producing the pack.
- [references/question-bank.md](references/question-bank.md) - behavioral,
  role-specific and standard questions, plus questions to ask interviewers.
  Read when predicting questions and drafting questions to ask.
- [references/story-bank.md](references/story-bank.md) - the situations a
  complete story bank covers. Read when checking coverage.
- [references/star-examples.md](references/star-examples.md) - the STAR
  sentence template, a worked answer and a resume-bullet expansion. Read when
  writing stories.
- [references/difficult-questions.md](references/difficult-questions.md) -
  formulas and sample answers for weakness, leaving, failure and salary
  questions. Read when preparing those answers.
