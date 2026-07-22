import CopyBlock from "./CopyBlock";

interface OutputsTabProps {
  coldEmail: string;
  crmNoteText: string;
}

export default function Outputs({ coldEmail, crmNoteText }: OutputsTabProps) {
  return (
    <div className="rc-outputs">
      <div className="rc-tab-section">
        <h3 className="rc-tab-heading">Cold email opener</h3>
        <CopyBlock label="Email" text={coldEmail} />
      </div>

      <div className="rc-tab-section">
        <h3 className="rc-tab-heading">CRM note</h3>
        <CopyBlock label="CRM note" text={crmNoteText} />
      </div>
    </div>
  );
}
