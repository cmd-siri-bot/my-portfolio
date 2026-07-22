import type { PublicContext, QualificationData } from "@/lib/handoff-console/types";
import { industryOptions } from "./formOptions";

function industryLabel(value: QualificationData["industry"] | null): string {
  if (!value) return "—";
  return industryOptions.find((opt) => opt.value === value)?.label ?? value;
}

interface PublicContextCardProps {
  context: PublicContext;
  currentIndustry: QualificationData["industry"];
  onUseIndustryGuess: (industry: QualificationData["industry"]) => void;
}

export default function PublicContextCard({
  context,
  currentIndustry,
  onUseIndustryGuess,
}: PublicContextCardProps) {
  const industryDiffers = context.industryGuess !== null && context.industryGuess !== currentIndustry;

  return (
    <div className="rc-context-card">
      <span className="rc-context-caption">Public context — not used in calculations.</span>

      {context.oneLineDescription && <p className="rc-context-desc">{context.oneLineDescription}</p>}

      <div className="rc-context-rows">
        <div className="rc-context-row">
          <span className="rc-context-row-label">Industry — you entered</span>
          <span className="rc-context-row-value">{industryLabel(currentIndustry)}</span>
        </div>
        <div className="rc-context-row">
          <span className="rc-context-row-label">Industry — public guess</span>
          <span className="rc-context-row-value">{industryLabel(context.industryGuess)}</span>
        </div>
        {context.headcountBandGuess && (
          <div className="rc-context-row">
            <span className="rc-context-row-label">Headcount — public guess</span>
            <span className="rc-context-row-value">{context.headcountBandGuess}</span>
          </div>
        )}
        <div className="rc-context-row">
          <span className="rc-context-row-label">Confidence</span>
          <span className="rc-context-row-value">{context.confidence}</span>
        </div>
      </div>

      {industryDiffers && (
        <button
          type="button"
          className="rc-context-use-btn"
          onClick={() => onUseIndustryGuess(context.industryGuess as QualificationData["industry"])}
        >
          Use this industry guess
        </button>
      )}
    </div>
  );
}
