// Must never receive PublicContext — savings math is confirmed-data-only.
import { BENCHMARKS, SAVINGS_LINE_WHY } from "./rampBenchmarks";
import type { QualificationData } from "./types";

export interface SavingsLine {
  label: string;
  status: "confirmed" | "unconfirmed";
  low: number | null;
  high: number | null;
  basis: string;
  why: string;
  missingFieldsNote?: string;
}

export interface SavingsModel {
  lines: SavingsLine[];
  totalLow: number;
  totalHigh: number;
  unconfirmedCount: number;
}

function roundTo100(value: number): number {
  return Math.round(value / 100) * 100;
}

function money(value: number): string {
  return `$${Math.round(value).toLocaleString("en-CA")}`;
}

export function computeSavingsModel(data: QualificationData): SavingsModel {
  const lines: SavingsLine[] = [];

  // Core savings — spend-rate based
  if (data.currentMonthlySpend != null) {
    const annual = data.currentMonthlySpend * 12;
    lines.push({
      label: "Core spend savings",
      status: "confirmed",
      low: roundTo100(annual * BENCHMARKS.savingsRate.low),
      high: roundTo100(annual * BENCHMARKS.savingsRate.high),
      basis: `Based on ${money(data.currentMonthlySpend)}/mo reported spend`,
      why: SAVINGS_LINE_WHY.coreSpend.confirmed,
    });
  } else {
    lines.push({
      label: "Core spend savings",
      status: "unconfirmed",
      low: null,
      high: null,
      basis: "",
      why: SAVINGS_LINE_WHY.coreSpend.unconfirmed,
      missingFieldsNote: "Ask: current monthly card/vendor spend",
    });
  }

  // FX savings — spend + USD vendor share based
  if (data.currentMonthlySpend != null && data.usdVendorSharePct != null) {
    const annual = data.currentMonthlySpend * 12;
    const value = roundTo100(
      annual * (data.usdVendorSharePct / 100) * BENCHMARKS.fxMarkup.value
    );
    lines.push({
      label: "FX markup savings",
      status: "confirmed",
      low: value,
      high: value,
      basis: `Based on reported spend × ${data.usdVendorSharePct}% USD vendor share`,
      why: SAVINGS_LINE_WHY.fxMarkup.confirmed,
    });
  } else {
    lines.push({
      label: "FX markup savings",
      status: "unconfirmed",
      low: null,
      high: null,
      basis: "",
      why: SAVINGS_LINE_WHY.fxMarkup.unconfirmed,
      missingFieldsNote: "Ask: what % of vendor/software spend is billed in USD",
    });
  }

  // Time savings — close-hours based
  if (data.closeHoursPerMonth != null) {
    const annualHours = data.closeHoursPerMonth * 12;
    lines.push({
      label: "Close-time savings",
      status: "confirmed",
      low: roundTo100(
        annualHours * BENCHMARKS.automationReduction.low * BENCHMARKS.financeHourlyCost.value
      ),
      high: roundTo100(
        annualHours * BENCHMARKS.automationReduction.high * BENCHMARKS.financeHourlyCost.value
      ),
      basis: `Based on ${data.closeHoursPerMonth} hrs/mo reported close time`,
      why: SAVINGS_LINE_WHY.closeTime.confirmed,
    });
  } else {
    lines.push({
      label: "Close-time savings",
      status: "unconfirmed",
      low: null,
      high: null,
      basis: "",
      why: SAVINGS_LINE_WHY.closeTime.unconfirmed,
      missingFieldsNote: "Ask: how many hours does month-end reconciliation take today",
    });
  }

  const confirmedLines = lines.filter((l) => l.status === "confirmed");
  const totalLow = confirmedLines.reduce((sum, l) => sum + (l.low ?? 0), 0);
  const totalHigh = confirmedLines.reduce((sum, l) => sum + (l.high ?? 0), 0);
  const unconfirmedCount = lines.length - confirmedLines.length;

  return { lines, totalLow, totalHigh, unconfirmedCount };
}

export function getSavingsHeaderText(model: SavingsModel): string {
  const confirmedCount = model.lines.length - model.unconfirmedCount;
  if (model.unconfirmedCount === 0) {
    return `Savings range reflects ${confirmedCount} of ${model.lines.length} confirmed data points.`;
  }
  const needsVerb = model.unconfirmedCount === 1 ? "needs" : "need";
  return `Savings range reflects ${confirmedCount} of ${model.lines.length} confirmed data points — ${model.unconfirmedCount} still ${needsVerb} answering.`;
}

// ---------------------------------------------------------------------------
// Hand-computed assertions — "Maple & Main Coffee Co." preset (§9):
// currentMonthlySpend: 18000, usdVendorSharePct: 20, closeHoursPerMonth: 20
//
// 1. Core spend savings (confirmed)
//    annual = 18000 * 12 = 216000
//    low  = 216000 * 0.03 = 6480  → round to nearest 100 = 6500
//    high = 216000 * 0.05 = 10800 → round to nearest 100 = 10800
//    Expect: { status: "confirmed", low: 6500, high: 10800 }
//
// 2. FX markup savings (confirmed)
//    value = 216000 * (20/100) * 0.025 = 216000 * 0.2 * 0.025 = 1080
//    round to nearest 100 = 1100
//    Expect: { status: "confirmed", low: 1100, high: 1100 }
//
// 3. Close-time savings (confirmed)
//    annualHours = 20 * 12 = 240
//    low  = 240 * 0.5 * 55 = 6600  → round to nearest 100 = 6600
//    high = 240 * 0.8 * 55 = 10560 → round to nearest 100 = 10600
//    Expect: { status: "confirmed", low: 6600, high: 10600 }
//    totalLow  = 6500 + 1100 + 6600  = 14200
//    totalHigh = 10800 + 1100 + 10600 = 22500
//    unconfirmedCount = 0
//
// 4. Missing-field case — Maple & Main with usdVendorSharePct set to null
//    Core spend savings: unchanged → { status: "confirmed", low: 6500, high: 10800 }
//    FX markup savings: usdVendorSharePct == null → unconfirmed,
//      missingFieldsNote: "Ask: what % of vendor/software spend is billed in USD",
//      low: null, high: null
//    Close-time savings: unchanged → { status: "confirmed", low: 6600, high: 10600 }
//    totalLow  = 6500 + 6600  = 13100   (fx line excluded — unconfirmed)
//    totalHigh = 10800 + 10600 = 21400  (fx line excluded — unconfirmed)
//    unconfirmedCount = 1
// ---------------------------------------------------------------------------
