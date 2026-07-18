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
  title: "Siri Rama &mdash; Economist by training, storyteller by nature",
  description:
    "I build compelling narratives backed by data &mdash; and the automation tools behind them. AI agents, ATIP automation, and open-data analysis, from Toronto.",
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
            <span>&copy; 2026 Siri Rama &middot; Toronto</span>
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
