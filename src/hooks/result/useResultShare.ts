import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";

import { env } from "@/config/env.config";
import { analytics } from "@/services/analytics";

interface UseResultShareOptions {
  resultId: string;
  text: string;
}

export type ShareChannel = "facebook" | "clipboard" | "native";

export type NativeShareResult = "handed-off" | "cancelled" | "unsupported" | "failed";

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
  const [isFacebookSharing, setIsFacebookSharing] = useState(false);

  const [lastChannel, setLastChannel] = useState<ShareChannel | null>(null);

  const shareUrl =
    typeof window === "undefined"
      ? ""
      : new URL(`/share/${resultId}/`, getShareOrigin()).toString();

  // Existing Facebook Sharing
  const shareToFacebook = useCallback(() => {
    if (typeof window === "undefined") return;

    const url = new URL("https://www.facebook.com/sharer/sharer.php");

    url.searchParams.set("u", shareUrl);
    url.searchParams.set("hashtag", "#5NamSongKhoeGopXanh\n#PGI2026\n");

    window.open(url.toString(), "_blank", "noopener,noreferrer");

    analytics.resultShared(resultId, "facebook");
    setLastChannel("facebook");
  }, [resultId, shareUrl]);

  // Existing sharing flow
  const share = useCallback(async () => {
    setIsFacebookSharing(true);

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
      setIsFacebookSharing(false);
    }
  }, [shareToFacebook, shareUrl, text]);

  // Native Share Mutation
  const nativeShareMutation = useMutation<NativeShareResult, Error, Promise<void>>({
    mutationKey: ["result-share", "native", resultId],

    retry: false,

    mutationFn: async (sharePromise) => {
      try {
        await sharePromise;

        analytics.resultShared(resultId, "native");
        setLastChannel("native");

        return "handed-off";
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return "cancelled";
        }

        console.error("Native share failed:", error);

        return "failed";
      }
    },
  });

  const shareNative = useCallback((): Promise<NativeShareResult> => {
    if (typeof navigator === "undefined" || typeof navigator.share !== "function") {
      return Promise.resolve("unsupported");
    }

    try {
      // Start directly from the user's click.
      // Do not await anything before this call.
      const sharePromise = navigator.share({
        title: "Bạn là loại rừng nào? | Panasonic Green Impact",
        text,
        url: shareUrl,
      });

      // TanStack Query tracks the native share lifecycle.
      return nativeShareMutation.mutateAsync(sharePromise);
    } catch (error) {
      console.error("Native share failed:", error);

      return Promise.resolve("failed");
    }
  }, [text, shareUrl, nativeShareMutation.mutateAsync]);

  return {
    share,
    shareNative,
    shareToFacebook,

    isSharing: isFacebookSharing || nativeShareMutation.isPending,

    isNativeSharing: nativeShareMutation.isPending,

    nativeShareStatus: nativeShareMutation.data,

    lastChannel,
    shareUrl,
  };
}
