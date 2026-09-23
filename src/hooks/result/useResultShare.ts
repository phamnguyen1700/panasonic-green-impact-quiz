import { useCallback, useState } from "react";

import { env } from "@/config/env.config";
import { analytics } from "@/services/analytics";

interface UseResultShareOptions {
  resultId: string;
  text: string;
}

export type ShareChannel = "facebook" | "clipboard" | "native";

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

function isMobileShareDevice() {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;

  return (
    window.matchMedia("(pointer: coarse)").matches ||
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
  );
}

function getPrimaryHashtag(text: string) {
  return text.match(/#[^\s#]+/)?.[0] ?? "#SongKhoeGopXanh";
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

    const url = new URL("https://www.facebook.com/sharer/sharer.php");

    url.searchParams.set("u", shareUrl);
    url.searchParams.set("quote", text);
    url.searchParams.set("hashtag", getPrimaryHashtag(text));

    window.open(url.toString(), "_blank", "noopener,noreferrer");

    analytics.resultShared(resultId, "facebook");
    setLastChannel("facebook");
  }, [resultId, shareUrl, text]);

  const shareNative = useCallback(async () => {
    if (typeof navigator === "undefined" || typeof navigator.share !== "function") {
      return false;
    }

    try {
      await navigator.share({
        title: "Bạn là loại rừng nào? | Panasonic Green Impact",
        text,
        url: shareUrl,
      });

      analytics.resultShared(resultId, "native");
      setLastChannel("native");

      return true;
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return true;
      }

      return false;
    }
  }, [resultId, shareUrl, text]);

  const copyShareText = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return false;

    try {
      await navigator.clipboard.writeText(`${text}\n${shareUrl}`);
      return true;
    } catch {
      return false;
    }
  }, [shareUrl, text]);

  const share = useCallback(async () => {
    setIsSharing(true);

    try {
      if (isMobileShareDevice()) {
        const didShareNative = await shareNative();

        if (didShareNative) {
          return "native" as const;
        }
      }

      const didCopy = await copyShareText();

      shareToFacebook();

      return didCopy ? ("facebook" as const) : null;
    } finally {
      setIsSharing(false);
    }
  }, [copyShareText, shareNative, shareToFacebook]);

  const copyToClipboard = useCallback(async () => {
    const didCopy = await copyShareText();

    if (didCopy) {
      setLastChannel("clipboard");
      return "clipboard" as const;
    }

    return null;
  }, [copyShareText]);

  return {
    share,
    shareNative,
    shareToFacebook,
    copyToClipboard,

    isSharing,
    lastChannel,
    shareUrl,
  };
}
