import type { QualificationData } from "@/lib/types";

const SECTIONS: { label: string; fields: (keyof QualificationData)[] }[] = [
  { label: "01 Firmographic", fields: ["fteCount", "revenueBand", "fundingStage", "province", "multiEntity"] },
  { label: "02 Budget & Current State", fields: ["currentMonthlySpend", "numCardholders", "currentSolution"] },
  { label: "03 Need", fields: ["topPain", "accountingSoftware", "closeHoursPerMonth", "usdVendorSharePct"] },
  { label: "04 Authority & Timeline", fields: ["economicBuyerRole", "buyerEngaged", "timeline", "triggerEvent"] },
];

function isFilled(data: QualificationData, field: keyof QualificationData): boolean {
  const value = data[field];
  return value != null && value !== "";
}

function sectionFillPct(data: QualificationData, fields: (keyof QualificationData)[]): number {
  const filled = fields.filter((f) => isFilled(data, f)).length;
  return Math.round((filled / fields.length) * 100);
}

export function computeHandoffQuality(data: QualificationData): number {
  const allFields = SECTIONS.flatMap((s) => s.fields);
  const filled = allFields.filter((f) => isFilled(data, f)).length;
  return Math.round((filled / allFields.length) * 100);
}

export default function ProgressRail({ data }: { data: QualificationData }) {
  const quality = computeHandoffQuality(data);

  return (
    <div className="rc-progress">
      <div className="rc-progress-sections">
        {SECTIONS.map((s) => {
          const pct = sectionFillPct(data, s.fields);
          return (
            <div key={s.label} className="rc-progress-dot" title={`${s.label} — ${pct}% confirmed`}>
              <div className="rc-progress-dot-fill" style={{ width: `${pct}%` }} />
            </div>
          );
        })}
      </div>
      <div className="rc-quality">
        <span className="rc-quality-label">Handoff quality</span>
        <span className="rc-quality-value rc-mono">{quality}%</span>
      </div>
    </div>
  );
}
