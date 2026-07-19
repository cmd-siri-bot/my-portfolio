"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const WRAP = "mx-auto w-full max-w-[800px] px-6";

export default function HomeClient() {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = document.querySelectorAll(".reveal");

    if (reduced || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      reveals.forEach((el) => io.observe(el));
    }

    const tl = timelineRef.current;
    if (tl && !reduced) {
      const onScroll = () => {
        const r = tl.getBoundingClientRect();
        const vh = window.innerHeight;
        let progress = (vh - r.top) / (r.height + vh * 0.4);
        progress = Math.max(0, Math.min(1, progress));
        tl.style.setProperty("--fill", (progress * 100).toFixed(1));
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    } else if (tl) {
      tl.style.setProperty("--fill", "100");
    }
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="px-6 pt-28 pb-28 sm:pt-36">
        <div className={WRAP}>
          <div className="mb-20 flex flex-wrap justify-between gap-4 border-b border-ink pb-3.5">
            <span className="font-mono text-[12px] uppercase tracking-[.14em] text-ink">
              Siri Rama
            </span>
            <span className="font-mono text-[12px] uppercase tracking-[.14em] text-ink">
              Toronto
            </span>
          </div>

          <h1 className="reveal mx-auto max-w-[18ch] text-center font-serif text-[clamp(38px,6vw,68px)] font-semibold leading-[1.05] tracking-[-.02em]">
            An economist by training, a&nbsp;storyteller by nature.
          </h1>
          <p className="reveal mt-8 text-center font-mono text-[13px] uppercase tracking-[.14em] text-soft">
            Data &rarr; insight &rarr; options for decision-makers
          </p>
          <p className="reveal mx-auto mt-10 max-w-[46ch] text-center text-[clamp(20px,2.6vw,26px)] leading-[1.5]">
            I take data, find the insight, and give decision-makers clear
            options &mdash; the same method that has won budgets, elections, and
            quota.
          </p>
        </div>
      </section>

      {/* THE RECORD */}
      <section className="border-t border-rule px-6 py-28 sm:py-36">
        <div className={WRAP}>
          <div className="reveal mb-20 text-center">
            <span className="eyebrow mb-4 block">// the_record</span>
            <h2 className="font-serif text-[clamp(30px,5vw,48px)] font-semibold leading-[1.05]">
              The work, most recent first.
            </h2>
          </div>

          <div
            ref={timelineRef}
            className="timeline-fill relative pl-10 before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-px before:bg-rule after:absolute after:left-0 after:top-1.5 after:w-px after:bg-oxblood after:[height:calc(var(--fill,0)*1%)] after:[max-height:calc(100%-12px)]"
          >
            {[
              {
                code: ["File_01", "2024 - Present"],
                h: "Tipalti",
                role: "Account Executive \u00b7 Fintech \u00b7 Remote",
                body: "Selling finance automation into buying committees that don't buy on charm - they buy on a business case. I build that case, then I win it. On the side, I built the team's internal GTM AI agents to compress research and prep time.",
                result: (
                  <>
                    <strong className="font-semibold">#1 rep company-wide.</strong>{" "}
                    Rep of the Quarter, Q2 2026.
                  </>
                ),
              },
              {
                code: ["File_02", "2022 - 2024"],
                h: "Delphic Research",
                role: "Gov-Tech Startup \u00b7 Growth & Revenue \u00b7 Toronto",
                body: "Early hire at a startup selling government intelligence to regulated buyers. Owned the revenue motion end to end - prospecting, demos, pricing conversations, renewals - for a product where the pitch is the analysis.",
                result: (
                  <strong className="font-semibold">
                    Helped scale ARR from $500K to $1M.
                  </strong>
                ),
              },
              {
                code: ["File_03", "2020 - 2022"],
                h: "Sussex Strategy Group",
                role: "Public Affairs \u00b7 Advocacy \u00b7 Toronto",
                body: "Advised clients navigating government - turning regulatory noise into a position, and a position into a campaign. Public affairs is enterprise sales with higher stakes and slower deal cycles; the discovery skills transfer one-to-one.",
                result: (
                  <strong className="font-semibold">
                    Built and ran advocacy campaigns for clients facing
                    regulatory decisions.
                  </strong>
                ),
              },
              {
                code: ["File_04", "2015 - 2020"],
                h: "Government of Canada",
                role: "Economist & Advisor \u00b7 Ottawa",
                body: "Modeled policy for the Federal Budget and briefed the people who signed off on it. Learned the discipline that runs through everything since: get the numbers right, then make the room care.",
                result: (
                  <>
                    <strong className="font-semibold">
                      Three federal election wins.
                    </strong>{" "}
                    Federal Budget economic modeling.
                  </>
                ),
              },
            ].map((e) => (
              <article key={e.h} className="reveal mb-20 last:mb-0">
                <div className="mb-3 flex flex-wrap gap-[18px] font-mono text-[12px] uppercase tracking-[.14em] text-soft">
                  <span>{e.code[0]}</span>
                  <span>{e.code[1]}</span>
                </div>
                <h3 className="mb-1.5 font-serif text-[25px] font-semibold leading-[1.2]">
                  {e.h}
                </h3>
                <p className="mb-4 font-mono text-[12px] uppercase tracking-[.14em] text-oxblood">
                  {e.role}
                </p>
                <p className="text-ink">{e.body}</p>
                <p className="mt-[18px] border-l-2 border-oxblood pl-4 text-[18px]">
                  {e.result}
                </p>
              </article>
            ))}
          </div>

          <p className="meta reveal mt-20 border-t border-rule pt-6 text-center">
            MA Public Affairs &mdash; Queen&apos;s University &middot; BA
            Economics &amp; Politics &mdash; University of Toronto &middot;
            Technical stack: self-taught
          </p>

          <p className="reveal mx-auto mt-16 max-w-[42ch] text-center font-serif text-[clamp(20px,2.6vw,26px)] italic leading-[1.45]">
            &ldquo;Different rooms. Same method: find what the data actually
            says, then make people feel why it matters.&rdquo;
          </p>
        </div>
      </section>

      {/* HOW I WORK */}
      <section className="border-t border-rule px-6 py-28 sm:py-36">
        <div className={WRAP}>
          <div className="reveal mb-20 text-center">
            <span className="eyebrow mb-4 block">// how_i_work</span>
            <h2 className="font-serif text-[clamp(30px,5vw,48px)] font-semibold leading-[1.05]">
              Three steps, every time.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {[
              ["01_Source", "Source", "Get the data, even when it's locked in a portal - I'll write something to free it."],
              ["02_Distill", "Distill", "Find the signal a busy decision-maker would otherwise miss."],
              ["03_Advise", "Advise", "Lay out the options and a clear recommendation the room can act on."],
            ].map(([label, h, p], i) => (
              <div
                key={label}
                className={`reveal border-t pt-5 ${i === 0 ? "border-oxblood" : "border-ink"}`}
              >
                <p className="mb-3.5 font-mono text-[12px] uppercase tracking-[.14em] text-soft">
                  {label}
                </p>
                <h3 className="mb-2.5 font-serif text-[24px] font-semibold">{h}</h3>
                <p className="text-[17px] text-soft">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT I BUILD */}
      <section className="border-t border-rule px-6 py-28 sm:py-36">
        <div className={WRAP}>
          <div className="reveal mb-20 text-center">
            <span className="eyebrow mb-4 block">// what_i_build</span>
            <h2 className="font-serif text-[clamp(30px,5vw,48px)] font-semibold leading-[1.05]">
              The technical file.
            </h2>
          </div>

          <div className="reveal rounded-xl bg-terminal p-[44px_46px_48px] font-mono text-green-bright">
            <span className="mb-[26px] block text-[13px] tracking-[.08em] text-green-bright opacity-85">
              # 4 records &mdash; access restricted
            </span>
            <ul className="mb-[34px] list-none" aria-hidden="true">
              {[
                "executive-agent/     python \u00b7 llm \u00b7 agentic-workflow",
                "downloads-butler/    powershell \u00b7 ollama \u00b7 open-source",
                "atip-automation/     python \u00b7 automation \u00b7 wip",
                "toronto-open-data/   python \u00b7 data-viz",
              ].map((line) => (
                <li
                  key={line}
                  className="select-none whitespace-pre text-[14px] leading-[2.1] tracking-[.06em] text-[#8b8f93] blur-[4px]"
                >
                  {line}
                </li>
              ))}
            </ul>
            <Link
              href="/projects"
              className="inline-block rounded-md bg-green-bright px-[22px] py-[13px] font-mono text-[13px] tracking-[.08em] text-terminal no-underline hover:bg-[#84d0b6]"
            >
              $ open ./projects &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="border-t border-rule px-6 py-28 sm:py-36">
        <div className={WRAP}>
          <div className="reveal mb-10 text-center">
            <span className="eyebrow block">// contact</span>
          </div>
          <p className="reveal mx-auto mb-12 max-w-[24ch] text-center font-serif text-[clamp(28px,4.6vw,44px)] font-semibold leading-[1.15]">
            Working on something at the intersection of{" "}
            <em className="not-italic text-oxblood">data</em> and{" "}
            <em className="not-italic text-oxblood">narrative</em>? Let&apos;s
            talk.
          </p>
          <div className="reveal flex flex-wrap justify-center gap-4">
            <a
              href="mailto:iamsirir@gmail.com"
              className="rounded border border-oxblood bg-oxblood px-[26px] py-3.5 font-mono text-[13px] uppercase tracking-[.08em] text-paper no-underline hover:bg-[#672626]"
            >
              Email
            </a>
            <a
              href="https://linkedin.com/in/sirirama"
              className="rounded border border-ink px-[26px] py-3.5 font-mono text-[13px] uppercase tracking-[.08em] text-ink no-underline hover:border-oxblood hover:text-oxblood"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/cmd-siri-bot"
              className="rounded border border-ink px-[26px] py-3.5 font-mono text-[13px] uppercase tracking-[.08em] text-ink no-underline hover:border-oxblood hover:text-oxblood"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
