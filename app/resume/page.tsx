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
