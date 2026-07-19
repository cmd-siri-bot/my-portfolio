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
