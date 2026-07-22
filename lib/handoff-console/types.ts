export interface QualificationData {
  // Firmographic — reported by the customer, not guessed
  companyName: string;
  website?: string;                    // optional, used only for the public-context lookup
  industry: "ecommerce" | "saas" | "services" | "agency" | "retail" | "other";
  fteCount: number | null;
  revenueBand: "pre-revenue" | "<1M" | "1M-5M" | "5M-20M" | "20M+" | null;
  fundingStage: "bootstrapped" | "seed" | "seriesA+" | "n/a" | null;
  province: "ON" | "BC" | "AB" | "QC" | "Other" | null;
  multiEntity: boolean | null;

  // Budget / current state
  currentMonthlySpend: number | null;  // CAD — the single most important field
  numCardholders: number | null;
  currentSolution: "manual-personal-cards" | "corporate-visa-mastercard" | "amex" | "brex" | "divvy-bill.com" | "other" | null;

  // Need
  topPain: "visibility-control" | "manual-reconciliation" | "slow-close" | "duplicate-saas-spend" | "fraud-risk" | "accounting-sync" | "fx-costs" | null;
  accountingSoftware: "quickbooks-online" | "xero" | "netsuite" | "sage" | "other" | "none" | null;
  closeHoursPerMonth: number | null;
  usdVendorSharePct: number | null;    // 0-100, self-reported estimate, may be null

  // Authority
  economicBuyerRole: "founder-ceo" | "cfo" | "controller" | "head-of-finance" | "ops-manager" | "other" | null;
  buyerEngaged: boolean | null;

  // Timeline
  timeline: "immediate" | "this-quarter" | "next-quarter" | "exploring" | null;
  triggerEvent: string | null;
}

// Strictly separate — must NEVER appear as a parameter to any function in engine.ts,
// callPlan.ts, or outputs.ts.
export interface PublicContext {
  industryGuess: QualificationData["industry"] | null;
  headcountBandGuess: string | null;
  oneLineDescription: string | null;
  confidence: "low" | "medium" | "high";
}
