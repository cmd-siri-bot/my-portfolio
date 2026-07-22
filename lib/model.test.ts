import { describe, expect, it } from "vitest";
import { computeModel } from "./model";
import { getDefaultAssumptionValues } from "./assumptions";
import { PRESETS } from "./presets";

describe("computeModel — Maple & Main Coffee Co. (default assumptions)", () => {
  const [mapleAndMain] = PRESETS;
  const model = computeModel(mapleAndMain, getDefaultAssumptionValues());

  it("computes core spend savings: 18000 * 12 * 0.04 = 8640", () => {
    const line = model.lines.find((l) => l.key === "coreSavings")!;
    expect(line.computable).toBe(true);
    expect(line.value).toBe(8640);
  });

  it("computes FX markup savings: 18000 * 12 * 0.20 * 0.025 = 1080", () => {
    const line = model.lines.find((l) => l.key === "fxSavings")!;
    expect(line.computable).toBe(true);
    expect(line.value).toBe(1080);
  });

  it("computes close-time savings: 20 * 12 * 0.65 * 55 = 8580", () => {
    const line = model.lines.find((l) => l.key === "closeTimeSavings")!;
    expect(line.computable).toBe(true);
    expect(line.value).toBe(8580);
  });

  it("totals all three computable lines: 18300", () => {
    expect(model.total).toBe(18300);
  });

  it("promotes FX to hero stat once USD share >= 20%", () => {
    expect(model.heroLineKey).toBe("fxSavings");
  });
});

describe("computeModel — missing fields stay non-computable, never silently zero", () => {
  const [, , lakeview] = PRESETS;
  const model = computeModel(lakeview, getDefaultAssumptionValues());

  it("FX line is non-computable when usdVendorSharePct is null", () => {
    const line = model.lines.find((l) => l.key === "fxSavings")!;
    expect(line.computable).toBe(false);
    expect(line.value).toBeNull();
    expect(line.missingFieldsNote).toBeTruthy();
  });

  it("close-time line is non-computable when closeHoursPerMonth is null", () => {
    const line = model.lines.find((l) => l.key === "closeTimeSavings")!;
    expect(line.computable).toBe(false);
    expect(line.value).toBeNull();
  });

  it("total only sums computable lines", () => {
    const coreLine = model.lines.find((l) => l.key === "coreSavings")!;
    expect(model.total).toBe(coreLine.value);
  });
});

describe("computeModel — assumption edits recompute live", () => {
  const [mapleAndMain] = PRESETS;

  it("changing coreSavingsRate changes the core spend savings figure", () => {
    const defaults = getDefaultAssumptionValues();
    const edited = { ...defaults, coreSavingsRate: 0.05 };
    const model = computeModel(mapleAndMain, edited);
    const line = model.lines.find((l) => l.key === "coreSavings")!;
    expect(line.value).toBe(Math.round(18000 * 12 * 0.05));
  });
});
