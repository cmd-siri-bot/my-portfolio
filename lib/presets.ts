import type { QualificationData } from "./types";

export const EMPTY_QUALIFICATION: QualificationData = {
  companyName: "",
  website: undefined,
  industry: "other",
  fteCount: null,
  revenueBand: null,
  fundingStage: null,
  province: null,
  multiEntity: null,
  currentMonthlySpend: null,
  numCardholders: null,
  currentSolution: null,
  topPain: null,
  accountingSoftware: null,
  closeHoursPerMonth: null,
  usdVendorSharePct: null,
  economicBuyerRole: null,
  buyerEngaged: null,
  timeline: null,
  triggerEvent: null,
};

// Fictional presets, each deliberately built to land on a different verdict —
// a visitor sees the full range of the Verdict Engine in a few clicks.
export const PRESETS: QualificationData[] = [
  {
    // ADVANCE — healthy spend, engaged founder-adjacent buyer, immediate
    // timeline, and 20% USD vendor share puts the FX line front and center.
    companyName: "Maple & Main Coffee Co.", website: undefined, industry: "retail",
    fteCount: 35, revenueBand: "1M-5M", fundingStage: "bootstrapped", province: "ON", multiEntity: false,
    currentMonthlySpend: 18000, numCardholders: 12, currentSolution: "manual-personal-cards",
    topPain: "manual-reconciliation", accountingSoftware: "quickbooks-online", closeHoursPerMonth: 20, usdVendorSharePct: 20,
    economicBuyerRole: "controller", buyerEngaged: true,
    timeline: "this-quarter", triggerEvent: "New controller hired last month, cleaning up processes",
  },
  {
    // NURTURE — good spend and known buyer, but exploring, not engaged, and
    // no trigger event: nothing is forcing a decision yet.
    companyName: "Northbound Outfitters", website: undefined, industry: "ecommerce",
    fteCount: 42, revenueBand: "5M-20M", fundingStage: "seed", province: "BC", multiEntity: false,
    currentMonthlySpend: 34000, numCardholders: 18, currentSolution: "corporate-visa-mastercard",
    topPain: "fx-costs", accountingSoftware: "xero", closeHoursPerMonth: 24, usdVendorSharePct: 45,
    economicBuyerRole: null, buyerEngaged: false,
    timeline: "exploring", triggerEvent: null,
  },
  {
    // DISQUALIFY — 3 FTEs, under $1K/mo on personal cards, pre-revenue:
    // spend base too small to clear ROI in a transactional cycle.
    companyName: "Lakeview Digital Studio", website: undefined, industry: "agency",
    fteCount: 3, revenueBand: "pre-revenue", fundingStage: "n/a", province: "QC", multiEntity: false,
    currentMonthlySpend: 800, numCardholders: 2, currentSolution: "manual-personal-cards",
    topPain: "duplicate-saas-spend", accountingSoftware: "none", closeHoursPerMonth: null, usdVendorSharePct: null,
    economicBuyerRole: "founder-ceo", buyerEngaged: true,
    timeline: "immediate", triggerEvent: null,
  },
  {
    // ROUTE UP — multi-entity and $20M+ revenue: not a fit problem, a
    // segment problem. This is a mid-market account, not an SMB one.
    companyName: "Crestline Holdings Group", website: undefined, industry: "services",
    fteCount: 260, revenueBand: "20M+", fundingStage: "n/a", province: "ON", multiEntity: true,
    currentMonthlySpend: 120000, numCardholders: 140, currentSolution: "corporate-visa-mastercard",
    topPain: "visibility-control", accountingSoftware: "netsuite", closeHoursPerMonth: 60, usdVendorSharePct: 15,
    economicBuyerRole: "cfo", buyerEngaged: true,
    timeline: "this-quarter", triggerEvent: "Rolling up 3 acquired subsidiaries onto one finance stack",
  },
];
