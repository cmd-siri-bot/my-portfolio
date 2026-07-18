"use client";

import { useState } from "react";

// TODO: create a free form at https://formspree.io, then paste your form's
// endpoint here (it looks like https://formspree.io/f/abcdwxyz).
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mpqvdjpe";

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
          Thanks for reaching out â€” I&apos;ll get back to you soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 font-mono text-[13px] underline underline-offset-4 hover:bg-mark"
        >
          Send another â†’
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
        {status === "submitting" ? "Sendingâ€¦" : "Send message"}
      </button>
    </form>
  );
}
