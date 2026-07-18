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
          I&apos;m always interested in anything tech, automation, or politics. The fastest way to reach me:
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
