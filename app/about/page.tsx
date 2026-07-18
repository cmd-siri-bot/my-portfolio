import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — ; Siri Rama",
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
