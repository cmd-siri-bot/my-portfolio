import type { Metadata } from "next";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects — Siri Rama",
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
