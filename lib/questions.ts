// Must never receive PublicContext — the call plan is confirmed-data-only.
import { ACCOUNTING_SOFTWARE_LABELS } from "./labels";
import { computeVerdict, type VerdictType } from "./verdict";
import type { QualificationData } from "./types";

export interface GapQuestion {
  field: keyof QualificationData;
  question: string;
  decisive: boolean;
}

const GAP_QUESTIONS: Partial<Record<keyof QualificationData, string>> = {
  fteCount: "How many people are on the team today?",
  revenueBand: "What's the general revenue range you're operating in — a rough band is fine?",
  fundingStage: "Are you bootstrapped, or have you raised outside funding?",
  province: "Which province are you primarily operating out of?",
  multiEntity: "Do you operate as a single entity, or is there more than one legal entity to think about?",
  currentMonthlySpend: "Roughly what are you spending on cards and vendors in a given month?",
  numCardholders: "How many people currently hold a card or file expenses?",
  currentSolution: "What are you using today to manage company spend — personal cards, a corporate card program, something else?",
  topPain: "What's the single biggest headache in how spend gets managed today?",
  accountingSoftware: "What accounting system are you running on?",
  closeHoursPerMonth: "About how many hours does month-end reconciliation eat up today?",
  usdVendorSharePct: "Roughly what share of your vendor spend is billed in USD?",
  economicBuyerRole: "Who actually owns the decision to change how spend is managed?",
  buyerEngaged: "Has that person been part of this conversation, or are you scoping it out solo first?",
  timeline: "What's driving the timeline here — is this urgent, or more exploratory?",
  triggerEvent: "Did something specific happen recently that put this on your radar?",
};

// One plausible resolved value per field, used only to simulate "what if this
// were answered" for ranking — never written back into real form state.
const PLAUSIBLE_VALUES: Partial<Record<keyof QualificationData, unknown[]>> = {
  fteCount: [20],
  revenueBand: ["1M-5M"],
  fundingStage: ["bootstrapped"],
  province: ["ON"],
  multiEntity: [true, false],
  currentMonthlySpend: [10000],
  numCardholders: [10],
  currentSolution: ["corporate-visa-mastercard"],
  topPain: ["manual-reconciliation"],
  accountingSoftware: ["quickbooks-online"],
  closeHoursPerMonth: [15],
  usdVendorSharePct: [30],
  economicBuyerRole: ["controller"],
  buyerEngaged: [true, false],
  timeline: ["this-quarter"],
  triggerEvent: ["Recently hired new finance leadership"],
};

// INSUFFICIENT sits below every real verdict so resolving it always registers
// as impactful, regardless of which real verdict it resolves to.
const VERDICT_RANK: Record<VerdictType, number> = {
  INSUFFICIENT: -1,
  DISQUALIFY: 0,
  NURTURE: 1,
  ROUTE_UP: 1,
  ADVANCE: 2,
};

function verdictImpact(before: VerdictType, beforeScore: number | null, after: VerdictType, afterScore: number | null): number {
  const typeDelta = Math.abs(VERDICT_RANK[after] - VERDICT_RANK[before]) * 100;
  const scoreDelta = Math.abs((afterScore ?? 0) - (beforeScore ?? 0));
  return typeDelta + scoreDelta;
}

const MAX_GAP_QUESTIONS = 5;

export function getGapDrivenQuestions(data: QualificationData): GapQuestion[] {
  const baseline = computeVerdict(data);
  const fields = Object.keys(GAP_QUESTIONS) as (keyof QualificationData)[];
  const unknownFields = fields.filter((f) => data[f] == null);

  const ranked = unknownFields
    .map((field) => {
      const testValues = PLAUSIBLE_VALUES[field] ?? [];
      const leverage = testValues.reduce((max: number, testValue) => {
        const simulated = { ...data, [field]: testValue };
        const result = computeVerdict(simulated);
        const impact = verdictImpact(baseline.verdict, baseline.score, result.verdict, result.score);
        return Math.max(max, impact);
      }, 0);
      return { field, leverage };
    })
    .sort((a, b) => b.leverage - a.leverage)
    .slice(0, MAX_GAP_QUESTIONS);

  return ranked.map(({ field }, i) => ({
    field,
    question: GAP_QUESTIONS[field] as string,
    decisive: i === 0,
  }));
}

export interface ObjectionCard {
  objection: string;
  response: string;
}

export const OBJECTION_CARDS: Record<NonNullable<QualificationData["currentSolution"]>, ObjectionCard> = {
  "manual-personal-cards": {
    objection: "\"We just reimburse people — it works fine.\"",
    response:
      "It works until close takes three extra days chasing receipts. This makes the reimbursement step disappear, not just go faster.",
  },
  "corporate-visa-mastercard": {
    objection: "\"We already have a bank-issued card program.\"",
    response:
      "Card issuance was never the hard part — the coding, approvals, and reconciliation around it were. That's what changes.",
  },
  amex: {
    objection: "\"We get good rewards with Amex — why switch?\"",
    response: "Keep rewards separate from control — this is about real-time limits and auto-coding, not points.",
  },
  brex: {
    objection: "\"We're already on a modern card platform.\"",
    response:
      "Then it's not platform vs. no platform — it's a feature-by-feature comparison, starting with whatever's actually annoying them today.",
  },
  "divvy-bill.com": {
    objection: "\"We're already on BILL Spend & Expense.\"",
    response: "Worth a direct comparison on the two or three things actually causing friction today, not a feature bake-off.",
  },
  other: {
    objection: "\"We've got something in place already.\"",
    response: "Good — that means the pain isn't 'no tool,' it's a specific gap in the one they have. Find that gap before pitching.",
  },
};

export function getObjectionCard(currentSolution: QualificationData["currentSolution"]): ObjectionCard | null {
  if (currentSolution == null) return null;
  return OBJECTION_CARDS[currentSolution];
}

export interface TalkTrack {
  angle: string | null;
  line: string;
}

const TALK_TRACK_MAP: Record<
  NonNullable<QualificationData["topPain"]>,
  { angle: string; line: (data: QualificationData) => string }
> = {
  "visibility-control": {
    angle: "Live spend controls + real-time card limits",
    line: () => "Every card can be capped and restricted before the money moves, not reconciled after.",
  },
  "manual-reconciliation": {
    angle: "Automated receipt capture via SMS/email",
    line: () => "Receipts match to transactions automatically — no more chasing PDFs.",
  },
  "slow-close": {
    angle: "Auto-categorization + accounting sync",
    line: () => "Spend is coded and synced continuously, not batched at month-end.",
  },
  "duplicate-saas-spend": {
    angle: "Spend visibility dashboard",
    line: () => "See every subscription in one place before the renewal, not after.",
  },
  "fraud-risk": {
    angle: "Real-time transaction controls + alerts",
    line: () => "Flag unusual spend the moment it happens, not on the statement.",
  },
  "accounting-sync": {
    angle: "Native ERP/accounting integrations",
    line: (data) =>
      `Push clean, coded transactions straight into ${
        data.accountingSoftware ? ACCOUNTING_SOFTWARE_LABELS[data.accountingSoftware] : "your accounting system"
      }.`,
  },
  "fx-costs": {
    angle: "Multi-currency cards, no markup",
    line: () => "Cut the FX spread on every USD vendor charge.",
  },
};

export function getTalkTrack(data: QualificationData): TalkTrack {
  if (data.topPain == null) {
    return { angle: null, line: "No pain point confirmed — lead with discovery, not a pitch." };
  }
  const entry = TALK_TRACK_MAP[data.topPain];
  return { angle: entry.angle, line: entry.line(data) };
}
