import type { Metadata } from "next";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects — Siri Rama",
  description:
    "Automation agents, data pipelines, and election analysis by Siri Rama.",
};

export default function Projects() {
  return (
    <>
      <section className="pt-20 pb-12 sm:pt-24">
        <h1 className="font-serif text-4xl leading-tight">
          The <span className="hl">case files</span>.
        </h1>
        <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-muted">
          Tools I built to get from raw data to a story worth telling — agents,
          automation, and analysis. Each one shipped; each one taught me
          something the docs didn&apos;t. Live demos hang off subdomains of this
          site as they go up.
        </p>
      </section>

      <section>
        <ul>
          {projects.map((p) => (
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
                      View source →
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
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
