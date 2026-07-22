"use client";

import { useMemo, useState } from "react";
import { computeModel } from "@/lib/model";
import { getGapDrivenQuestions, getObjectionCard, getTalkTrack } from "@/lib/questions";
import { generatePitchEmail, generateCrmNote, formatCrmNote } from "@/lib/outputs";
import type { VerdictResult } from "@/lib/verdict";
import type { QualificationData } from "@/lib/types";
import type { AssumptionKey, AssumptionValues } from "@/lib/assumptions";
import SavingsModel from "./SavingsModel";
import CallPlan from "./CallPlan";
import Outputs from "./Outputs";

type Tab = "savings" | "callplan" | "outputs";

const TABS: { id: Tab; label: string }[] = [
  { id: "savings", label: "Savings Model" },
  { id: "callplan", label: "Call Plan" },
  { id: "outputs", label: "Outreach & CRM" },
];

interface ResultsPanelProps {
  data: QualificationData;
  verdict: VerdictResult;
  assumptionValues: AssumptionValues;
  onAssumptionChange: (key: AssumptionKey, value: number) => void;
}

export default function ResultsPanel({ data, verdict, assumptionValues, onAssumptionChange }: ResultsPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>("savings");

  const model = useMemo(() => computeModel(data, assumptionValues), [data, assumptionValues]);
  const questions = useMemo(() => getGapDrivenQuestions(data), [data]);
  const objectionCard = useMemo(() => getObjectionCard(data.currentSolution), [data.currentSolution]);
  const talkTrack = useMemo(() => getTalkTrack(data), [data]);
  const pitchEmail = useMemo(() => generatePitchEmail(data, model), [data, model]);
  const crmNoteText = useMemo(() => formatCrmNote(generateCrmNote(data, model, verdict)), [data, model, verdict]);

  return (
    <div className="rc-results" id="rc-results-panel">
      <div className="rc-tabs" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            className={activeTab === tab.id ? "rc-tab rc-tab-active" : "rc-tab"}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="rc-tab-panel">
        <div className={activeTab === "savings" ? undefined : "rc-tab-panel-hidden"}>
          <SavingsModel model={model} assumptionValues={assumptionValues} onAssumptionChange={onAssumptionChange} />
        </div>
        <div className={activeTab === "callplan" ? undefined : "rc-tab-panel-hidden"}>
          <CallPlan key={data.companyName} questions={questions} objectionCard={objectionCard} talkTrack={talkTrack} />
        </div>
        <div className={activeTab === "outputs" ? undefined : "rc-tab-panel-hidden"}>
          <Outputs isDisqualified={false} pitchEmail={pitchEmail} closeOutEmail={null} crmNoteText={crmNoteText} />
        </div>
      </div>
    </div>
  );
}
