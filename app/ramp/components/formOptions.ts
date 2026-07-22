import type { QualificationData } from "@/lib/handoff-console/types";

export interface Option<T extends string> {
  value: T;
  label: string;
}

export const industryOptions: Option<QualificationData["industry"]>[] = [
  { value: "ecommerce", label: "Ecommerce" },
  { value: "saas", label: "SaaS" },
  { value: "services", label: "Services" },
  { value: "agency", label: "Agency" },
  { value: "retail", label: "Retail" },
  { value: "other", label: "Other" },
];

export const revenueBandOptions: Option<NonNullable<QualificationData["revenueBand"]>>[] = [
  { value: "pre-revenue", label: "Pre-revenue" },
  { value: "<1M", label: "<$1M" },
  { value: "1M-5M", label: "$1M–$5M" },
  { value: "5M-20M", label: "$5M–$20M" },
  { value: "20M+", label: "$20M+" },
];

export const fundingStageOptions: Option<NonNullable<QualificationData["fundingStage"]>>[] = [
  { value: "bootstrapped", label: "Bootstrapped" },
  { value: "seed", label: "Seed" },
  { value: "seriesA+", label: "Series A+" },
  { value: "n/a", label: "N/A" },
];

export const provinceOptions: Option<NonNullable<QualificationData["province"]>>[] = [
  { value: "ON", label: "Ontario" },
  { value: "BC", label: "British Columbia" },
  { value: "AB", label: "Alberta" },
  { value: "QC", label: "Quebec" },
  { value: "Other", label: "Other" },
];

export const currentSolutionOptions: Option<NonNullable<QualificationData["currentSolution"]>>[] = [
  { value: "manual-personal-cards", label: "Manual / personal cards" },
  { value: "corporate-visa-mastercard", label: "Corporate Visa/Mastercard" },
  { value: "amex", label: "Amex" },
  { value: "brex", label: "Brex" },
  { value: "divvy-bill.com", label: "Divvy (Bill.com)" },
  { value: "other", label: "Other" },
];

export const topPainOptions: Option<NonNullable<QualificationData["topPain"]>>[] = [
  { value: "visibility-control", label: "Visibility & control" },
  { value: "manual-reconciliation", label: "Manual reconciliation" },
  { value: "slow-close", label: "Slow close" },
  { value: "duplicate-saas-spend", label: "Duplicate SaaS spend" },
  { value: "fraud-risk", label: "Fraud risk" },
  { value: "accounting-sync", label: "Accounting sync" },
  { value: "fx-costs", label: "FX costs" },
];

export const accountingSoftwareOptions: Option<NonNullable<QualificationData["accountingSoftware"]>>[] = [
  { value: "quickbooks-online", label: "QuickBooks Online" },
  { value: "xero", label: "Xero" },
  { value: "netsuite", label: "NetSuite" },
  { value: "sage", label: "Sage" },
  { value: "other", label: "Other" },
  { value: "none", label: "None" },
];

export const economicBuyerRoleOptions: Option<NonNullable<QualificationData["economicBuyerRole"]>>[] = [
  { value: "founder-ceo", label: "Founder/CEO" },
  { value: "cfo", label: "CFO" },
  { value: "controller", label: "Controller" },
  { value: "head-of-finance", label: "Head of Finance" },
  { value: "ops-manager", label: "Ops Manager" },
  { value: "other", label: "Other" },
];

export const timelineOptions: Option<NonNullable<QualificationData["timeline"]>>[] = [
  { value: "immediate", label: "Immediate" },
  { value: "this-quarter", label: "This quarter" },
  { value: "next-quarter", label: "Next quarter" },
  { value: "exploring", label: "Exploring" },
];

export const triStateOptions: Option<"true" | "false" | "">[] = [
  { value: "", label: "Don't know" },
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
];
