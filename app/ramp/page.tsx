import type { Metadata } from "next";
import RampClient from "./RampClient";

export const metadata: Metadata = {
  title: "The Handoff Console — Siri Rama",
  description:
    "A tool that turns SDR qualification data into a savings model, call plan, and ready-to-send outreach for the SMB AE handoff.",
};

export default function Page() {
  return <RampClient />;
}
