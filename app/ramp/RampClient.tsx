"use client";

import { useEffect, useMemo, useState } from "react";
import "./ramp.css";
import { schibstedGrotesk, ibmPlexMono } from "./fonts";
import { EMPTY_QUALIFICATION } from "@/lib/presets";
import { computeVerdict } from "@/lib/verdict";
import { getDefaultAssumptionValues } from "@/lib/assumptions";
import type { AssumptionKey, AssumptionValues } from "@/lib/assumptions";
import type { PublicContext, QualificationData } from "@/lib/types";
import QualificationForm from "./components/QualificationForm";
import ProgressRail from "./components/ProgressRail";
import VerdictStamp from "./components/VerdictStamp";
import ResultsPanel from "./components/ResultsPanel";
import CloseOutView from "./components/CloseOutView";
import PublicContextCard from "./components/PublicContextCard";
import ShareLink, { decodeSheet } from "./components/ShareLink";
import HowScoringWorks from "./components/HowScoringWorks";

const STORAGE_KEY = "ramp-handoff-console-sheet-v2";

export default function RampClient() {
  const [data, setData] = useState<QualificationData>(EMPTY_QUALIFICATION);
  const [assumptionValues, setAssumptionValues] = useState<AssumptionValues>(getDefaultAssumptionValues);
  const [publicContext, setPublicContext] = useState<PublicContext | null>(null);
  const [restoredNotice, setRestoredNotice] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Restore from a shared link first, else the last autosaved sheet.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shared = params.get("sheet");
    if (shared) {
      const decoded = decodeSheet(shared);
      if (decoded) {
        setData(decoded);
        setHydrated(true);
        return;
      }
    }
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setData(JSON.parse(saved) as QualificationData);
        setRestoredNotice(true);
      }
    } catch {
      // Corrupt or unavailable storage — start fresh, never error.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Storage unavailable (e.g. private browsing) — not fatal.
    }
  }, [data, hydrated]);

  // Bonus public-context lookup — debounced, never feeds the verdict or model.
  useEffect(() => {
    const website = data.website?.trim();
    if (!website) {
      setPublicContext(null);
      return;
    }
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
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
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [data.website]);

  const verdict = useMemo(() => computeVerdict(data), [data]);
  const isEmpty = data.companyName.trim() === "";
  const verdictAttr = isEmpty ? undefined : verdict.verdict.toLowerCase();

  function handleAssumptionChange(key: AssumptionKey, value: number) {
    setAssumptionValues((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div
      className={`ramp-console ${schibstedGrotesk.variable} ${ibmPlexMono.variable}`}
      data-verdict={verdictAttr}
    >
      <div className="rc-shell">
        {!isEmpty && (
          <div className="rc-mobile-verdict-bar">
            <span className="rc-mobile-verdict-word rc-mono">{verdict.verdict.replace("_", " ")}</span>
            <button
              type="button"
              className="rc-mobile-verdict-jump"
              onClick={() => document.getElementById("rc-verdict-anchor")?.scrollIntoView({ behavior: "smooth" })}
            >
              Jump to verdict ↓
            </button>
          </div>
        )}

        <div className="rc-back-row">
          <a href="/" className="rc-back">
            ← Back to sirirama.info
          </a>
        </div>

        <header className="rc-header">
          <span className="rc-eyebrow">The Handoff Console</span>
          <h1>Decide whether before how much.</h1>
          <p className="rc-lede">
            Qualification inputs go in. A verdict — ADVANCE, NURTURE, DISQUALIFY, or ROUTE UP — comes out first,
            followed by a traceable savings model, a gap-driven call plan, and ready-to-send outreach.
          </p>
          <p className="rc-privacy-note">
            All qualification math runs in your browser — your pipeline data never leaves this page. (The optional
            public-context lookup below is the one exception: it sends the website you enter to fetch a company
            summary.)
          </p>
        </header>

        <div className="rc-ledger">
          <div className="rc-ledger-left">
            <section>
              <div className="rc-section-head">
                <h2>Qualification sheet</h2>
              </div>
              <ProgressRail data={data} />
              {restoredNotice && <p className="rc-restored-note">Restored your last sheet.</p>}
              <QualificationForm data={data} onChange={setData} />
              {publicContext && (
                <PublicContextCard
                  context={publicContext}
                  currentIndustry={data.industry}
                  onUseIndustryGuess={(industry) => setData((prev) => ({ ...prev, industry }))}
                />
              )}
              {!isEmpty && <ShareLink data={data} />}
            </section>
          </div>

          <div className="rc-ledger-right">
            <section id="rc-verdict-anchor">
              <div className="rc-section-head">
                <h2>Verdict</h2>
              </div>
              {isEmpty ? (
                <div className="rc-verdict-shell">
                  <p className="rc-verdict-empty">
                    No verdict yet. Fill the sheet or load a sample — each sample lands on a different verdict.
                  </p>
                </div>
              ) : (
                <>
                  <VerdictStamp result={verdict} />
                  <HowScoringWorks />
                </>
              )}
            </section>

            {!isEmpty && verdict.verdict !== "INSUFFICIENT" && (
              <section style={{ marginTop: "1.6rem" }}>
                {verdict.verdict === "DISQUALIFY" ? (
                  <CloseOutView data={data} verdict={verdict} />
                ) : (
                  <ResultsPanel
                    data={data}
                    verdict={verdict}
                    assumptionValues={assumptionValues}
                    onAssumptionChange={handleAssumptionChange}
                  />
                )}
              </section>
            )}
          </div>
        </div>

        <footer className="rc-footer">
          <p>
            Independent project — not affiliated with Ramp. No Ramp data is used: every benchmark is a labeled,
            editable assumption, never presented as fact.
          </p>
          <a href="/#contact" className="rc-footer-btn">
            Get in touch
          </a>
        </footer>
      </div>
    </div>
  );
}
