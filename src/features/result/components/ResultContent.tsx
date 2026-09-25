import { motion } from "framer-motion";
import { Download, RotateCcw, Share2 } from "lucide-react";

import { BrandLogoHeader } from "@/components/BrandLogoHeader";
import { CampaignButton } from "@/components/CampaignButton";
import { MotionScreen } from "@/components/MotionScreen";
import { ScreenBackground } from "@/components/ScreenBackground";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { FullscreenStage } from "@/components/layout/FullscreenStage";
import { assets } from "@/config/assets.config";
import { campaign } from "@/config/campaign.config";
import { staggerContainer, staggerItem } from "@/config/motion.config";
import type { ForestResult } from "@/types/result.types";

import { ResultCard } from "./ResultCard";
import { ResultReveal } from "./ResultShowcase";

interface ResultContentProps {
  result: ForestResult;
  playerName?: string | undefined;
  personalityDetail?: string | undefined;
  notice?: string | null;
  isDownloading: boolean;
  isSharing: boolean;
  onDownload: () => void;
  onShare: () => void;
  onReplay: () => void;
}

export function ResultContent({
  result,
  playerName,
  personalityDetail,
  notice,
  isDownloading,
  isSharing,
  onDownload,
  onShare,
  onReplay,
}: ResultContentProps) {
  const copy = campaign.result;

  return (
    <MotionScreen>
      <ScreenBackground image={assets.backgrounds.result} scrim="strong" particles={16} />

      <FullscreenStage>
        <BrandLogoHeader />

        <ContentContainer className="flex flex-1 -translate-y-2 flex-col justify-center gap-5 pb-7 lg:-translate-y-10 lg:gap-6 lg:pb-9">
          <ResultReveal result={result} playerName={playerName} />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mx-auto grid w-full max-w-[51rem] items-start gap-5 lg:grid-cols-[minmax(0,20rem)_minmax(0,21rem)] lg:items-stretch lg:justify-center lg:gap-5"
          >
            <motion.div
              variants={staggerItem}
              className="mx-auto flex w-full max-w-[18.5rem] items-start justify-center lg:max-w-[20rem]"
            >
              <ResultCard result={result} />
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="mx-auto flex h-full w-full max-w-sm flex-col justify-start text-center lg:text-left"
            >
              <p className="whitespace-pre-line text-sm leading-relaxed text-mist/85 lg:text-[0.95rem]">
                {personalityDetail}
              </p>

              <div className="mt-6 lg:mt-auto">
                <div className="flex w-full flex-nowrap justify-center gap-3 lg:justify-start">
                  <CampaignButton
                    size="md"
                    onClick={onDownload}
                    disabled={isDownloading}
                    wrapperClassName="min-w-0 flex-1 sm:flex-none"
                    className="h-11 min-w-0 px-4 text-xs sm:min-w-[10.25rem] sm:px-4"
                  >
                    <Download className="size-4 shrink-0" aria-hidden />
                    <span>{isDownloading ? copy.downloading : copy.download}</span>
                  </CampaignButton>

                  <CampaignButton
                    variant="outline"
                    size="md"
                    onClick={onShare}
                    disabled={isSharing}
                    wrapperClassName="min-w-0 flex-1 sm:flex-none"
                    className="h-11 min-w-0 px-4 text-xs sm:min-w-[10.25rem] sm:px-4"
                  >
                    <Share2 className="size-4 shrink-0" aria-hidden />
                    <span>{isSharing ? copy.sharing : copy.share}</span>
                  </CampaignButton>
                </div>

                <div className="mt-3 flex justify-center lg:justify-end">
                  <button
                    type="button"
                    onClick={onReplay}
                    className="inline-flex items-center gap-2 text-xs text-mist/70 transition-colors hover:text-mist"
                  >
                    <RotateCcw className="size-4" aria-hidden />
                    {copy.replay}
                  </button>
                </div>

                {notice ? (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-xs text-lime-soft"
                  >
                    {notice}
                  </motion.p>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        </ContentContainer>
      </FullscreenStage>
    </MotionScreen>
  );
}
