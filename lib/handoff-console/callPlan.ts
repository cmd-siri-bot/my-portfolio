// Must never receive PublicContext — savings math is confirmed-data-only.
import { computeSavingsModel } from "./engine";
import { ACCOUNTING_SOFTWARE_LABELS } from "./labels";
import type { QualificationData } from "./types";

export interface TalkTrack {
  angle: string | null;
  line: string;
}

export interface ConfirmAndExpandQuestion {
  question: string;
  why: string;
}

export interface CallPlan {
  confirmAndExpandQuestions: ConfirmAndExpandQuestion[];
  talkTrack: TalkTrack;
}

const TALK_TRACK_MAP: Record<
  NonNullable<QualificationData["topPain"]>,
  { angle: string; line: (data: QualificationData) => string }
> = {
  "visibility-control": {
    angle: "Live spend controls + real-time card limits",
    line: () =>
      "Every card can be capped and restricted before the money moves, not reconciled after.",
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
    line: () => "Cut the 2.5% foreign transaction fee on every USD vendor charge.",
  },
};

function getTalkTrack(data: QualificationData): TalkTrack {
  if (data.topPain == null) {
    return { angle: null, line: "No pain point confirmed — lead with discovery, not a pitch." };
  }
  const entry = TALK_TRACK_MAP[data.topPain];
  return { angle: entry.angle, line: entry.line(data) };
}

function conversational(missingFieldsNote: string): string {
  const topic = missingFieldsNote.replace(/^Ask: /, "");
  return `Still unconfirmed: ${topic} — worth asking directly.`;
}

function getConfirmAndExpandQuestions(data: QualificationData): ConfirmAndExpandQuestion[] {
  const questions: ConfirmAndExpandQuestion[] = [];

  if (data.currentSolution === "manual-personal-cards") {
    questions.push({
      question:
        "You mentioned expenses are still manual today — walk me through what breaks first: the receipts, the approvals, or the reconciliation?",
      why: "Pinpoints exactly where the manual process breaks down, so the demo targets the specific feature that fixes it — not a generic pitch.",
    });
  }

  if (data.numCardholders != null) {
    questions.push({
      question: `With ${data.numCardholders} people holding cards or filing expenses, who actually owns catching the ones that don't get submitted on time?`,
      why: "Surfaces who's accountable for chasing missed submissions today — usually reveals a gap automated approvals close.",
    });
  }

  if (data.multiEntity === true) {
    questions.push({
      question:
        "How does spend visibility work across entities today — is finance stitching that together manually at month-end?",
      why: "Multi-entity finance teams almost always have a consolidation problem worth quantifying — this confirms whether it's real here.",
    });
  }

  if (data.accountingSoftware != null && data.accountingSoftware !== "none") {
    const label = ACCOUNTING_SOFTWARE_LABELS[data.accountingSoftware];
    questions.push({
      question: `How clean is the sync between your current card process and ${label} right now?`,
      why: "Sync friction is a concrete, provable cost center (hours + errors) — a specific wedge into the pitch, not a vague one.",
    });
  }

  const savingsModel = computeSavingsModel(data);
  for (const line of savingsModel.lines) {
    if (line.status === "unconfirmed" && line.missingFieldsNote) {
      questions.push({ question: conversational(line.missingFieldsNote), why: line.why });
    }
  }

  if (data.triggerEvent) {
    questions.push({
      question: `You noted "${data.triggerEvent}" — what changed that's putting this on the radar now?`,
      why: "Trigger events create urgency — anchoring the timeline to a real internal event increases close velocity.",
    });
  }

  return questions;
}

export function generateCallPlan(data: QualificationData): CallPlan {
  return {
    confirmAndExpandQuestions: getConfirmAndExpandQuestions(data),
    talkTrack: getTalkTrack(data),
  };
}
