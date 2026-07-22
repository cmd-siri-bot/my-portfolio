// Must never receive PublicContext — outreach is confirmed-data-only.
import { money, type Model } from "./model";
import { CURRENT_SOLUTION_LABELS, ECONOMIC_BUYER_ROLE_LABELS, INDUSTRY_LABELS, TOP_PAIN_LABELS } from "./labels";
import type { VerdictResult } from "./verdict";
import type { QualificationData } from "./types";

export interface PitchEmail {
  subjectCuriosity: string;
  subjectNumberLed: string;
  body: string;
}

function heroLine(model: Model) {
  if (!model.heroLineKey) return null;
  return model.lines.find((l) => l.key === model.heroLineKey) ?? null;
}

export function generatePitchEmail(data: QualificationData, model: Model): PitchEmail {
  const industryLabel = INDUSTRY_LABELS[data.industry];
  const hero = heroLine(model);

  const subjectCuriosity = `Quick question about ${data.companyName}'s card process`;
  const subjectNumberLed =
    hero?.value != null ? `${money(hero.value)}/yr on the table for ${data.companyName}` : `A number worth checking for ${data.companyName}`;

  const numberSentence =
    hero?.sayItOnCall ??
    `I don't have your numbers dialed in yet, so no promises — but ${industryLabel} companies your size usually have real money sitting in card and vendor spend.`;

  const body = `Hi — I work with ${industryLabel} companies like ${data.companyName} on how spend gets managed day to day. ${numberSentence} Happy to walk through exactly how that number breaks down — worth 15 minutes this week?`;

  return { subjectCuriosity, subjectNumberLed, body };
}

export function generateCloseOutEmail(data: QualificationData, verdict: VerdictResult): string {
  const flip = verdict.flipConditions[0] ?? "If the fit changes, I'd love to pick this back up.";
  return `Hi — thanks for walking me through where things stand at ${data.companyName}. Based on what we've covered, now doesn't look like the right fit — but that's a timing call, not a "never." ${flip} I'll leave the door open and check back if that shifts. Appreciate the time either way.`;
}

export interface CrmNote {
  verdict: string;
  situation: string;
  pain: string;
  impact: string;
  criticalEvent: string;
  decision: string;
  nextStep: string;
}

export function generateCrmNote(data: QualificationData, model: Model, verdict: VerdictResult): CrmNote {
  const solutionLabel = data.currentSolution ? CURRENT_SOLUTION_LABELS[data.currentSolution] : "no confirmed current solution";
  const situationParts = [
    data.companyName,
    INDUSTRY_LABELS[data.industry],
    data.fteCount != null ? `${data.fteCount} FTEs` : null,
    data.province ? data.province : null,
  ].filter(Boolean);
  const situation = `${situationParts.join(" — ")}. Currently on ${solutionLabel}.`;

  const pain = data.topPain ? TOP_PAIN_LABELS[data.topPain] : "not yet confirmed";

  const hero = heroLine(model);
  const impact =
    hero?.value != null
      ? `${money(hero.value)}/yr modeled from ${hero.label.toLowerCase()} — ${model.computableCount} of ${model.lines.length} lines computable.`
      : "No modeled figure yet — required inputs unconfirmed.";

  const criticalEvent = data.triggerEvent ?? "none captured";

  const roleLabel = data.economicBuyerRole ? ECONOMIC_BUYER_ROLE_LABELS[data.economicBuyerRole] : "not yet identified";
  const engagementLabel =
    data.buyerEngaged === true ? "engaged" : data.buyerEngaged === false ? "not yet engaged" : "engagement unconfirmed";
  const decision = `${roleLabel} — ${engagementLabel}.`;

  const nextStep = verdict.nextAction;

  return { verdict: verdict.verdict.replace("_", " "), situation, pain, impact, criticalEvent, decision, nextStep };
}

export function formatCrmNote(note: CrmNote): string {
  return [
    `VERDICT: ${note.verdict}`,
    `SITUATION: ${note.situation}`,
    `PAIN: ${note.pain}`,
    `IMPACT: ${note.impact}`,
    `CRITICAL EVENT: ${note.criticalEvent}`,
    `DECISION: ${note.decision}`,
    `NEXT STEP: ${note.nextStep}`,
  ].join("\n");
}
