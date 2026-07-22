"use client";

import { useEffect, useState } from "react";
import type { VerdictResult } from "@/lib/verdict";

const VERDICT_LABELS: Record<VerdictResult["verdict"], string> = {
  ADVANCE: "ADVANCE",
  NURTURE: "NURTURE",
  DISQUALIFY: "DISQUALIFY",
  ROUTE_UP: "ROUTE UP",
  INSUFFICIENT: "INSUFFICIENT",
};

interface VerdictStampProps {
  result: VerdictResult;
}

export default function VerdictStamp({ result }: VerdictStampProps) {
  const [rowsIn, setRowsIn] = useState(false);

  useEffect(() => {
    setRowsIn(false);
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setRowsIn(true);
      return;
    }
    const t = window.setTimeout(() => setRowsIn(true), 250);
    return () => window.clearTimeout(t);
    // Re-run the entrance sequence whenever the verdict word itself changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.verdict]);

  const isInsufficient = result.verdict === "INSUFFICIENT";

  return (
    <div className="rc-verdict-shell">
      <div className="rc-stamp-row">
        <div key={result.verdict} className="rc-stamp rc-stamp-enter">
          <span className="rc-stamp-word">{VERDICT_LABELS[result.verdict]}</span>
          {result.score != null && <span className="rc-stamp-sub">Score {result.score}/100</span>}
        </div>
      </div>

      {isInsufficient ? (
        <div className={rowsIn ? "rc-verdict-row rc-verdict-row-in" : "rc-verdict-row"}>
          <span className="rc-verdict-block-label">Minimum field set</span>
          <div className="rc-minfields">
            {result.minimumFieldSet.map((f) => (
              <span key={f} className="rc-minfield-chip">
                {f}
              </span>
            ))}
          </div>
          <p className="rc-verdict-flip" style={{ marginTop: "0.9rem" }}>
            {result.nextAction}
          </p>
        </div>
      ) : (
        <>
          <div className={rowsIn ? "rc-verdict-row rc-verdict-row-in rc-verdict-block" : "rc-verdict-row rc-verdict-block"}>
            <span className="rc-verdict-block-label">Why</span>
            <ul className="rc-verdict-reasons">
              {result.reasons.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>

          <div className={rowsIn ? "rc-verdict-row rc-verdict-row-in rc-verdict-block" : "rc-verdict-row rc-verdict-block"}>
            <span className="rc-verdict-block-label">What would flip it</span>
            {result.flipConditions.map((f) => (
              <p key={f} className="rc-verdict-flip">
                {f}
              </p>
            ))}
          </div>

          <div className={rowsIn ? "rc-verdict-row rc-verdict-row-in rc-verdict-block" : "rc-verdict-row rc-verdict-block"}>
            <span className="rc-verdict-block-label">Next action</span>
            <p className="rc-verdict-next-action">{result.nextAction}</p>
          </div>
        </>
      )}
    </div>
  );
}
