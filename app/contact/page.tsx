import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact - Siri Rama",
  description: "Get in touch with Siri Rama - by email or the contact form.",
};

const WRAP = "mx-auto w-full max-w-[800px] px-6";

export default function Contact() {
  return (
    <>
      <section className="px-6 pt-28 pb-16 sm:pt-32">
        <div className={`${WRAP} text-center`}>
          <span className="eyebrow mb-4 block">// contact</span>
          <h1 className="font-serif text-[clamp(36px,6vw,60px)] font-semibold leading-[1.05] tracking-[-.02em]">
            Let&apos;s talk.
          </h1>
          <p className="mx-auto mt-6 max-w-[46ch] text-[clamp(19px,2.4vw,23px)] leading-[1.5] text-soft">
            Campaigns, civic tech, GTM, or a data story that needs telling
            &mdash; if it&apos;s in that world, I want to hear about it.
          </p>
        </div>
      </section>

      <section className="px-6 py-14 sm:py-20">
        <div className={`${WRAP} border-t border-rule pt-14 text-center`}>
          <span className="mb-3 block font-mono text-[12px] uppercase tracking-[.14em] text-oxblood">
            Email
          </span>
          <a
            href="mailto:iamsirir@gmail.com"
            className="font-serif text-[clamp(24px,3.4vw,32px)] font-semibold underline underline-offset-4"
          >
            iamsirir@gmail.com
          </a>
        </div>
      </section>

      <section className="px-6 py-14 sm:py-20">
        <div className={`${WRAP} border-t border-rule pt-14`}>
          <span className="mb-8 block text-center font-mono text-[12px] uppercase tracking-[.14em] text-oxblood">
            Or write here
          </span>
          <div className="mx-auto max-w-[36rem]">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
