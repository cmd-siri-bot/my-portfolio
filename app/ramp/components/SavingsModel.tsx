"use client";

import { useEffect, useRef, useState } from "react";
import { getSavingsHeaderText } from "@/lib/handoff-console/engine";
import type { SavingsModel as SavingsModelResult } from "@/lib/handoff-console/engine";
import UnconfirmedFlag from "./UnconfirmedFlag";

function money(value: number): string {
  return `$${Math.round(value).toLocaleString("en-CA")}`;
}

function useCountUp(target: number, durationMs = 700): number {
  const [value, setValue] = useState(0);
  const frame = useRef<number | undefined>(undefined);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || document.hidden) {
      setValue(target);
      return;
    }
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
      }
    }
    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current !== undefined) cancelAnimationFrame(frame.current);
    };
  }, [target, durationMs]);

  return value;
}

function CountingRange({ low, high }: { low: number; high: number }) {
  const animatedLow = useCountUp(low);
  const animatedHigh = useCountUp(high);
  return (
    <>
      {money(animatedLow)}–{money(animatedHigh)}/yr
    </>
  );
}

interface SavingsModelTabProps {
  model: SavingsModelResult;
}

export default function SavingsModel({ model }: SavingsModelTabProps) {
  return (
    <div className="rc-savings">
      <div className="rc-savings-hero">
        <span className="rc-savings-hero-label">Total confirmed savings / yr</span>
        <div className="rc-savings-hero-value">
          <CountingRange low={model.totalLow} high={model.totalHigh} />
        </div>
        <p className="rc-savings-hero-caption">{getSavingsHeaderText(model)}</p>
      </div>

      <div className="rc-savings-grid">
        {model.lines.map((line) => (
          <div
            key={line.label}
            className={
              line.status === "confirmed" ? "rc-savings-card" : "rc-savings-card rc-savings-card-unconfirmed"
            }
          >
            <div className="rc-savings-card-top">
              <span className="rc-savings-card-label">{line.label}</span>
              {line.status === "unconfirmed" && <UnconfirmedFlag />}
            </div>
            {line.status === "confirmed" && line.low != null && line.high != null && (
              <div className="rc-savings-card-value">
                <CountingRange low={line.low} high={line.high} />
              </div>
            )}
            <p className="rc-savings-card-basis">
              {line.status === "confirmed" ? line.basis : line.missingFieldsNote}
            </p>
            <p className="rc-savings-card-why">{line.why}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
