// Must never receive PublicContext — savings math is confirmed-data-only.
import { computeSavingsModel } from "./engine";
import {
  CURRENT_SOLUTION_LABELS,
  ECONOMIC_BUYER_ROLE_LABELS,
  INDUSTRY_LABELS,
  TOP_PAIN_LABELS,
} from "./labels";
import type { QualificationData } from "./types";

function money(value: number): string {
  return `$${Math.round(value).toLocaleString("en-CA")}`;
}

export function generateColdEmailOpener(data: QualificationData): string {
  const savingsModel = computeSavingsModel(data);
  const confirmedLines = savingsModel.lines.filter((l) => l.status === "confirmed");
  const industryLabel = INDUSTRY_LABELS[data.industry];

  if (confirmedLines.length === 0) {
    return `${data.companyName} showed up as a ${industryLabel} business worth a closer look. I don't have your numbers yet, so no promises — what's monthly card and vendor spend running at today, and how much of the close process is still manual? Fifteen minutes would tell us fast whether there's a real fit here.`;
  }

  const strongest = confirmedLines.reduce((best, line) =>
    (line.high ?? 0) > (best.high ?? 0) ? line : best
  );

  return `${data.companyName} is the kind of ${industryLabel} business I like working with. Based just on what you've confirmed — ${strongest.basis.toLowerCase()} — ${strongest.label.toLowerCase()} alone lands around ${money(
    strongest.low ?? 0
  )}–${money(strongest.high ?? 0)}/yr, no benchmarks added. Worth 15 minutes to see how the rest maps for you?`;
}

export interface CrmNote {
  situation: string;
  pain: string;
  impact: string;
  criticalEvent: string;
  decision: string;
  nextStep: string;
}

export function generateCrmNote(data: QualificationData): CrmNote {
  const savingsModel = computeSavingsModel(data);

  const solutionLabel = data.currentSolution
    ? CURRENT_SOLUTION_LABELS[data.currentSolution]
    : "no confirmed current solution";
  const situationParts = [
    data.companyName,
    INDUSTRY_LABELS[data.industry],
    data.fteCount != null ? `${data.fteCount} FTEs` : null,
    data.province ? data.province : null,
  ].filter(Boolean);
  const situation = `${situationParts.join(" — ")}. Currently on ${solutionLabel}.`;

  const pain = data.topPain ? TOP_PAIN_LABELS[data.topPain] : "not yet confirmed";

  const unconfirmedItems = savingsModel.lines
    .filter((l) => l.status === "unconfirmed" && l.missingFieldsNote)
    .map((l) => (l.missingFieldsNote as string).replace(/^Ask: /, ""));
  const impact = `${money(savingsModel.totalLow)}–${money(
    savingsModel.totalHigh
  )}/yr — based on confirmed inputs only. ${
    unconfirmedItems.length > 0
      ? `Still to confirm: ${unconfirmedItems.join("; ")}.`
      : "All savings lines confirmed."
  }`;

  const criticalEvent = data.triggerEvent ?? "none captured";

  const roleLabel = data.economicBuyerRole
    ? ECONOMIC_BUYER_ROLE_LABELS[data.economicBuyerRole]
    : "not yet identified";
  const engagementLabel =
    data.buyerEngaged === true
      ? "engaged"
      : data.buyerEngaged === false
      ? "not yet engaged"
      : "engagement unconfirmed";
  const decision = `${roleLabel} — ${engagementLabel}.`;

  const nextStep = "TBD — to be set on the call";

  return { situation, pain, impact, criticalEvent, decision, nextStep };
}

export function formatCrmNote(note: CrmNote): string {
  return [
    `SITUATION: ${note.situation}`,
    `PAIN: ${note.pain}`,
    `IMPACT: ${note.impact}`,
    `CRITICAL EVENT: ${note.criticalEvent}`,
    `DECISION: ${note.decision}`,
    `NEXT STEP: ${note.nextStep}`,
  ].join("\n");
}
