"use client";

import { useState } from "react";
import type { GapQuestion, ObjectionCard, TalkTrack } from "@/lib/questions";

interface CallPlanTabProps {
  questions: GapQuestion[];
  objectionCard: ObjectionCard | null;
  talkTrack: TalkTrack;
}

export default function CallPlan({ questions, objectionCard, talkTrack }: CallPlanTabProps) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  function toggle(index: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <div className="rc-callplan">
      <div className="rc-tab-section">
        <h3 className="rc-tab-heading">
          Confirm-and-expand checklist
          <span className="rc-tab-heading-note">15-min call: 2 min context · 10 min discovery · 3 min next step</span>
        </h3>
        {questions.length > 0 ? (
          <ol className="rc-checklist">
            {questions.map((q, i) => {
              const isChecked = checked.has(i);
              return (
                <li
                  key={q.field}
                  className={
                    isChecked
                      ? "rc-checklist-item rc-checklist-item-checked"
                      : q.decisive
                      ? "rc-checklist-item rc-checklist-item-decisive"
                      : "rc-checklist-item"
                  }
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
                    {q.decisive && <span className="rc-checklist-decisive-tag">Ask this first — it decides whether this deal advances</span>}
                    <p className="rc-checklist-question">{q.question}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        ) : (
          <p className="rc-placeholder">Every gap-relevant field is confirmed — nothing left to discover here.</p>
        )}
      </div>

      {objectionCard && (
        <div className="rc-tab-section">
          <h3 className="rc-tab-heading">Objection prep</h3>
          <div className="rc-objection-card">
            <span className="rc-objection-label">Likely objection</span>
            <p className="rc-objection-text">{objectionCard.objection}</p>
            <p className="rc-objection-response">{objectionCard.response}</p>
          </div>
        </div>
      )}

      <div className="rc-tab-section">
        <h3 className="rc-tab-heading">Talk track</h3>
        <div className="rc-talktrack-hero">
          {talkTrack.angle && <span className="rc-talktrack-angle">{talkTrack.angle}</span>}
          <p className="rc-talktrack-line">{talkTrack.line}</p>
        </div>
      </div>
    </div>
  );
}
