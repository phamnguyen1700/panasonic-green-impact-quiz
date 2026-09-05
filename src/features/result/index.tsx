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
import { DEFAULT_RESULT_ID, getResultById } from "@/data/resultRules";
import { useAppFlow } from "@/hooks/useAppFlow";
import { useResultCapture } from "@/hooks/useResultCapture";
import { useResultShare } from "@/hooks/useResultShare";
import { analytics } from "@/services/analytics.service";
import { clearPlayerAvatar } from "@/services/playerAvatar.service";
import { usePlayerStore } from "@/store/playerStore";

import { DownloadResultButton } from "./components/DownloadResultButton";
import { ResultCardModal } from "./components/ResultCardModal";
import { ResultPoster } from "./components/ResultPoster";
import { ResultReveal } from "./components/ResultReveal";
import { SharePreview } from "./components/SharePreview";
import { ShareResultButton } from "./components/ShareResultButton";

export function ResultScreen() {
  const copy = campaign.result;
  const { go } = useAppFlow("result");

  const player = usePlayerStore((state) => state.player);
  const outcome = usePlayerStore((state) => state.outcome);
  const resetPlayer = usePlayerStore((state) => state.resetPlayer);
  const [modalOpen, setModalOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const hasResult = Boolean(player?.name && player.phone && outcome);

  useEffect(() => {
    analytics.screenView("result");
    if (!hasResult) {
      go("info");
      return undefined;
    }

    const timeout = window.setTimeout(() => setModalOpen(true), 2200);
    return () => window.clearTimeout(timeout);
  }, [go, hasResult]);

  const result = useMemo(
    () => getResultById(outcome?.resultId ?? DEFAULT_RESULT_ID),
    [outcome?.resultId],
  );

  const capture = useResultCapture({
    fileNameParts: [campaign.brand.name, result.title, player?.name],
  });

  const share = useResultShare({
    resultId: result.id,
    title: result.title,
    text: `${copy.sharePreviewCaption} ${copy.shareHashtags}`,
    getFile: capture.captureFile,
  });

  const handleDownload = async () => {
    const ok = await capture.download();
    if (ok) {
      analytics.resultDownloaded(result.id);
      setNotice(copy.saved);
      window.setTimeout(() => setNotice(null), 2600);
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
    go("info");
  };

  const actions = (
    <>
      <DownloadResultButton onDownload={handleDownload} isBusy={capture.isCapturing} />
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
        <ContentContainer className="flex items-center justify-between pt-12 pb-3 sm:py-8">
          <CampaignBadgeImage className="h-16 sm:h-15" />
          <PanasonicGreenImpactImage className="h-14 sm:h-12" />
        </ContentContainer>

        <ContentContainer className="flex flex-1 flex-col justify-center gap-12 pb-20">
          <ResultReveal result={result} playerName={player?.name} />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid items-center gap-12 lg:grid-cols-[minmax(0,22rem)_1fr_minmax(0,22rem)]"
          >
            <motion.div variants={staggerItem} className="mx-auto w-full max-w-xs">
              <ResultPoster ref={capture.targetRef} result={result} playerName={player?.name} />
            </motion.div>

            <motion.div variants={staggerItem} className="space-y-6 text-center lg:text-left">
              <p className="text-sm leading-relaxed text-mist/80">{result.description}</p>

              <div>
                <p className="text-[0.65rem] tracking-[0.18em] text-mist/50 uppercase">
                  {copy.impactLabel}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-mist/75">{result.impact}</p>
              </div>

              <div className="flex flex-wrap justify-center gap-3 lg:justify-start">{actions}</div>

              <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="text-sm text-mist/70 underline-offset-4 transition-colors hover:text-mist hover:underline"
                >
                  {copy.eyebrow}
                </button>
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
                  className="text-xs text-lime-soft"
                >
                  {notice}
                </motion.p>
              ) : null}
            </motion.div>

            <motion.div variants={staggerItem} className="mx-auto">
              <SharePreview result={result} playerName={player?.name} />
            </motion.div>
          </motion.div>
        </ContentContainer>
      </FullscreenStage>

      <ResultCardModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        result={result}
        playerName={player?.name}
        poster={<ResultPoster result={result} playerName={player?.name} />}
        actions={actions}
      />
    </MotionScreen>
  );
}
