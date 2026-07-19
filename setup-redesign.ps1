# ============================================================
#  Site redesign - ports your uploaded style across all pages.
#    powershell -ExecutionPolicy Bypass -File .\setup-redesign.ps1
#
#  Writes 10 files. Your resume content, logos, and the contact
#  form are preserved (restyled). Pure ASCII - no encoding issues.
#
#  NOTE: if your ContactForm already has your real Formspree ID,
#  this restores the placeholder - re-paste your endpoint after.
# ============================================================
if (-not (Test-Path ".\package.json")) {
  Write-Host "ERROR: Run from C:\Users\iamsi\my-portfolio" -ForegroundColor Red
  exit 1
}
New-Item -ItemType Directory -Force -Path ".\app\projects" | Out-Null
New-Item -ItemType Directory -Force -Path ".\app\about" | Out-Null
New-Item -ItemType Directory -Force -Path ".\app\resume" | Out-Null
New-Item -ItemType Directory -Force -Path ".\app\contact" | Out-Null

Write-Host "Writing app/globals.css ..." -ForegroundColor Cyan
$content = @'
@import "tailwindcss";

:root {
  --paper: #EFECE4;
  --ink: #20211E;
  --soft: #5B5C57;
  --oxblood: #7A2E2E;
  --oxblood-dark: #672626;
  --rule: #CBC6B8;
  --terminal: #17181A;
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
  font-family: var(--font-mono); font-size: 12px; letter-spacing: .20em;
  text-transform: uppercase; color: var(--oxblood);
}
.meta {
  font-family: var(--font-mono); font-size: 12px; letter-spacing: .14em;
  text-transform: uppercase; color: var(--soft);
}

/* scroll reveal */
.reveal { opacity: 0; transform: translateY(20px); transition: opacity .6s ease, transform .6s ease; }
.reveal.in { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .reveal { opacity: 1; transform: none; transition: none; }
  .timeline-fill::after { height: calc(100% - 12px) !important; }
}
'@
Set-Content -Path ".\app\globals.css" -Value $content -Encoding UTF8

Write-Host "Writing app/layout.tsx ..." -ForegroundColor Cyan
$content = @'
import type { Metadata } from "next";
import { Newsreader, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  variable: "--font-newsreader",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Siri Rama - GTM Strategy, Sales, Solutions",
  description:
    "Data to insight to options for decision-makers. #1 rep at Tipalti, scaled Delphic Research $500K to $1M ARR, former Government of Canada economist. Open to GTM Strategist, AE, and Solutions roles - SF / Bay Area / remote.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${newsreader.variable} ${jetbrains.variable}`}>
        <header className="sticky top-0 z-50 border-b border-rule bg-paper">
          <div className="mx-auto flex h-14 max-w-[1080px] items-center justify-between px-7">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[.14em] text-ink no-underline"
            >
              <span className="h-[7px] w-[7px] flex-none rounded-full bg-oxblood" aria-hidden="true" />
              Siri Rama
            </Link>
            <nav aria-label="Primary" className="flex gap-[26px]">
              {[
                ["Projects", "/projects"],
                ["Resume", "/resume"],
                ["About", "/about"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="font-mono text-[12px] uppercase tracking-[.08em] text-ink no-underline hover:text-oxblood"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="mt-[88px] bg-ink text-paper">
          <div className="mx-auto flex max-w-[1080px] flex-wrap justify-between gap-3.5 px-7 py-[26px]">
            <span className="font-mono text-[11px] uppercase tracking-[.14em] opacity-80">
              &copy; 2026 Siri Rama &middot; Toronto
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[.14em] opacity-80">
              iamsirir@gmail.com
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
'@
Set-Content -Path ".\app\layout.tsx" -Value $content -Encoding UTF8

Write-Host "Writing app/page.tsx ..." -ForegroundColor Cyan
$content = @'
import HomeClient from "./HomeClient";

export default function Home() {
  return <HomeClient />;
}
'@
Set-Content -Path ".\app\page.tsx" -Value $content -Encoding UTF8

Write-Host "Writing app/HomeClient.tsx ..." -ForegroundColor Cyan
$content = @'
"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

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
        { threshold: 0.15 }
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
      <section className="px-7 pt-[72px] pb-24">
        <div className="mx-auto max-w-[1080px]">
          <div className="mb-14 flex flex-wrap justify-between gap-4 border-b border-ink pb-3.5">
            <span className="font-mono text-[12px] uppercase tracking-[.14em] text-ink">
              Siri Rama
            </span>
            <span className="font-mono text-[12px] uppercase tracking-[.14em] text-ink">
              Toronto
            </span>
          </div>

          <h1 className="reveal mb-[22px] max-w-[16ch] font-serif text-[clamp(40px,6.5vw,76px)] font-semibold leading-[1.02] tracking-[-.02em]">
            An economist by training, a&nbsp;storyteller by nature.
          </h1>
          <p className="reveal mb-[34px] font-mono text-[13px] uppercase tracking-[.14em] text-soft">
            Data &rarr; insight &rarr; options for decision-makers
          </p>
          <p className="reveal max-w-[34ch] text-[clamp(21px,3vw,29px)] leading-[1.4]">
            I take data, find the insight, and give decision-makers clear
            options &mdash; the same method that has won budgets, elections, and
            quota.
          </p>
        </div>
      </section>

      {/* THE RECORD */}
      <section className="border-t border-rule px-7 py-[88px]">
        <div className="mx-auto max-w-[1080px]">
          <div className="reveal mb-14">
            <span className="eyebrow mb-3.5 block">// the_record</span>
            <h2 className="font-serif text-[clamp(30px,5vw,50px)] font-semibold leading-none">
              The work, most recent first.
            </h2>
          </div>

          <div
            ref={timelineRef}
            className="timeline-fill relative pl-10 before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-px before:bg-rule after:absolute after:left-0 after:top-1.5 after:w-px after:bg-oxblood after:[height:calc(var(--fill,0)*1%)] after:[max-height:calc(100%-12px)]"
          >
            {[
              {
                code: ["File_01", "2024 - Present"],
                h: "Tipalti",
                role: "Account Executive \u00b7 Fintech \u00b7 Remote",
                body: "Selling finance automation into buying committees that don't buy on charm - they buy on a business case. I build that case, then I win it. On the side, I built the team's internal GTM AI agents to compress research and prep time.",
                result: (
                  <>
                    <strong className="font-semibold">#1 rep company-wide.</strong>{" "}
                    Rep of the Quarter, Q2 2026.
                  </>
                ),
              },
              {
                code: ["File_02", "2022 - 2024"],
                h: "Delphic Research",
                role: "Gov-Tech Startup \u00b7 Growth & Revenue \u00b7 Toronto",
                body: "Early hire at a startup selling government intelligence to regulated buyers. Owned the revenue motion end to end - prospecting, demos, pricing conversations, renewals - for a product where the pitch is the analysis.",
                result: (
                  <strong className="font-semibold">
                    Helped scale ARR from $500K to $1M.
                  </strong>
                ),
              },
              {
                code: ["File_03", "2020 - 2022"],
                h: "Sussex Strategy Group",
                role: "Public Affairs \u00b7 Advocacy \u00b7 Toronto",
                body: "Advised clients navigating government - turning regulatory noise into a position, and a position into a campaign. Public affairs is enterprise sales with higher stakes and slower deal cycles; the discovery skills transfer one-to-one.",
                result: (
                  <strong className="font-semibold">
                    Built and ran advocacy campaigns for clients facing
                    regulatory decisions.
                  </strong>
                ),
              },
              {
                code: ["File_04", "2015 - 2020"],
                h: "Government of Canada",
                role: "Economist & Advisor \u00b7 Ottawa",
                body: "Modeled policy for the Federal Budget and briefed the people who signed off on it. Learned the discipline that runs through everything since: get the numbers right, then make the room care.",
                result: (
                  <>
                    <strong className="font-semibold">
                      Three federal election wins.
                    </strong>{" "}
                    Federal Budget economic modeling.
                  </>
                ),
              },
            ].map((e) => (
              <article key={e.h} className="reveal mb-[72px] last:mb-0">
                <div className="mb-3 flex flex-wrap gap-[18px] font-mono text-[12px] uppercase tracking-[.14em] text-soft">
                  <span>{e.code[0]}</span>
                  <span>{e.code[1]}</span>
                </div>
                <h3 className="mb-1.5 font-serif text-[25px] font-semibold leading-[1.2]">
                  {e.h}
                </h3>
                <p className="mb-4 font-mono text-[12px] uppercase tracking-[.14em] text-oxblood">
                  {e.role}
                </p>
                <p className="max-w-[62ch] text-ink">{e.body}</p>
                <p className="mt-[18px] max-w-[58ch] border-l-2 border-oxblood pl-4 text-[18px]">
                  {e.result}
                </p>
              </article>
            ))}
          </div>

          <p className="meta reveal mt-16 border-t border-rule pt-[22px]">
            MA Public Affairs &mdash; Queen&apos;s University &middot; BA
            Economics &amp; Politics &mdash; University of Toronto &middot;
            Technical stack: self-taught
          </p>

          <p className="reveal mt-14 max-w-[40ch] font-serif text-[clamp(20px,2.6vw,26px)] italic leading-[1.4]">
            &ldquo;Different rooms. Same method: find what the data actually
            says, then make people feel why it matters.&rdquo;
          </p>
        </div>
      </section>

      {/* HOW I WORK */}
      <section className="border-t border-rule px-7 py-[88px]">
        <div className="mx-auto max-w-[1080px]">
          <div className="reveal mb-14">
            <span className="eyebrow mb-3.5 block">// how_i_work</span>
            <h2 className="font-serif text-[clamp(30px,5vw,50px)] font-semibold leading-none">
              Three steps, every time.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-9 sm:grid-cols-3">
            {[
              ["01_Source", "Source", "Get the data, even when it's locked in a portal - I'll write something to free it."],
              ["02_Distill", "Distill", "Find the signal a busy decision-maker would otherwise miss."],
              ["03_Advise", "Advise", "Lay out the options and a clear recommendation the room can act on."],
            ].map(([label, h, p], i) => (
              <div
                key={label}
                className={`reveal border-t pt-[22px] ${i === 0 ? "border-oxblood" : "border-ink"}`}
              >
                <p className="mb-3.5 font-mono text-[12px] uppercase tracking-[.14em] text-soft">
                  {label}
                </p>
                <h3 className="mb-2.5 font-serif text-[24px] font-semibold">{h}</h3>
                <p className="text-[17px] text-soft">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT I BUILD */}
      <section className="border-t border-rule px-7 py-[88px]">
        <div className="mx-auto max-w-[1080px]">
          <div className="reveal mb-14">
            <span className="eyebrow mb-3.5 block">// what_i_build</span>
            <h2 className="font-serif text-[clamp(30px,5vw,50px)] font-semibold leading-none">
              The technical file.
            </h2>
          </div>

          <div className="reveal rounded-xl bg-terminal p-[44px_46px_48px] font-mono text-green-bright">
            <span className="mb-[26px] block text-[13px] tracking-[.08em] text-green-bright opacity-85">
              # 4 records &mdash; access restricted
            </span>
            <ul className="mb-[34px] list-none" aria-hidden="true">
              {[
                "executive-agent/     python \u00b7 llm \u00b7 agentic-workflow",
                "downloads-butler/    powershell \u00b7 ollama \u00b7 open-source",
                "atip-automation/     python \u00b7 automation \u00b7 wip",
                "toronto-open-data/   python \u00b7 data-viz",
              ].map((line) => (
                <li
                  key={line}
                  className="select-none whitespace-pre text-[14px] leading-[2.1] tracking-[.06em] text-[#8b8f93] blur-[4px]"
                >
                  {line}
                </li>
              ))}
            </ul>
            <Link
              href="/projects"
              className="inline-block rounded-md bg-green-bright px-[22px] py-[13px] font-mono text-[13px] tracking-[.08em] text-terminal no-underline hover:bg-[#84d0b6]"
            >
              $ open ./projects &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="border-t border-rule px-7 py-[88px]">
        <div className="mx-auto max-w-[1080px]">
          <div className="reveal mb-14">
            <span className="eyebrow block">// contact</span>
          </div>
          <p className="reveal mb-11 max-w-[22ch] font-serif text-[clamp(28px,4.6vw,44px)] font-semibold leading-[1.15]">
            Working on something at the intersection of{" "}
            <em className="not-italic text-oxblood">data</em> and{" "}
            <em className="not-italic text-oxblood">narrative</em>? Let&apos;s
            talk.
          </p>
          <div className="reveal flex flex-wrap gap-4">
            <a
              href="mailto:iamsirir@gmail.com"
              className="rounded border border-oxblood bg-oxblood px-[26px] py-3.5 font-mono text-[13px] uppercase tracking-[.08em] text-paper no-underline hover:bg-[#672626]"
            >
              Email
            </a>
            <a
              href="https://linkedin.com/in/sirirama"
              className="rounded border border-ink px-[26px] py-3.5 font-mono text-[13px] uppercase tracking-[.08em] text-ink no-underline hover:border-oxblood hover:text-oxblood"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/cmd-siri-bot"
              className="rounded border border-ink px-[26px] py-3.5 font-mono text-[13px] uppercase tracking-[.08em] text-ink no-underline hover:border-oxblood hover:text-oxblood"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
'@
Set-Content -Path ".\app\HomeClient.tsx" -Value $content -Encoding UTF8

Write-Host "Writing app/projects/page.tsx ..." -ForegroundColor Cyan
$content = @'
import type { Metadata } from "next";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects - Siri Rama",
  description:
    "Automation agents, ATIP tooling, and open-data analysis by Siri Rama.",
};

function LockIcon() {
  return (
    <svg
      width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true" className="inline-block"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default function Projects() {
  return (
    <div className="px-7">
      <section className="mx-auto max-w-[1080px] pt-[72px] pb-12">
        <span className="eyebrow mb-3.5 block">// the_technical_file</span>
        <h1 className="max-w-[18ch] font-serif text-[clamp(36px,6vw,64px)] font-semibold leading-[1.05] tracking-[-.02em]">
          The case files.
        </h1>
        <p className="mt-6 max-w-[60ch] text-[clamp(19px,2.4vw,23px)] leading-[1.45] text-soft">
          Tools I built to get from raw data to a story worth telling &mdash;
          agents, automation, and analysis. Each one shipped; each one taught me
          something the docs didn&apos;t.
        </p>
      </section>

      <section className="mx-auto max-w-[1080px] border-t border-rule">
        {projects.map((p) =>
          p.locked ? (
            <div
              key={p.slug}
              className="relative overflow-hidden border-b border-rule py-11"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, var(--color-ink) 0, var(--color-ink) 1px, transparent 1px, transparent 9px)",
                }}
              />
              <div className="relative grid gap-3 sm:grid-cols-[130px_1fr]">
                <span className="font-mono text-[12px] uppercase tracking-[.14em] text-soft">
                  {p.file}
                </span>
                <div>
                  <h2 className="flex items-center gap-2.5 font-serif text-[25px] font-semibold text-soft">
                    {p.title}
                    <LockIcon />
                  </h2>
                  <p className="mt-1 font-mono text-[12px] uppercase tracking-[.14em] text-oxblood">
                    {p.status ?? "Work in progress"}
                  </p>
                  <p className="mt-3.5 max-w-[62ch] text-soft">{p.summary}</p>
                  <p className="mt-3.5 max-w-[62ch]">
                    This one&apos;s still under construction.{" "}
                    <a
                      href="mailto:iamsirir@gmail.com?subject=ATIP%20Automation"
                      className="underline underline-offset-4"
                    >
                      Contact me
                    </a>{" "}
                    for more info.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div key={p.slug} className="border-b border-rule py-11">
              <div className="grid gap-3 sm:grid-cols-[130px_1fr]">
                <span className="font-mono text-[12px] uppercase tracking-[.14em] text-soft">
                  {p.file}
                </span>
                <div>
                  <h2 className="font-serif text-[25px] font-semibold leading-[1.2]">
                    {p.title}
                  </h2>
                  <p className="mt-1.5 font-mono text-[12px] uppercase tracking-[.14em] text-oxblood">
                    {p.meta}
                  </p>
                  <p className="mt-4 max-w-[62ch]">{p.detail ?? p.summary}</p>
                  {p.href && (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-block border-l-2 border-oxblood pl-4 font-mono text-[12px] uppercase tracking-[.14em]"
                    >
                      View source &rarr;
                    </a>
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </section>

      <section className="mx-auto max-w-[1080px] py-14">
        <p className="max-w-[60ch] text-soft">
          More experiments live on{" "}
          <a
            href="https://github.com/cmd-siri-bot"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            GitHub
          </a>
          , including the ones that didn&apos;t make the cut.
        </p>
      </section>
    </div>
  );
}
'@
Set-Content -Path ".\app\projects\page.tsx" -Value $content -Encoding UTF8

Write-Host "Writing app/about/page.tsx ..." -ForegroundColor Cyan
$content = @'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Siri Rama",
  description:
    "An economist by training and a storyteller by nature, working at the intersection of data and narrative.",
};

const narrativeSide = [
  "Data storytelling",
  "GTM & sales strategy",
  "Campaign & voter strategy",
  "Briefing notes & memos",
  "Stakeholder communication",
];

const analyticSide = [
  "Economic & statistical analysis",
  "Python",
  "PowerShell",
  "LLM & agentic workflows (Ollama)",
  "Open-data pipelines",
];

export default function About() {
  return (
    <div className="px-7">
      <section className="mx-auto max-w-[1080px] pt-[72px] pb-12">
        <span className="eyebrow mb-3.5 block">// about</span>
        <h1 className="max-w-[20ch] font-serif text-[clamp(34px,5.5vw,60px)] font-semibold leading-[1.06] tracking-[-.02em]">
          The numbers make the case. The story wins the room.
        </h1>
      </section>

      <section className="mx-auto max-w-[1080px] border-t border-rule py-12">
        <div className="max-w-[62ch] space-y-6 text-[19px] leading-[1.6]">
          <p>
            I&apos;m an economist by training and a storyteller by nature. Those
            usually pull in opposite directions &mdash; rigor versus persuasion
            &mdash; and most of my work is spent proving they don&apos;t have
            to.
          </p>
          <p>
            I&apos;ve used that combination on very different audiences: voters,
            where data becomes campaign strategy and a message that moves
            turnout; and buying committees, where the same discipline becomes a
            business case a room of skeptics will sign off on. Different stakes,
            identical method &mdash; find what the data actually says, then make
            people feel why it matters.
          </p>
          <p>
            The projects on this site are the engine room behind that. When the
            analysis got repetitive, I automated it; when the data was locked in
            a portal, I wrote something to free it. Everything on the technical
            side is self-taught &mdash; mostly by breaking things and reading the
            error messages carefully.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] border-t border-rule py-12">
        <span className="eyebrow mb-8 block">// toolkit</span>
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="mb-4 font-serif text-[24px] font-semibold">
              The storyteller
            </h3>
            <ul className="space-y-2.5">
              {narrativeSide.map((item) => (
                <li
                  key={item}
                  className="border-l-2 border-rule pl-4 text-soft"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-serif text-[24px] font-semibold">
              The economist
            </h3>
            <ul className="space-y-2.5">
              {analyticSide.map((item) => (
                <li
                  key={item}
                  className="border-l-2 border-rule pl-4 text-soft"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] border-t border-rule py-12">
        <p className="max-w-[60ch] text-soft">
          Off the clock: history and politics rabbit holes, strategy games, and
          the occasional side project that starts as a one-off script and
          refuses to stay small.
        </p>
      </section>
    </div>
  );
}
'@
Set-Content -Path ".\app\about\page.tsx" -Value $content -Encoding UTF8

Write-Host "Writing app/resume/page.tsx ..." -ForegroundColor Cyan
$content = @'
import type { Metadata } from "next";
import Logo from "./Logo";

export const metadata: Metadata = {
  title: "Resume - Siri Rama",
  description:
    "Economist and storyteller. Go-to-market at Tipalti; formerly Delphic, Sussex Strategy, and the Government of Canada.",
};

type Role = {
  company: string;
  logo: string;
  blurb?: string;
  title: string;
  location: string;
  dates: string;
  points: string[];
};

const experience: Role[] = [
  {
    company: "Tipalti",
    logo: "/logos/tipalti.png",
    blurb:
      "Tipalti is a global fintech platform automating accounts payable, payments, and compliance workflows.",
    title: "Go-To-Market",
    location: "Toronto, Canada",
    dates: "Nov 2025 - Present",
    points: [
      "Work in sales at a hyper-growth fintech company headquartered in the Bay Area, CA.",
      "Helped build, test, and iterate AI agents for Tipalti's GTM workflow to scale prospecting and qualification.",
      "#1 rep in qualified opportunities - exceeded quota every month while maintaining an excellent prospect experience. Q2'26 Rep of the Quarter.",
    ],
  },
  {
    company: "Delphic Research Group",
    logo: "/logos/delphic.png",
    blurb:
      "Delphic is a gov-tech start-up focused on competitive intelligence and decision-support for regulated industries.",
    title: "Growth and Operations",
    location: "Toronto, Canada",
    dates: "Jan 2025 - Nov 2025",
    points: [
      "Went from zero to one in a bootstrapped, fast-paced environment - I called it start-up bootcamp.",
      "Drove early revenue growth, helping scale from $500K to $1M ARR by expanding into new, heavily regulated verticals: health and life sciences, energy and critical minerals, and defence and aerospace.",
      "Operated cross-functionally across sales, operations, and product delivery with a small team of 5.",
    ],
  },
  {
    company: "Sussex Strategy Group",
    logo: "/logos/sussex.png",
    blurb:
      "Sussex is a premier public affairs firm, helping organizations navigate bureaucracy and influence public opinion.",
    title: "Public Affairs Analyst",
    location: "Toronto, Canada",
    dates: "Jan 2024 - Dec 2025",
    points: [
      "Lobbyist for some of the biggest, most influential organizations in Canada - the classic exit opportunity for most people leaving government.",
      "Supported engagement strategies for clients across the public, private, and non-profit sectors by mapping stakeholders, tracking legislation, and positioning clients for growth in Canada's key industries.",
    ],
  },
  {
    company: "Government of Canada",
    logo: "/logos/government-of-canada.png",
    title: "Economist and Advisor",
    location: "Ottawa, Canada",
    dates: "Jun 2022 - Dec 2024",
    points: [
      "Campaigned in and won three back-to-back federal elections.",
      "Advised on Federal Budget and Economic Statement planning cycles - developing first-hand insight into how public-sector and regulated buyers evaluate cost, risk, and outcomes.",
      "Built and maintained quantitative models to estimate the budgetary and economic impacts of federal policy proposals, applying regression analysis, scenario modeling, and sensitivity analysis.",
    ],
  },
];

const education = [
  {
    school: "Queen's University",
    degree: "Master of Arts (MA), Public Affairs",
    detail: "Specialization in Public Finance",
  },
  {
    school: "University of Toronto",
    degree: "Honours Bachelor of Arts (BA)",
    detail: "Economics and Politics (International Relations)",
  },
];

export default function Resume() {
  return (
    <div className="px-7">
      {/* Header */}
      <section className="mx-auto max-w-[1080px] pt-[72px] pb-10">
        <span className="eyebrow mb-3.5 block">// the_record</span>
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-ink pb-6">
          <div>
            <h1 className="font-serif text-[clamp(34px,5vw,56px)] font-semibold leading-none">
              Siri Rama
            </h1>
            <p className="mt-4 max-w-[46ch] text-[17px] italic leading-[1.5] text-soft">
              An economist by training and a storyteller by nature. I create
              compelling narratives backed by data that have won over voters in
              Canada and buying committees in regulated industries.
            </p>
          </div>
          <div className="font-mono text-[12px] uppercase tracking-[.1em] text-soft">
            <a href="mailto:iamsirir@gmail.com" className="block hover:text-oxblood">
              iamsirir@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/sirirama"
              target="_blank" rel="noreferrer"
              className="block hover:text-oxblood"
            >
              linkedin.com/in/sirirama
            </a>
            <span className="block">Toronto, Canada</span>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="mx-auto max-w-[1080px] py-8">
        <span className="eyebrow mb-10 block">// experience</span>
        <div className="space-y-[60px]">
          {experience.map((role) => (
            <div key={role.company} className="grid gap-5 sm:grid-cols-[64px_1fr]">
              <Logo src={role.logo} alt={`${role.company} logo`} />
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-serif text-[25px] font-semibold">
                    {role.company}
                  </h3>
                  <span className="font-mono text-[12px] uppercase tracking-[.14em] text-soft">
                    {role.dates}
                  </span>
                </div>
                {role.blurb && (
                  <p className="mt-1 max-w-[62ch] text-[15px] italic leading-[1.5] text-soft">
                    {role.blurb}
                  </p>
                )}
                <p className="mt-2 font-mono text-[12px] uppercase tracking-[.14em] text-oxblood">
                  {role.title} &middot; {role.location}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {role.points.map((pt, j) => (
                    <li key={j} className="max-w-[62ch] border-l-2 border-rule pl-4 leading-[1.55]">
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mx-auto max-w-[1080px] border-t border-rule py-10">
        <span className="eyebrow mb-10 block">// education</span>
        <div className="space-y-7">
          {education.map((ed) => (
            <div key={ed.school}>
              <h3 className="font-serif text-[24px] font-semibold">{ed.school}</h3>
              <p className="mt-1">{ed.degree}</p>
              <p className="text-soft">{ed.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Download */}
      <section className="mx-auto max-w-[1080px] border-t border-rule py-10">
        <p className="max-w-[60ch] text-soft">
          Prefer a PDF?{" "}
          <a
            href="mailto:iamsirir@gmail.com?subject=Resume%20request"
            className="underline underline-offset-4"
          >
            Email me
          </a>{" "}
          and I&apos;ll send the latest version.
        </p>
      </section>
    </div>
  );
}
'@
Set-Content -Path ".\app\resume\page.tsx" -Value $content -Encoding UTF8

Write-Host "Writing app/resume/Logo.tsx ..." -ForegroundColor Cyan
$content = @'
"use client";

export default function Logo({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md border border-rule bg-paper">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-contain p-1.5"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
        }}
      />
    </div>
  );
}
'@
Set-Content -Path ".\app\resume\Logo.tsx" -Value $content -Encoding UTF8

Write-Host "Writing app/contact/page.tsx ..." -ForegroundColor Cyan
$content = @'
import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact - Siri Rama",
  description: "Get in touch with Siri Rama - by email or the contact form.",
};

export default function Contact() {
  return (
    <div className="px-7">
      <section className="mx-auto max-w-[1080px] pt-[72px] pb-10">
        <span className="eyebrow mb-3.5 block">// contact</span>
        <h1 className="max-w-[16ch] font-serif text-[clamp(36px,6vw,64px)] font-semibold leading-[1.05] tracking-[-.02em]">
          Let&apos;s talk.
        </h1>
        <p className="mt-6 max-w-[52ch] text-[clamp(19px,2.4vw,23px)] leading-[1.45] text-soft">
          Campaigns, civic tech, GTM, or a data story that needs telling &mdash;
          if it&apos;s in that world, I want to hear about it.
        </p>
      </section>

      <section className="mx-auto max-w-[1080px] border-t border-rule py-10">
        <div className="grid gap-3 sm:grid-cols-[150px_1fr]">
          <span className="font-mono text-[12px] uppercase tracking-[.14em] text-oxblood">
            Email
          </span>
          <a
            href="mailto:iamsirir@gmail.com"
            className="font-serif text-[25px] font-semibold underline underline-offset-4"
          >
            iamsirir@gmail.com
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] border-t border-rule py-10">
        <div className="grid gap-8 sm:grid-cols-[150px_1fr]">
          <span className="font-mono text-[12px] uppercase tracking-[.14em] text-oxblood">
            Or write here
          </span>
          <div className="max-w-[36rem]">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
'@
Set-Content -Path ".\app\contact\page.tsx" -Value $content -Encoding UTF8

Write-Host "Writing app/contact/ContactForm.tsx ..." -ForegroundColor Cyan
$content = @'
"use client";

import { useState } from "react";

// TODO: paste your Formspree endpoint here (https://formspree.io/f/xxxx)
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

type Status = "idle" | "submitting" | "success" | "error";

const inputCls =
  "mt-2 w-full border border-rule bg-transparent px-3.5 py-2.5 text-[16px] text-ink focus:border-oxblood focus:outline-none";
const labelCls =
  "block font-mono text-[12px] uppercase tracking-[.14em] text-soft";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border-l-2 border-oxblood pl-5">
        <p className="font-serif text-[25px] font-semibold">Message sent.</p>
        <p className="mt-2 text-soft">
          Thanks for reaching out &mdash; I&apos;ll get back to you soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 font-mono text-[12px] uppercase tracking-[.14em] underline underline-offset-4"
        >
          Send another &rarr;
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className={labelCls}>Name</label>
        <input id="name" name="name" type="text" required className={inputCls} />
      </div>
      <div>
        <label htmlFor="email" className={labelCls}>Email</label>
        <input id="email" name="email" type="email" required className={inputCls} />
      </div>
      <div>
        <label htmlFor="message" className={labelCls}>Message</label>
        <textarea id="message" name="message" required rows={6} className={`${inputCls} resize-y`} />
      </div>

      {status === "error" && (
        <p className="font-mono text-[13px] text-oxblood">
          Something went wrong. Please email me directly at{" "}
          <a href="mailto:iamsirir@gmail.com" className="underline underline-offset-4">
            iamsirir@gmail.com
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded border border-oxblood bg-oxblood px-[26px] py-3 font-mono text-[13px] uppercase tracking-[.08em] text-paper transition hover:bg-[#672626] disabled:opacity-50"
      >
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
'@
Set-Content -Path ".\app\contact\ContactForm.tsx" -Value $content -Encoding UTF8

Write-Host ""
Write-Host "Redesign installed across all pages." -ForegroundColor Green
Write-Host ""
Write-Host "STILL TO DO BY HAND:" -ForegroundColor Yellow
Write-Host "  1. Replace favicons: delete app\favicon.ico, then drop the new" -ForegroundColor Yellow
Write-Host "     icon.svg, favicon.ico, apple-icon.png into app\ (see chat)." -ForegroundColor Yellow
Write-Host "  2. Re-paste your Formspree ID in app\contact\ContactForm.tsx." -ForegroundColor Yellow
Write-Host ""
Write-Host "Then: git add . ; git commit -m 'Redesign site' ; git push" -ForegroundColor Green
