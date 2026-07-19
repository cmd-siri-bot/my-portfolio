
# ============================================================
# SiriRama.info — wodniack.dev Redesign Script
# ============================================================
# Completely redesigns the site to match the aesthetic of
# https://wodniack.dev/ — dark, minimal, large typography,
# binary accents, generous spacing.
# ============================================================

param(
    [string]$ProjectPath = "."
)

$ErrorActionPreference = "Stop"

$Files = @{
    HomeClient = Join-Path $ProjectPath "app/HomeClient.tsx"
    Globals    = Join-Path $ProjectPath "app/globals.css"
    Layout     = Join-Path $ProjectPath "app/layout.tsx"
}

# Verify files exist
$missing = $Files.GetEnumerator() | Where-Object { -not (Test-Path $_.Value) }
if ($missing) {
    Write-Host "ERROR: Missing files:" -ForegroundColor Red
    $missing | ForEach-Object { Write-Host "  - $($_.Value)" -ForegroundColor Red }
    Write-Host "Make sure you run this script from your project root." -ForegroundColor Red
    exit 1
}

Write-Host "Targeting project: $ProjectPath" -ForegroundColor Cyan

# -----------------------------------------------------------
# 1. Backup original files
# -----------------------------------------------------------
$Files.Values | ForEach-Object {
    $bak = "$_.bak"
    Copy-Item -Path $_ -Destination $bak -Force
    Write-Host "Backed up: $(Split-Path $_ -Leaf) -> .bak" -ForegroundColor DarkGray
}

# -----------------------------------------------------------
# 2. Write new globals.css (dark theme)
# -----------------------------------------------------------
$globalsCss = @'
@import "tailwindcss";

:root {
  --paper: #0a0a0a;
  --ink: #f5f5f0;
  --soft: #888880;
  --oxblood: #c9a96e;
  --oxblood-dark: #a88b52;
  --rule: #222220;
  --terminal: #0f0f0f;
  --green: #2E6A57;
  --green-bright: #6FC0A5;
}

@theme inline {
  --color-paper: var(--paper);
  --color-ink: var(--ink);
  --color-soft: var(--soft);
  --color-oxblood: var(--oxblood);
  --color-rule: var(--rule);
  --color-terminal: var(--terminal);
  --color-green: var(--green);
  --color-green-bright: var(--green-bright);
  --font-serif: var(--font-newsreader);
  --font-mono: var(--font-jetbrains);
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-serif);
  font-size: 18px;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
}
a { color: var(--oxblood); }
a:focus-visible, button:focus-visible { outline: 2px solid var(--oxblood); outline-offset: 3px; }
::selection { background: var(--oxblood); color: var(--paper); }

/* mono utilities */
.eyebrow {
  font-family: var(--font-mono); font-size: 11px; letter-spacing: .20em;
  text-transform: uppercase; color: var(--soft);
}
.meta {
  font-family: var(--font-mono); font-size: 11px; letter-spacing: .14em;
  text-transform: uppercase; color: var(--soft);
}

/* scroll reveal */
.reveal { opacity: 0; transform: translateY(30px); transition: opacity .8s ease, transform .8s ease; }
.reveal.in { opacity: 1; transform: none; }

/* binary rain */
@keyframes binary-fade {
  0%, 100% { opacity: 0.03; }
  50% { opacity: 0.08; }
}
.binary-char {
  animation: binary-fade 4s ease-in-out infinite;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--ink);
  user-select: none;
}

/* large work text */
.work-mega {
  font-family: var(--font-serif);
  font-size: clamp(60px, 14vw, 180px);
  font-weight: 600;
  line-height: 0.9;
  letter-spacing: -0.03em;
  color: var(--ink);
  text-transform: uppercase;
}

/* tagline stack */
.tagline-stack {
  font-family: var(--font-serif);
  font-size: clamp(32px, 6vw, 72px);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.02em;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .reveal { opacity: 1; transform: none; transition: none; }
  .binary-char { animation: none; opacity: 0.04; }
}

'@
Set-Content -Path $Files.Globals -Value $globalsCss -Encoding UTF8 -NoNewline
Write-Host "Updated globals.css (dark theme)" -ForegroundColor Green

# -----------------------------------------------------------
# 3. Write new HomeClient.tsx
# -----------------------------------------------------------
$homeClient = @'
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const WRAP = "mx-auto w-full max-w-[900px] px-6";

function BinaryField({ count = 80 }: { count?: number }) {
  const bits = useRef<string[]>([]);
  if (bits.current.length === 0) {
    bits.current = Array.from({ length: count }, () =>
      Math.random() > 0.5 ? "1" : "0"
    );
  }
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.04]">
      <div className="flex flex-wrap gap-x-3 gap-y-1 p-8">
        {bits.current.map((b, i) => (
          <span
            key={i}
            className="binary-char font-mono text-[13px]"
            style={{ animationDelay: `${Math.random() * 4}s` }}
          >
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HomeClient() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = document.querySelectorAll(".reveal");

    if (reduced || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      reveals.forEach((el) => io.observe(el));
    }

    const tl = timelineRef.current;
    if (tl && !reduced) {
      const onScroll = () => {
        const r = tl.getBoundingClientRect();
        const vh = window.innerHeight;
        let progress = (vh - r.top) / (r.height + vh * 0.4);
        progress = Math.max(0, Math.min(1, progress));
        tl.style.setProperty("--fill", (progress * 100).toFixed(1));
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    } else if (tl) {
      tl.style.setProperty("--fill", "100");
    }
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[100dvh] flex-col justify-center px-6 py-28 sm:py-36">
        <BinaryField count={120} />
        <div className={`${WRAP} relative z-10`}>
          <div className="reveal mb-16 flex flex-wrap justify-between gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[.20em] text-soft">
              Siri Rama
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[.20em] text-soft">
              Toronto
            </span>
          </div>

          <h1 className="reveal max-w-[14ch] font-serif text-[clamp(48px,10vw,120px)] font-semibold leading-[0.95] tracking-[-.03em]">
            Economist.
            <br />
            Storyteller.
          </h1>

          <p className="reveal mt-12 max-w-[42ch] text-[clamp(18px,2vw,22px)] leading-[1.6] text-soft">
            I take data, find the insight, and give decision-makers clear
            options — the same method that has won budgets, elections, and
            quota.
          </p>

          <div className="reveal mt-16 flex flex-wrap items-center gap-8">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 font-mono text-[13px] uppercase tracking-[.14em] text-ink no-underline transition-colors hover:text-oxblood"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-rule transition-colors group-hover:border-oxblood">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
              Start a conversation
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="border-t border-rule px-6 py-28 sm:py-36">
        <div className={WRAP}>
          <div className="reveal mb-16">
            <span className="eyebrow mb-6 block">About</span>
            <h2 className="max-w-[28ch] font-serif text-[clamp(28px,4.5vw,52px)] font-semibold leading-[1.1] tracking-[-.02em]">
              An economist by training, a storyteller by nature.
            </h2>
          </div>
          <div className="reveal grid grid-cols-1 gap-12 lg:grid-cols-2">
            <p className="text-[17px] leading-[1.7] text-soft">
              I collaborate with teams to turn raw data into decisions that
              stick. Whether it&apos;s selling into a buying committee, modeling
              policy for the federal budget, or building AI agents that compress
              research time — the method is the same.
            </p>
            <p className="text-[17px] leading-[1.7] text-soft">
              Get the numbers right. Find the signal a busy decision-maker would
              otherwise miss. Then make the room care. Different rooms. Same
              method.
            </p>
          </div>
        </div>
      </section>

      {/* WORK MEGA */}
      <section className="relative overflow-hidden border-t border-rule px-6 py-20 sm:py-28">
        <div className={WRAP}>
          <div className="reveal">
            <p className="work-mega mb-4">W</p>
            <p className="work-mega mb-4">O</p>
            <p className="work-mega mb-4">R</p>
            <p className="work-mega">K</p>
          </div>
        </div>
      </section>

      {/* THE RECORD */}
      <section id="work" className="border-t border-rule px-6 py-28 sm:py-36">
        <div className={WRAP}>
          <div className="reveal mb-20">
            <span className="eyebrow mb-6 block">The Record</span>
            <p className="max-w-[36ch] text-[17px] leading-[1.7] text-soft">
              Most recent first. Four files. One method.
            </p>
          </div>

          <div
            ref={timelineRef}
            className="timeline-fill relative pl-10 before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-px before:bg-rule after:absolute after:left-0 after:top-1.5 after:w-px after:bg-oxblood after:[height:calc(var(--fill,0)*1%)] after:[max-height:calc(100%-12px)]"
          >
            {[
              {
                code: "File_01",
                date: "2024 — Present",
                h: "Tipalti",
                role: "Account Executive · Fintech · Remote",
                body: "Selling finance automation into buying committees that don't buy on charm — they buy on a business case. I build that case, then I win it. On the side, I built the team's internal GTM AI agents to compress research and prep time.",
                result: "#1 rep company-wide. Rep of the Quarter, Q2 2026.",
              },
              {
                code: "File_02",
                date: "2022 — 2024",
                h: "Delphic Research",
                role: "Gov-Tech Startup · Growth & Revenue · Toronto",
                body: "Early hire at a startup selling government intelligence to regulated buyers. Owned the revenue motion end to end — prospecting, demos, pricing conversations, renewals — for a product where the pitch is the analysis.",
                result: "Helped scale ARR from $500K to $1M.",
              },
              {
                code: "File_03",
                date: "2020 — 2022",
                h: "Sussex Strategy Group",
                role: "Public Affairs · Advocacy · Toronto",
                body: "Advised clients navigating government — turning regulatory noise into a position, and a position into a campaign. Public affairs is enterprise sales with higher stakes and slower deal cycles; the discovery skills transfer one-to-one.",
                result: "Built and ran advocacy campaigns for clients facing regulatory decisions.",
              },
              {
                code: "File_04",
                date: "2015 — 2020",
                h: "Government of Canada",
                role: "Economist & Advisor · Ottawa",
                body: "Modeled policy for the Federal Budget and briefed the people who signed off on it. Learned the discipline that runs through everything since: get the numbers right, then make the room care.",
                result: "Three federal election wins. Federal Budget economic modeling.",
              },
            ].map((e) => (
              <article key={e.h} className="reveal mb-16 last:mb-0">
                <div className="mb-4 flex flex-wrap items-baseline gap-x-6 gap-y-1">
                  <span className="font-mono text-[11px] uppercase tracking-[.20em] text-oxblood">
                    {e.code}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[.14em] text-soft">
                    {e.date}
                  </span>
                </div>
                <h3 className="mb-2 font-serif text-[clamp(24px,3vw,36px)] font-semibold leading-[1.15] tracking-[-.02em]">
                  {e.h}
                </h3>
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[.14em] text-soft">
                  {e.role}
                </p>
                <p className="max-w-[56ch] text-[17px] leading-[1.7] text-soft">
                  {e.body}
                </p>
                <p className="mt-6 max-w-[48ch] border-l border-oxblood pl-4 text-[16px] leading-[1.6]">
                  {e.result}
                </p>
              </article>
            ))}
          </div>

          <p className="meta reveal mt-24 border-t border-rule pt-8">
            MA Public Affairs — Queen&apos;s University · BA Economics &amp;
            Politics — University of Toronto · Technical stack: self-taught
          </p>
        </div>
      </section>

      {/* METHOD */}
      <section id="method" className="border-t border-rule px-6 py-28 sm:py-36">
        <div className={WRAP}>
          <div className="reveal mb-20">
            <span className="eyebrow mb-6 block">Method</span>
            <h2 className="max-w-[20ch] font-serif text-[clamp(28px,4.5vw,52px)] font-semibold leading-[1.1] tracking-[-.02em]">
              Three steps, every time.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-px bg-rule sm:grid-cols-3">
            {[
              ["01", "Source", "Get the data, even when it's locked in a portal — I'll write something to free it."],
              ["02", "Distill", "Find the signal a busy decision-maker would otherwise miss."],
              ["03", "Advise", "Lay out the options and a clear recommendation the room can act on."],
            ].map(([num, h, p]) => (
              <div
                key={num}
                className="reveal bg-paper p-8 sm:p-10 transition-colors duration-300 hover:bg-[#0f0f0f]"
              >
                <span className="mb-6 block font-mono text-[11px] uppercase tracking-[.20em] text-oxblood">
                  {num}
                </span>
                <h3 className="mb-4 font-serif text-[24px] font-semibold leading-[1.2] tracking-[-.01em]">
                  {h}
                </h3>
                <p className="text-[16px] leading-[1.7] text-soft">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TAGLINE STACK */}
      <section className="relative overflow-hidden border-t border-rule px-6 py-28 sm:py-36">
        <BinaryField count={60} />
        <div className={`${WRAP} relative z-10`}>
          <div className="reveal">
            <p className="tagline-stack">Data</p>
            <p className="tagline-stack">my way</p>
            <p className="tagline-stack">since</p>
            <p className="tagline-stack text-oxblood">2015</p>
          </div>
        </div>
      </section>

      {/* WHAT I BUILD */}
      <section className="border-t border-rule px-6 py-28 sm:py-36">
        <div className={WRAP}>
          <div className="reveal mb-16">
            <span className="eyebrow mb-6 block">What I Build</span>
            <h2 className="max-w-[24ch] font-serif text-[clamp(28px,4.5vw,52px)] font-semibold leading-[1.1] tracking-[-.02em]">
              The technical file.
            </h2>
          </div>

          <div className="reveal rounded-sm bg-terminal p-10 sm:p-12 font-mono text-green-bright">
            <span className="mb-6 block text-[12px] tracking-[.08em] text-green-bright opacity-70">
              # 4 records — access restricted
            </span>
            <ul className="mb-8 list-none" aria-hidden="true">
              {[
                "executive-agent/     python · llm · agentic-workflow",
                "downloads-butler/    powershell · ollama · open-source",
                "atip-automation/     python · automation · wip",
                "toronto-open-data/   python · data-viz",
              ].map((line) => (
                <li
                  key={line}
                  className="select-none whitespace-pre text-[13px] leading-[2.2] tracking-[.06em] text-[#555] blur-[3px]"
                >
                  {line}
                </li>
              ))}
            </ul>
            <Link
              href="/projects"
              className="inline-block rounded-sm bg-green-bright px-6 py-3 font-mono text-[12px] tracking-[.08em] text-terminal no-underline transition-colors hover:bg-[#84d0b6]"
            >
              $ open ./projects &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-rule px-6 py-28 sm:py-36">
        <div className={WRAP}>
          <div className="reveal mb-16">
            <span className="eyebrow mb-6 block">Contact</span>
            <h2 className="max-w-[18ch] font-serif text-[clamp(32px,5vw,60px)] font-semibold leading-[1.05] tracking-[-.02em]">
              Let&apos;s build something together.
            </h2>
          </div>

          <div className="reveal mb-16 max-w-[46ch]">
            <p className="text-[17px] leading-[1.7] text-soft">
              Working on something at the intersection of data and narrative?
              I help teams turn complexity into decisions that stick.
            </p>
          </div>

          <div className="reveal flex flex-wrap items-center gap-6">
            <a
              href="mailto:iamsirir@gmail.com"
              className="inline-flex items-center gap-3 rounded-full border border-rule px-8 py-4 font-mono text-[12px] uppercase tracking-[.14em] text-ink no-underline transition-all hover:border-oxblood hover:text-oxblood"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Email
            </a>
            <a
              href="https://linkedin.com/in/sirirama"
              className="inline-flex items-center gap-3 rounded-full border border-rule px-8 py-4 font-mono text-[12px] uppercase tracking-[.14em] text-ink no-underline transition-all hover:border-oxblood hover:text-oxblood"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/cmd-siri-bot"
              className="inline-flex items-center gap-3 rounded-full border border-rule px-8 py-4 font-mono text-[12px] uppercase tracking-[.14em] text-ink no-underline transition-all hover:border-oxblood hover:text-oxblood"
            >
              GitHub
            </a>
          </div>

          <p className="reveal mt-16">
            <a
              href="mailto:iamsirir@gmail.com"
              className="font-mono text-[11px] uppercase tracking-[.20em] text-soft no-underline transition-colors hover:text-oxblood"
            >
              iamsirir@gmail.com
            </a>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-rule px-6 py-12">
        <div className={WRAP}>
          <div className="flex flex-wrap justify-between gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[.14em] text-soft">
              &copy; 2026 Siri Rama
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[.14em] text-soft">
              Toronto
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}

'@
Set-Content -Path $Files.HomeClient -Value $homeClient -Encoding UTF8 -NoNewline
Write-Host "Updated HomeClient.tsx (wodniack.dev layout)" -ForegroundColor Green

# -----------------------------------------------------------
# 4. Write new layout.tsx
# -----------------------------------------------------------
$layout = @'
import type { Metadata } from "next";
import { Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Siri Rama — Economist & Storyteller",
  description:
    "I take data, find the insight, and give decision-makers clear options.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${jetbrains.variable}`}>
      <body className="bg-paper text-ink antialiased">{children}</body>
    </html>
  );
}

'@
Set-Content -Path $Files.Layout -Value $layout -Encoding UTF8 -NoNewline
Write-Host "Updated layout.tsx (dark mode meta)" -ForegroundColor Green

# -----------------------------------------------------------
# 5. Done
# -----------------------------------------------------------
Write-Host "`n✅ Redesign complete!" -ForegroundColor Green
Write-Host "`nAesthetic changes:"
Write-Host "   • Dark background (#0a0a0a) with warm white text"
Write-Host "   • Gold accent (#c9a96e) replacing oxblood"
Write-Host "   • Binary decorative field in hero & tagline sections"
Write-Host "   • Massive 'W-O-R-K' stacked typography"
Write-Host "   • 'Data my way since 2015' tagline stack"
Write-Host "   • Clean timeline with animated fill line"
Write-Host "   • Method grid with hover states"
Write-Host "   • Minimal pill buttons for contact"
Write-Host "   • Generous spacing throughout"
Write-Host "`nContent preserved:"
Write-Host "   • All 4 work entries with achievements"
Write-Host "   • Source / Distill / Advise method"
Write-Host "   • Technical file / projects section"
Write-Host "   • Contact links (Email, LinkedIn, GitHub)"
Write-Host "`nNext step: run 'npm run dev' to preview." -ForegroundColor Cyan
