import type { QualificationData } from "./types";

export const INDUSTRY_LABELS: Record<QualificationData["industry"], string> = {
  ecommerce: "ecommerce",
  saas: "SaaS",
  services: "services",
  agency: "agency",
  retail: "retail",
  other: "general",
};

export const CURRENT_SOLUTION_LABELS: Record<
  NonNullable<QualificationData["currentSolution"]>,
  string
> = {
  "manual-personal-cards": "manual personal cards",
  "corporate-visa-mastercard": "a corporate Visa/Mastercard program",
  amex: "Amex",
  brex: "Brex",
  "divvy-bill.com": "Divvy (Bill.com)",
  other: "another tool",
};

export const ACCOUNTING_SOFTWARE_LABELS: Record<
  NonNullable<QualificationData["accountingSoftware"]>,
  string
> = {
  "quickbooks-online": "QuickBooks Online",
  xero: "Xero",
  netsuite: "NetSuite",
  sage: "Sage",
  other: "their accounting software",
  none: "no accounting software",
};

export const ECONOMIC_BUYER_ROLE_LABELS: Record<
  NonNullable<QualificationData["economicBuyerRole"]>,
  string
> = {
  "founder-ceo": "Founder/CEO",
  cfo: "CFO",
  controller: "Controller",
  "head-of-finance": "Head of Finance",
  "ops-manager": "Ops Manager",
  other: "another stakeholder",
};

export const TOP_PAIN_LABELS: Record<NonNullable<QualificationData["topPain"]>, string> = {
  "visibility-control": "Visibility & control",
  "manual-reconciliation": "Manual reconciliation",
  "slow-close": "Slow close",
  "duplicate-saas-spend": "Duplicate SaaS spend",
  "fraud-risk": "Fraud risk",
  "accounting-sync": "Accounting sync",
  "fx-costs": "FX costs",
};
