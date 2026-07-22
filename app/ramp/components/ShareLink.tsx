"use client";

import { useState } from "react";
import LZString from "lz-string";
import type { QualificationData } from "@/lib/types";

export function encodeSheet(data: QualificationData): string {
  return LZString.compressToEncodedURIComponent(JSON.stringify(data));
}

export function decodeSheet(encoded: string): QualificationData | null {
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded);
    if (!json) return null;
    return JSON.parse(json) as QualificationData;
  } catch {
    return null;
  }
}

export default function ShareLink({ data }: { data: QualificationData }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function handleShare() {
    const encoded = encodeSheet(data);
    const url = `${window.location.origin}${window.location.pathname}?sheet=${encoded}`;
    try {
      await navigator.clipboard.writeText(url);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    window.setTimeout(() => setStatus("idle"), 1800);
  }

  return (
    <div className="rc-share-row">
      <button type="button" className="rc-share-btn" onClick={handleShare}>
        Copy link to this sheet
      </button>
      {status === "copied" && <span className="rc-share-status">Link copied</span>}
      {status === "error" && <span className="rc-share-status">Couldn&apos;t copy — copy from the address bar instead</span>}
    </div>
  );
}
