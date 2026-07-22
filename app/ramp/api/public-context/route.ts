import type { QualificationData, PublicContext } from "@/lib/handoff-console/types";
import { classify } from "./providers";

const ALLOWED_INDUSTRIES = new Set<QualificationData["industry"]>([
  "ecommerce",
  "saas",
  "services",
  "agency",
  "retail",
  "other",
]);
const ALLOWED_CONFIDENCE = new Set(["low", "medium", "high"]);

function normalizeUrl(website: string): string {
  const trimmed = website.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function validate(raw: unknown): PublicContext | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;

  const confidence = ALLOWED_CONFIDENCE.has(obj.confidence as string)
    ? (obj.confidence as PublicContext["confidence"])
    : null;
  if (!confidence) return null;

  const industryGuess = ALLOWED_INDUSTRIES.has(obj.industryGuess as QualificationData["industry"])
    ? (obj.industryGuess as QualificationData["industry"])
    : null;
  const headcountBandGuess = typeof obj.headcountBandGuess === "string" ? obj.headcountBandGuess : null;
  const oneLineDescription = typeof obj.oneLineDescription === "string" ? obj.oneLineDescription : null;

  return { industryGuess, headcountBandGuess, oneLineDescription, confidence };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const website = typeof body?.website === "string" ? body.website.trim() : "";
    if (!website) {
      return Response.json({ result: null });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);
    let pageRes: Response;
    try {
      pageRes = await fetch(normalizeUrl(website), {
        signal: controller.signal,
        headers: { "User-Agent": "Mozilla/5.0 (compatible; HandoffConsoleBot/1.0)" },
      });
    } finally {
      clearTimeout(timeout);
    }
    if (!pageRes.ok) {
      return Response.json({ result: null });
    }

    const html = await pageRes.text();
    const pageText = stripHtml(html).slice(0, 4000);

    const raw = await classify(pageText);
    return Response.json({ result: validate(raw) });
  } catch {
    return Response.json({ result: null });
  }
}
