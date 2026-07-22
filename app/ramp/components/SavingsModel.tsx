"use client";

import { useEffect, useRef, useState } from "react";
import type { Model } from "@/lib/model";
import { money } from "@/lib/model";
import type { AssumptionKey, AssumptionValues } from "@/lib/assumptions";
import AssumptionChip from "./AssumptionChip";
import UnconfirmedFlag from "./UnconfirmedFlag";

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

function CountingValue({ value }: { value: number }) {
  const animated = useCountUp(value);
  return <>{money(animated)}/yr</>;
}

interface SavingsModelTabProps {
  model: Model;
  assumptionValues: AssumptionValues;
  onAssumptionChange: (key: AssumptionKey, value: number) => void;
}

export default function SavingsModel({ model, assumptionValues, onAssumptionChange }: SavingsModelTabProps) {
  const heroLine = model.lines.find((l) => l.key === model.heroLineKey) ?? null;

  return (
    <div className="rc-savings">
      {heroLine && heroLine.value != null && (
        <div className="rc-savings-hero">
          <span className="rc-savings-hero-label">{heroLine.label}</span>
          <div className="rc-savings-hero-value">
            <CountingValue value={heroLine.value} />
          </div>
          <p className="rc-savings-hero-caption">
            {model.computableCount} of {model.lines.length} lines computable — every figure traceable below.
          </p>
          {heroLine.sayItOnCall && <p className="rc-say-it">&ldquo;{heroLine.sayItOnCall}&rdquo;</p>}
        </div>
      )}

      <div className="rc-model-lines">
        {model.lines.map((line) => (
          <div key={line.key} className={line.computable ? "rc-model-line" : "rc-model-line rc-model-line-unconfirmed"}>
            <div className="rc-model-line-top">
              <div className="rc-model-line-left">
                {line.computable && <span className="rc-marker">○</span>}
                <span className="rc-model-line-label">{line.label}</span>
              </div>
              {line.computable && line.value != null ? (
                <span className="rc-model-line-value rc-mono">{money(line.value)}/yr</span>
              ) : (
                <UnconfirmedFlag />
              )}
            </div>
            <p className="rc-model-line-note">{line.computable ? "" : line.missingFieldsNote}</p>
            {line.computable && line.formula && line.assumptionKey && (
              <AssumptionChip
                assumptionKey={line.assumptionKey}
                formula={line.formula}
                values={assumptionValues}
                onChange={onAssumptionChange}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
