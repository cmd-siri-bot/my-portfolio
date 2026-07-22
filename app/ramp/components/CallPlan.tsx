"use client";

import { useState } from "react";
import type { CallPlan as CallPlanResult } from "@/lib/handoff-console/callPlan";

interface CallPlanTabProps {
  plan: CallPlanResult;
}

export default function CallPlan({ plan }: CallPlanTabProps) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  function toggle(index: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <div className="rc-callplan">
      <div className="rc-tab-section">
        <h3 className="rc-tab-heading">Confirm-and-expand checklist</h3>
        {plan.confirmAndExpandQuestions.length > 0 ? (
          <ol className="rc-checklist">
            {plan.confirmAndExpandQuestions.map((q, i) => {
              const isChecked = checked.has(i);
              return (
                <li
                  key={q.question}
                  className={isChecked ? "rc-checklist-item rc-checklist-item-checked" : "rc-checklist-item"}
                >
                  <button
                    type="button"
                    className="rc-checklist-check"
                    aria-pressed={isChecked}
                    aria-label={isChecked ? "Mark as not asked" : "Mark as asked"}
                    onClick={() => toggle(i)}
                  >
                    <span className="rc-checklist-check-box" />
                  </button>
                  <div className="rc-checklist-body">
                    <p className="rc-checklist-question">{q.question}</p>
                    <p className="rc-checklist-why">{q.why}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        ) : (
          <p className="rc-placeholder">No follow-up questions triggered by the current inputs.</p>
        )}
      </div>

      <div className="rc-tab-section">
        <h3 className="rc-tab-heading">Talk track</h3>
        <div className="rc-talktrack-hero">
          {plan.talkTrack.angle && <span className="rc-talktrack-angle">{plan.talkTrack.angle}</span>}
          <p className="rc-talktrack-line">{plan.talkTrack.line}</p>
        </div>
      </div>
    </div>
  );
}
