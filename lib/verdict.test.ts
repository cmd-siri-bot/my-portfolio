import { describe, expect, it } from "vitest";
import { computeVerdict } from "./verdict";
import { PRESETS } from "./presets";
import type { QualificationData } from "./types";

const BASE: QualificationData = {
  companyName: "Test Co",
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

function make(overrides: Partial<QualificationData>): QualificationData {
  return { ...BASE, ...overrides };
}

describe("computeVerdict — INSUFFICIENT", () => {
  it("returns INSUFFICIENT when a majority of hard-rule fields are unknown", () => {
    const data = make({ fteCount: 10, currentMonthlySpend: 5000 });
    const result = computeVerdict(data);
    expect(result.verdict).toBe("INSUFFICIENT");
    expect(result.minimumFieldSet).toEqual(
      expect.arrayContaining(["Revenue band", "Current solution", "# of cardholders", "Multi-entity"])
    );
    expect(result.minimumFieldSet).toHaveLength(4);
  });

  it("does not return INSUFFICIENT once enough hard-rule fields are known", () => {
    const data = make({
      currentMonthlySpend: 5000,
      fteCount: 10,
      revenueBand: "1M-5M",
      currentSolution: "amex",
      numCardholders: 3,
      multiEntity: false,
    });
    expect(computeVerdict(data).verdict).not.toBe("INSUFFICIENT");
  });
});

describe("computeVerdict — hard disqualifiers", () => {
  it("spend_floor fires: low spend + low FTE + pre-revenue/<1M", () => {
    const data = make({
      currentMonthlySpend: 900,
      fteCount: 3,
      revenueBand: "pre-revenue",
      currentSolution: "other",
      numCardholders: 2,
      multiEntity: false,
    });
    const result = computeVerdict(data);
    expect(result.verdict).toBe("DISQUALIFY");
    expect(result.citedRuleIds).toContain("spend_floor");
    expect(result.reasons.join(" ")).toContain("900");
  });

  it("spend_floor does not fire if revenue band is above the floor", () => {
    const data = make({
      currentMonthlySpend: 900,
      fteCount: 3,
      revenueBand: "5M-20M",
      currentSolution: "amex",
      numCardholders: 2,
      multiEntity: false,
    });
    expect(computeVerdict(data).citedRuleIds).not.toContain("spend_floor");
  });

  it("no_spend_vehicle fires: manual/personal cards + 0 cardholders + no/low spend", () => {
    const data = make({
      currentMonthlySpend: null,
      fteCount: 9,
      revenueBand: "1M-5M",
      currentSolution: "manual-personal-cards",
      numCardholders: 0,
      multiEntity: false,
    });
    const result = computeVerdict(data);
    expect(result.verdict).toBe("DISQUALIFY");
    expect(result.citedRuleIds).toContain("no_spend_vehicle");
  });

  it("no_spend_vehicle does not fire once cardholders are above zero", () => {
    const data = make({
      currentMonthlySpend: null,
      fteCount: 9,
      revenueBand: "1M-5M",
      currentSolution: "manual-personal-cards",
      numCardholders: 4,
      multiEntity: false,
    });
    expect(computeVerdict(data).citedRuleIds).not.toContain("no_spend_vehicle");
  });

  it("wrong_segment fires and returns ROUTE_UP: multi-entity + $20M+ revenue", () => {
    const data = make({
      currentMonthlySpend: 50000,
      fteCount: 300,
      revenueBand: "20M+",
      currentSolution: "corporate-visa-mastercard",
      numCardholders: 80,
      multiEntity: true,
    });
    const result = computeVerdict(data);
    expect(result.verdict).toBe("ROUTE_UP");
    expect(result.citedRuleIds).toContain("wrong_segment");
  });

  it("wrong_segment does not fire for a single-entity $20M+ company", () => {
    const data = make({
      currentMonthlySpend: 50000,
      fteCount: 300,
      revenueBand: "20M+",
      currentSolution: "corporate-visa-mastercard",
      numCardholders: 80,
      multiEntity: false,
    });
    expect(computeVerdict(data).verdict).not.toBe("ROUTE_UP");
  });
});

describe("computeVerdict — nurture triggers", () => {
  it("no_urgency fires: exploring + not engaged + no trigger event", () => {
    const data = make({
      currentMonthlySpend: 10000,
      fteCount: 20,
      revenueBand: "1M-5M",
      currentSolution: "corporate-visa-mastercard",
      numCardholders: 8,
      multiEntity: false,
      timeline: "exploring",
      buyerEngaged: false,
      triggerEvent: null,
    });
    const result = computeVerdict(data);
    expect(result.verdict).toBe("NURTURE");
    expect(result.citedRuleIds).toContain("no_urgency");
  });

  it("no_urgency does not fire once a trigger event is present", () => {
    const data = make({
      currentMonthlySpend: 10000,
      fteCount: 20,
      revenueBand: "1M-5M",
      currentSolution: "corporate-visa-mastercard",
      numCardholders: 8,
      multiEntity: false,
      timeline: "exploring",
      buyerEngaged: false,
      triggerEvent: "New CFO starting next month",
    });
    expect(computeVerdict(data).citedRuleIds).not.toContain("no_urgency");
  });

  it("no_authority_path fires: buyer role unknown + not engaged", () => {
    const data = make({
      currentMonthlySpend: 10000,
      fteCount: 20,
      revenueBand: "1M-5M",
      currentSolution: "corporate-visa-mastercard",
      numCardholders: 8,
      multiEntity: false,
      timeline: "this-quarter",
      economicBuyerRole: null,
      buyerEngaged: false,
    });
    const result = computeVerdict(data);
    expect(result.verdict).toBe("NURTURE");
    expect(result.citedRuleIds).toContain("no_authority_path");
  });
});

describe("computeVerdict — weighted score thresholds", () => {
  it("scores >= 65 as ADVANCE", () => {
    const data = make({
      fteCount: 40,
      revenueBand: "5M-20M",
      multiEntity: false,
      currentMonthlySpend: 15000,
      numCardholders: 10,
      currentSolution: "corporate-visa-mastercard",
      topPain: "fx-costs",
      usdVendorSharePct: 30,
      economicBuyerRole: "cfo",
      buyerEngaged: true,
      timeline: "this-quarter",
      triggerEvent: "Recently hired a controller",
    });
    const result = computeVerdict(data);
    expect(result.verdict).toBe("ADVANCE");
    expect(result.score).toBeGreaterThanOrEqual(65);
  });

  it("scores 35-64 as NURTURE", () => {
    const data = make({
      fteCount: 15,
      revenueBand: "1M-5M",
      multiEntity: false,
      currentMonthlySpend: 5000,
      numCardholders: 3,
      currentSolution: "corporate-visa-mastercard",
      topPain: "slow-close",
      economicBuyerRole: null,
      buyerEngaged: true,
      timeline: "next-quarter",
      triggerEvent: null,
    });
    const result = computeVerdict(data);
    expect(result.verdict).toBe("NURTURE");
    expect(result.score).toBeGreaterThanOrEqual(35);
    expect(result.score).toBeLessThan(65);
  });

  it("scores < 35 as soft DISQUALIFY", () => {
    const data = make({
      fteCount: 10,
      revenueBand: "5M-20M",
      multiEntity: false,
      currentMonthlySpend: 2000,
      numCardholders: 1,
      currentSolution: "amex",
      topPain: null,
      economicBuyerRole: null,
      buyerEngaged: null,
      timeline: null,
      triggerEvent: null,
    });
    const result = computeVerdict(data);
    expect(result.verdict).toBe("DISQUALIFY");
    expect(result.score).toBeLessThan(35);
  });
});

describe("computeVerdict — sample presets each land on a distinct verdict", () => {
  const [mapleAndMain, northbound, lakeview, crestline] = PRESETS;

  it("Maple & Main Coffee Co. -> ADVANCE", () => {
    expect(computeVerdict(mapleAndMain).verdict).toBe("ADVANCE");
  });

  it("Northbound Outfitters -> NURTURE", () => {
    expect(computeVerdict(northbound).verdict).toBe("NURTURE");
  });

  it("Lakeview Digital Studio -> DISQUALIFY", () => {
    expect(computeVerdict(lakeview).verdict).toBe("DISQUALIFY");
  });

  it("Crestline Holdings Group -> ROUTE_UP", () => {
    expect(computeVerdict(crestline).verdict).toBe("ROUTE_UP");
  });
});
