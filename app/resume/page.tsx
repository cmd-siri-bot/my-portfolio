import type { Metadata } from "next";
import ResumeClient from "./ResumeClient";

export const metadata: Metadata = {
  title: "Resume — Siri Rama",
  description:
    "Siri Rama's resume — experience at Tipalti, Delphic Research Group, Sussex Strategy Group, and the Government of Canada.",
};

export default function ResumePage() {
  return <ResumeClient />;
}
