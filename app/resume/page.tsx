import type { Metadata } from "next";
import Logo from "./Logo";

export const metadata: Metadata = {
  title: "Resume - Siri Rama",
  description:
    "Economist and storyteller. Go-to-market at Tipalti; formerly Delphic, Sussex Strategy, and the Government of Canada.",
};

type Role = {
  company: string;
  logo: string; // file in /public/logos/ ; renders once you add it
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
      "Operated cross-functionally across sales, operations, and product delivery in a fast-moving environment with a small team of 5.",
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
    logo: "/logos/queens.png",
    degree: "Master of Arts (MA), Public Affairs",
    detail: "Specialization in Public Finance",
  },
  {
    school: "University of Toronto",
    logo: "/logos/uoft.png",
    degree: "Honours Bachelor of Arts (BA)",
    detail: "Economics and Politics (International Relations)",
  },
];

export default function Resume() {
  return (
    <>
      {/* Header */}
      <section className="flex flex-wrap items-end justify-between gap-4 pt-20 pb-8 sm:pt-24">
        <div>
          <h1 className="font-serif text-4xl leading-tight">Siri Rama</h1>
          <p className="mt-3 max-w-xl text-[16px] italic leading-relaxed text-ink-muted">
            An economist by training and a storyteller by nature. I create
            compelling narratives backed by data that have won over voters in
            Canada and buying committees in regulated industries.
          </p>
        </div>
        <div className="font-mono text-[13px] text-ink-muted">
          <a href="mailto:iamsirir@gmail.com" className="block hover:text-ink">
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
          <span className="block">Toronto, Canada</span>
        </div>
      </section>

      {/* Experience */}
      <section className="border-t border-line py-10">
        <h2 className="font-mono text-[13px] uppercase tracking-widest text-ink-muted">
          Experience
        </h2>
        <div className="mt-8 space-y-10">
          {experience.map((role) => (
            <div key={role.company} className="grid gap-4 sm:grid-cols-[64px_1fr]">
              <Logo src={role.logo} alt={`${role.company} logo`} />
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="font-serif text-2xl">{role.company}</h3>
                  <span className="font-mono text-[12px] text-ink-muted">
                    {role.dates}
                  </span>
                </div>
                {role.blurb && (
                  <p className="mt-1 max-w-xl text-[15px] italic leading-relaxed text-ink-muted">
                    {role.blurb}
                  </p>
                )}
                <p className="mt-2 text-ink-muted">
                  {role.title} &middot; {role.location}
                </p>
                <ul className="mt-3 space-y-2">
                  {role.points.map((pt, j) => (
                    <li key={j} className="max-w-xl leading-relaxed">
                      <span className="mr-2 text-ink-muted">&mdash;</span>
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
        <div className="mt-8 space-y-8">
          {education.map((ed) => (
            <div key={ed.school} className="grid gap-4 sm:grid-cols-[64px_1fr]">
              <Logo src={ed.logo} alt={`${ed.school} logo`} />
              <div>
                <h3 className="font-serif text-2xl">{ed.school}</h3>
                <p className="mt-1">{ed.degree}</p>
                <p className="text-ink-muted">{ed.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Download */}
      <section className="border-t border-line py-10">
        <p className="max-w-xl leading-relaxed text-ink-muted">
          Prefer a PDF?{" "}
          <a
            href="mailto:iamsirir@gmail.com?subject=Resume%20request"
            className="text-ink underline underline-offset-4 hover:bg-mark"
          >
            Email me
          </a>{" "}
          and I&apos;ll send the latest version.
        </p>
      </section>
    </>
  );
}
