"use client";

import { useState } from "react";

interface CopyBlockProps {
  label: string;
  text: string;
}

export default function CopyBlock({ label, text }: CopyBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard API can be unavailable (e.g. insecure context) — fail silently,
      // never show an error state.
    }
  }

  return (
    <div className="rc-copyblock">
      <div className="rc-copyblock-head">
        <span className="rc-copyblock-label">{label}</span>
        <button type="button" className="rc-copy-btn" onClick={handleCopy}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="rc-copyblock-body">{text}</pre>
    </div>
  );
}
