"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const WRAP = "mx-auto w-full max-w-[900px] px-6";

function BinaryField({ count = 80 }: { count?: number }) {
  const bits = useRef<string[]>([]);
  if (bits.current.length === 0) {
    bits.current = Array.from({ length: count }, () =>
      Math.random() > 0.5 ? "1" : "0"
    );
  }
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.04]">
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 p-8">
        {bits.current.map((b, i) => (
          <span
            key={i}
            className="binary-char font-mono text-[13px]"
            style={{ animationDelay: `${Math.random() * 4}s` }}
          >
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function HomeClient() {
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
        { threshold: 0.1 }
      );
      reveals.forEach((el) => io.observe(el));
    }
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 py-28 sm:py-36 text-center">
        <BinaryField count={120} />
        <div className={`${WRAP} relative z-10`}>
          <div className="reveal mb-16 flex flex-wrap justify-center gap-8">
            <span className="font-mono text-[11px] uppercase tracking-[.20em] text-soft">
              Siri Rama
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[.20em] text-soft">
              Toronto
            </span>
          </div>

          <h1 className="reveal mx-auto max-w-[14ch] font-serif text-[clamp(48px,10vw,120px)] font-semibold leading-[0.95] tracking-[-.03em]">
            Economist.
            <br />
            Storyteller.
          </h1>

          <p className="reveal mx-auto mt-12 max-w-[42ch] text-[clamp(18px,2vw,22px)] leading-[1.6] text-soft">
            I take data, find the insight, and give decision-makers clear
            options — the same method that has won budgets, elections, and
            quota.
          </p>

          <div className="reveal mt-16 flex flex-wrap justify-center gap-8">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 font-mono text-[13px] uppercase tracking-[.14em] text-ink no-underline transition-colors hover:text-black"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-rule transition-colors group-hover:border-black">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
              Start a conversation
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="border-t border-rule px-6 py-28 sm:py-36 text-center">
        <div className={WRAP}>
          <div className="reveal mb-16">
            <span className="eyebrow mb-6 block">About</span>
            <h2 className="mx-auto max-w-[28ch] font-serif text-[clamp(28px,4.5vw,52px)] font-semibold leading-[1.1] tracking-[-.02em]">
              An economist by training, a storyteller by nature.
            </h2>
          </div>
          <div className="reveal mx-auto max-w-[56ch]">
            <p className="text-[17px] leading-[1.7] text-soft">
              I collaborate with teams to turn raw data into decisions that
              stick. Whether it&apos;s selling into a buying committee, modeling
              policy for the federal budget, or building AI agents that compress
              research time — the method is the same.
            </p>
            <p className="mt-6 text-[17px] leading-[1.7] text-soft">
              Get the numbers right. Find the signal a busy decision-maker would
              otherwise miss. Then make the room care. Different rooms. Same
              method.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT I BUILD */}
      <section className="border-t border-rule px-6 py-28 sm:py-36 text-center">
        <div className={WRAP}>
          <div className="reveal mb-16">
            <span className="eyebrow mb-6 block">What I Build</span>
            <h2 className="mx-auto max-w-[24ch] font-serif text-[clamp(28px,4.5vw,52px)] font-semibold leading-[1.1] tracking-[-.02em]">
              The technical file.
            </h2>
          </div>

          <div className="reveal mx-auto max-w-[640px] rounded-sm bg-terminal p-10 sm:p-12 font-mono text-green-bright text-left">
            <span className="mb-6 block text-[12px] tracking-[.08em] text-green-bright opacity-70">
              # 4 records — access restricted
            </span>
            <ul className="mb-8 list-none" aria-hidden="true">
              {[
                "executive-agent/     python · llm · agentic-workflow",
                "downloads-butler/    powershell · ollama · open-source",
                "atip-automation/     python · automation · wip",
                "toronto-open-data/   python · data-viz",
              ].map((line) => (
                <li
                  key={line}
                  className="select-none whitespace-pre text-[13px] leading-[2.2] tracking-[.06em] text-[#555] blur-[3px]"
                >
                  {line}
                </li>
              ))}
            </ul>
            <Link
              href="/projects"
              className="inline-block rounded-sm bg-green-bright px-6 py-3 font-mono text-[12px] tracking-[.08em] text-terminal no-underline transition-colors hover:bg-[#84d0b6]"
            >
              $ open ./projects &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* METHOD */}
      <section id="method" className="border-t border-rule px-6 py-28 sm:py-36 text-center">
        <div className={WRAP}>
          <div className="reveal mb-20">
            <span className="eyebrow mb-6 block">Method</span>
            <h2 className="mx-auto max-w-[20ch] font-serif text-[clamp(28px,4.5vw,52px)] font-semibold leading-[1.1] tracking-[-.02em]">
              Three steps, every time.
            </h2>
          </div>

          <div className="mx-auto grid max-w-[720px] grid-cols-1 gap-px bg-rule sm:grid-cols-3">
            {[
              ["01", "Source", "Get the data, even when it's locked in a portal — I'll write something to free it."],
              ["02", "Distill", "Find the signal a busy decision-maker would otherwise miss."],
              ["03", "Advise", "Lay out the options and a clear recommendation the room can act on."],
            ].map(([num, h, p]) => (
              <div
                key={num}
                className="reveal bg-paper p-8 sm:p-10 transition-colors duration-300 hover:bg-[#5c2222]"
              >
                <span className="mb-6 block font-mono text-[11px] uppercase tracking-[.20em] text-black">
                  {num}
                </span>
                <h3 className="mb-4 font-serif text-[24px] font-semibold leading-[1.2] tracking-[-.01em]">
                  {h}
                </h3>
                <p className="text-[16px] leading-[1.7] text-soft">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TAGLINE STACK */}
      <section className="relative overflow-hidden border-t border-rule px-6 py-28 sm:py-36 text-center">
        <BinaryField count={60} />
        <div className={`${WRAP} relative z-10`}>
          <div className="reveal">
            <p className="tagline-stack">Data</p>
            <p className="tagline-stack">my way</p>
            <p className="tagline-stack">since</p>
            <p className="tagline-stack text-black">1998</p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-rule px-6 py-28 sm:py-36 text-center">
        <div className={WRAP}>
          <div className="reveal mb-16">
            <span className="eyebrow mb-6 block">Contact</span>
            <h2 className="mx-auto max-w-[18ch] font-serif text-[clamp(32px,5vw,60px)] font-semibold leading-[1.05] tracking-[-.02em]">
              Let&apos;s build something together.
            </h2>
          </div>

          <div className="reveal mx-auto mb-16 max-w-[46ch]">
            <p className="text-[17px] leading-[1.7] text-soft">
              Working on something at the intersection of data and narrative?
              I help teams turn complexity into decisions that stick.
            </p>
          </div>

          <div className="reveal flex flex-wrap justify-center gap-6">
            <a
              href="mailto:iamsirir@gmail.com"
              className="inline-flex items-center gap-3 rounded-full border border-rule px-8 py-4 font-mono text-[12px] uppercase tracking-[.14em] text-ink no-underline transition-all hover:border-black hover:text-black"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Email
            </a>
            <a
              href="https://linkedin.com/in/sirirama"
              className="inline-flex items-center gap-3 rounded-full border border-rule px-8 py-4 font-mono text-[12px] uppercase tracking-[.14em] text-ink no-underline transition-all hover:border-black hover:text-black"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/cmd-siri-bot"
              className="inline-flex items-center gap-3 rounded-full border border-rule px-8 py-4 font-mono text-[12px] uppercase tracking-[.14em] text-ink no-underline transition-all hover:border-black hover:text-black"
            >
              GitHub
            </a>
          </div>

          <p className="reveal mt-16">
            <a
              href="mailto:iamsirir@gmail.com"
              className="font-mono text-[11px] uppercase tracking-[.20em] text-soft no-underline transition-colors hover:text-black"
            >
              iamsirir@gmail.com
            </a>
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-rule px-6 py-12 text-center">
        <div className={WRAP}>
          <div className="flex flex-wrap justify-center gap-8">
            <span className="font-mono text-[11px] uppercase tracking-[.14em] text-soft">
              &copy; 2026 Siri Rama
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[.14em] text-soft">
              Toronto
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
