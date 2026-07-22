"use client";

import { useState } from "react";
import { RULES, type RuleCategory } from "@/lib/verdict";

const GROUP_LABELS: Record<RuleCategory, string> = {
  "hard-disqualifier": "Hard disqualifiers — any one fires, no score can rescue it",
  "nurture-trigger": "Nurture triggers — no hard DQ, but momentum is missing",
  "score-weight": "Weighted score — when no hard rule fires",
};

const GROUP_ORDER: RuleCategory[] = ["hard-disqualifier", "nurture-trigger", "score-weight"];

export default function HowScoringWorks() {
  const [open, setOpen] = useState(false);

  return (
    <div className="rc-scoring-panel">
      <button type="button" className="rc-assumption-toggle" onClick={() => setOpen((o) => !o)}>
        {open ? "Hide how scoring works" : "How scoring works"}
      </button>
      {open && (
        <div>
          {GROUP_ORDER.map((category) => (
            <div key={category} className="rc-scoring-group">
              <div className="rc-scoring-group-title">{GROUP_LABELS[category]}</div>
              {RULES.filter((r) => r.category === category).map((rule) => (
                <div key={rule.id} className="rc-scoring-rule">
                  <div className="rc-scoring-rule-label">{rule.label}</div>
                  <p className="rc-scoring-rule-desc">{rule.description}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
