// Editable assumption rates behind every Modeled figure in the savings ledger.
// Never presented as Ramp data — each carries its own source note and a
// bounded, editable range. Defaults are deliberately conservative.

export interface Assumption {
  key: AssumptionKey;
  label: string;
  defaultValue: number;
  min: number;
  max: number;
  step: number;
  unit: "percent" | "currency";
  sourceNote: string;
}

export type AssumptionKey = "coreSavingsRate" | "fxSpreadRate" | "automationReductionRate" | "financeHourlyCost";

export const ASSUMPTIONS: Record<AssumptionKey, Assumption> = {
  coreSavingsRate: {
    key: "coreSavingsRate",
    label: "Core savings rate",
    defaultValue: 0.04,
    min: 0.03,
    max: 0.05,
    step: 0.005,
    unit: "percent",
    sourceNote:
      "Ramp reports a median customer saves roughly 5% of spend; defaults here to a conservative 4% until proven on this account.",
  },
  fxSpreadRate: {
    key: "fxSpreadRate",
    label: "FX spread",
    defaultValue: 0.025,
    min: 0.015,
    max: 0.035,
    step: 0.005,
    unit: "percent",
    sourceNote:
      "Typical Canadian card cross-border spread is roughly 2.5% — editable if you know the prospect's actual card issuer's rate.",
  },
  automationReductionRate: {
    key: "automationReductionRate",
    label: "Reconciliation time reduction",
    defaultValue: 0.65,
    min: 0.5,
    max: 0.8,
    step: 0.05,
    unit: "percent",
    sourceNote:
      "Receipt matching and auto-coding typically cut manual reconciliation time 50-80%; defaults to the midpoint.",
  },
  financeHourlyCost: {
    key: "financeHourlyCost",
    label: "Loaded finance/admin hourly cost",
    defaultValue: 55,
    min: 40,
    max: 90,
    step: 5,
    unit: "currency",
    sourceNote: "Approx. loaded cost of finance/admin time in Canada — adjust to the prospect's actual comp band if known.",
  },
};

export type AssumptionValues = Record<AssumptionKey, number>;

export function getDefaultAssumptionValues(): AssumptionValues {
  return {
    coreSavingsRate: ASSUMPTIONS.coreSavingsRate.defaultValue,
    fxSpreadRate: ASSUMPTIONS.fxSpreadRate.defaultValue,
    automationReductionRate: ASSUMPTIONS.automationReductionRate.defaultValue,
    financeHourlyCost: ASSUMPTIONS.financeHourlyCost.defaultValue,
  };
}
