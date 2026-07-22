export const BENCHMARKS = {
  savingsRate: { low: 0.03, high: 0.05, source: "Ramp publicly reports median customer saves 5%; low end is conservative" },
  fxMarkup: { value: 0.025, source: "Typical Canadian credit card foreign transaction fee: 2.5%" },
  automationReduction: { low: 0.5, high: 0.8, source: "Receipt matching + auto-coding typically cuts manual reconciliation time 50–80%" },
  financeHourlyCost: { value: 55, source: "Approx. loaded cost of finance/admin time in Canada; adjustable" },
} as const;
