// Must never receive PublicContext — the savings model is confirmed-data-only.
import { ASSUMPTIONS, type AssumptionKey, type AssumptionValues } from "./assumptions";
import type { QualificationData } from "./types";

export interface ModelLine {
  key: "coreSavings" | "fxSavings" | "closeTimeSavings";
  label: string;
  computable: boolean;
  value: number | null;
  formula: string | null;
  assumptionKey: AssumptionKey | null;
  sayItOnCall: string | null;
  missingFieldsNote: string | null;
  why: string;
}

export interface Model {
  lines: ModelLine[];
  total: number;
  heroLineKey: ModelLine["key"] | null;
  computableCount: number;
}

export function money(value: number): string {
  return `$${Math.round(value).toLocaleString("en-CA")}`;
}

export function pct(value: number): string {
  return `${Math.round(value * 1000) / 10}%`;
}

function round(value: number): number {
  return Math.round(value);
}

export function computeModel(data: QualificationData, assumptions: AssumptionValues): Model {
  const lines: ModelLine[] = [];

  // Core spend savings
  if (data.currentMonthlySpend != null) {
    const annual = data.currentMonthlySpend * 12;
    const rate = assumptions.coreSavingsRate;
    const value = round(annual * rate);
    lines.push({
      key: "coreSavings",
      label: "Core spend savings",
      computable: true,
      value,
      formula: `${money(data.currentMonthlySpend)}/mo × 12 × ${pct(rate)} = ${money(value)}/yr`,
      assumptionKey: "coreSavingsRate",
      sayItOnCall: `At ${money(
        data.currentMonthlySpend
      )}/mo, you're on pace to save roughly ${money(value)}/yr from baseline automation alone.`,
      missingFieldsNote: null,
      why: "Every other line in this model builds on confirmed spend — without it, nothing here is calculable.",
    });
  } else {
    lines.push({
      key: "coreSavings",
      label: "Core spend savings",
      computable: false,
      value: null,
      formula: null,
      assumptionKey: "coreSavingsRate",
      sayItOnCall: null,
      missingFieldsNote: "Ask: current monthly card/vendor spend",
      why: "Every other line in this model builds on confirmed spend — without it, nothing here is calculable.",
    });
  }

  // FX markup savings
  if (data.currentMonthlySpend != null && data.usdVendorSharePct != null) {
    const annual = data.currentMonthlySpend * 12;
    const usdShare = data.usdVendorSharePct / 100;
    const rate = assumptions.fxSpreadRate;
    const value = round(annual * usdShare * rate);
    lines.push({
      key: "fxSavings",
      label: "FX markup savings",
      computable: true,
      value,
      formula: `${money(data.currentMonthlySpend)}/mo × 12 × ${data.usdVendorSharePct}% USD × ${pct(
        rate
      )} spread = ${money(value)}/yr`,
      assumptionKey: "fxSpreadRate",
      sayItOnCall: `At ${money(data.currentMonthlySpend)}/mo with ${
        data.usdVendorSharePct
      }% of spend in USD, you're paying roughly ${money(
        value
      )}/yr in FX spread alone — that's before any process savings.`,
      missingFieldsNote: null,
      why: "FX savings only apply to the USD-billed share of spend — without that share, it can't be estimated.",
    });
  } else {
    lines.push({
      key: "fxSavings",
      label: "FX markup savings",
      computable: false,
      value: null,
      formula: null,
      assumptionKey: "fxSpreadRate",
      sayItOnCall: null,
      missingFieldsNote: "Ask: what % of vendor/software spend is billed in USD",
      why: "FX savings only apply to the USD-billed share of spend — without that share, it can't be estimated.",
    });
  }

  // Close-time savings
  if (data.closeHoursPerMonth != null) {
    const annualHours = data.closeHoursPerMonth * 12;
    const reductionRate = assumptions.automationReductionRate;
    const hourlyCost = assumptions.financeHourlyCost;
    const hoursSaved = annualHours * reductionRate;
    const value = round(hoursSaved * hourlyCost);
    lines.push({
      key: "closeTimeSavings",
      label: "Close-time savings",
      computable: true,
      value,
      formula: `${data.closeHoursPerMonth} hrs/mo × 12 × ${pct(reductionRate)} reduction × $${hourlyCost}/hr = ${money(
        value
      )}/yr`,
      assumptionKey: "automationReductionRate",
      sayItOnCall: `At ${data.closeHoursPerMonth} hrs/mo on reconciliation, cutting that by roughly ${pct(
        reductionRate
      )} is worth about ${money(value)}/yr in reclaimed finance time.`,
      missingFieldsNote: null,
      why: "Time saved is calculated as a reduction from today's baseline — without current hours spent, there's nothing to reduce.",
    });
  } else {
    lines.push({
      key: "closeTimeSavings",
      label: "Close-time savings",
      computable: false,
      value: null,
      formula: null,
      assumptionKey: "automationReductionRate",
      sayItOnCall: null,
      missingFieldsNote: "Ask: how many hours does month-end reconciliation take today",
      why: "Time saved is calculated as a reduction from today's baseline — without current hours spent, there's nothing to reduce.",
    });
  }

  const computableLines = lines.filter((l) => l.computable);
  const total = computableLines.reduce((sum, l) => sum + (l.value ?? 0), 0);

  // The FX wedge is the most concrete, Canada-specific number in the model —
  // promote it to hero stat whenever USD exposure is meaningful.
  let heroLineKey: ModelLine["key"] | null = null;
  const fxLine = lines.find((l) => l.key === "fxSavings");
  if (fxLine?.computable && data.usdVendorSharePct != null && data.usdVendorSharePct >= 20) {
    heroLineKey = "fxSavings";
  } else if (computableLines.length > 0) {
    const highest = [...computableLines].sort((a, b) => (b.value ?? 0) - (a.value ?? 0))[0];
    heroLineKey = highest.key;
  }

  return { lines, total, heroLineKey, computableCount: computableLines.length };
}

export function getAssumptionMeta(key: AssumptionKey) {
  return ASSUMPTIONS[key];
}
