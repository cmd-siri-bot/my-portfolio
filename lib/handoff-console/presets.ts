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

export const PRESETS: QualificationData[] = [
  {
    companyName: "Maple & Main Coffee Co.", website: undefined, industry: "retail",
    fteCount: 35, revenueBand: "1M-5M", fundingStage: "bootstrapped", province: "ON", multiEntity: false,
    currentMonthlySpend: 18000, numCardholders: 12, currentSolution: "manual-personal-cards",
    topPain: "manual-reconciliation", accountingSoftware: "quickbooks-online", closeHoursPerMonth: 20, usdVendorSharePct: 20,
    economicBuyerRole: "controller", buyerEngaged: true,
    timeline: "this-quarter", triggerEvent: "New controller hired last month, cleaning up processes",
  },
  {
    companyName: "Northbound Outfitters", website: undefined, industry: "ecommerce",
    fteCount: 42, revenueBand: "5M-20M", fundingStage: "seed", province: "BC", multiEntity: false,
    currentMonthlySpend: 34000, numCardholders: 18, currentSolution: "corporate-visa-mastercard",
    topPain: "fx-costs", accountingSoftware: "xero", closeHoursPerMonth: 24, usdVendorSharePct: 45,
    economicBuyerRole: "cfo", buyerEngaged: false,
    timeline: "next-quarter", triggerEvent: null,
  },
  {
    // Deliberately incomplete — demonstrates the "unconfirmed" state
    companyName: "Lakeview Digital Studio", website: undefined, industry: "agency",
    fteCount: 9, revenueBand: null, fundingStage: "n/a", province: "QC", multiEntity: null,
    currentMonthlySpend: 9500, numCardholders: 6, currentSolution: "other",
    topPain: "duplicate-saas-spend", accountingSoftware: "none", closeHoursPerMonth: null, usdVendorSharePct: null,
    economicBuyerRole: "founder-ceo", buyerEngaged: true,
    timeline: "immediate", triggerEvent: null,
  },
];
