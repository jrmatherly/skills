---
name: salary-negotiation-prep
description: Prepares a salary negotiation by researching current market rates, totalling the full compensation package, setting a counter-offer and walk-away point, and drafting the email or call script with fallbacks for pushback. Use when the user mentions "salary negotiation", wants to "negotiate an offer", needs a "counter offer", has received a job offer and asks whether it is fair, or asks "how much should I ask for".
metadata:
  author: jrmatherly
  version: "1.0"
---

# Salary negotiation prep

Build a negotiation plan for a job offer or raise: a sourced market range, the
offer's total compensation, a specific counter with its justification, the
script to deliver it and a plan for pushback.

This skill is preparation help, not tax, legal or financial advice. Flag the
points a professional should confirm: equity terms and their tax treatment,
non-compete or other contract clauses, and what local law says about
salary-history questions.

## Inputs to gather

- **Role, level, location** (or remote policy) and years of relevant
  experience.
- **The offer**, component by component: base, bonus, equity (type, amount,
  vesting), signing bonus, benefits, and the response deadline. Ask whether it
  is in writing yet.
- **Leverage**: competing offers, rare skills, track record, a referral.
- **Priorities and the walk-away point**: what matters most to the user and
  the minimum they would accept. Ask; don't assume it.
- **Who they are negotiating with** (recruiter or hiring manager) and whether
  it will be by email or call.

## Process

1. **Research the market rate.** Look up current figures from at least three
   sources and build a 25th/50th/75th/90th percentile range, following
   [references/market-research.md](references/market-research.md). Record each
   source and its date. Without a way to research, ask the user to pull the
   numbers and paste them in. Never fill the range from memory or from the
   illustrative figures in this skill.
2. **Place the user in the range.** Weigh the factors that raise or limit
   their value (same reference). The 50th percentile is the default target and
   the 90th the stretch; move the target with the evidence.
3. **Total the offer.** Total comp = base + bonus + annualized equity +
   benefits. Show year 1 (with one-time items) separately from ongoing years.
4. **Set the counter.** Pick a specific number for each component being
   negotiated, each with a justification from the market data or the user's
   record. Agree the numbers and the walk-away point with the user.
5. **Plan the fallback.** If base is firm, choose which other elements to
   raise; the full list of negotiable items is under scenario 3 of the
   scenarios reference below.
6. **Draft the script.** Customize the email or call script from
   [references/counter-offer-scripts.md](references/counter-offer-scripts.md).
   For a low first offer, an early "what are your expectations?", a firm base,
   competing offers or a question about current salary, see
   [references/negotiation-scenarios.md](references/negotiation-scenarios.md).
7. **Produce the plan.** Before producing output, read
   [templates/negotiation-strategy.md](templates/negotiation-strategy.md) and
   follow it.

To weigh two or more offers against each other, use the
**offer-comparison-analyzer** skill.

## Sequence and counter structure

Negotiate after the written offer arrives and before signing. A typical
pace, which the employer's deadline overrides:

1. **Day 1, verbal offer.** Express enthusiasm and ask for it in writing.
2. **Day 1, written offer.** Thank them, ask for time to review and for the
   response deadline.
3. **Days 1-3, research.** Verify the market rate, total the offer, set
   priorities and prepare the counter.
4. **Days 3-5, counter.** Send the email or schedule the call, with a
   specific ask.
5. **Days 5-10, discussion.** Expect several rounds.
6. **Day 10 on, resolution.** Get the final terms in writing and review the
   offer letter carefully before signing.

Every counter, written or spoken, follows this order:

1. Express enthusiasm for the role
2. Reinforce the value the user brings
3. Make a specific ask
4. Justify it
5. Open the discussion

## Rules

- **Stay truthful.** Never invent a competing offer, a market figure, an
  achievement or a current salary. Only mention competing offers that exist.
  Every market number carries its source; an estimate is labelled as one and
  confirmed with the user before it goes into a script.
- Negotiating is normal and employers expect it. Keep the tone collaborative:
  no ultimatums, no threats, nothing rude, and no burned bridges if it doesn't
  work out.
- Don't advise accepting on the spot, and don't negotiate for the sake of it:
  if the offer already meets the user's researched target, say so.
- Use specific numbers and give the employer an easy way to say yes.
- Judge the package on total compensation, not base alone, while noting that
  base drives future raises.
- Don't volunteer salary history unless the law requires it.
- A verbal promise counts for nothing until it is written into the offer.
- Remind the user that approvals take time: be patient, responsive and
  positive throughout.

## Resources

- [templates/negotiation-strategy.md](templates/negotiation-strategy.md) - the
  output format. Read before producing the plan.
- [references/market-research.md](references/market-research.md) - sources,
  the range layout, value factors, a total-comp example and equity terms. Read
  during research and when totalling the offer.
- [references/counter-offer-scripts.md](references/counter-offer-scripts.md) -
  the email template and call script. Read when drafting the counter.
- [references/negotiation-scenarios.md](references/negotiation-scenarios.md) -
  approaches and scripts for five common situations. Read when one applies.
