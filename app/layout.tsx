import type { Metadata } from "next";
import { Newsreader, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  variable: "--font-newsreader",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Siri Rama - GTM Strategy, Sales, Solutions",
  description:
    "Data to insight to options for decision-makers. #1 rep at Tipalti, scaled Delphic Research $500K to $1M ARR, former Government of Canada economist. Open to GTM Strategist, AE, and Solutions roles - SF / Bay Area / remote.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${newsreader.variable} ${jetbrains.variable}`}>
        <header className="sticky top-0 z-50 flex justify-center border-b border-rule bg-paper">
          <div className="flex h-14 w-full max-w-[800px] items-center justify-between px-7">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-mono text-[12px] uppercase tracking-[.14em] text-ink no-underline"
            >
              <span className="h-[7px] w-[7px] flex-none rounded-full bg-oxblood" aria-hidden="true" />
              Siri Rama
            </Link>
            <nav aria-label="Primary" className="flex gap-[26px]">
              {[
                ["Projects", "/projects"],
                ["Resume", "/resume"],
                ["About", "/about"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="font-mono text-[12px] uppercase tracking-[.08em] text-ink no-underline hover:text-oxblood"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="mt-[88px] flex justify-center bg-ink text-paper">
          <div className="flex w-full max-w-[800px] flex-wrap justify-between gap-3.5 px-7 py-[26px]">
            <span className="font-mono text-[11px] uppercase tracking-[.14em] opacity-80">
              &copy; 2026 Siri Rama &middot; Toronto
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[.14em] opacity-80">
              iamsirir@gmail.com
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
