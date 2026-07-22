// Must never receive PublicContext — savings math is confirmed-data-only.
import { computeSavingsModel } from "./engine";
import { ACCOUNTING_SOFTWARE_LABELS } from "./labels";
import type { QualificationData } from "./types";

export interface TalkTrack {
  angle: string | null;
  line: string;
}

export interface CallPlan {
  confirmAndExpandQuestions: string[];
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

function getConfirmAndExpandQuestions(data: QualificationData): string[] {
  const questions: string[] = [];

  if (data.currentSolution === "manual-personal-cards") {
    questions.push(
      "You mentioned expenses are still manual today — walk me through what breaks first: the receipts, the approvals, or the reconciliation?"
    );
  }

  if (data.numCardholders != null) {
    questions.push(
      `With ${data.numCardholders} people holding cards or filing expenses, who actually owns catching the ones that don't get submitted on time?`
    );
  }

  if (data.multiEntity === true) {
    questions.push(
      "How does spend visibility work across entities today — is finance stitching that together manually at month-end?"
    );
  }

  if (data.accountingSoftware != null && data.accountingSoftware !== "none") {
    const label = ACCOUNTING_SOFTWARE_LABELS[data.accountingSoftware];
    questions.push(`How clean is the sync between your current card process and ${label} right now?`);
  }

  const savingsModel = computeSavingsModel(data);
  for (const line of savingsModel.lines) {
    if (line.status === "unconfirmed" && line.missingFieldsNote) {
      questions.push(conversational(line.missingFieldsNote));
    }
  }

  if (data.triggerEvent) {
    questions.push(
      `You noted "${data.triggerEvent}" — what changed that's putting this on the radar now?`
    );
  }

  return questions;
}

export function generateCallPlan(data: QualificationData): CallPlan {
  return {
    confirmAndExpandQuestions: getConfirmAndExpandQuestions(data),
    talkTrack: getTalkTrack(data),
  };
}
