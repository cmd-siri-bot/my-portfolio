// Pure verdict logic — zero React imports, fully unit-testable.
// Must never receive PublicContext — qualification judgment is confirmed-data-only.
import { CURRENT_SOLUTION_LABELS, REVENUE_BAND_LABELS, TIMELINE_LABELS } from "./labels";
import type { QualificationData } from "./types";

export type VerdictType = "ADVANCE" | "NURTURE" | "DISQUALIFY" | "ROUTE_UP" | "INSUFFICIENT";

export type RuleCategory = "hard-disqualifier" | "nurture-trigger" | "score-weight";

export interface VerdictRule {
  id: string;
  category: RuleCategory;
  label: string;
  description: string;
}

export interface VerdictResult {
  verdict: VerdictType;
  score: number | null;
  citedRuleIds: string[];
  reasons: string[];
  flipConditions: string[];
  nextAction: string;
  minimumFieldSet: string[];
}

// Exported so the "How scoring works" panel renders directly from this data —
// the docs can never drift from the code.
export const RULES: VerdictRule[] = [
  {
    id: "spend_floor",
    category: "hard-disqualifier",
    label: "Spend floor",
    description:
      "Monthly spend < $1,500 CAD, FTE count < 5, and revenue band is Pre-revenue or <$1M — spend base too small to clear ROI in a transactional sales cycle.",
  },
  {
    id: "no_spend_vehicle",
    category: "hard-disqualifier",
    label: "No spend vehicle",
    description:
      "Current solution is manual/personal cards, 0 cardholders, and spend is unknown or near-zero — there's no corporate spend to migrate yet.",
  },
  {
    id: "wrong_segment",
    category: "hard-disqualifier",
    label: "Wrong segment (Route Up)",
    description:
      "Multi-entity and $20M+ revenue — not a disqualification on fit, a disqualification on segment. Route to mid-market instead of running the SMB motion.",
  },
  {
    id: "no_urgency",
    category: "nurture-trigger",
    label: "No urgency",
    description: "Timeline is Exploring, buyer isn't engaged, and no trigger event is captured — nothing is forcing a decision.",
  },
  {
    id: "no_authority_path",
    category: "nurture-trigger",
    label: "No authority path",
    description: "Economic buyer role is unknown and the buyer isn't engaged.",
  },
  {
    id: "score_budget",
    category: "score-weight",
    label: "Budget signal — 30%",
    description: "Spend level combined with cardholder count.",
  },
  {
    id: "score_authority",
    category: "score-weight",
    label: "Authority — 25%",
    description: "Buyer role known, plus whether they're engaged.",
  },
  {
    id: "score_timeline",
    category: "score-weight",
    label: "Timeline urgency — 20%",
    description: "How soon the prospect says they want to move.",
  },
  {
    id: "score_pain",
    category: "score-weight",
    label: "Pain severity — 15%",
    description: "Whether a pain point is named, and whether close-hours or FX exposure is quantified.",
  },
  {
    id: "score_trigger",
    category: "score-weight",
    label: "Trigger event present — 10%",
    description: "A named internal event creating urgency.",
  },
];

const HARD_RULE_FIELDS: (keyof QualificationData)[] = [
  "currentMonthlySpend",
  "fteCount",
  "revenueBand",
  "currentSolution",
  "numCardholders",
  "multiEntity",
];

const FIELD_LABELS: Record<string, string> = {
  currentMonthlySpend: "Current monthly spend",
  fteCount: "FTE count",
  revenueBand: "Revenue band",
  currentSolution: "Current solution",
  numCardholders: "# of cardholders",
  multiEntity: "Multi-entity",
};

function isUnknown(value: unknown): boolean {
  return value === null || value === undefined;
}

function countUnknown(data: QualificationData, fields: (keyof QualificationData)[]): number {
  return fields.filter((f) => isUnknown(data[f])).length;
}

function isLowOrNoSpend(spend: number | null): boolean {
  return spend == null || spend < 1500;
}

// ---------------------------------------------------------------------------
// Hard disqualifiers
// ---------------------------------------------------------------------------

function checkSpendFloor(data: QualificationData): VerdictResult | null {
  if (data.currentMonthlySpend == null || data.fteCount == null || data.revenueBand == null) return null;
  const preRevenueOrUnder1M = data.revenueBand === "pre-revenue" || data.revenueBand === "<1M";
  if (data.currentMonthlySpend < 1500 && data.fteCount < 5 && preRevenueOrUnder1M) {
    return {
      verdict: "DISQUALIFY",
      score: null,
      citedRuleIds: ["spend_floor"],
      reasons: [
        `Monthly spend: $${data.currentMonthlySpend.toLocaleString("en-CA")} (below the $1,500 floor)`,
        `FTE count: ${data.fteCount} (below 5)`,
        `Revenue band: ${REVENUE_BAND_LABELS[data.revenueBand]}`,
      ],
      flipConditions: [
        "A confirmed monthly spend above $1,500, 5+ FTEs, or revenue past pre-revenue moves this off the disqualify list — revisit at roughly $3–5K/mo.",
      ],
      nextAction: "Send the polite close-out email below and exit the pipeline.",
      minimumFieldSet: [],
    };
  }
  return null;
}

function checkNoSpendVehicle(data: QualificationData): VerdictResult | null {
  if (data.currentSolution == null || data.numCardholders == null) return null;
  if (data.currentSolution === "manual-personal-cards" && data.numCardholders === 0 && isLowOrNoSpend(data.currentMonthlySpend)) {
    return {
      verdict: "DISQUALIFY",
      score: null,
      citedRuleIds: ["no_spend_vehicle"],
      reasons: [
        `Current solution: ${CURRENT_SOLUTION_LABELS["manual-personal-cards"]}`,
        `Cardholders: 0`,
        `Spend: ${data.currentMonthlySpend == null ? "unknown" : `$${data.currentMonthlySpend.toLocaleString("en-CA")}/mo`}`,
      ],
      flipConditions: ["A confirmed spend figure or any cardholders above zero reopens this."],
      nextAction: "Send the polite close-out email below and exit the pipeline.",
      minimumFieldSet: [],
    };
  }
  return null;
}

function checkWrongSegment(data: QualificationData): VerdictResult | null {
  if (data.multiEntity == null || data.revenueBand == null) return null;
  if (data.multiEntity === true && data.revenueBand === "20M+") {
    return {
      verdict: "ROUTE_UP",
      score: null,
      citedRuleIds: ["wrong_segment"],
      reasons: [`Multi-entity: Yes`, `Revenue band: ${REVENUE_BAND_LABELS["20M+"]}`],
      flipConditions: ["This isn't a fit problem — it's a segment problem. Route to mid-market instead of running the SMB motion."],
      nextAction: "Route to mid-market; hand off with the confirmed inputs so they don't restart discovery.",
      minimumFieldSet: [],
    };
  }
  return null;
}

// ---------------------------------------------------------------------------
// Nurture triggers
// ---------------------------------------------------------------------------

function checkNoUrgency(data: QualificationData): VerdictResult | null {
  if (data.timeline == null || data.buyerEngaged == null) return null;
  const noTrigger = !data.triggerEvent;
  if (data.timeline === "exploring" && data.buyerEngaged === false && noTrigger) {
    return {
      verdict: "NURTURE",
      score: null,
      citedRuleIds: ["no_urgency"],
      reasons: [`Timeline: ${TIMELINE_LABELS.exploring}`, `Buyer engaged: No`, `Trigger event: none captured`],
      flipConditions: ["A confirmed trigger event or buyer engagement moves this to ADVANCE."],
      nextAction: "Return to SDR with the questions below; re-engage once a trigger event or buyer engagement is confirmed.",
      minimumFieldSet: [],
    };
  }
  return null;
}

function checkNoAuthorityPath(data: QualificationData): VerdictResult | null {
  if (data.buyerEngaged == null) return null;
  if (data.economicBuyerRole == null && data.buyerEngaged === false) {
    return {
      verdict: "NURTURE",
      score: null,
      citedRuleIds: ["no_authority_path"],
      reasons: [`Economic buyer: Don't know`, `Buyer engaged: No`],
      flipConditions: ["Identifying the economic buyer, or getting them engaged, moves this forward."],
      nextAction: "Return to SDR with the questions below; re-engage once a buyer is identified or engaged.",
      minimumFieldSet: [],
    };
  }
  return null;
}

// ---------------------------------------------------------------------------
// Weighted score (ADVANCE vs NURTURE vs soft DISQUALIFY)
// ---------------------------------------------------------------------------

interface ScoreComponent {
  ruleId: string;
  label: string;
  weight: number;
  score: number; // 0-1
  detail: string;
}

function scoreBudget(data: QualificationData): ScoreComponent {
  let spendScore = 0;
  if (data.currentMonthlySpend != null) {
    if (data.currentMonthlySpend >= 30000) spendScore = 1;
    else if (data.currentMonthlySpend >= 10000) spendScore = 0.85;
    else if (data.currentMonthlySpend >= 3000) spendScore = 0.6;
    else spendScore = 0.3;
  }
  let cardholderScore = 0;
  if (data.numCardholders != null) {
    if (data.numCardholders > 20) cardholderScore = 1;
    else if (data.numCardholders >= 6) cardholderScore = 0.7;
    else if (data.numCardholders >= 1) cardholderScore = 0.3;
  }
  const score = (spendScore + cardholderScore) / 2;
  const spendText = data.currentMonthlySpend != null ? `$${data.currentMonthlySpend.toLocaleString("en-CA")}/mo` : "unknown spend";
  const cardText = data.numCardholders != null ? `${data.numCardholders} cardholders` : "unknown cardholders";
  return { ruleId: "score_budget", label: "Budget signal", weight: 0.3, score, detail: `${spendText} · ${cardText}` };
}

function scoreAuthority(data: QualificationData): ScoreComponent {
  const roleKnown = data.economicBuyerRole != null ? 0.5 : 0;
  const engaged = data.buyerEngaged === true ? 0.5 : 0;
  const score = roleKnown + engaged;
  const roleText = data.economicBuyerRole ?? "unknown buyer";
  const engagedText = data.buyerEngaged === true ? "engaged" : data.buyerEngaged === false ? "not engaged" : "engagement unknown";
  return { ruleId: "score_authority", label: "Authority", weight: 0.25, score, detail: `${roleText} · ${engagedText}` };
}

const TIMELINE_URGENCY: Record<NonNullable<QualificationData["timeline"]>, number> = {
  immediate: 1,
  "this-quarter": 0.75,
  "next-quarter": 0.45,
  exploring: 0.15,
};

function scoreTimeline(data: QualificationData): ScoreComponent {
  const score = data.timeline != null ? TIMELINE_URGENCY[data.timeline] : 0;
  const detail = data.timeline != null ? TIMELINE_LABELS[data.timeline] : "Timeline unknown";
  return { ruleId: "score_timeline", label: "Timeline urgency", weight: 0.2, score, detail };
}

function scorePain(data: QualificationData): ScoreComponent {
  const painNamed = data.topPain != null ? 0.5 : 0;
  const quantified = data.closeHoursPerMonth != null || data.usdVendorSharePct != null ? 0.5 : 0;
  const score = painNamed + quantified;
  const detail = `${data.topPain != null ? "pain named" : "no pain named"} · ${
    quantified ? "quantified exposure" : "no quantified exposure"
  }`;
  return { ruleId: "score_pain", label: "Pain severity", weight: 0.15, score, detail };
}

function scoreTrigger(data: QualificationData): ScoreComponent {
  const score = data.triggerEvent ? 1 : 0;
  const detail = data.triggerEvent ? `"${data.triggerEvent}"` : "no trigger event";
  return { ruleId: "score_trigger", label: "Trigger event", weight: 0.1, score, detail };
}

function computeScoreComponents(data: QualificationData): ScoreComponent[] {
  return [scoreBudget(data), scoreAuthority(data), scoreTimeline(data), scorePain(data), scoreTrigger(data)];
}

function computeWeightedScore(components: ScoreComponent[]): number {
  const raw = components.reduce((sum, c) => sum + c.weight * c.score, 0);
  return Math.round(raw * 100);
}

function scoredVerdict(data: QualificationData): VerdictResult {
  const components = computeScoreComponents(data);
  const score = computeWeightedScore(components);
  const sorted = [...components].sort((a, b) => b.weight * b.score - a.weight * a.score);
  const weakest = [...components].sort((a, b) => a.weight * a.score - b.weight * b.score);

  if (score >= 65) {
    const strongest = sorted.slice(0, 3);
    const weakestOne = weakest[0];
    return {
      verdict: "ADVANCE",
      score,
      citedRuleIds: strongest.map((c) => c.ruleId),
      reasons: strongest.map((c) => `${c.label}: ${c.detail}`),
      flipConditions: [
        `Already clears the bar — nothing needs to flip. Confirming "${weakestOne.label.toLowerCase()}" would make the pitch even sharper.`,
      ],
      nextAction: "Book the demo; open with the FX or core-savings number from the model below.",
      minimumFieldSet: [],
    };
  }

  if (score >= 35) {
    const weakestTwo = weakest.slice(0, 2);
    return {
      verdict: "NURTURE",
      score,
      citedRuleIds: weakestTwo.map((c) => c.ruleId),
      reasons: weakestTwo.map((c) => `${c.label}: ${c.detail}`),
      flipConditions: [`Confirming ${weakestTwo.map((c) => c.label.toLowerCase()).join(" and ")} is what would move this to ADVANCE.`],
      nextAction: "Return to SDR with the questions below; re-engage once the gaps are closed.",
      minimumFieldSet: [],
    };
  }

  const weakestThree = weakest.slice(0, 3);
  return {
    verdict: "DISQUALIFY",
    score,
    citedRuleIds: weakestThree.map((c) => c.ruleId),
    reasons: weakestThree.map((c) => `${c.label}: ${c.detail}`),
    flipConditions: [`Score is below the bar on ${weakestThree.map((c) => c.label.toLowerCase()).join(", ")} — no single confirmed field flips this alone.`],
    nextAction: "Send the polite close-out email below and exit the pipeline.",
    minimumFieldSet: [],
  };
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

export function computeVerdict(data: QualificationData): VerdictResult {
  const unknownHardFields = countUnknown(data, HARD_RULE_FIELDS);
  if (unknownHardFields > HARD_RULE_FIELDS.length / 2) {
    const minimumFieldSet = HARD_RULE_FIELDS.filter((f) => isUnknown(data[f])).map((f) => FIELD_LABELS[f]);
    return {
      verdict: "INSUFFICIENT",
      score: null,
      citedRuleIds: [],
      reasons: [],
      flipConditions: [],
      nextAction: "Get these confirmed before a verdict — or a savings model — can be produced.",
      minimumFieldSet,
    };
  }

  const hardChecks = [checkSpendFloor, checkWrongSegment, checkNoSpendVehicle];
  for (const check of hardChecks) {
    const result = check(data);
    if (result) return result;
  }

  const triggerChecks = [checkNoUrgency, checkNoAuthorityPath];
  for (const check of triggerChecks) {
    const result = check(data);
    if (result) return result;
  }

  return scoredVerdict(data);
}
