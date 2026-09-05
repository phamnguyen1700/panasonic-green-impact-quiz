import { CampaignBadgeImage, PanasonicGreenImpactImage } from "@/components/BrandAssets";
import { MotionScreen } from "@/components/MotionScreen";
import { ScreenBackground } from "@/components/ScreenBackground";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { FullscreenStage } from "@/components/layout/FullscreenStage";
import { assets } from "@/config/assets.config";
import { FloatingForestCards } from "@/features/home/components/FloatingForestCards";
import { useAppFlow } from "@/hooks/useAppFlow";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePlayerStore } from "@/store/playerStore";

import { CampaignIntro } from "./components/CampaignIntro";
import { PlayerInfoForm } from "./components/PlayerInfoForm";
import { PlayerPhotoForm } from "./components/PlayerPhotoForm";

export function InfoScreen() {
  const { goBack, goNext } = useAppFlow("info");
  const isMobile = useIsMobile();
  const player = usePlayerStore((state) => state.player);
  const resetPlayer = usePlayerStore((state) => state.resetPlayer);

  return (
    <MotionScreen>
      <ScreenBackground image={assets.backgrounds.info} scrim="strong" particles={10} />

      <FullscreenStage>
        {isMobile ? (
          <ContentContainer className="flex items-center justify-between pt-12 pb-3">
            <CampaignBadgeImage className="h-16" />
            <PanasonicGreenImpactImage className="h-14" />
          </ContentContainer>
        ) : (
          <ContentContainer className="flex items-center justify-between py-8">
            <CampaignBadgeImage className="h-15" />
            <PanasonicGreenImpactImage className="h-12" />
          </ContentContainer>
        )}

        {isMobile ? (
          <ContentContainer className="flex flex-1 flex-col items-center gap-8 pb-8">
            <div className="mt-30">
              <CampaignIntro align="center" />
            </div>

            <div className="mt-5 flex w-full justify-center">
              {player ? (
                <PlayerPhotoForm player={player} onSubmitted={goNext} onBack={resetPlayer} />
              ) : (
                <PlayerInfoForm onBack={goBack} />
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
                <PlayerPhotoForm player={player} onSubmitted={goNext} onBack={resetPlayer} />
              ) : (
                <PlayerInfoForm onBack={goBack} />
              )}
            </div>
          </ContentContainer>
        )}
      </FullscreenStage>
    </MotionScreen>
  );
}
