import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { CampaignBadgeImage, PanasonicGreenImpactImage } from "@/components/BrandAssets";
import { MotionScreen } from "@/components/MotionScreen";
import { ScreenBackground } from "@/components/ScreenBackground";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { FullscreenStage } from "@/components/layout/FullscreenStage";
import { assets } from "@/config/assets.config";
import { campaign } from "@/config/campaign.config";
import { floatingSlow, staggerContainer, staggerItem } from "@/config/motion.config";
import { forestJourneyProfiles } from "@/data/forestJourney";
import { DEFAULT_RESULT_ID, getResultById } from "@/data/resultRules";
import { useAppFlow, useIsMobile } from "@/hooks/app";
import { useResultShare } from "@/hooks/result";
import { analytics } from "@/services/analytics";
import { clearPlayerAvatar } from "@/services/player";
import { usePlayerStore } from "@/store/playerStore";
import { buildFileName } from "@/utils/image";

import { DownloadResultButton } from "./components/DownloadResultButton";
import { ResultPoster } from "./components/ResultPoster";
import { ResultReveal } from "./components/ResultReveal";
import { ShareResultButton } from "./components/ShareResultButton";

export function ResultScreen() {
  const copy = campaign.result;
  const { go } = useAppFlow("result");
  const isMobile = useIsMobile();

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

  const actions = (
    <>
      <DownloadResultButton onDownload={handleDownload} isBusy={isDownloading} />
      <ShareResultButton onShare={handleShare} isBusy={share.isSharing} />
    </>
  );

  return (
    <MotionScreen>
      <ScreenBackground image={assets.backgrounds.result} scrim="strong" particles={16} />

      <motion.div
        animate={floatingSlow}
        className="pointer-events-none absolute -left-24 top-24 size-72 rounded-full bg-lime-soft/12 blur-3xl"
      />
      <motion.div
        animate={floatingSlow}
        className="pointer-events-none absolute -right-20 bottom-10 size-80 rounded-full bg-cyan-soft/12 blur-3xl"
      />

      <FullscreenStage>
        {isMobile ? (
          <ContentContainer className="flex items-center justify-between pt-12 pb-3">
            <PanasonicGreenImpactImage className="h-8" />
            <CampaignBadgeImage className="h-10" />
          </ContentContainer>
        ) : (
          <ContentContainer className="flex items-center justify-between py-8">
            <PanasonicGreenImpactImage className="h-12" />
            <CampaignBadgeImage className="h-15" />
          </ContentContainer>
        )}

        <ContentContainer className="flex flex-1 flex-col justify-center gap-6 pb-8 lg:gap-8 lg:pb-10">
          <ResultReveal result={result} playerName={player?.name} />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mx-auto grid w-full max-w-4xl items-start gap-6 lg:grid-cols-[minmax(0,16rem)_minmax(0,24rem)] lg:justify-center lg:gap-12"
          >
            <motion.div variants={staggerItem} className="mx-auto flex w-full max-w-[13.5rem] items-start justify-center lg:max-w-[15rem]">
              <ResultPoster result={result} />
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="mx-auto flex w-full max-w-md flex-col justify-start text-center lg:text-left"
            >
              <p className="text-base leading-relaxed text-mist/85 lg:text-lg">
                {resultProfile?.personalityDetail}
              </p>

              <div className="mt-7 flex w-full flex-nowrap justify-center gap-3 lg:justify-start">
                {actions}
              </div>

              <div className="mt-5 flex justify-center lg:justify-end">
                <button
                  type="button"
                  onClick={handleReplay}
                  className="inline-flex items-center gap-2 text-sm text-mist/70 transition-colors hover:text-mist"
                >
                  <RotateCcw className="size-4" aria-hidden />
                  {copy.replay}
                </button>
              </div>

              {notice ? (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-xs text-lime-soft"
                >
                  {notice}
                </motion.p>
              ) : null}
            </motion.div>
          </motion.div>
        </ContentContainer>
      </FullscreenStage>
    </MotionScreen>
  );
}
