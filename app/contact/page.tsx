import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact - Siri Rama",
  description: "Get in touch with Siri Rama - by email or the contact form.",
};

export default function Contact() {
  return (
    <div className="px-7">
      <section className="mx-auto max-w-[1080px] pt-[72px] pb-10">
        <span className="eyebrow mb-3.5 block">// contact</span>
        <h1 className="max-w-[16ch] font-serif text-[clamp(36px,6vw,64px)] font-semibold leading-[1.05] tracking-[-.02em]">
          Let&apos;s talk.
        </h1>
        <p className="mt-6 max-w-[52ch] text-[clamp(19px,2.4vw,23px)] leading-[1.45] text-soft">
          Campaigns, civic tech, GTM, or a data story that needs telling &mdash;
          if it&apos;s in that world, I want to hear about it.
        </p>
      </section>

      <section className="mx-auto max-w-[1080px] border-t border-rule py-10">
        <div className="grid gap-3 sm:grid-cols-[150px_1fr]">
          <span className="font-mono text-[12px] uppercase tracking-[.14em] text-oxblood">
            Email
          </span>
          <a
            href="mailto:iamsirir@gmail.com"
            className="font-serif text-[25px] font-semibold underline underline-offset-4"
          >
            iamsirir@gmail.com
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-[1080px] border-t border-rule py-10">
        <div className="grid gap-8 sm:grid-cols-[150px_1fr]">
          <span className="font-mono text-[12px] uppercase tracking-[.14em] text-oxblood">
            Or write here
          </span>
          <div className="max-w-[36rem]">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
