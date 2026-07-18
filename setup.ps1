# ============================================================
#  Portfolio setup (ENCODING-FIXED) - writes all pages as pure ASCII
#
#  HOW TO RUN:
#    1. Save this file into  C:\Users\iamsi\my-portfolio
#    2. In that folder run:
#         powershell -ExecutionPolicy Bypass -File .\setup.ps1
#
#  NOTE: this overwrites the 6 core files. If you've edited your resume
#  or project text, copy those edits somewhere first - this restores the
#  draft versions (with the encoding fix applied).
# ============================================================

if (-not (Test-Path ".\package.json")) {
  Write-Host "ERROR: Run from your project root: C:\Users\iamsi\my-portfolio" -ForegroundColor Red
  exit 1
}
New-Item -ItemType Directory -Force -Path ".\lib" | Out-Null
New-Item -ItemType Directory -Force -Path ".\app\projects" | Out-Null
New-Item -ItemType Directory -Force -Path ".\app\about" | Out-Null
New-Item -ItemType Directory -Force -Path ".\app\resume" | Out-Null

Write-Host "Writing lib/projects.ts ..." -ForegroundColor Cyan
$content = @'
export type Project = {
  slug: string;
  file: string;
  title: string;
  meta: string;
  summary: string;
  detail?: string;
  href?: string;
  featured: boolean;
  locked?: boolean;
  status?: string;
};

export const projects: Project[] = [
  {
    slug: "executive-agent",
    file: "FILE 01",
    title: "Executive Agent",
    meta: "Python - LLM - Agentic workflow - 2026",
    summary:
      "A personal AI chief-of-staff that turns a day's worth of scattered inputs into a prioritized plan.",
    detail:
      "An agentic assistant that reads across the messy inputs of a working day - email, calendar, notes, documents - and produces a single prioritized brief: what needs a decision, what can wait, and what to say. Built around a plan-and-review loop so the agent proposes, and a human approves, before anything leaves the room.",
    href: "https://github.com/cmd-siri-bot",
    featured: true,
  },
  {
    slug: "downloads-butler",
    file: "FILE 02",
    title: "Downloads Butler",
    meta: "PowerShell - Ollama - Open source - 2026",
    summary:
      "A human-in-the-loop AI agent that keeps a Downloads folder clean - nothing moves without sign-off.",
    detail:
      "A five-stage pipeline - scan, analyze, report, approve, execute - that inventories files with SHA-256 hashing, flags duplicates and stale installers with a deterministic rules engine plus an optional local-LLM pass, then presents an HTML approval page. Approved actions run through a quarantine system with a full restore path, so no file is ever destructively deleted. Built and adversarially tested against path-traversal and protected-file edge cases.",
    href: "https://github.com/cmd-siri-bot",
    featured: true,
  },
  {
    slug: "atip-automation",
    file: "FILE 03",
    title: "ATIP Automation",
    meta: "Python - Automation - 2026",
    summary:
      "Tooling that takes the grind out of Access to Information requests - drafting, filing, and tracking.",
    featured: true,
    locked: true,
    status: "Work in progress",
  },
  {
    slug: "toronto-open-data",
    file: "FILE 04",
    title: "City of Toronto Open Data",
    meta: "Python - Data viz - Civic tech - 2026",
    summary:
      "Pulling Toronto's open data into analyses and visuals that make a point instead of just a chart.",
    detail:
      "The City of Toronto publishes hundreds of open datasets; most sit unread. This project pulls from that portal and turns raw civic data into narratives with a thesis - mapping, comparing, and contextualizing the numbers to answer questions residents and decision-makers actually ask. The data-storytelling half of the resume, applied to the city I live in.",
    href: "https://github.com/cmd-siri-bot",
    featured: true,
  },
];
'@
Set-Content -Path ".\lib\projects.ts" -Value $content -Encoding UTF8

Write-Host "Writing app/layout.tsx ..." -ForegroundColor Cyan
$content = @'
import type { Metadata } from "next";
import { Libre_Caslon_Text, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const caslon = Libre_Caslon_Text({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-caslon",
});

const plexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-plex-sans",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "Siri Rama &mdash; Economist by training, storyteller by nature",
  description:
    "I build compelling narratives backed by data &mdash; and the automation tools behind them. AI agents, ATIP automation, and open-data analysis, from Toronto.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${caslon.variable} ${plexSans.variable} ${plexMono.variable} font-sans antialiased`}
      >
        <header className="sticky top-0 z-10 border-b border-line bg-paper/90 backdrop-blur-sm">
          <nav className="mx-auto flex max-w-3xl items-baseline justify-between px-5 py-4 font-mono text-[13px] tracking-wide">
            <Link href="/" className="font-medium uppercase">
              Siri&nbsp;Rama
            </Link>
            <div className="flex gap-5 text-ink-muted sm:gap-6">
              <Link href="/projects" className="hover:text-ink">
                Projects
              </Link>
              <Link href="/resume" className="hover:text-ink">
                Resume
              </Link>
              <Link href="/about" className="hover:text-ink">
                About
              </Link>
              <Link href="/contact" className="hover:text-ink">
                Contact
              </Link>
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-3xl px-5">{children}</main>

        <footer className="mt-24 border-t border-line">
          <div className="mx-auto flex max-w-3xl flex-wrap items-baseline justify-between gap-3 px-5 py-8 font-mono text-[12px] text-ink-muted">
            <span>&copy; 2026 Siri Rama &middot; Toronto</span>
            <div className="flex gap-5">
              <a
                href="https://github.com/cmd-siri-bot"
                className="hover:text-ink"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/sirirama"
                className="hover:text-ink"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
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
import Link from "next/link";
import { projects } from "@/lib/projects";

export default function Home() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="pt-20 pb-16 sm:pt-28">
        <p className="font-mono text-[13px] uppercase tracking-widest text-ink-muted">
          Toronto, Canada
        </p>
        <h1 className="mt-6 font-serif text-4xl leading-[1.15] sm:text-5xl">
          An economist by training,{" "}
          <span className="hl">a storyteller by nature.</span>
        </h1>
        <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-ink-muted">
          I&apos;m Siri Rama. I create compelling narratives backed by data &mdash;
          the kind that have won over voters and buying committees alike. The
          projects below are the other half of that craft: the automation and
          analysis tools I build to get from raw data to a story worth telling.
        </p>
      </section>

      {/* Selected work */}
      <section className="border-t border-line py-10">
        <div className="flex items-baseline justify-between">
          <h2 className="font-mono text-[13px] uppercase tracking-widest text-ink-muted">
            Selected work
          </h2>
          <Link
            href="/projects"
            className="font-mono text-[13px] text-ink-muted hover:text-ink"
          >
            All projects &rarr;
          </Link>
        </div>

        <ul className="mt-6">
          {featured.map((p) => (
            <li key={p.slug} className="border-t border-line first:border-t-0">
              <Link
                href={p.locked ? "/projects" : p.href ?? "/projects"}
                className="group grid gap-2 py-7 sm:grid-cols-[120px_1fr]"
              >
                <span className="font-mono text-[13px] text-ink-muted">
                  {p.file}
                </span>
                <div>
                  <h3 className="font-serif text-2xl">
                    <span className="hl-sweep">{p.title}</span>
                    {p.locked && (
                      <span className="ml-2 align-middle font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                        &middot; In progress
                      </span>
                    )}
                  </h3>
                  <p className="mt-2 max-w-xl leading-relaxed text-ink-muted">
                    {p.summary}
                  </p>
                  <p className="mt-3 font-mono text-[12px] tracking-wide text-ink-muted">
                    {p.meta}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Contact */}
      <section className="border-t border-line py-14">
        <h2 className="font-serif text-2xl">
          Working on something at the intersection of{" "}
          <span className="hl">data and narrative</span>?
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-ink-muted">
          I&apos;m always interested in campaigns, civic tech, and automation
          problems. The fastest way to reach me:
        </p>
        <div className="mt-6 flex flex-wrap gap-6 font-mono text-[14px]">
          <a href="mailto:iamsirir@gmail.com" className="underline underline-offset-4 hover:bg-mark">
            Email
          </a>
          <a
            href="https://linkedin.com/in/sirirama"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:bg-mark"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/cmd-siri-bot"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:bg-mark"
          >
            GitHub
          </a>
        </div>
      </section>
    </>
  );
}
'@
Set-Content -Path ".\app\page.tsx" -Value $content -Encoding UTF8

Write-Host "Writing app/projects/page.tsx ..." -ForegroundColor Cyan
$content = @'
import type { Metadata } from "next";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects &mdash; Siri Rama",
  description:
    "Automation agents, ATIP tooling, and open-data analysis by Siri Rama.",
};

function LockIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="inline-block"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default function Projects() {
  return (
    <>
      <section className="pt-20 pb-12 sm:pt-24">
        <h1 className="font-serif text-4xl leading-tight">
          The <span className="hl">case files</span>.
        </h1>
        <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-muted">
          Tools I built to get from raw data to a story worth telling &mdash; agents,
          automation, and analysis. Each one shipped; each one taught me
          something the docs didn&apos;t. Live demos hang off subdomains of this
          site as they go up.
        </p>
      </section>

      <section>
        <ul>
          {projects.map((p) =>
            p.locked ? (
              // Locked / work-in-progress card: shaded, with a lock badge
              <li
                key={p.slug}
                className="relative overflow-hidden border-t border-line bg-ink/[0.035] py-10"
              >
                {/* diagonal-hatch shading */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, var(--color-ink) 0, var(--color-ink) 1px, transparent 1px, transparent 9px)",
                  }}
                />
                <div className="relative grid gap-3 px-5 sm:grid-cols-[120px_1fr]">
                  <span className="font-mono text-[13px] text-ink-muted">
                    {p.file}
                  </span>
                  <div>
                    <h2 className="flex items-center gap-2 font-serif text-2xl text-ink-muted">
                      {p.title}
                      <span className="text-ink-muted">
                        <LockIcon />
                      </span>
                    </h2>
                    <p className="mt-1 font-mono text-[12px] uppercase tracking-widest text-ink-muted">
                      {p.status ?? "Work in progress"}
                    </p>
                    <p className="mt-4 max-w-xl leading-relaxed text-ink-muted">
                      {p.summary}
                    </p>
                    <p className="mt-4 max-w-xl leading-relaxed">
                      This one&apos;s still under construction.{" "}
                      <a
                        href="mailto:iamsirir@gmail.com?subject=ATIP%20Automation"
                        className="underline underline-offset-4 hover:bg-mark"
                      >
                        Contact me
                      </a>{" "}
                      for more info.
                    </p>
                  </div>
                </div>
              </li>
            ) : (
              <li key={p.slug} className="border-t border-line py-10">
                <div className="grid gap-3 sm:grid-cols-[120px_1fr]">
                  <span className="font-mono text-[13px] text-ink-muted">
                    {p.file}
                  </span>
                  <div>
                    <h2 className="font-serif text-2xl">{p.title}</h2>
                    <p className="mt-1 font-mono text-[12px] tracking-wide text-ink-muted">
                      {p.meta}
                    </p>
                    <p className="mt-4 max-w-xl leading-relaxed">
                      {p.detail ?? p.summary}
                    </p>
                    {p.href && (
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-block font-mono text-[13px] underline underline-offset-4 hover:bg-mark"
                      >
                        View source &rarr;
                      </a>
                    )}
                  </div>
                </div>
              </li>
            )
          )}
        </ul>
      </section>

      <section className="border-t border-line py-12">
        <p className="max-w-xl leading-relaxed text-ink-muted">
          More experiments live on{" "}
          <a
            href="https://github.com/cmd-siri-bot"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 text-ink hover:bg-mark"
          >
            GitHub
          </a>
          , including the ones that didn&apos;t make the cut.
        </p>
      </section>
    </>
  );
}
'@
Set-Content -Path ".\app\projects\page.tsx" -Value $content -Encoding UTF8

Write-Host "Writing app/about/page.tsx ..." -ForegroundColor Cyan
$content = @'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About &mdash; Siri Rama",
  description:
    "An economist by training and a storyteller by nature, working at the intersection of data and narrative in Toronto.",
};

const narrativeSide = [
  "Data storytelling",
  "Campaign & voter strategy",
  "B2B sales narratives",
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
    <>
      <section className="pt-20 pb-12 sm:pt-24">
        <h1 className="font-serif text-4xl leading-tight">
          The numbers make the case. The{" "}
          <span className="hl">story wins the room.</span>
        </h1>
      </section>

      <section className="max-w-xl space-y-6 text-[17px] leading-relaxed">
        <p>
          I&apos;m an economist by training and a storyteller by nature. Those
          usually pull in opposite directions &mdash; rigor versus persuasion &mdash; and
          most of my work is spent proving they don&apos;t have to.
        </p>
        <p>
          {/* TODO: adjust to your real experience mix */}
          I&apos;ve used that combination on two very different audiences: voters,
          where data becomes canvass strategy and a message that moves turnout;
          and buying committees, where the same discipline becomes a business
          case a room of skeptics will sign off on. Different stakes, identical
          method &mdash; find what the data actually says, then make people feel why
          it matters.
        </p>
        <p>
          The projects on this site are the engine room behind that. When the
          analysis got repetitive, I automated it; when the data was locked in a
          portal, I wrote something to free it. Everything on the technical side
          is self-taught &mdash; mostly by breaking things and reading the error
          messages carefully.
        </p>
      </section>

      <section className="mt-16 border-t border-line py-10">
        <h2 className="font-mono text-[13px] uppercase tracking-widest text-ink-muted">
          Toolkit
        </h2>
        <div className="mt-6 grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="font-serif text-xl">The storyteller</h3>
            <ul className="mt-4 space-y-2 text-ink-muted">
              {narrativeSide.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-xl">The economist</h3>
            <ul className="mt-4 space-y-2 text-ink-muted">
              {analyticSide.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-12">
        <p className="max-w-xl leading-relaxed">
          {/* TODO: swap in real personal interests if you'd like */}
          Off the clock: history and politics rabbit holes, strategy games, and
          the occasional side project that starts as a one-off script and
          refuses to stay small.
        </p>
      </section>
    </>
  );
}
'@
Set-Content -Path ".\app\about\page.tsx" -Value $content -Encoding UTF8

Write-Host "Writing app/resume/page.tsx ..." -ForegroundColor Cyan
$content = @'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume &mdash; Siri Rama",
  description:
    "Economist and storyteller based in Toronto. Experience, education, and skills.",
};

/**
 * TODO &mdash; This is a scaffold. Replace every item marked TODO with your real
 * details (titles, employers, dates, and one-line accomplishments). Keep each
 * bullet outcome-focused: what changed because you were there.
 */

type Role = {
  title: string;
  org: string;
  dates: string;
  location?: string;
  points: string[];
};

const experience: Role[] = [
  {
    // TODO: confirm your current title and employer
    title: "TODO &mdash; Your role",
    org: "Delphic Research",
    dates: "TODO &mdash; Start &ndash; Present",
    location: "Toronto, ON",
    points: [
      "TODO &mdash; Lead with an outcome: a number, a win, a decision you shaped.",
      "TODO &mdash; A second accomplishment that shows the data + narrative combo.",
    ],
  },
  {
    title: "TODO &mdash; Previous role",
    org: "TODO &mdash; Employer / campaign",
    dates: "TODO &mdash; Dates",
    location: "TODO &mdash; City",
    points: [
      "TODO &mdash; What you did and the result.",
    ],
  },
];

const education = [
  {
    // Verified from your LinkedIn; confirm degree + years.
    school: "Queen's University &mdash; School of Policy Studies",
    detail: "TODO &mdash; Degree, field, graduation year",
    location: "Kingston, ON",
  },
];

const skills = [
  "Economic & statistical analysis",
  "Data storytelling & visualization",
  "Campaign & voter strategy",
  "Python",
  "PowerShell",
  "LLM & agentic workflows (Ollama)",
  "Next.js / TypeScript",
];

export default function Resume() {
  return (
    <>
      <section className="flex flex-wrap items-end justify-between gap-4 pt-20 pb-8 sm:pt-24">
        <div>
          <h1 className="font-serif text-4xl leading-tight">Siri Rama</h1>
          <p className="mt-2 text-[17px] text-ink-muted">
            Economist by training, storyteller by nature &mdash; Toronto, ON
          </p>
        </div>
        <div className="font-mono text-[13px] text-ink-muted">
          <a
            href="mailto:iamsirir@gmail.com"
            className="block hover:text-ink"
          >
            iamsirir@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/sirirama"
            target="_blank"
            rel="noreferrer"
            className="block hover:text-ink"
          >
            linkedin.com/in/sirirama
          </a>
        </div>
      </section>

      {/* Experience */}
      <section className="border-t border-line py-10">
        <h2 className="font-mono text-[13px] uppercase tracking-widest text-ink-muted">
          Experience
        </h2>
        <div className="mt-6 space-y-8">
          {experience.map((role, i) => (
            <div key={i} className="grid gap-2 sm:grid-cols-[150px_1fr]">
              <div className="font-mono text-[12px] text-ink-muted">
                {role.dates}
                {role.location && <div className="mt-1">{role.location}</div>}
              </div>
              <div>
                <h3 className="font-serif text-xl">{role.title}</h3>
                <p className="text-ink-muted">{role.org}</p>
                <ul className="mt-3 space-y-2">
                  {role.points.map((pt, j) => (
                    <li key={j} className="max-w-xl leading-relaxed">
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
      <section className="border-t border-line py-10">
        <h2 className="font-mono text-[13px] uppercase tracking-widest text-ink-muted">
          Education
        </h2>
        <div className="mt-6 space-y-6">
          {education.map((ed, i) => (
            <div key={i} className="grid gap-2 sm:grid-cols-[150px_1fr]">
              <div className="font-mono text-[12px] text-ink-muted">
                {ed.location}
              </div>
              <div>
                <h3 className="font-serif text-xl">{ed.school}</h3>
                <p className="text-ink-muted">{ed.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="border-t border-line py-10">
        <h2 className="font-mono text-[13px] uppercase tracking-widest text-ink-muted">
          Skills
        </h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {skills.map((s) => (
            <li
              key={s}
              className="border border-line px-3 py-1 font-mono text-[12px] text-ink-muted"
            >
              {s}
            </li>
          ))}
        </ul>
      </section>

      {/* Download */}
      <section className="border-t border-line py-10">
        <p className="max-w-xl leading-relaxed text-ink-muted">
          {/* TODO: drop a PDF into the /public folder and link it below */}
          Prefer a PDF?{" "}
          <a
            href="mailto:iamsirir@gmail.com?subject=Resume%20request"
            className="underline underline-offset-4 text-ink hover:bg-mark"
          >
            Email me
          </a>{" "}
          and I&apos;ll send the latest version.
        </p>
      </section>
    </>
  );
}
'@
Set-Content -Path ".\app\resume\page.tsx" -Value $content -Encoding UTF8

Write-Host ""
Write-Host "Done - all 6 files rewritten as clean ASCII. The garbled dashes are gone." -ForegroundColor Green
Write-Host "Refresh http://localhost:3000 to confirm, then:" -ForegroundColor Green
Write-Host "  git add ."
Write-Host '  git commit -m "Fix character encoding across all pages"'
Write-Host "  git push"
