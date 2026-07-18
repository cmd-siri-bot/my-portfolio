import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact â€” Siri Rama",
  description:
    "Get in touch with Siri Rama â€” by email or the contact form.",
};

export default function Contact() {
  return (
    <>
      <section className="pt-20 pb-10 sm:pt-24">
        <h1 className="font-serif text-4xl leading-tight">
          Let&apos;s <span className="hl">talk</span>.
        </h1>
        <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-muted">
          Campaigns, civic tech, AI, GTM, automation, or a data story that needs telling.
           If it&apos;s in that world, I want to hear about it.
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
