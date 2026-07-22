import CopyBlock from "./CopyBlock";
import type { PitchEmail } from "@/lib/outputs";

interface OutputsTabProps {
  isDisqualified: boolean;
  pitchEmail: PitchEmail | null;
  closeOutEmail: string | null;
  crmNoteText: string;
}

export default function Outputs({ isDisqualified, pitchEmail, closeOutEmail, crmNoteText }: OutputsTabProps) {
  return (
    <div className="rc-outputs">
      {isDisqualified ? (
        <div className="rc-tab-section">
          <h3 className="rc-tab-heading">Close-out email</h3>
          <CopyBlock label="Close-out email" text={closeOutEmail ?? ""} />
        </div>
      ) : (
        pitchEmail && (
          <div className="rc-tab-section">
            <h3 className="rc-tab-heading">Cold email opener</h3>
            <div className="rc-subject-row">
              <div className="rc-subject-chip">
                <span className="rc-subject-chip-label">Curiosity</span>
                <span className="rc-subject-chip-text">{pitchEmail.subjectCuriosity}</span>
              </div>
              <div className="rc-subject-chip">
                <span className="rc-subject-chip-label">Number-led</span>
                <span className="rc-subject-chip-text">{pitchEmail.subjectNumberLed}</span>
              </div>
            </div>
            <CopyBlock label="Email body" text={pitchEmail.body} />
          </div>
        )
      )}

      <div className="rc-tab-section">
        <h3 className="rc-tab-heading">CRM note</h3>
        <CopyBlock label="CRM note" text={crmNoteText} />
      </div>
    </div>
  );
}
