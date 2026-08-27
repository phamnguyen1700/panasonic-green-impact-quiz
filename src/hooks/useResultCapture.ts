import { useCallback, useRef, useState } from "react";

import { buildFileName, dataUrlToFile, downloadDataUrl } from "@/utils/image";

interface UseResultCaptureOptions {
  fileNameParts: Array<string | undefined>;
  pixelRatio?: number;
}

/** Turns a DOM node (the result poster) into a shareable PNG. */
export function useResultCapture({ fileNameParts, pixelRatio = 2 }: UseResultCaptureOptions) {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const capture = useCallback(async (): Promise<string | null> => {
    if (!targetRef.current) return null;
    setIsCapturing(true);
    setError(null);
    try {
      const { toPng } = await import("html-to-image");
      return await toPng(targetRef.current, {
        pixelRatio,
        cacheBust: true,
        skipFonts: false,
      });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "capture_failed");
      return null;
    } finally {
      setIsCapturing(false);
    }
  }, [pixelRatio]);

  const fileName = buildFileName(fileNameParts);

  const download = useCallback(async (): Promise<boolean> => {
    const dataUrl = await capture();
    if (!dataUrl) return false;
    downloadDataUrl(dataUrl, fileName);
    return true;
  }, [capture, fileName]);

  const captureFile = useCallback(async (): Promise<File | null> => {
    const dataUrl = await capture();
    return dataUrl ? dataUrlToFile(dataUrl, fileName) : null;
  }, [capture, fileName]);

  return { targetRef, capture, captureFile, download, isCapturing, error, fileName };
}
