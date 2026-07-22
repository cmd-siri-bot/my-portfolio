"use client";

import { useEffect, useState } from "react";
import "./ramp.css";
import { EMPTY_QUALIFICATION } from "@/lib/handoff-console/presets";
import type { PublicContext, QualificationData } from "@/lib/handoff-console/types";
import QualificationForm from "./components/QualificationForm";
import ResultsDashboard from "./components/ResultsDashboard";
import PublicContextCard from "./components/PublicContextCard";

export default function RampClient() {
  const [data, setData] = useState<QualificationData>(EMPTY_QUALIFICATION);
  const [publicContext, setPublicContext] = useState<PublicContext | null>(null);

  useEffect(() => {
    const website = data.website?.trim();
    if (!website) {
      setPublicContext(null);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetch("/ramp/api/public-context", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website }),
        signal: controller.signal,
      })
        .then((res) => (res.ok ? res.json() : { result: null }))
        .then((json) => setPublicContext(json.result ?? null))
        .catch(() => setPublicContext(null));
    }, 700);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [data.website]);

  return (
    <div className="ramp-console">
      <div className="rc-shell">
        <div className="rc-back-row">
          <a href="/" className="rc-back">
            ← Back to sirirama.info
          </a>
        </div>

        <header className="rc-header">
          <span className="rc-eyebrow">The Handoff Console</span>
          <h1>What the SDR hands off, the AE runs with.</h1>
          <p className="rc-lede">
            Fill in what a discovery call would actually confirm — spend, headcount, current
            tool, pain point, timeline — and get a savings model, a call plan, and ready-to-send
            outreach built only from what&apos;s been confirmed. Nothing here is estimated.
          </p>
        </header>

        <section>
          <div className="rc-section-head">
            <h2>Qualification sheet</h2>
          </div>
          <QualificationForm data={data} onChange={setData} />
          {publicContext && (
            <PublicContextCard
              context={publicContext}
              currentIndustry={data.industry}
              onUseIndustryGuess={(industry) => setData({ ...data, industry })}
            />
          )}
        </section>

        <section>
          <div className="rc-section-head">
            <h2>Results</h2>
          </div>
          <ResultsDashboard data={data} />
        </section>

        <footer className="rc-footer">
          <p>
            Independent project — not affiliated with Ramp. All figures derive from
            user-submitted inputs — nothing is estimated or fabricated about real companies.
          </p>
          <a href="/#contact" className="rc-footer-btn">
            Get in touch
          </a>
        </footer>
      </div>
    </div>
  );
}
