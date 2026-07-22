"use client";

import { useMemo, useState } from "react";
import { computeSavingsModel } from "@/lib/handoff-console/engine";
import { generateCallPlan } from "@/lib/handoff-console/callPlan";
import { generateColdEmailOpener, generateCrmNote, formatCrmNote } from "@/lib/handoff-console/outputs";
import type { QualificationData } from "@/lib/handoff-console/types";
import SavingsModel from "./SavingsModel";
import CallPlan from "./CallPlan";
import Outputs from "./Outputs";

type Tab = "savings" | "callplan" | "outputs";

const TABS: { id: Tab; label: string }[] = [
  { id: "savings", label: "Savings Model" },
  { id: "callplan", label: "Call Plan" },
  { id: "outputs", label: "Outreach & CRM" },
];

export default function ResultsDashboard({ data }: { data: QualificationData }) {
  const [activeTab, setActiveTab] = useState<Tab>("savings");
  const savingsModel = useMemo(() => computeSavingsModel(data), [data]);
  const callPlan = useMemo(() => generateCallPlan(data), [data]);
  const coldEmail = useMemo(() => generateColdEmailOpener(data), [data]);
  const crmNoteText = useMemo(() => formatCrmNote(generateCrmNote(data)), [data]);

  const isEmpty = data.companyName.trim() === "";

  if (isEmpty) {
    return (
      <div className="rc-results">
        <p className="rc-results-empty">No qualification data yet — fill in the form or load a sample.</p>
      </div>
    );
  }

  return (
    <div className="rc-results">
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
        {activeTab === "savings" && <SavingsModel model={savingsModel} />}
        {activeTab === "callplan" && <CallPlan key={data.companyName} plan={callPlan} />}
        {activeTab === "outputs" && <Outputs coldEmail={coldEmail} crmNoteText={crmNoteText} />}
      </div>
    </div>
  );
}
