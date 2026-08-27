import { useCallback, useState } from "react";

import { analytics } from "@/services/analytics.service";

interface UseResultShareOptions {
  resultId: string;
  title: string;
  text: string;
  /** optional PNG of the result poster for native sharing */
  getFile?: () => Promise<File | null>;
}

export type ShareChannel = "facebook" | "native" | "clipboard";

export function useResultShare({ resultId, title, text, getFile }: UseResultShareOptions) {
  const [isSharing, setIsSharing] = useState(false);
  const [lastChannel, setLastChannel] = useState<ShareChannel | null>(null);

  const shareUrl = typeof window === "undefined" ? "" : window.location.origin;

  const shareToFacebook = useCallback(() => {
    if (typeof window === "undefined") return;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl,
    )}&quote=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer,width=680,height=640");
    analytics.resultShared(resultId, "facebook");
    setLastChannel("facebook");
  }, [resultId, shareUrl, text]);

  const share = useCallback(async () => {
    setIsSharing(true);
    try {
      const file = getFile ? await getFile() : null;
      const nav = typeof navigator === "undefined" ? undefined : navigator;

      if (file && nav?.canShare?.({ files: [file] })) {
        await nav.share({ title, text, files: [file] });
        analytics.resultShared(resultId, "native");
        setLastChannel("native");
        return "native" as const;
      }

      shareToFacebook();
      return "facebook" as const;
    } catch {
      try {
        await navigator.clipboard.writeText(`${text} ${shareUrl}`);
        setLastChannel("clipboard");
        return "clipboard" as const;
      } catch {
        return null;
      }
    } finally {
      setIsSharing(false);
    }
  }, [getFile, resultId, shareToFacebook, shareUrl, text, title]);

  return { share, shareToFacebook, isSharing, lastChannel, shareUrl };
}
