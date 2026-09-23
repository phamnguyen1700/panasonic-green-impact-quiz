import { useEffect, useMemo, useState } from "react";

import { campaign } from "@/config/campaign.config";
import { forestJourneyProfiles } from "@/data/forestJourney";
import { DEFAULT_RESULT_ID, getResultById } from "@/data/resultRules";
import { useAppFlow } from "@/hooks/app";
import { useResultShare } from "@/hooks/result";
import { analytics } from "@/services/analytics";
import { clearPlayerAvatar } from "@/services/player";
import { usePlayerStore } from "@/store/playerStore";
import { buildFileName } from "@/utils/image";

import { ResultContent } from "./components/ResultContent";

export function ResultScreen() {
  const copy = campaign.result;
  const { go } = useAppFlow("result");

  const player = usePlayerStore((state) => state.player);
  const outcome = usePlayerStore((state) => state.outcome);
  const resetPlayer = usePlayerStore((state) => state.resetPlayer);
  const [notice, setNotice] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const hasResult = Boolean(player?.name && outcome);

  useEffect(() => {
    analytics.screenView("result");
    if (!hasResult) {
      go("home");
    }
  }, [go, hasResult]);

  const result = useMemo(
    () => getResultById(outcome?.resultId ?? DEFAULT_RESULT_ID),
    [outcome?.resultId],
  );
  const resultProfile = useMemo(
    () => forestJourneyProfiles.find((profile) => profile.resultId === result.id),
    [result.id],
  );

  const fileName = useMemo(
    () => buildFileName([campaign.brand.name, result.title]),
    [result.title],
  );

  const getResultCardFile = async () => {
    const response = await fetch(result.image);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type || "image/png" });
  };

  const share = useResultShare({
    resultId: result.id,
    title: result.title,
    text: `${copy.sharePreviewCaption} ${copy.shareHashtags}`,
    getFile: getResultCardFile,
  });

  const handleDownload = () => {
    setIsDownloading(true);
    try {
      const link = document.createElement("a");
      link.href = result.image;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      analytics.resultDownloaded(result.id);
      setNotice(copy.saved);
      window.setTimeout(() => setNotice(null), 2600);
    } finally {
      window.setTimeout(() => setIsDownloading(false), 300);
    }
  };

  const handleShare = async () => {
    const channel = await share.share();
    if (channel === "clipboard") {
      setNotice(copy.shareFallback);
      window.setTimeout(() => setNotice(null), 2600);
    }
  };

  const handleReplay = () => {
    resetPlayer();
    clearPlayerAvatar();
    go("home");
  };

  return (
    <ResultContent
      result={result}
      playerName={player?.name}
      personalityDetail={resultProfile?.personalityDetail}
      notice={notice}
      isDownloading={isDownloading}
      isSharing={share.isSharing}
      onDownload={handleDownload}
      onShare={handleShare}
      onReplay={handleReplay}
    />
  );
}
