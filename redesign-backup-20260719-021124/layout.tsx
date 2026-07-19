import type { Metadata } from "next";
import { Spectral, Public_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-spectral",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-public-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Siri Rama — Economist by training, storyteller by nature",
  description:
    "I build compelling narratives backed by data and the automation tools behind them. AI agents, agentic workflows, and open-data analysis, from Toronto.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spectral.variable} ${publicSans.variable} ${jetbrains.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}