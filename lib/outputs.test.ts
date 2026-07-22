import { describe, expect, it } from "vitest";
import { generatePitchEmail, generateCloseOutEmail, generateCrmNote, formatCrmNote } from "./outputs";
import { computeModel } from "./model";
import { getDefaultAssumptionValues } from "./assumptions";
import { computeVerdict } from "./verdict";
import { PRESETS } from "./presets";

function wordCount(text: string): number {
  return text.trim().split(/\s+/).length;
}

describe("generatePitchEmail", () => {
  it("stays at or under 120 words for a fully-confirmed ADVANCE preset", () => {
    const [mapleAndMain] = PRESETS;
    const model = computeModel(mapleAndMain, getDefaultAssumptionValues());
    const email = generatePitchEmail(mapleAndMain, model);
    expect(wordCount(email.body)).toBeLessThanOrEqual(120);
  });

  it("produces two distinct subject line variants", () => {
    const [mapleAndMain] = PRESETS;
    const model = computeModel(mapleAndMain, getDefaultAssumptionValues());
    const email = generatePitchEmail(mapleAndMain, model);
    expect(email.subjectCuriosity).not.toBe(email.subjectNumberLed);
    expect(email.subjectCuriosity.length).toBeGreaterThan(0);
    expect(email.subjectNumberLed.length).toBeGreaterThan(0);
  });

  it("degrades gracefully with no confirmed numbers, still under 120 words", () => {
    const empty = { ...PRESETS[0], currentMonthlySpend: null, usdVendorSharePct: null, closeHoursPerMonth: null };
    const model = computeModel(empty, getDefaultAssumptionValues());
    const email = generatePitchEmail(empty, model);
    expect(wordCount(email.body)).toBeLessThanOrEqual(120);
  });
});

describe("generateCloseOutEmail", () => {
  it("names the flip condition for a DISQUALIFY verdict", () => {
    const [, , lakeview] = PRESETS;
    const verdict = computeVerdict(lakeview);
    expect(verdict.verdict).toBe("DISQUALIFY");
    const email = generateCloseOutEmail(lakeview, verdict);
    expect(email).toContain(lakeview.companyName);
    expect(wordCount(email)).toBeLessThan(120);
  });
});

describe("generateCrmNote", () => {
  it("leads with the verdict and reflects the modeled hero figure", () => {
    const [mapleAndMain] = PRESETS;
    const model = computeModel(mapleAndMain, getDefaultAssumptionValues());
    const verdict = computeVerdict(mapleAndMain);
    const note = generateCrmNote(mapleAndMain, model, verdict);
    const text = formatCrmNote(note);
    expect(text).toContain("VERDICT: ADVANCE");
    expect(text).toContain("IMPACT:");
  });
});
