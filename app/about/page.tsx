import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Siri Rama",
  description:
    "An economist by training and a storyteller by nature, working at the intersection of data and narrative.",
};

const WRAP = "mx-auto w-full max-w-[800px] px-6";

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
    <>
      <section className="px-6 pt-28 pb-16 sm:pt-32">
        <div className={`${WRAP} text-center`}>
          <span className="eyebrow mb-4 block">// about</span>
          <h1 className="mx-auto max-w-[22ch] font-serif text-[clamp(32px,5.2vw,54px)] font-semibold leading-[1.1] tracking-[-.02em]">
            The numbers make the case. The story wins the room.
          </h1>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-28">
        <div className={`${WRAP} border-t border-rule pt-16`}>
          <div className="space-y-6 text-[19px] leading-[1.65]">
            <p>
              I&apos;m an economist by training and a storyteller by nature.
              Those usually pull in opposite directions &mdash; rigor versus
              persuasion &mdash; and most of my work is spent proving they
              don&apos;t have to.
            </p>
            <p>
              I&apos;ve used that combination on very different audiences:
              voters, where data becomes campaign strategy and a message that
              moves turnout; and buying committees, where the same discipline
              becomes a business case a room of skeptics will sign off on.
              Different stakes, identical method &mdash; find what the data
              actually says, then make people feel why it matters.
            </p>
            <p>
              The projects on this site are the engine room behind that. When
              the analysis got repetitive, I automated it; when the data was
              locked in a portal, I wrote something to free it. Everything on
              the technical side is self-taught &mdash; mostly by breaking
              things and reading the error messages carefully.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-28">
        <div className={`${WRAP} border-t border-rule pt-16`}>
          <span className="eyebrow mb-10 block text-center">// toolkit</span>
          <div className="grid gap-12 sm:grid-cols-2">
            <div>
              <h3 className="mb-5 font-serif text-[24px] font-semibold">
                The storyteller
              </h3>
              <ul className="space-y-3">
                {narrativeSide.map((item) => (
                  <li key={item} className="border-l-2 border-rule pl-4 text-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-5 font-serif text-[24px] font-semibold">
                The economist
              </h3>
              <ul className="space-y-3">
                {analyticSide.map((item) => (
                  <li key={item} className="border-l-2 border-rule pl-4 text-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-28">
        <div className={`${WRAP} border-t border-rule pt-16 text-center`}>
          <p className="mx-auto max-w-[56ch] text-soft">
            Off the clock: history and politics rabbit holes, strategy games,
            and the occasional side project that starts as a one-off script and
            refuses to stay small.
          </p>
        </div>
      </section>
    </>
  );
}
