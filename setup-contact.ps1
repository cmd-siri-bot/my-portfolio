# ============================================================
#  Contact page setup  -  adds the /contact page + updates the nav
#
#  HOW TO RUN:
#    1. Save this file into  C:\Users\iamsi\my-portfolio
#    2. In that folder run:
#         powershell -ExecutionPolicy Bypass -File .\setup-contact.ps1
#
#  Writes 3 files. Does NOT touch your resume or project pages.
# ============================================================

if (-not (Test-Path ".\package.json")) {
  Write-Host "ERROR: No package.json here. Run from C:\Users\iamsi\my-portfolio" -ForegroundColor Red
  exit 1
}

New-Item -ItemType Directory -Force -Path ".\app\contact" | Out-Null

Write-Host "Writing app/layout.tsx ..." -ForegroundColor Cyan
$content = @'
import type { Metadata } from "next";
import { Libre_Caslon_Text, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const caslon = Libre_Caslon_Text({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-caslon",
});

const plexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-plex-sans",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "Siri Rama — Economist by training, storyteller by nature",
  description:
    "I build compelling narratives backed by data — and the automation tools behind them. AI agents, ATIP automation, and open-data analysis, from Toronto.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${caslon.variable} ${plexSans.variable} ${plexMono.variable} font-sans antialiased`}
      >
        <header className="sticky top-0 z-10 border-b border-line bg-paper/90 backdrop-blur-sm">
          <nav className="mx-auto flex max-w-3xl items-baseline justify-between px-5 py-4 font-mono text-[13px] tracking-wide">
            <Link href="/" className="font-medium uppercase">
              Siri&nbsp;Rama
            </Link>
            <div className="flex gap-5 text-ink-muted sm:gap-6">
              <Link href="/projects" className="hover:text-ink">
                Projects
              </Link>
              <Link href="/resume" className="hover:text-ink">
                Resume
              </Link>
              <Link href="/about" className="hover:text-ink">
                About
              </Link>
              <Link href="/contact" className="hover:text-ink">
                Contact
              </Link>
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-3xl px-5">{children}</main>

        <footer className="mt-24 border-t border-line">
          <div className="mx-auto flex max-w-3xl flex-wrap items-baseline justify-between gap-3 px-5 py-8 font-mono text-[12px] text-ink-muted">
            <span>© 2026 Siri Rama · Toronto</span>
            <div className="flex gap-5">
              <a
                href="https://github.com/cmd-siri-bot"
                className="hover:text-ink"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/sirirama"
                className="hover:text-ink"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
'@
Set-Content -Path ".\app\layout.tsx" -Value $content -Encoding UTF8

Write-Host "Writing app/contact/page.tsx ..." -ForegroundColor Cyan
$content = @'
import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact — Siri Rama",
  description:
    "Get in touch with Siri Rama — by email or the contact form.",
};

export default function Contact() {
  return (
    <>
      <section className="pt-20 pb-10 sm:pt-24">
        <h1 className="font-serif text-4xl leading-tight">
          Let&apos;s <span className="hl">talk</span>.
        </h1>
        <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-muted">
          Campaigns, civic tech, automation, or a data story that needs telling
          — if it&apos;s in that world, I want to hear about it.
        </p>
      </section>

      {/* Direct email */}
      <section className="border-t border-line py-8">
        <div className="grid gap-2 sm:grid-cols-[150px_1fr]">
          <span className="font-mono text-[13px] uppercase tracking-widest text-ink-muted">
            Email
          </span>
          <a
            href="mailto:iamsirir@gmail.com"
            className="font-serif text-2xl underline underline-offset-4 hover:bg-mark"
          >
            iamsirir@gmail.com
          </a>
        </div>
      </section>

      {/* Form */}
      <section className="border-t border-line py-10">
        <div className="grid gap-6 sm:grid-cols-[150px_1fr]">
          <span className="font-mono text-[13px] uppercase tracking-widest text-ink-muted">
            Or write here
          </span>
          <div className="max-w-xl">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
'@
Set-Content -Path ".\app\contact\page.tsx" -Value $content -Encoding UTF8

Write-Host "Writing app/contact/ContactForm.tsx ..." -ForegroundColor Cyan
$content = @'
"use client";

import { useState } from "react";

// TODO: create a free form at https://formspree.io, then paste your form's
// endpoint here (it looks like https://formspree.io/f/abcdwxyz).
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-line p-6">
        <p className="font-serif text-2xl">
          <span className="hl">Message sent.</span>
        </p>
        <p className="mt-3 leading-relaxed text-ink-muted">
          Thanks for reaching out — I&apos;ll get back to you soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 font-mono text-[13px] underline underline-offset-4 hover:bg-mark"
        >
          Send another →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block font-mono text-[12px] uppercase tracking-widest text-ink-muted"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-2 w-full border border-line bg-transparent px-3 py-2 text-[16px] focus:border-ink focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block font-mono text-[12px] uppercase tracking-widest text-ink-muted"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-2 w-full border border-line bg-transparent px-3 py-2 text-[16px] focus:border-ink focus:outline-none"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block font-mono text-[12px] uppercase tracking-widest text-ink-muted"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="mt-2 w-full resize-y border border-line bg-transparent px-3 py-2 text-[16px] focus:border-ink focus:outline-none"
        />
      </div>

      {status === "error" && (
        <p className="font-mono text-[13px] text-ink">
          Something went wrong. Please email me directly at{" "}
          <a
            href="mailto:iamsirir@gmail.com"
            className="underline underline-offset-4 hover:bg-mark"
          >
            iamsirir@gmail.com
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="border border-ink px-6 py-2.5 font-mono text-[13px] tracking-wide transition hover:bg-mark disabled:opacity-50"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
'@
Set-Content -Path ".\app\contact\ContactForm.tsx" -Value $content -Encoding UTF8

Write-Host ""
Write-Host "Done - contact page installed." -ForegroundColor Green
Write-Host "IMPORTANT: open app\contact\ContactForm.tsx and paste your real" -ForegroundColor Yellow
Write-Host "Formspree endpoint into FORMSPREE_ENDPOINT, or the form won't deliver." -ForegroundColor Yellow
Write-Host ""
Write-Host "Check http://localhost:3000/contact then publish with:" -ForegroundColor Green
Write-Host "  git add ."
Write-Host '  git commit -m "Add contact page with form"'
Write-Host "  git push"
