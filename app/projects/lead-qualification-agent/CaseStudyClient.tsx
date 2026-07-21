"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import "./case-study.css";

type StageType = "det" | "llm";

interface Stage {
  num: string;
  title: string;
  desc: string;
  type: StageType;
  coreTag?: string;
}

const STAGES: Stage[] = [
  {
    num: "01",
    title: "INGEST",
    desc: "Raw form fill arrives — name, email, company string, free-text message.",
    type: "det",
  },
  {
    num: "02",
    title: "RESOLVE",
    desc: "Messy company string matched to real data (SEC EDGAR, Wikipedia, site scrape).",
    type: "llm",
  },
  {
    num: "03",
    title: "ENRICH",
    desc: "Firmographics attached: size, industry, public/private, geography. Free-tier only.",
    type: "det",
  },
  {
    num: "04",
    title: "SCORE",
    desc: "Transparent SQL rubric → ICP score + priority tier. The heart of the system.",
    type: "det",
    coreTag: "CORE · SQL RUBRIC",
  },
  {
    num: "05",
    title: "ROUTE",
    desc: "P1 to an AE now, P2 to nurture, P3 archived with a reason.",
    type: "det",
  },
];

interface Metric {
  final: number;
  decimals: number;
  suffix: string;
  label: string;
  desc: string;
}

const METRICS: Metric[] = [
  { final: 99.7, decimals: 1, suffix: "%", label: "Company name resolution", desc: "Zero wrong guesses. Bad resolution poisons everything downstream." },
  { final: 99.1, decimals: 1, suffix: "%", label: "P1 precision", desc: "A false-positive P1 wastes an AE\u2019s morning. This protects their time." },
  { final: 100, decimals: 0, suffix: "%", label: "P1 recall", desc: "Nothing hot got missed." },
  { final: 10, decimals: 0, suffix: "/10", label: "Prompt-injection resistance", desc: "Adversarial attempts refused. Published with evidence, not just claimed." },
];

export default function CaseStudyClient() {
  const headerRef = useRef<HTMLDivElement>(null);
  const pipelineWrapRef = useRef<HTMLDivElement>(null);
  const tokenRef = useRef<HTMLDivElement>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const p1Ref = useRef<HTMLDivElement>(null);
  const metricRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---------- Reveal-on-scroll (shared pattern with the homepage) ----------
    const reveals = document.querySelectorAll(".case-study .reveal");
    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("in"));
    } else {
      const revealIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              revealIo.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      reveals.forEach((el) => revealIo.observe(el));
    }

    // ---------- Redaction bars in the dossier header ----------
    const bars = headerRef.current
      ? Array.from(headerRef.current.querySelectorAll<HTMLElement>(".case-redaction"))
      : [];
    if (reduce) {
      bars.forEach((b) => {
        b.style.display = "none";
      });
    } else {
      bars.forEach((b, i) => {
        b.style.clipPath = "inset(0 0 0 0)";
        setTimeout(() => {
          b.style.transition = "clip-path .55s cubic-bezier(.4,0,.2,1)";
          b.style.clipPath = "inset(0 0 0 100%)";
        }, 650 + i * 280);
      });
    }

    // ---------- Pipeline token animation ----------
    const wrap = pipelineWrapRef.current;
    const token = tokenRef.current;
    const stages = stageRefs.current;
    const dots = dotRefs.current;
    const p1 = p1Ref.current;
    let pipelineIo: IntersectionObserver | undefined;

    if (wrap && token) {
      if (reduce) {
        token.style.display = "none";
      } else {
        let started = false;

        const setActive = (stage: HTMLDivElement | null, on: boolean, isLlm: boolean) => {
          if (!stage) return;
          const ring = isLlm ? "#5E1A1E" : "#141210";
          if (on) {
            stage.style.boxShadow = `0 0 0 2px ${ring}`;
            stage.style.transform = "translateY(-3px)";
            stage.style.background = "#FFFDF8";
          } else {
            stage.style.boxShadow = "none";
            stage.style.transform = "none";
            stage.style.background = "";
          }
        };

        const place = (i: number) => {
          const stageEl = stages[i];
          if (!stageEl) return;
          const wr = wrap.getBoundingClientRect();
          const sr = stageEl.getBoundingClientRect();
          const x = sr.left - wr.left + sr.width / 2 - token.offsetWidth / 2;
          const y = sr.top - wr.top - token.offsetHeight / 2;
          token.style.transform = `translate(${x}px, ${y}px)`;
        };

        const step = (i: number) => {
          if (i >= stages.length) {
            setTimeout(() => {
              token.style.opacity = "0";
              if (p1) {
                p1.style.boxShadow = "0 0 0 3px rgba(94,26,30,.2)";
                setTimeout(() => {
                  p1.style.boxShadow = "none";
                }, 900);
              }
            }, 450);
            return;
          }
          place(i);
          setActive(stages[i], true, STAGES[i].type === "llm");
          const d = dots[i];
          if (d) d.style.background = STAGES[i].type === "llm" ? "#5E1A1E" : "#141210";
          if (i > 0) setActive(stages[i - 1], false, STAGES[i - 1].type === "llm");
          setTimeout(() => step(i + 1), 820);
        };

        const run = () => {
          if (started) return;
          started = true;
          token.style.opacity = "1";
          setTimeout(() => step(0), 350);
        };

        pipelineIo = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                run();
                pipelineIo?.disconnect();
              }
            });
          },
          { threshold: 0.4 }
        );
        pipelineIo.observe(wrap);
      }
    }

    // ---------- Count-up metrics ----------
    let metricsIo: IntersectionObserver | undefined;
    const countUp = (el: HTMLDivElement, metric: Metric) => {
      const dur = 650;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        el.textContent = (metric.final * t).toFixed(metric.decimals) + metric.suffix;
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = metric.final.toFixed(metric.decimals) + metric.suffix;
      };
      requestAnimationFrame(tick);
    };

    if (!reduce) {
      metricRefs.current.forEach((el, idx) => {
        if (el) el.textContent = "0" + METRICS[idx].suffix;
      });
      metricsIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            const idx = metricRefs.current.indexOf(e.target as HTMLDivElement);
            if (e.isIntersecting && idx !== -1) {
              countUp(e.target as HTMLDivElement, METRICS[idx]);
              metricsIo?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      metricRefs.current.forEach((el) => {
        if (el) metricsIo?.observe(el);
      });
    }

    return () => {
      pipelineIo?.disconnect();
      metricsIo?.disconnect();
    };
  }, []);

  return (
    <div className="case-study">
      <div className="case-topbar">
        <Link href="/" className="case-back">
          ← Back to all files
        </Link>
      </div>

      {/* DOSSIER HEADER */}
      <header className="case-header" ref={headerRef}>
        <div className="case-header-card reveal">
          <div className="case-header-top">
            <span className="case-header-tag">File 01 · Case Study</span>
            <span className="case-header-status">Status: Live</span>
          </div>
          <h1 className="case-header-title">Lead Qualification Agent</h1>
          <p className="case-header-lede">
            A pipeline that resolves messy inbound leads against real company data, scores them against a
            transparent ICP model, and routes them — so an SDR never has to eyeball 400 form fills a week.
          </p>

          <div className="case-header-table">
            <div className="case-header-row">
              <div className="case-header-label">Classification</div>
              <div className="case-header-value">
                <span className="case-redacted-wrap">
                  <span>Systems design · SQL as business logic · Applied AI judgment</span>
                  <span className="case-redaction" />
                </span>
              </div>
            </div>
            <div className="case-header-row">
              <div className="case-header-label">Stack</div>
              <div className="case-header-value">
                <span className="case-redacted-wrap">
                  <span className="case-header-value--mono">Python · SQLite · SQL · Ollama (local LLM) · SEC EDGAR API</span>
                  <span className="case-redaction" />
                </span>
              </div>
            </div>
            <div className="case-header-row case-header-row--last">
              <div className="case-header-label">Subject</div>
              <div className="case-header-value">Inbound triage, SLA decay, and the protection of an AE&apos;s time.</div>
            </div>
          </div>
        </div>
      </header>

      {/* THE BRIEF */}
      <section className="case-section">
        <div className="case-prose reveal case-brief">
          <span className="case-eyebrow">The Brief</span>
          <p>
            Inbound funnels drown sales teams in volume. Most of it is noise — students, competitors, wrong-fit
            companies — and buried inside is the handful of real buyers who go stale while triage takes three
            days.
          </p>
          <p>
            This is the exact problem I own at Tipalti every week, running point on AP-automation deal
            qualification. So I built the system I wished existed: one that scores leads against a rubric a
            RevOps lead could read and retune — without asking anyone to triage by hand.
          </p>
        </div>
      </section>

      {/* DESIGN THESIS */}
      <section className="case-section">
        <div className="case-thesis reveal">
          <span className="case-eyebrow case-eyebrow--soft">Design Thesis</span>
          <p className="case-thesis-line">
            <span className="ink">Deterministic</span> <span className="soft">where possible,</span>{" "}
            <span className="accent">agentic</span> <span className="soft">where valuable.</span>
          </p>
          <p className="case-thesis-sub">
            Scoring is SQL — auditable, testable, retunable without touching code. Judgment — resolving an
            ambiguous company name, reading intent from a vague message — is the LLM&apos;s job, and{" "}
            <em>only</em> where it earns its keep. Everywhere else, the AI-first instinct is the wrong
            instinct.
          </p>
        </div>
      </section>

      {/* PIPELINE DIAGRAM */}
      <section className="case-section">
        <div className="case-prose reveal" style={{ marginBottom: 8 }}>
          <span className="case-eyebrow">The Pipeline</span>
          <h2 className="case-h2">One lead, five stages.</h2>
          <p style={{ color: "var(--ink-soft)", fontSize: 17, margin: 0 }}>
            A lead flows left to right. Solid stages are deterministic. One step — and only one — hands off to
            a local LLM, and only when the answer is genuinely ambiguous.
          </p>
        </div>

        <div className="pipeline-wrap reveal" ref={pipelineWrapRef}>
          <div className="pipeline-token" ref={tokenRef}>
            lead_0047
          </div>

          <div className="pipeline-row">
            {STAGES.map((stage, i) => (
              <div
                key={stage.num}
                ref={(el) => {
                  stageRefs.current[i] = el;
                }}
                className={`pipeline-stage${stage.type === "llm" ? " pipeline-stage--llm" : ""}`}
              >
                <div
                  ref={(el) => {
                    dotRefs.current[i] = el;
                  }}
                  className="pipeline-stage-dot"
                />
                <div className="pipeline-stage-num">Stage {stage.num}</div>
                <div className="pipeline-stage-title">{stage.title}</div>
                {stage.coreTag && <div className="pipeline-stage-core-tag">{stage.coreTag}</div>}
                <div className="pipeline-stage-desc">{stage.desc}</div>
                <div className={`pipeline-stage-badge${stage.type === "llm" ? " pipeline-stage-badge--llm" : ""}`}>
                  {stage.type === "llm" ? "LLM · ONLY WHERE AMBIGUOUS" : "DETERMINISTIC"}
                </div>
              </div>
            ))}
          </div>

          {/* security band */}
          <div className="security-band">
            <span className="security-band-label">SECURITY LAYER</span>
            <span className="security-band-tag">INJECTION / SPAM / PERSONA — DETERMINISTIC BY DESIGN</span>
            <span className="security-band-note">
              Runs across all five stages. A security classifier shouldn&apos;t depend on the judgment of the
              model an attacker is trying to manipulate.
            </span>
          </div>

          {/* routing outcomes */}
          <div className="routing-row">
            <div className="routing-card routing-card--p1" ref={p1Ref}>
              <div className="routing-tier">P1</div>
              <div className="routing-title">AE, now</div>
              <div className="routing-desc">Hot buyer, routed to a human immediately.</div>
            </div>
            <div className="routing-card">
              <div className="routing-tier">P2</div>
              <div className="routing-title">Nurture</div>
              <div className="routing-desc">Real, but not ready. Into a sequence.</div>
            </div>
            <div className="routing-card">
              <div className="routing-tier">P3</div>
              <div className="routing-title">Archive, with reason</div>
              <div className="routing-desc">Logged and closed — every rejection auditable.</div>
            </div>
          </div>

          {/* legend */}
          <div className="pipeline-legend">
            <span className="legend-item">
              <span className="legend-swatch" /> Solid ink = deterministic
            </span>
            <span className="legend-item">
              <span className="legend-swatch legend-swatch--llm" /> Dashed oxblood = LLM-assisted
            </span>
          </div>
        </div>
      </section>

      {/* EVIDENCE WALL */}
      <section className="case-section">
        <div className="case-prose reveal" style={{ marginBottom: 36 }}>
          <span className="case-eyebrow">The Evidence</span>
          <h2 className="case-h2" style={{ marginBottom: 0 }}>
            The numbers do the bragging.
          </h2>
        </div>
        <div className="evidence-grid reveal">
          {METRICS.map((m, i) => (
            <div className="evidence-cell" key={m.label}>
              <div
                className="evidence-number"
                ref={(el) => {
                  metricRefs.current[i] = el;
                }}
              >
                {m.final.toFixed(m.decimals)}
                {m.suffix}
              </div>
              <div className="evidence-label">{m.label}</div>
              <div className="evidence-desc">{m.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROOF POINTS */}
      <section className="case-section">
        <div className="case-prose reveal" style={{ marginBottom: 44 }}>
          <span className="case-eyebrow">What This Demonstrates</span>
          <h2 className="case-h2" style={{ marginBottom: 0 }}>
            Three things, defended with the code.
          </h2>
        </div>

        <div className="proof-list">
          <div className="proof-item reveal">
            <div className="proof-row">
              <span className="proof-num">01</span>
              <div>
                <h3 className="proof-title">Design a scoring model — and defend it under real data.</h3>
                <p className="proof-desc">
                  The rubric wasn&apos;t set once and left alone. A hand-audit against real judgment calls
                  found company size overriding strong buying signals — a CFO with budget approved
                  shouldn&apos;t score lower just because their company is large. I rebuilt the scorer around
                  that finding, which exposed and fixed a second gap. The rubric that shipped is the one that
                  survived being wrong twice.
                </p>
              </div>
            </div>
          </div>

          <div className="proof-item reveal">
            <div className="proof-row">
              <span className="proof-num">02</span>
              <div>
                <h3 className="proof-title">Know where to put the AI — and where not to.</h3>
                <p className="proof-desc">
                  Injection detection, spam filtering, persona classification: deterministic, on purpose. The
                  LLM only runs where the task is genuinely ambiguous — disambiguating a company name with two
                  plausible matches, or reading intent from a message that could honestly go either way.
                  Nowhere else.
                </p>
              </div>
            </div>
          </div>

          <div className="proof-item reveal">
            <div className="proof-row">
              <span className="proof-num">03</span>
              <div>
                <h3 className="proof-title">Test for the failure, not just the happy path.</h3>
                <p className="proof-desc" style={{ marginBottom: 0 }}>
                  Every phase turned up a real bug. None showed up by accident — they showed up because I went
                  looking, and the fixes are documented alongside the code.
                </p>
              </div>
            </div>
            <div className="field-notes-grid">
              <div className="field-note">
                <span className="field-note-tag">FIELD NOTE · RESOLVE</span>
                <p>
                  A text-cleaning step erased the exact detail meant to prevent an ambiguous match — the fix
                  that broke the fix.
                </p>
              </div>
              <div className="field-note">
                <span className="field-note-tag">FIELD NOTE · ENRICH</span>
                <p>
                  An SEC data-extraction gap silently failed for every foreign-incorporated public company. No
                  error — just missing data.
                </p>
              </div>
              <div className="field-note">
                <span className="field-note-tag">FIELD NOTE · SCORE</span>
                <p>A similarity feature looked plausible but was quietly comparing companies with nothing in common.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXHIBIT A */}
      <section className="case-section">
        <div className="exhibit-wrap reveal">
          <div className="exhibit-tab">EXHIBIT A — SCORING RUBRIC (SQL)</div>
          <div className="exhibit-box">
            <div className="exhibit-pre">
              <div className="exhibit-line">
                <span className="exhibit-comment">
                  -- ICP scoring rubric: a RevOps lead can read and retune this without touching app code.
                </span>
              </div>
              <div className="exhibit-line">WITH signals AS (</div>
              <div className="exhibit-line">{"  SELECT lead_id,"}</div>
              <div className="exhibit-line">
                {"         title_seniority_score,   "}
                <span className="exhibit-comment">-- VP+ / CxO weighted highest</span>
              </div>
              <div className="exhibit-line">
                {"         budget_authority_flag,   "}
                <span className="exhibit-comment">-- explicit budget language in message</span>
              </div>
              <div className="exhibit-line">
                {"         company_size_band,       "}
                <span className="exhibit-comment">-- 1 (SMB) .. 5 (enterprise)</span>
              </div>
              <div className="exhibit-line">{"         industry_fit_score"}</div>
              <div className="exhibit-line">{"  FROM enriched_leads"}</div>
              <div className="exhibit-line">)</div>
              <div className="exhibit-line">SELECT lead_id,</div>
              <div className="exhibit-line exhibit-highlight">
                {"       "}
                <span className="exhibit-highlight-comment">-- FIX: a buying signal must be able to override size.</span>
              </div>
              <div className="exhibit-line exhibit-highlight">{"       (budget_authority_flag * 40)"}</div>
              <div className="exhibit-line exhibit-highlight">{"         + (title_seniority_score * 30)"}</div>
              <div className="exhibit-line">
                {"         + LEAST(company_size_band * 4, 20)   "}
                <span className="exhibit-comment">-- size capped, never dominant</span>
              </div>
              <div className="exhibit-line">{"         + (industry_fit_score * 10)  AS icp_score,"}</div>
              <div className="exhibit-line">{"       CASE WHEN icp_score >= 70 THEN 'P1'"}</div>
              <div className="exhibit-line">{"            WHEN icp_score >= 40 THEN 'P2'"}</div>
              <div className="exhibit-line">{"            ELSE 'P3' END           AS priority_tier"}</div>
              <div className="exhibit-line">FROM signals;</div>
            </div>
          </div>
          <p className="exhibit-caption">
            Highlighted: the fix that lets a CFO with approved budget outrank a large-company size penalty.
            Placeholder fragment — the shipped rubric lives in the repo.
          </p>
        </div>
      </section>

      {/* PROVENANCE */}
      <section className="case-section">
        <div className="provenance reveal">
          <span className="provenance-label">Notes &amp; Provenance</span>
          <ul className="provenance-list">
            <li>No customer data touches this project. Every lead is synthetic; every company is real.</li>
            <li>Free-tier enrichment only (SEC EDGAR, Wikipedia, direct site scraping). No paid vendor data.</li>
            <li>The LLM runs locally via Ollama, swappable to any hosted provider in one line.</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="case-section case-section--cta">
        <div className="cta-row reveal">
          <a className="cta-btn" href="https://github.com/cmd-siri-bot/lead-triage-agent">
            Full technical writeup on GitHub →
          </a>
          <a className="cta-quiet" href="mailto:iamsirir@gmail.com">
            Hiring? Start a conversation.
          </a>
          <Link href="/" className="cta-back">
            ← Back to all files
          </Link>
        </div>
      </section>
    </div>
  );
}
