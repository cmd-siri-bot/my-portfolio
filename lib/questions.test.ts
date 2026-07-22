import { describe, expect, it } from "vitest";
import { getGapDrivenQuestions, getObjectionCard, getTalkTrack } from "./questions";
import { PRESETS } from "./presets";
import type { QualificationData } from "./types";

describe("getGapDrivenQuestions", () => {
  it("caps at 5 questions and marks the first as decisive", () => {
    const [, northbound] = PRESETS;
    const questions = getGapDrivenQuestions(northbound);
    expect(questions.length).toBeLessThanOrEqual(5);
    expect(questions[0]?.decisive).toBe(true);
    expect(questions.slice(1).every((q) => !q.decisive)).toBe(true);
  });

  it("returns nothing for a fully-known set of gap fields", () => {
    const [mapleAndMain] = PRESETS;
    // Maple & Main has every gap field filled in the preset.
    const questions = getGapDrivenQuestions(mapleAndMain);
    expect(questions).toHaveLength(0);
  });

  it("surfaces the hard-rule fields first for an INSUFFICIENT sheet", () => {
    const data: QualificationData = {
      companyName: "Blank Co.",
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
    const questions = getGapDrivenQuestions(data);
    expect(questions.length).toBeGreaterThan(0);
  });
});

describe("getObjectionCard", () => {
  it("returns null when currentSolution is unknown", () => {
    expect(getObjectionCard(null)).toBeNull();
  });

  it("returns a card for every currentSolution value", () => {
    const solutions: NonNullable<QualificationData["currentSolution"]>[] = [
      "manual-personal-cards",
      "corporate-visa-mastercard",
      "amex",
      "brex",
      "divvy-bill.com",
      "other",
    ];
    for (const s of solutions) {
      const card = getObjectionCard(s);
      expect(card?.objection).toBeTruthy();
      expect(card?.response).toBeTruthy();
    }
  });

  it("never mentions the retired 'Divvy' name in the objection copy", () => {
    const card = getObjectionCard("divvy-bill.com");
    expect(card?.objection).not.toMatch(/\bDivvy\b(?!.*BILL)/);
    expect(card?.objection).toContain("BILL Spend & Expense");
  });
});

describe("getTalkTrack", () => {
  it("returns the discovery-first fallback when topPain is null", () => {
    const track = getTalkTrack({ topPain: null } as QualificationData);
    expect(track.angle).toBeNull();
    expect(track.line).toContain("No pain point confirmed");
  });
});
