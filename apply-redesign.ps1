<#
.SYNOPSIS
    Applies the oxblood / paper / black redesign (with resume logos) to the sirirama.info Next.js site.

.DESCRIPTION
    Backs up the existing app/globals.css, app/layout.tsx, and app/HomeClient.tsx
    (if present), then writes the new versions in their place.

.USAGE
    Run this from the root of your Next.js repo:
        .\apply-redesign.ps1

    If your app folder isn't at .\app, point at it explicitly:
        .\apply-redesign.ps1 -AppDir "src\app"

.NOTE
    This script does not touch your logo image files. Make sure
    public/logos/tipalti.png, delphic.png, sussex.png,
    government-of-canada.png, queens.png, and uoft.png already exist.
#>

param(
    [string]$AppDir
)

$ErrorActionPreference = "Stop"

# ---------- Locate the app directory ----------
if (-not $AppDir) {
    if (Test-Path "app") { $AppDir = "app" }
    elseif (Test-Path "src/app") { $AppDir = "src/app" }
    else {
        Write-Error "Could not find an 'app' or 'src/app' directory. Run this from your repo root, or pass -AppDir <path>."
        exit 1
    }
}

if (-not (Test-Path $AppDir)) {
    Write-Error "'$AppDir' does not exist."
    exit 1
}

Write-Host "Using app directory: $AppDir" -ForegroundColor Cyan

# ---------- Check for logo files ----------
$expectedLogos = @("tipalti.png", "delphic.png", "sussex.png", "government-of-canada.png", "queens.png", "uoft.png")
$logosDir = "public/logos"
if (Test-Path $logosDir) {
    foreach ($logo in $expectedLogos) {
        if (-not (Test-Path (Join-Path $logosDir $logo))) {
            Write-Warning "Missing $logosDir/$logo — the resume section will show a broken image until it's added."
        }
    }
} else {
    Write-Warning "Could not find '$logosDir'. Make sure your logo PNGs live at public/logos/ before deploying."
}

# ---------- Backup existing files ----------
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupDir = "redesign-backup-$timestamp"

$files = @("globals.css", "layout.tsx", "HomeClient.tsx")
$anyBackup = $false

foreach ($f in $files) {
    $target = Join-Path $AppDir $f
    if (Test-Path $target) {
        if (-not $anyBackup) {
            New-Item -ItemType Directory -Path $backupDir | Out-Null
            $anyBackup = $true
        }
        Copy-Item $target -Destination (Join-Path $backupDir $f)
        Write-Host "Backed up $target -> $backupDir/$f"
    }
}

# ============================================================
#  globals.css
# ============================================================
$globalsCss = @'
@import "tailwindcss";

:root {
  --paper: #F5F1E8;
  --paper-raised: #FBF8F2;
  --ink: #141210;
  --ink-soft: #52493F;
  --oxblood: #5E1A1E;
  --oxblood-deep: #471316;
  --oxblood-tint: #EDE2DC;
  --rule: #DCD4C4;
  --max: 44rem;
}

@theme inline {
  --color-paper: var(--paper);
  --color-paper-raised: var(--paper-raised);
  --color-ink: var(--ink);
  --color-ink-soft: var(--ink-soft);
  --color-oxblood: var(--oxblood);
  --color-rule: var(--rule);
  --font-serif: var(--font-spectral);
  --font-sans: var(--font-public-sans);
  --font-mono: var(--font-jetbrains);
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }

body {
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-public-sans), -apple-system, sans-serif;
  font-size: 1.0625rem;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}

a { color: var(--oxblood); text-decoration: none; }
a:hover { text-decoration: underline; text-underline-offset: 3px; }
a:focus-visible, button:focus-visible {
  outline: 2px solid var(--oxblood);
  outline-offset: 3px;
  border-radius: 2px;
}
::selection { background: var(--oxblood); color: var(--paper); }

.eyebrow, .meta {
  font-family: var(--font-jetbrains), monospace;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.eyebrow { font-size: 0.72rem; color: var(--oxblood); }
.meta { font-size: 0.72rem; color: var(--ink-soft); }

/* ---------- Nav ---------- */
.site-nav {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(245, 241, 232, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--rule);
}
.nav-inner {
  max-width: var(--max);
  margin: 0 auto;
  padding: 0.85rem 1.25rem;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
}
.nav-name {
  font-family: var(--font-spectral), serif;
  font-weight: 600;
  font-size: 1rem;
  color: var(--ink);
}
.nav-links { display: flex; gap: 1.4rem; }
.nav-links a { color: var(--ink-soft); font-size: 0.85rem; font-weight: 500; }
.nav-links a:hover { color: var(--oxblood); }

/* ---------- Layout ---------- */
main { max-width: var(--max); margin: 0 auto; padding: 0 1.25rem; }
section { padding: 4.5rem 0 0; }
section:last-of-type { padding-bottom: 5rem; }

.section-head {
  display: flex;
  align-items: baseline;
  gap: 0.9rem;
  border-bottom: 1px solid var(--ink);
  padding-bottom: 0.55rem;
  margin-bottom: 1.6rem;
}
.section-head h2 {
  font-family: var(--font-spectral), serif;
  font-weight: 600;
  font-size: 1.5rem;
  letter-spacing: -0.01em;
}
.section-intro { color: var(--ink-soft); max-width: 38rem; margin-bottom: 1.2rem; }

/* ---------- Hero ---------- */
.hero { padding: 5.5rem 0 1rem; }
.hero .kicker { margin-bottom: 1.4rem; display: block; }
.hero h1 {
  font-family: var(--font-spectral), serif;
  font-weight: 500;
  font-size: clamp(2rem, 5.5vw, 2.9rem);
  line-height: 1.18;
  letter-spacing: -0.015em;
  max-width: 36rem;
}
.hero h1 em { font-style: normal; color: var(--oxblood); }
.hero .lede {
  margin-top: 1.6rem;
  max-width: 36rem;
  color: var(--ink-soft);
  font-size: 1.1rem;
}
.hero-actions {
  margin-top: 2.2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.btn {
  display: inline-block;
  background: var(--oxblood);
  color: #fff;
  font-weight: 600;
  font-size: 0.92rem;
  padding: 0.7rem 1.3rem;
  border-radius: 3px;
}
.btn:hover { background: var(--oxblood-deep); text-decoration: none; color: #fff; }
.hero-actions .quiet { color: var(--ink-soft); font-size: 0.92rem; font-weight: 500; }
.hero-actions .quiet:hover { color: var(--oxblood); }

/* ---------- Projects / case files ---------- */
.file { padding: 1.7rem 0; border-bottom: 1px solid var(--rule); }
.file:last-of-type { border-bottom: none; }
.file-meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 0.5rem;
}
.file h3 {
  font-family: var(--font-spectral), serif;
  font-weight: 600;
  font-size: 1.2rem;
  letter-spacing: -0.01em;
}
.file h3 a { color: var(--ink); }
.file h3 a:hover { color: var(--oxblood); }
.file p { margin-top: 0.5rem; color: var(--ink-soft); font-size: 0.97rem; max-width: 38rem; }
.file .src { display: inline-block; margin-top: 0.7rem; font-size: 0.88rem; font-weight: 500; }
.wip {
  display: inline-block;
  background: var(--oxblood-tint);
  color: var(--oxblood);
  border-radius: 3px;
  padding: 0.1rem 0.5rem;
  font-family: var(--font-jetbrains), monospace;
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  vertical-align: middle;
  margin-left: 0.5rem;
}
.file-outro { color: var(--ink-soft); font-size: 0.95rem; margin-top: 1.4rem; }

/* ---------- Resume ---------- */
.resume-lede { color: var(--ink-soft); max-width: 38rem; margin-bottom: 0.6rem; }
.resume-contact { margin-bottom: 2rem; display: flex; gap: 1.4rem; flex-wrap: wrap; color: var(--ink-soft); font-size: 0.9rem; }
.subhead {
  font-family: var(--font-spectral), serif;
  font-weight: 600;
  font-size: 1.15rem;
  margin: 2.2rem 0 0.4rem;
  color: var(--ink);
}
.role { display: grid; grid-template-columns: 8.5rem 1fr; gap: 1.5rem; padding: 1.6rem 0; border-bottom: 1px solid var(--rule); }
.role:last-of-type { border-bottom: none; }
.role .when { padding-top: 0.28rem; }
.role h4 {
  font-family: var(--font-spectral), serif;
  font-weight: 600;
  font-size: 1.15rem;
  letter-spacing: -0.01em;
}
.role .title { color: var(--oxblood); font-size: 0.9rem; font-weight: 500; margin-top: 0.1rem; }
.role-head, .edu-head {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}
.role-logo, .edu-logo {
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  object-fit: contain;
  background: var(--paper-raised);
  border: 1px solid var(--rule);
  border-radius: 4px;
  padding: 0.35rem;
}
.role .blurb { margin-top: 0.45rem; color: var(--ink-soft); font-size: 0.92rem; font-style: italic; }
.role ul { margin-top: 0.6rem; list-style: none; }
.role li {
  color: var(--ink-soft);
  font-size: 0.97rem;
  padding-left: 1.1rem;
  position: relative;
  margin-top: 0.45rem;
}
.role li::before {
  content: "—";
  position: absolute;
  left: 0;
  color: var(--oxblood);
}
.edu { display: grid; grid-template-columns: 8.5rem 1fr; gap: 1.5rem; padding: 1.2rem 0; border-bottom: 1px solid var(--rule); }
.edu:last-of-type { border-bottom: none; }
.edu h4 { font-family: var(--font-spectral), serif; font-weight: 600; font-size: 1.08rem; }
.edu p { color: var(--ink-soft); font-size: 0.95rem; }
.resume-note { color: var(--ink-soft); font-size: 0.95rem; margin-top: 1.6rem; }

/* ---------- About ---------- */
.about p { max-width: 38rem; color: var(--ink-soft); }
.about p + p { margin-top: 1rem; }
.toolkit {
  margin-top: 2.2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
.toolkit h4 {
  font-family: var(--font-spectral), serif;
  font-weight: 600;
  font-size: 1.05rem;
  border-bottom: 1px solid var(--rule);
  padding-bottom: 0.4rem;
  margin-bottom: 0.7rem;
}
.toolkit ul { list-style: none; }
.toolkit li {
  color: var(--ink-soft);
  font-size: 0.95rem;
  padding-left: 1.1rem;
  position: relative;
  margin-top: 0.4rem;
}
.toolkit li::before { content: "·"; position: absolute; left: 0.2rem; color: var(--oxblood); font-weight: 700; }
.offclock { margin-top: 2.2rem; font-size: 0.97rem; color: var(--ink-soft); }

/* ---------- Contact ---------- */
.contact-card {
  border: 1px solid var(--ink);
  border-radius: 4px;
  padding: 2.2rem 2rem;
  background: var(--paper-raised);
}
.contact-card h2 {
  font-family: var(--font-spectral), serif;
  font-weight: 600;
  font-size: 1.5rem;
  letter-spacing: -0.01em;
  max-width: 30rem;
  line-height: 1.3;
}
.contact-card p { margin-top: 0.8rem; color: var(--ink-soft); max-width: 32rem; }
.contact-links { margin-top: 1.6rem; display: flex; gap: 1.6rem; flex-wrap: wrap; align-items: center; }
.contact-links a:not(.btn) { font-weight: 500; font-size: 0.95rem; }

footer { border-top: 1px solid var(--rule); margin-top: 2rem; }
.foot-inner {
  max-width: var(--max);
  margin: 0 auto;
  padding: 1.4rem 1.25rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: var(--ink-soft);
  font-size: 0.82rem;
}
.foot-inner a { color: var(--ink-soft); }
.foot-inner a:hover { color: var(--oxblood); }

/* ---------- Reveal ---------- */
.reveal {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.55s ease, transform 0.55s ease;
}
.reveal.in { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .reveal { opacity: 1; transform: none; transition: none; }
}

@media (max-width: 620px) {
  .nav-links { gap: 1rem; }
  .hero { padding-top: 3.2rem; }
  .role, .edu { grid-template-columns: 1fr; gap: 0.2rem; }
  .file-meta { flex-direction: column; gap: 0.15rem; }
  .toolkit { grid-template-columns: 1fr; }
}
'@

# ============================================================
#  layout.tsx
# ============================================================
$layoutTsx = @'
import type { Metadata } from "next";
import { Spectral, Public_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-spectral",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-public-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Siri Rama — Economist by training, storyteller by nature",
  description:
    "I build compelling narratives backed by data and the automation tools behind them. AI agents, ATIP automation, and open-data analysis, from Toronto.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spectral.variable} ${publicSans.variable} ${jetbrains.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
'@

# ============================================================
#  HomeClient.tsx
# ============================================================
$homeClientTsx = @'
"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function HomeClient() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = document.querySelectorAll(".reveal");

    if (reduced || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <nav className="site-nav">
        <div className="nav-inner">
          <a className="nav-name" href="#top">Siri Rama</a>
          <div className="nav-links">
            <a href="#projects">Projects</a>
            <a href="#resume">Resume</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <span className="kicker eyebrow">Toronto, Canada</span>
          <h1>An economist by training, a <em>storyteller</em> by nature.</h1>
          <p className="lede">
            I&apos;m Siri Rama. I create compelling narratives backed by data — the kind that have won over voters and buying committees alike. The projects below are the other half of that craft: the automation and analysis tools I build to get from raw data to a story worth telling.
          </p>
          <div className="hero-actions">
            <a className="btn" href="mailto:iamsirir@gmail.com">Email</a>
            <a className="quiet" href="#projects">All projects ↓</a>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <div className="section-head reveal">
            <span className="eyebrow">File 01</span>
            <h2>The case files.</h2>
          </div>
          <p className="section-intro reveal">
            Tools I built to get from raw data to a story worth telling — agents, automation, and analysis. Each one shipped; each one taught me something the docs didn&apos;t. Live demos hang off subdomains of this site as they go up.
          </p>

          <div className="file reveal">
            <div className="file-meta">
              <span className="eyebrow">File 01</span>
              <span className="meta">Python · LLM · Agentic workflow · 2026</span>
            </div>
            <h3><a href="https://github.com/cmd-siri-bot">Executive Agent</a></h3>
            <p>
              An agentic assistant that reads across the messy inputs of a working day — email, calendar, notes, documents — and produces a single prioritized brief: what needs a decision, what can wait, and what to say. Built around a plan-and-review loop so the agent proposes, and a human approves, before anything leaves the room.
            </p>
            <a className="src" href="https://github.com/cmd-siri-bot">View source →</a>
          </div>

          <div className="file reveal">
            <div className="file-meta">
              <span className="eyebrow">File 02</span>
              <span className="meta">PowerShell · Ollama · Open source · 2026</span>
            </div>
            <h3><a href="https://github.com/cmd-siri-bot">Downloads Butler</a></h3>
            <p>
              A five-stage pipeline — scan, analyze, report, approve, execute — that inventories files with SHA-256 hashing, flags duplicates and stale installers with a deterministic rules engine plus an optional local-LLM pass, then presents an HTML approval page. Approved actions run through a quarantine system with a full restore path, so no file is ever destructively deleted. Built and adversarially tested against path-traversal and protected-file edge cases.
            </p>
            <a className="src" href="https://github.com/cmd-siri-bot">View source →</a>
          </div>

          <div className="file reveal">
            <div className="file-meta">
              <span className="eyebrow">File 03</span>
              <span className="meta">Work in progress</span>
            </div>
            <h3>ATIP Automation <span className="wip">In progress</span></h3>
            <p>Tooling that takes the grind out of Access to Information requests — drafting, filing, and tracking.</p>
            <p>This one&apos;s still under construction. <a href="mailto:iamsirir@gmail.com?subject=ATIP%20Automation">Contact me</a> for more info.</p>
          </div>

          <div className="file reveal">
            <div className="file-meta">
              <span className="eyebrow">File 04</span>
              <span className="meta">Python · Data viz · Civic tech · 2026</span>
            </div>
            <h3><a href="https://github.com/cmd-siri-bot">City of Toronto Open Data</a></h3>
            <p>
              The City of Toronto publishes hundreds of open datasets; most sit unread. This project pulls from that portal and turns raw civic data into narratives with a thesis — mapping, comparing, and contextualizing the numbers to answer questions residents and decision-makers actually ask. The data-storytelling half of the resume, applied to the city I live in.
            </p>
            <a className="src" href="https://github.com/cmd-siri-bot">View source →</a>
          </div>

          <p className="file-outro reveal">
            More experiments live on <a href="https://github.com/cmd-siri-bot">GitHub</a>, including the ones that didn&apos;t make the cut.
          </p>
        </section>

        {/* RESUME */}
        <section id="resume">
          <div className="section-head reveal">
            <span className="eyebrow">File 02</span>
            <h2>Resume</h2>
          </div>
          <p className="resume-lede reveal">
            An economist by training and a storyteller by nature. I create compelling narratives backed by data that have won over voters in Canada and buying committees in regulated industries.
          </p>
          <div className="resume-contact reveal">
            <a href="mailto:iamsirir@gmail.com">iamsirir@gmail.com</a>
            <a href="https://linkedin.com/in/sirirama">linkedin.com/in/sirirama</a>
            <span>Toronto, Canada</span>
          </div>

          <h3 className="subhead reveal">Experience</h3>

          <div className="role reveal">
            <div className="when meta">Nov 2025 — Present</div>
            <div>
              <div className="role-head">
                <Image src="/logos/tipalti.png" alt="Tipalti logo" width={40} height={40} className="role-logo" />
                <div>
                  <h4>Tipalti</h4>
                  <div className="title">Go-To-Market · Toronto, Canada</div>
                </div>
              </div>
              <p className="blurb">Tipalti is a global fintech platform automating accounts payable, payments, and compliance workflows.</p>
              <ul>
                <li>I work in sales at a hyper-growth fintech company headquartered in the Bay Area, CA.</li>
                <li>Helped build, test, and iterate AI agents for Tipalti&apos;s GTM workflow to scale prospecting and qualification.</li>
                <li>#1 rep in qualified opportunities — exceeded quota every month while maintaining an excellent prospect experience. Q2&apos;26 Rep of the Quarter.</li>
              </ul>
            </div>
          </div>

          <div className="role reveal">
            <div className="when meta">Jan 2025 — Nov 2025</div>
            <div>
              <div className="role-head">
                <Image src="/logos/delphic.png" alt="Delphic Research Group logo" width={40} height={40} className="role-logo" />
                <div>
                  <h4>Delphic Research Group</h4>
                  <div className="title">Growth and Operations · Toronto, Canada</div>
                </div>
              </div>
              <p className="blurb">Delphic is a gov-tech start-up focused on competitive intelligence and decision-support for regulated industries.</p>
              <ul>
                <li>Went from zero to one in a bootstrapped, fast-paced environment — it was my tech/start-up bootcamp.</li>
                <li>Drove early revenue growth, helping scale from $500K to $1M ARR by expanding into new, heavily regulated verticals: health and life sciences, energy and critical minerals, and defence and aerospace.</li>
                <li>Operated cross-functionally across sales, operations, and product delivery in a fast-moving environment with a small team of 5.</li>
              </ul>
            </div>
          </div>

          <div className="role reveal">
            <div className="when meta">Jan 2024 — Dec 2025</div>
            <div>
              <div className="role-head">
                <Image src="/logos/sussex.png" alt="Sussex Strategy Group logo" width={40} height={40} className="role-logo" />
                <div>
                  <h4>Sussex Strategy Group</h4>
                  <div className="title">Public Affairs Analyst · Toronto, Canada</div>
                </div>
              </div>
              <p className="blurb">Sussex is a premier public affairs firm, helping organizations navigate bureaucracy and influence public opinion.</p>
              <ul>
                <li>Lobbyist for some of the biggest, most influential organizations in Canada — the classic exit opportunity for most people leaving government.</li>
                <li>Supported engagement strategies for clients across the public, private, and non-profit sectors by mapping stakeholders, tracking legislation, and positioning clients for growth in Canada&apos;s key industries.</li>
              </ul>
            </div>
          </div>

          <div className="role reveal">
            <div className="when meta">Jun 2022 — Dec 2024</div>
            <div>
              <div className="role-head">
                <Image src="/logos/government-of-canada.png" alt="Government of Canada logo" width={40} height={40} className="role-logo" />
                <div>
                  <h4>Government of Canada</h4>
                  <div className="title">Economist and Advisor · Ottawa, Canada</div>
                </div>
              </div>
              <ul>
                <li>Campaigned in and won three back-to-back federal elections.</li>
                <li>Advised on Federal Budget and Economic Statement planning cycles — developing first-hand insight into how public-sector and regulated buyers evaluate cost, risk, and outcomes.</li>
                <li>Built and maintained quantitative models to estimate the budgetary and economic impacts of federal policy proposals, applying regression analysis, scenario modeling, and sensitivity analysis.</li>
              </ul>
            </div>
          </div>

          <h3 className="subhead reveal">Education</h3>

          <div className="edu reveal">
            <div className="when meta">MA</div>
            <div>
              <div className="edu-head">
                <Image src="/logos/queens.png" alt="Queen&apos;s University logo" width={40} height={40} className="edu-logo" />
                <h4>Queen&apos;s University</h4>
              </div>
              <p>Master of Arts (MA), Public Affairs</p>
              <p>Specialization in Public Finance</p>
            </div>
          </div>

          <div className="edu reveal">
            <div className="when meta">BA</div>
            <div>
              <div className="edu-head">
                <Image src="/logos/uoft.png" alt="University of Toronto logo" width={40} height={40} className="edu-logo" />
                <h4>University of Toronto</h4>
              </div>
              <p>Honours Bachelor of Arts (BA)</p>
              <p>Economics and Politics (International Relations)</p>
            </div>
          </div>

          <p className="resume-note reveal">
            Prefer a PDF? <a href="mailto:iamsirir@gmail.com?subject=Resume%20request">Email me</a> and I&apos;ll send the latest version.
          </p>
        </section>

        {/* ABOUT */}
        <section id="about" className="about">
          <div className="section-head reveal">
            <span className="eyebrow">File 03</span>
            <h2>The numbers make the case. The story wins the room.</h2>
          </div>
          <p className="reveal">
            I&apos;m an economist by training and a storyteller by nature. Those usually pull in opposite directions — rigor versus persuasion — and most of my work is spent proving they don&apos;t have to.
          </p>
          <p className="reveal">
            I&apos;ve used that combination on two very different audiences: voters, where data becomes canvass strategy and a message that moves turnout; and buying committees, where the same discipline becomes a business case a room of skeptics will sign off on. Different stakes, identical method — find what the data actually says, then make people feel why it matters.
          </p>
          <p className="reveal">
            The projects on this site are the engine room behind that. When the analysis got repetitive, I automated it; when the data was locked in a portal, I wrote something to free it. Everything on the technical side is self-taught — mostly by breaking things and reading the error messages carefully.
          </p>

          <div className="toolkit reveal">
            <div>
              <h4>The storyteller</h4>
              <ul>
                <li>Data storytelling</li>
                <li>Campaign &amp; voter strategy</li>
                <li>B2B sales narratives</li>
                <li>Briefing notes &amp; memos</li>
                <li>Stakeholder communication</li>
              </ul>
            </div>
            <div>
              <h4>The economist</h4>
              <ul>
                <li>Economic &amp; statistical analysis</li>
                <li>Python</li>
                <li>PowerShell</li>
                <li>LLM &amp; agentic workflows (Ollama)</li>
                <li>Open-data pipelines</li>
              </ul>
            </div>
          </div>

          <p className="offclock reveal">
            Off the clock: history and politics rabbit holes, strategy games, and the occasional side project that starts as a one-off script and refuses to stay small.
          </p>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <div className="contact-card reveal">
            <span className="eyebrow" style={{ display: "block", marginBottom: "0.8rem" }}>File 04 · Contact</span>
            <h2>Working on something at the intersection of data and narrative?</h2>
            <p>I&apos;m always interested in anything tech, automation, or politics. The fastest way to reach me:</p>
            <div className="contact-links">
              <a className="btn" href="mailto:iamsirir@gmail.com">Email</a>
              <a href="https://linkedin.com/in/sirirama">LinkedIn</a>
              <a href="https://github.com/cmd-siri-bot">GitHub</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="foot-inner">
          <span>© 2026 Siri Rama · Toronto</span>
          <span>
            <a href="https://github.com/cmd-siri-bot">GitHub</a>
            {" · "}
            <a href="https://linkedin.com/in/sirirama">LinkedIn</a>
          </span>
        </div>
      </footer>
    </>
  );
}
'@

# ---------- Write files ----------
Set-Content -Path (Join-Path $AppDir "globals.css") -Value $globalsCss -NoNewline
Write-Host "Wrote $AppDir/globals.css" -ForegroundColor Green

Set-Content -Path (Join-Path $AppDir "layout.tsx") -Value $layoutTsx -NoNewline
Write-Host "Wrote $AppDir/layout.tsx" -ForegroundColor Green

Set-Content -Path (Join-Path $AppDir "HomeClient.tsx") -Value $homeClientTsx -NoNewline
Write-Host "Wrote $AppDir/HomeClient.tsx" -ForegroundColor Green

Write-Host ""
if ($anyBackup) {
    Write-Host "Originals backed up to: $backupDir/" -ForegroundColor Yellow
}
Write-Host "Redesign applied." -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:"
Write-Host "  npm run dev                                          # preview at localhost:3000"
Write-Host "  git add ."
Write-Host "  git commit -m \`"Redesign: resume logos + oxblood/paper layout\`""
Write-Host "  git push origin main"
