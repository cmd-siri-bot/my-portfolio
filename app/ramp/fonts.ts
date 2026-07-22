import { IBM_Plex_Mono, Schibsted_Grotesk } from "next/font/google";

export const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--rc-font-display",
  display: "swap",
});

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--rc-font-mono",
  display: "swap",
});
