import type { CallPlan as CallPlanResult } from "@/lib/handoff-console/callPlan";

interface CallPlanTabProps {
  plan: CallPlanResult;
}

export default function CallPlan({ plan }: CallPlanTabProps) {
  return (
    <div className="rc-callplan">
      <div className="rc-tab-section">
        <h3 className="rc-tab-heading">Confirm-and-expand questions</h3>
        {plan.confirmAndExpandQuestions.length > 0 ? (
          <ul className="rc-question-list">
            {plan.confirmAndExpandQuestions.map((q) => (
              <li key={q} className="rc-question">
                {q}
              </li>
            ))}
          </ul>
        ) : (
          <p className="rc-placeholder">No follow-up questions triggered by the current inputs.</p>
        )}
      </div>

      <div className="rc-tab-section">
        <h3 className="rc-tab-heading">Talk track</h3>
        <div className="rc-talktrack">
          {plan.talkTrack.angle && <span className="rc-talktrack-angle">{plan.talkTrack.angle}</span>}
          <p className="rc-talktrack-line">{plan.talkTrack.line}</p>
        </div>
      </div>
    </div>
  );
}
