import { useState } from "react";

import { MotionScreen } from "@/components/MotionScreen";
import { ScreenBackground } from "@/components/ScreenBackground";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { FullscreenStage } from "@/components/layout/FullscreenStage";
import { assets } from "@/config/assets.config";
import { campaign } from "@/config/campaign.config";
import { FloatingForestCards } from "@/features/home/components/FloatingForestCards";
import { useAppFlow } from "@/hooks/useAppFlow";
import { useIsMobile } from "@/hooks/use-mobile";
import type { PlayerInfo } from "@/types/player.types";

import { CampaignIntro } from "./components/CampaignIntro";
import { PlayerInfoForm } from "./components/PlayerInfoForm";
import { PlayerPhotoForm } from "./components/PlayerPhotoForm";

export function InfoScreen() {
  const { goBack, goNext } = useAppFlow("info");
  const isMobile = useIsMobile();
  const [player, setPlayer] = useState<PlayerInfo | null>(null);

  return (
    <MotionScreen>
      <ScreenBackground image={assets.backgrounds.info} scrim="strong" particles={10} />

      <FullscreenStage>
        {isMobile ? (
          <ContentContainer className="flex flex-col items-center gap-5 py-8 text-center">
            <div>
              <p className="font-display text-2xl font-extrabold tracking-[0.18em] text-mist text-shadow-scene uppercase">
                Panasonic
              </p>
              <p className="mt-2 text-xs tracking-[0.28em] text-mist/75 uppercase">Green Impact</p>
            </div>
            <p className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-medium tracking-[0.16em] text-mist/90 uppercase backdrop-blur-md">
              {campaign.home.eyebrow}
            </p>
          </ContentContainer>
        ) : (
          <ContentContainer className="flex items-center justify-between py-8">
            <p className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-medium tracking-[0.16em] text-mist/90 uppercase backdrop-blur-md">
              {campaign.home.eyebrow}
            </p>
            <p className="text-xs tracking-[0.16em] text-mist/70 uppercase">
              {campaign.brand.tagline}
            </p>
          </ContentContainer>
        )}

        {isMobile ? (
          <ContentContainer className="flex flex-1 flex-col items-center gap-8 pb-8">
            <CampaignIntro align="center" />

            <div className="mt-auto flex w-full justify-center">
              {player ? (
                <PlayerPhotoForm
                  player={player}
                  onSubmitted={goNext}
                  onBack={() => setPlayer(null)}
                />
              ) : (
                <PlayerInfoForm onSubmitted={setPlayer} onBack={goBack} />
              )}
            </div>
          </ContentContainer>
        ) : (
          <ContentContainer className="flex flex-1 flex-col gap-12 pb-20 lg:flex-row lg:items-center lg:justify-between">
            <div className="w-full max-w-2xl space-y-14">
              <CampaignIntro />
              <FloatingForestCards compact align="left" />
            </div>

            <div className="flex w-full justify-center lg:w-auto">
              {player ? (
                <PlayerPhotoForm
                  player={player}
                  onSubmitted={goNext}
                  onBack={() => setPlayer(null)}
                />
              ) : (
                <PlayerInfoForm onSubmitted={setPlayer} onBack={goBack} />
              )}
            </div>
          </ContentContainer>
        )}
      </FullscreenStage>
    </MotionScreen>
  );
}
