"use client";

import { useMemo } from "react";
import { generateCloseOutEmail, generateCrmNote, formatCrmNote } from "@/lib/outputs";
import { computeModel } from "@/lib/model";
import { getDefaultAssumptionValues } from "@/lib/assumptions";
import type { VerdictResult } from "@/lib/verdict";
import type { QualificationData } from "@/lib/types";
import CopyBlock from "./CopyBlock";

interface CloseOutViewProps {
  data: QualificationData;
  verdict: VerdictResult;
}

export default function CloseOutView({ data, verdict }: CloseOutViewProps) {
  const closeOutEmail = useMemo(() => generateCloseOutEmail(data, verdict), [data, verdict]);
  const crmNoteText = useMemo(() => {
    const model = computeModel(data, getDefaultAssumptionValues());
    return formatCrmNote(generateCrmNote(data, model, verdict));
  }, [data, verdict]);

  return (
    <div className="rc-results">
      <div className="rc-tab-panel" style={{ paddingTop: "0.4rem" }}>
        <div className="rc-tab-section">
          <h3 className="rc-tab-heading">Close-out email</h3>
          <CopyBlock label="Close-out email" text={closeOutEmail} />
        </div>
        <div className="rc-tab-section">
          <h3 className="rc-tab-heading">CRM note</h3>
          <CopyBlock label="CRM note" text={crmNoteText} />
        </div>
      </div>
    </div>
  );
}
