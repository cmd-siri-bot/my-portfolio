"use client";

import { useState } from "react";

// TODO: paste your Formspree endpoint here (https://formspree.io/f/xxxx)
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

type Status = "idle" | "submitting" | "success" | "error";

const inputCls =
  "mt-2 w-full border border-rule bg-transparent px-3.5 py-2.5 text-[16px] text-ink focus:border-oxblood focus:outline-none";
const labelCls =
  "block font-mono text-[12px] uppercase tracking-[.14em] text-soft";

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
      <div className="border-l-2 border-oxblood pl-5">
        <p className="font-serif text-[25px] font-semibold">Message sent.</p>
        <p className="mt-2 text-soft">
          Thanks for reaching out &mdash; I&apos;ll get back to you soon.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 font-mono text-[12px] uppercase tracking-[.14em] underline underline-offset-4"
        >
          Send another &rarr;
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className={labelCls}>Name</label>
        <input id="name" name="name" type="text" required className={inputCls} />
      </div>
      <div>
        <label htmlFor="email" className={labelCls}>Email</label>
        <input id="email" name="email" type="email" required className={inputCls} />
      </div>
      <div>
        <label htmlFor="message" className={labelCls}>Message</label>
        <textarea id="message" name="message" required rows={6} className={`${inputCls} resize-y`} />
      </div>

      {status === "error" && (
        <p className="font-mono text-[13px] text-oxblood">
          Something went wrong. Please email me directly at{" "}
          <a href="mailto:iamsirir@gmail.com" className="underline underline-offset-4">
            iamsirir@gmail.com
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded border border-oxblood bg-oxblood px-[26px] py-3 font-mono text-[13px] uppercase tracking-[.08em] text-paper transition hover:bg-[#672626] disabled:opacity-50"
      >
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
