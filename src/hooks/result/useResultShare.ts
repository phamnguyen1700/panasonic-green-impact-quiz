import { useCallback, useState } from "react";

import { env } from "@/config/env.config";
import { analytics } from "@/services/analytics";

interface UseResultShareOptions {
  resultId: string;
  text: string;
}

export type ShareChannel = "facebook" | "clipboard";

function getShareOrigin() {
  if (typeof window === "undefined") return "";
  if (env.shareBaseUrl) return env.shareBaseUrl;

  const { origin, hostname, protocol } = window.location;
  const previewMarker = "-git-";

  if (hostname.endsWith(".vercel.app") && hostname.includes(previewMarker)) {
    const [projectName] = hostname.split(previewMarker);
    return `${protocol}//${projectName}.vercel.app`;
  }

  return origin;
}

export function useResultShare({ resultId, text }: UseResultShareOptions) {
  const [isSharing, setIsSharing] = useState(false);
  const [lastChannel, setLastChannel] = useState<ShareChannel | null>(null);

  const shareUrl =
    typeof window === "undefined"
      ? ""
      : new URL(`/share/${resultId}/`, getShareOrigin()).toString();

  const shareToFacebook = useCallback(() => {
    if (typeof window === "undefined") return;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl,
    )}&quote=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    analytics.resultShared(resultId, "facebook");
    setLastChannel("facebook");
  }, [resultId, shareUrl, text]);

  const share = useCallback(async () => {
    setIsSharing(true);
    try {
      await navigator.clipboard.writeText(`${text} ${shareUrl}`);
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
  }, [shareToFacebook, shareUrl, text]);

  return { share, shareToFacebook, isSharing, lastChannel, shareUrl };
}
