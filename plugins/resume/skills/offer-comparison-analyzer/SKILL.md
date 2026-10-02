---
name: offer-comparison-analyzer
description: Compares job offers side by side, or one offer against the current job, totalling year-1 and ongoing compensation, scoring career growth, work-life, culture and risk, and running a weighted decision matrix against the user's own priorities. Use when the user wants to "compare offers", has "multiple offers", asks "which job offer" to take, wants an "offer comparison", or is "deciding between jobs".
metadata:
  author: jrmatherly
  version: "1.0"
---

# Offer comparison analyzer

Put competing job offers on the same footing: total compensation for each,
scores for the factors money doesn't capture, a weighted result based on the
user's priorities, and the red flags and open questions to settle before
deciding.

This skill is decision support, not tax, legal or financial advice. Flag the
points a professional should confirm: how equity and bonuses are taxed, tax
differences between locations, and contract terms such as non-competes.

## Inputs to gather

For each offer, from the written offer where possible:

- Role, company, location and work arrangement (remote, hybrid, on-site)
- Base salary, signing bonus, target bonus or commission, relocation
- Equity: type (RSUs or options), grant size, strike price for options,
  vesting schedule and cliff, refresh grants
- Benefits: retirement match, health insurance contribution, HSA/FSA,
  insurance
- Perks: vacation days, development budget, stipends
- What the user knows about the manager, team, hours and company health

From the user: their priorities, and anything that rules an offer in or out.

Mark anything unknown as "to clarify" and carry it into the output. Don't fill
gaps with typical values.

## Process

1. **Total the compensation** for each offer, year 1 and ongoing, following
   [references/total-compensation.md](references/total-compensation.md):
   - Cash: base + target bonus (+ signing bonus and relocation in year 1 only)
   - Equity: for the ongoing figure, total grant value / vesting years; for
     year 1, the amount that actually vests in the first 12 months when the
     schedule is uneven (a cliff, back-loaded or front-loaded vesting)
   - Benefits: employer contributions in dollars
   - Perks: only those the user would otherwise pay for or clearly values
2. **Value equity realistically.** Use a current share price for public
   companies (look it up or ask, and date it). For private companies ask what
   the company has disclosed, show the paper value, and state plainly that it
   may be worth nothing. Never invent a valuation.
3. **Note what the totals leave out.** The figures are pre-tax. Point out
   where tax or cost of living differs between the offers (location, equity
   type) without computing a tax bill.
4. **Score six factors** from 1 to 10 for each offer, higher always better:
   compensation, career growth, work-life balance, team and culture, risk,
   and location. Score compensation from the ongoing total, relative to the
   other offers and to what the user needs. The questions behind the other
   five are in
   [references/non-monetary-factors.md](references/non-monetary-factors.md).
   The scores are the user's: ask for them, or propose scores with reasons and
   have the user confirm.
5. **Set the weights.** Ask the user to weight the factors so they sum to
   100%. Offer the starting weights in
   [references/decision-matrix.md](references/decision-matrix.md) only as a
   draft to adjust.
6. **Calculate the weighted score** for each offer: the sum of score x weight
   across the six factors. A factor the user gives no weight drops out. Show
   the arithmetic.
7. **Check for red flags** in each offer, company and role, using
   [references/red-flags.md](references/red-flags.md). Turn each one found
   into a question to ask the employer.
8. **Run the gut check.** Put the reflection questions from the non-monetary
   reference to the user. If their gut disagrees with the matrix, say so and
   revisit the weights instead of overruling either.
9. **Produce the comparison.** Before producing output, read
   [templates/offer-comparison.md](templates/offer-comparison.md) and follow
   it. Add a column per offer when there are more than two.

## Rules

- **Use only the user's facts.** Every figure comes from the offers or the
  user. A number you derive (a valued vacation day, an annualized grant) is
  shown with its calculation; a number you estimate is
  labelled as an estimate and confirmed with the user.
- Never compare on base salary alone, and never present a year-1 total
  without the ongoing total beside it: signing bonuses distort year 1.
- Don't treat bundled example figures as market data. For whether an offer is
  competitive, research current rates or use the **salary-negotiation-prep**
  skill.
- The recommendation follows from the user's stated priorities and says which
  ones drove it. When the scores are close, say the result is a toss-up
  instead of forcing a winner.
- A higher base affects future raises and bonus calculations; a higher equity
  share adds risk. Say which way each offer leans.
- List negotiation opportunities the comparison exposes, and hand the
  negotiation itself to the **salary-negotiation-prep** skill.

## Before finishing

- Total comp covers cash, equity, benefits and perks, not just base.
- Equity has a realistic valuation and its risk is stated.
- Tax and cost-of-living differences are flagged for the user to confirm.
- Non-monetary factors are scored and weighted by the user's priorities.
- Manager, team and company stability have been considered.
- The user has done the gut check.

## Resources

- [templates/offer-comparison.md](templates/offer-comparison.md) - the output
  format. Read before producing the comparison.
- [references/total-compensation.md](references/total-compensation.md) -
  components, valuation notes and a worked two-offer example. Read when
  totalling compensation.
- [references/non-monetary-factors.md](references/non-monetary-factors.md) -
  what to ask under each factor, a scoring example and the gut-check
  questions. Read when scoring and at the gut check.
- [references/decision-matrix.md](references/decision-matrix.md) - draft
  weights and a worked calculation. Read when weighting.
- [references/red-flags.md](references/red-flags.md) - warning signs in the
  offer, the company and the role. Read when reviewing each offer.
