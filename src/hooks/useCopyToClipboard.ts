import { useCallback } from "react";

/** Copy text; resolves to whether it worked (it can be blocked by permissions). */
export function useCopyToClipboard(): (text: string) => Promise<boolean> {
  return useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }, []);
}
