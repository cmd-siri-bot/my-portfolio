import type { Metadata } from "next";
import CaseStudyClient from "./CaseStudyClient";

export const metadata: Metadata = {
  title: "Lead Qualification Agent — Siri Rama",
  description:
    "A pipeline that resolves messy inbound leads against real company data, scores them against a transparent ICP model, and routes them — so an SDR never has to eyeball 400 form fills a week.",
};

export default function Page() {
  return <CaseStudyClient />;
}
