// Case-study page content for account-dossier-agent.
// No external dependencies (no Tailwind/CSS-in-JS libs required) — styles are
// scoped under .adossier-landing via a plain <style> tag so nothing leaks
// into the rest of the site's CSS.

export default function AccountDossierAgentClient() {
  return (
    <div className="adossier-landing">
      <style>{`
        .adossier-landing {
          --ad-bg: #ffffff;
          --ad-card: #ffffff;
          --ad-border: #e3e5ea;
          --ad-text: #14161a;
          --ad-text-dim: #565c66;
          --ad-accent: #2f5fff;
          --ad-accent-soft: #eef1ff;
          --ad-mono-bg: #14161a;
          --ad-mono-text: #dfe4ee;
          --ad-good: #157a4a;
          --ad-shadow: 0 1px 2px rgba(20,22,26,0.04), 0 8px 24px rgba(20,22,26,0.05);

          background: var(--ad-bg);
          color: var(--ad-text);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, sans-serif;
          line-height: 1.55;
          -webkit-font-smoothing: antialiased;
        }
        @media (prefers-color-scheme: dark) {
          .adossier-landing {
            --ad-bg: #0e0f12;
            --ad-card: #17191f;
            --ad-border: #2a2d35;
            --ad-text: #edeef1;
            --ad-text-dim: #9aa0ab;
            --ad-accent: #7c9bff;
            --ad-accent-soft: #1c2440;
            --ad-mono-bg: #0a0b0d;
            --ad-mono-text: #cdd4e0;
            --ad-good: #4fd394;
            --ad-shadow: 0 1px 2px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.35);
          }
        }
        .adossier-landing * { box-sizing: border-box; }
        .adossier-landing .ad-wrap { max-width: 880px; margin: 0 auto; padding: 0 24px; }
        .adossier-landing .ad-hero { padding: 96px 0 64px; border-bottom: 1px solid var(--ad-border); }
        .adossier-landing .ad-eyebrow {
          display: inline-block;
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--ad-accent);
          background: var(--ad-accent-soft);
          padding: 5px 11px;
          border-radius: 999px;
          margin-bottom: 20px;
        }
        .adossier-landing h1 {
          font-size: clamp(32px, 5vw, 46px);
          line-height: 1.12;
          letter-spacing: -0.02em;
          margin: 0 0 18px;
          font-weight: 700;
        }
        .adossier-landing .ad-lede {
          font-size: 19px;
          color: var(--ad-text-dim);
          max-width: 620px;
          margin: 0 0 28px;
        }
        .adossier-landing .ad-badges { display: flex; flex-wrap: wrap; gap: 8px; }
        .adossier-landing .ad-badge {
          font-size: 12.5px;
          font-weight: 600;
          color: var(--ad-text-dim);
          border: 1px solid var(--ad-border);
          padding: 5px 10px;
          border-radius: 6px;
          font-family: "SF Mono", ui-monospace, Consolas, monospace;
        }
        .adossier-landing section { padding: 56px 0; border-bottom: 1px solid var(--ad-border); }
        .adossier-landing section:last-of-type { border-bottom: none; }
        .adossier-landing h2 {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ad-text-dim);
          margin: 0 0 28px;
        }
        .adossier-landing .ad-pipeline { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
        @media (max-width: 720px) { .adossier-landing .ad-pipeline { grid-template-columns: repeat(2, 1fr); } }
        .adossier-landing .ad-stage {
          background: var(--ad-card);
          border: 1px solid var(--ad-border);
          border-radius: 10px;
          padding: 16px 14px;
          box-shadow: var(--ad-shadow);
        }
        .adossier-landing .ad-stage .ad-n {
          font-family: "SF Mono", ui-monospace, Consolas, monospace;
          font-size: 11px;
          color: var(--ad-accent);
          font-weight: 700;
          margin-bottom: 6px;
        }
        .adossier-landing .ad-stage h3 { font-size: 14.5px; margin: 0 0 6px; font-weight: 650; }
        .adossier-landing .ad-stage p { font-size: 12.5px; color: var(--ad-text-dim); margin: 0; }
        .adossier-landing .ad-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        @media (max-width: 640px) { .adossier-landing .ad-grid2 { grid-template-columns: 1fr; } }
        .adossier-landing .ad-card {
          background: var(--ad-card);
          border: 1px solid var(--ad-border);
          border-radius: 10px;
          padding: 20px 22px;
          box-shadow: var(--ad-shadow);
        }
        .adossier-landing .ad-card h3 { font-size: 15.5px; margin: 0 0 8px; font-weight: 650; }
        .adossier-landing .ad-card p { font-size: 14px; color: var(--ad-text-dim); margin: 0; }
        .adossier-landing .ad-tier {
          display: inline-block;
          font-family: "SF Mono", ui-monospace, Consolas, monospace;
          font-size: 11px;
          color: var(--ad-text-dim);
          border: 1px solid var(--ad-border);
          border-radius: 5px;
          padding: 2px 7px;
          margin-bottom: 10px;
        }
        .adossier-landing .ad-principles { display: grid; gap: 18px; }
        .adossier-landing .ad-principle { display: flex; gap: 14px; align-items: flex-start; }
        .adossier-landing .ad-principle .ad-mark {
          flex: none;
          width: 26px; height: 26px;
          border-radius: 7px;
          background: var(--ad-accent-soft);
          color: var(--ad-accent);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 700;
          font-family: "SF Mono", ui-monospace, Consolas, monospace;
        }
        .adossier-landing .ad-principle h3 { font-size: 15px; margin: 0 0 4px; font-weight: 650; }
        .adossier-landing .ad-principle p { font-size: 14px; color: var(--ad-text-dim); margin: 0; }
        .adossier-landing .ad-quote {
          background: var(--ad-mono-bg);
          color: var(--ad-mono-text);
          border-radius: 10px;
          padding: 18px 20px;
          font-family: "SF Mono", ui-monospace, Consolas, monospace;
          font-size: 13px;
          line-height: 1.7;
          overflow-x: auto;
          box-shadow: var(--ad-shadow);
          white-space: pre-wrap;
        }
        .adossier-landing .ad-quote .ad-cite { color: var(--ad-good); }
        .adossier-landing .ad-quote .ad-cmt { color: #7d869a; }
        .adossier-landing .ad-stack { display: flex; flex-wrap: wrap; gap: 8px; }
        .adossier-landing footer { padding: 40px 0 80px; }
        .adossier-landing footer p { font-size: 13px; color: var(--ad-text-dim); margin: 0; }
      `}</style>

      <div className="ad-wrap">
        <header className="ad-hero">
          <span className="ad-eyebrow">Agent pipeline · sales intelligence</span>
          <h1>Every claim in the dossier traces back to a real quote.</h1>
          <p className="ad-lede">
            account-dossier-agent turns a company's website, blog, job board, SEC
            filings, and news coverage into a cited research dossier — and drafts
            outreach that's only allowed to reference what the dossier actually
            found.
          </p>
          <div className="ad-badges">
            <span className="ad-badge">Python</span>
            <span className="ad-badge">Anthropic / Ollama</span>
            <span className="ad-badge">SQLite</span>
            <span className="ad-badge">SEC EDGAR</span>
            <span className="ad-badge">GDELT</span>
            <span className="ad-badge">Zero-key data sources</span>
          </div>
        </header>

        <section>
          <h2>Pipeline</h2>
          <div className="ad-pipeline">
            <div className="ad-stage">
              <div className="ad-n">01</div>
              <h3>Scout</h3>
              <p>Fetches the site, blog RSS, job board, SEC filings, and news — robots.txt-respecting, rate-limited, self-healing cache.</p>
            </div>
            <div className="ad-stage">
              <div className="ad-n">02</div>
              <h3>Extract</h3>
              <p>One LLM call per source. Every claim needs a verbatim quote — no exact substring match, no claim.</p>
            </div>
            <div className="ad-stage">
              <div className="ad-n">03</div>
              <h3>Verify</h3>
              <p>Corroborated by 2+ sources or one Tier‑1/2 source → verified. One Tier‑3 source → flagged, not trusted blindly.</p>
            </div>
            <div className="ad-stage">
              <div className="ad-n">04</div>
              <h3>Render</h3>
              <p>A markdown dossier, every sentence footnoted [Cn] back to its source URL. Thin data renders thin — honestly.</p>
            </div>
            <div className="ad-stage">
              <div className="ad-n">05</div>
              <h3>Outreach</h3>
              <p>Drafts email/LinkedIn copy that can only cite claims the dossier already verified — checked deterministically.</p>
            </div>
          </div>
        </section>

        <section>
          <h2>Data sources — all free, none need an API key</h2>
          <div className="ad-grid2">
            <div className="ad-card">
              <span className="ad-tier">tier 1</span>
              <h3>Site + blog/press RSS</h3>
              <p>Homepage, about, product, pricing, careers — plus whatever the company's own blog or newsroom feed publishes, discovered automatically.</p>
            </div>
            <div className="ad-card">
              <span className="ad-tier">tier 1</span>
              <h3>ATS job boards</h3>
              <p>Detects Greenhouse, Lever, or Ashby on the careers page and pulls exact role/department/location data straight from their public APIs — no LLM guesswork, no scraped text to mangle.</p>
            </div>
            <div className="ad-card">
              <span className="ad-tier">tier 2</span>
              <h3>SEC EDGAR filings</h3>
              <p>Looks up the company's CIK and pulls its most recent filings, prioritizing short current reports (8-K/6-K) over giant annual reports so the LLM sees dense signal, not boilerplate.</p>
            </div>
            <div className="ad-card">
              <span className="ad-tier">tier 3</span>
              <h3>GDELT news search</h3>
              <p>Queries the open GDELT news index for recent coverage. Lowest-trust tier by design — a single news hit is flagged, never silently treated as verified fact.</p>
            </div>
          </div>
        </section>

        <section>
          <h2>Design principles</h2>
          <div className="ad-principles">
            <div className="ad-principle">
              <span className="ad-mark">01</span>
              <div>
                <h3>Evidence over inference</h3>
                <p>Every claim carries a verbatim quote from its source, checked programmatically. If the model can't quote it exactly, the claim is rejected — printed, not hidden.</p>
              </div>
            </div>
            <div className="ad-principle">
              <span className="ad-mark">02</span>
              <div>
                <h3>Thin is honest</h3>
                <p>A company with a limited public footprint gets a dossier that says so — "limited public footprint," not a padded paragraph of invented specifics.</p>
              </div>
            </div>
            <div className="ad-principle">
              <span className="ad-mark">03</span>
              <div>
                <h3>Deterministic where it counts</h3>
                <p>Quote matching, citation checking, and pain-signal matching are plain code, not another LLM call asked to grade its own homework.</p>
              </div>
            </div>
            <div className="ad-principle">
              <span className="ad-mark">04</span>
              <div>
                <h3>Self-healing cache</h3>
                <p>If extraction crashes mid-run after a source is already fetched, the next run notices nothing was actually mined from it and retries — instead of silently treating it as done forever.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2>What outreach is allowed to say</h2>
          <div className="ad-quote">
            <span className="ad-cmt"># Facts you may cite:</span>{"\n"}
            [C93] Acme Retail is hiring 2 AP clerks to join its finance team.{"\n\n"}
            <span className="ad-cmt"># Draft:</span>{"\n"}
            "Hi AP Manager, I came across that Acme Retail is hiring{"\n"}
            2 AP clerks to join its finance team <span className="ad-cite">[C93]</span>. We help finance{"\n"}
            teams scale without scaling headcount by automating the{"\n"}
            full accounts-payable cycle. Would you like to learn more?"{"\n\n"}
            <span className="ad-cmt"># Checker:</span> passed — every citation resolves to an{"\n"}
            allowed claim, no uncited sentence contains a number, $, or %.
          </div>
        </section>

        <section>
          <h2>Built with</h2>
          <div className="ad-stack">
            <span className="ad-badge">Python 3.11+</span>
            <span className="ad-badge">httpx</span>
            <span className="ad-badge">BeautifulSoup</span>
            <span className="ad-badge">SQLite</span>
            <span className="ad-badge">Anthropic API</span>
            <span className="ad-badge">Ollama</span>
            <span className="ad-badge">SEC EDGAR API</span>
            <span className="ad-badge">GDELT DOC 2.0</span>
          </div>
        </section>

        <footer>
          <p>account-dossier-agent — a fixed, auditable pipeline: plain function calls, no agent framework, every output traceable to a source.</p>
        </footer>
      </div>
    </div>
  );
}
