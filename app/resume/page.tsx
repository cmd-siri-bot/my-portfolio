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
