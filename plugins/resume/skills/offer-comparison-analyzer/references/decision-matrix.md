# Weighted decision matrix

All weights and scores below are illustrative. The user's own replace them.

## 1. Weight the factors

Weights reflect what matters to this user and must sum to 100%. A draft to
adjust:

```
Factor                  Weight
--------------------------------
Total compensation       25%
Career growth            20%
Work-life balance        20%
Team and culture         15%
Risk                     10%
Location                 10%
--------------------------------
Total:                  100%
```

Typical leanings when the user has no starting point: career growth and team
weigh high for most people, risk medium, work-life balance and location are
personal. Raise the risk weight when the offers differ in stability (a startup
against an established company, for example).

## 2. Score each factor

```
Factor              Company A   Company B   (1-10)
---------------------------------------------------
Compensation            7           8
Career growth           7           8
Work-life               8           6
Team and culture        9           7
Risk                    8           6
Location                8           5
```

For risk, a higher score means lower risk.

## 3. Calculate

```
Company A:
(7 x 0.25) + (7 x 0.20) + (8 x 0.20) + (9 x 0.15) + (8 x 0.10) + (8 x 0.10)
= 1.75 + 1.40 + 1.60 + 1.35 + 0.80 + 0.80
= 7.70

Company B:
(8 x 0.25) + (8 x 0.20) + (6 x 0.20) + (7 x 0.15) + (6 x 0.10) + (5 x 0.10)
= 2.00 + 1.60 + 1.20 + 1.05 + 0.60 + 0.50
= 6.95

Result: Company A scores higher (7.70 vs 6.95)
```

Here B pays more and scores better on growth, yet A wins on the user's
weights. That is the point of the matrix: it makes the trade-off explicit.
