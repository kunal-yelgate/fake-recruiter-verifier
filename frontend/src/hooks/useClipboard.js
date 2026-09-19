import { useState, useCallback } from "react";

export function useClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text) => {
      if (!navigator?.clipboard) return false;
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), timeout);
        return true;
      } catch (err) {
        console.error("Clipboard copy failed:", err);
        return false;
      }
    },
    [timeout]
  );

  return { copied, copy };
}
