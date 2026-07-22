export const BENCHMARKS = {
  savingsRate: { low: 0.03, high: 0.05, source: "Ramp publicly reports median customer saves 5%; low end is conservative" },
  fxMarkup: { value: 0.025, source: "Typical Canadian credit card foreign transaction fee: 2.5%" },
  automationReduction: { low: 0.5, high: 0.8, source: "Receipt matching + auto-coding typically cuts manual reconciliation time 50–80%" },
  financeHourlyCost: { value: 55, source: "Approx. loaded cost of finance/admin time in Canada; adjustable" },
} as const;

// Surfaced in the UI next to each savings line — answers "why this number" when
// confirmed, and "why we're asking" when the underlying field is still missing.
export const SAVINGS_LINE_WHY = {
  coreSpend: {
    confirmed:
      "Ramp reports a median customer saves 5% of spend; we use a conservative 3–5% range applied to your reported spend.",
    unconfirmed:
      "Every other savings line builds on this number — without it, nothing here can be calculated from confirmed data.",
  },
  fxMarkup: {
    confirmed: "Typical Canadian card FX markup is 2.5% on every USD-billed transaction.",
    unconfirmed:
      "FX savings only apply to the USD-billed share of spend — without that share, it can't be estimated.",
  },
  closeTime: {
    confirmed:
      "Receipt matching and auto-coding typically cut manual reconciliation time 50–80%, valued at the ~$55/hr loaded cost of finance time in Canada.",
    unconfirmed:
      "Time saved is calculated as a reduction from today's baseline — without current hours spent, there's nothing to reduce.",
  },
} as const;
