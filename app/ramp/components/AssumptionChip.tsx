"use client";

import { useState } from "react";
import { ASSUMPTIONS, type AssumptionKey, type AssumptionValues } from "@/lib/assumptions";

interface AssumptionChipProps {
  assumptionKey: AssumptionKey;
  formula: string;
  values: AssumptionValues;
  onChange: (key: AssumptionKey, value: number) => void;
}

function formatValue(value: number, unit: "percent" | "currency"): string {
  return unit === "percent" ? `${Math.round(value * 1000) / 10}%` : `$${value}`;
}

export default function AssumptionChip({ assumptionKey, formula, values, onChange }: AssumptionChipProps) {
  const [open, setOpen] = useState(false);
  const meta = ASSUMPTIONS[assumptionKey];
  const current = values[assumptionKey];

  return (
    <div>
      <button type="button" className="rc-assumption-toggle" onClick={() => setOpen((o) => !o)}>
        {open ? "Hide formula & assumption" : "○ Modeled — show formula & assumption"}
      </button>
      {open && (
        <div className="rc-assumption-panel">
          <p className="rc-assumption-formula">{formula}</p>
          <p className="rc-assumption-source">{meta.sourceNote}</p>
          <div className="rc-assumption-edit">
            <label htmlFor={`assumption-${assumptionKey}`} className="rc-field-label" style={{ flexShrink: 0 }}>
              {meta.label}
            </label>
            <input
              id={`assumption-${assumptionKey}`}
              type="range"
              className="rc-assumption-slider"
              min={meta.min}
              max={meta.max}
              step={meta.step}
              value={current}
              onChange={(e) => onChange(assumptionKey, Number(e.target.value))}
            />
            <span className="rc-assumption-edit-value">{formatValue(current, meta.unit)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
