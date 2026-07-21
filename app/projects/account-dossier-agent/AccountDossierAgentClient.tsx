"use client";

import { useEffect, useRef } from "react";
import "./account-dossier-agent.css";

const stages = [
  {
    n: "01",
    title: "Scout",
    body: "Fetches the site, blog RSS, job board, SEC filings, and news — robots.txt-respecting, rate-limited, self-healing cache.",
  },
  {
    n: "02",
    title: "Extract",
    body: "One LLM call per source. Every claim needs a verbatim quote — no exact substring match, no claim.",
  },
  {
    n: "03",
    title: "Verify",
    body: "Corroborated by 2+ sources or one Tier-1/2 source → verified. One Tier-3 source → flagged, not trusted blindly.",
  },
  {
    n: "04",
    title: "Render",
    body: "A markdown dossier, every sentence footnoted [Cn] back to its source URL. Thin data renders thin — honestly.",
  },
  {
    n: "05",
    title: "Outreach",
    body: "Drafts email/LinkedIn copy that can only cite claims the dossier already verified — checked deterministically.",
  },
];

const sources = [
  {
    tier: "Tier 1",
    title: "Site + blog/press RSS",
    body: "Homepage, about, product, pricing, careers — plus whatever the company's own blog or newsroom feed publishes, discovered automatically.",
  },
  {
    tier: "Tier 1",
    title: "ATS job boards",
    body: "Detects Greenhouse, Lever, or Ashby on the careers page and pulls exact role/department/location data straight from their public APIs — no LLM guesswork, no scraped text to mangle.",
  },
  {
    tier: "Tier 2",
    title: "SEC EDGAR filings",
    body: "Looks up the company's CIK and pulls its most recent filings, prioritizing short current reports (8-K/6-K) over giant annual reports so the LLM sees dense signal, not boilerplate.",
  },
  {
    tier: "Tier 3",
    title: "GDELT news search",
    body: "Queries the open GDELT news index for recent coverage. Lowest-trust tier by design — a single news hit is flagged, never silently treated as verified fact.",
  },
];

const principles = [
  {
    n: "01",
    title: "Evidence over inference",
    body: "Every claim carries a verbatim quote from its source, checked programmatically. If the model can't quote it exactly, the claim is rejected — printed, not hidden.",
  },
  {
    n: "02",
    title: "Thin is honest",
    body: "A company with a limited public footprint gets a dossier that says so — \u201climited public footprint,\u201d not a padded paragraph of invented specifics.",
  },
  {
    n: "03",
    title: "Deterministic where it counts",
    body: "Quote matching, citation checking, and pain-signal matching are plain code, not another LLM call asked to grade its own homework.",
  },
  {
    n: "04",
    title: "Self-healing cache",
    body: "If extraction crashes mid-run after a source is already fetched, the next run notices nothing was actually mined from it and retries — instead of silently treating it as done forever.",
  },
];

const builtWith = [
  "Python 3.11+",
  "httpx",
  "BeautifulSoup",
  "SQLite",
  "Anthropic API",
  "Ollama",
  "SEC EDGAR API",
  "GDELT DOC 2.0",
];

export default function AccountDossierAgentClient() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const elements = root.querySelectorAll<HTMLElement>(".reveal");
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      elements.forEach((el) => el.classList.add("in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="case-study dossier-case-study" ref={rootRef}>
      <div className="case-nav">
        <a href="/#projects" className="case-back">
          ← Back to the case files
        </a>
      </div>

      <header className="dossier-header reveal">
        <span className="eyebrow">File 02 · Case Study</span>
        <p className="meta dossier-kicker">Agent pipeline · sales intelligence</p>
        <h1>Every claim in the dossier traces back to a real quote.</h1>
        <p className="dossier-lede">
          account-dossier-agent turns a company&apos;s website, blog, job
          board, SEC filings, and news coverage into a cited research dossier
          — and drafts outreach that&apos;s only allowed to reference what
          the dossier actually found.
        </p>
        <ul className="stack-chips">
          <li>Python</li>
          <li>Anthropic / Ollama</li>
          <li>SQLite</li>
          <li>SEC EDGAR</li>
          <li>GDELT</li>
          <li>Zero-key data sources</li>
        </ul>
      </header>

      <section className="dossier-section reveal">
        <div className="section-head">
          <h2>Pipeline</h2>
        </div>
        <div className="stage-list">
          {stages.map((s) => (
            <div className="stage" key={s.n}>
              <span className="stage-n">{s.n}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="dossier-section reveal">
        <div className="section-head">
          <h2>Data sources</h2>
        </div>
        <p className="section-intro">All free, none need an API key.</p>
        <div className="tier-grid">
          {sources.map((src) => (
            <div className="tier-card" key={src.title}>
              <span className="meta">{src.tier}</span>
              <h3>{src.title}</h3>
              <p>{src.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="dossier-section reveal">
        <div className="section-head">
          <h2>Design principles</h2>
        </div>
        <div className="principle-grid">
          {principles.map((p) => (
            <div className="principle" key={p.n}>
              <span className="stage-n small">{p.n}</span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="dossier-section reveal">
        <div className="section-head">
          <h2>What outreach is allowed to say</h2>
        </div>
        <div className="exhibit">
          <div className="exhibit-block">
            <span className="meta">Facts you may cite</span>
            <p>
              [C93] Acme Retail is hiring 2 AP clerks to join its finance
              team.
            </p>
          </div>
          <div className="exhibit-block">
            <span className="meta">Draft</span>
            <p>
              &ldquo;Hi AP Manager, I came across that Acme Retail is hiring 2
              AP clerks to join its finance team [C93]. We help finance teams
              scale without scaling headcount by automating the full
              accounts-payable cycle. Would you like to learn more?&rdquo;
            </p>
          </div>
          <div className="exhibit-block">
            <span className="meta">Checker</span>
            <p>
              Passed — every citation resolves to an allowed claim, no
              uncited sentence contains a number, $, or %.
            </p>
          </div>
        </div>
      </section>

      <section className="dossier-section reveal">
        <div className="section-head">
          <h2>Built with</h2>
        </div>
        <ul className="stack-chips">
          {builtWith.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <footer className="dossier-footer reveal">
        <p>
          account-dossier-agent — a fixed, auditable pipeline: plain function
          calls, no agent framework, every output traceable to a source.
        </p>
        <a href="/#contact" className="btn">
          Get in touch
        </a>
      </footer>
    </div>
  );
}
