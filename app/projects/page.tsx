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
