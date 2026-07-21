import type { Metadata } from "next";
import AccountDossierAgentClient from "./AccountDossierAgentClient";

export const metadata: Metadata = {
  title: "account-dossier-agent — Siri Rama",
  description:
    "A multi-agent pipeline that turns public company data into a cited sales dossier and evidence-grounded outreach draft.",
};

export default function Page() {
  return <AccountDossierAgentClient />;
}
