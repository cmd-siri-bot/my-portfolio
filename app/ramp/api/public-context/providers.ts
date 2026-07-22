// Provider-agnostic classification: callers get back raw parsed JSON (or null
// on any failure) regardless of which LLM produced it. Validation against the
// PublicContext shape happens once, in route.ts, independent of the provider.

const SYSTEM_PROMPT =
  'Classify this company. Respond ONLY with JSON: { industryGuess: one of [ecommerce|saas|services|agency|retail|other], headcountBandGuess: string, oneLineDescription: string, confidence: low|medium|high }. No other text.';

function stripFences(text: string): string {
  return text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
}

async function classifyWithOllama(pageText: string): Promise<unknown> {
  const baseUrl = process.env.OLLAMA_BASE_URL ?? "http://localhost:11434";
  const model = process.env.OLLAMA_MODEL ?? "llama3.1";
  const controller = new AbortController();
  // Local CPU inference is slow and variable — generous timeout. Only used
  // in local dev anyway, since Ollama on localhost isn't reachable from
  // Vercel's serverless functions in production.
  const timeout = setTimeout(() => controller.abort(), 45_000);

  try {
    const res = await fetch(`${baseUrl}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        system: SYSTEM_PROMPT,
        prompt: pageText,
        stream: false,
        format: "json",
      }),
      signal: controller.signal,
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (typeof data.response !== "string") return null;
    return JSON.parse(stripFences(data.response));
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function classifyWithAnthropic(pageText: string): Promise<unknown> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;
  const model = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-6";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model,
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: pageText }],
      }),
      signal: controller.signal,
    });
    if (!res.ok) return null;
    const data = await res.json();
    const text = data?.content?.[0]?.text;
    if (typeof text !== "string") return null;
    return JSON.parse(stripFences(text));
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

// LLM_PROVIDER can force "ollama" or "anthropic". Left unset, an
// ANTHROPIC_API_KEY (if present) is preferred — so dropping a key in later
// swaps providers with no other change.
export async function classify(pageText: string): Promise<unknown> {
  const forced = process.env.LLM_PROVIDER;
  if (forced === "anthropic") return classifyWithAnthropic(pageText);
  if (forced === "ollama") return classifyWithOllama(pageText);
  if (process.env.ANTHROPIC_API_KEY) return classifyWithAnthropic(pageText);
  return classifyWithOllama(pageText);
}
