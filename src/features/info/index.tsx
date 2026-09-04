import { MotionScreen } from "@/components/MotionScreen";
import { ScreenBackground } from "@/components/ScreenBackground";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { FullscreenStage } from "@/components/layout/FullscreenStage";
import { assets } from "@/config/assets.config";
import { campaign } from "@/config/campaign.config";
import { useAppFlow } from "@/hooks/useAppFlow";

import { CampaignIntro } from "./components/CampaignIntro";
import { ForestPreviewCards } from "./components/ForestPreviewCards";
import { PlayerInfoForm } from "./components/PlayerInfoForm";

export function InfoScreen() {
  const { goBack, goNext } = useAppFlow("info");

  return (
    <MotionScreen>
      <ScreenBackground image={assets.backgrounds.info} scrim="strong" particles={10} />

      <FullscreenStage>
        <ContentContainer className="flex items-center justify-between py-8">
          <p className="font-display text-sm leading-tight font-semibold text-mist">
            <span className="mr-2 text-2xl font-extrabold">5</span>
            {campaign.brand.name}
          </p>
          <p className="hidden text-xs tracking-[0.16em] text-mist/70 uppercase sm:block">
            {campaign.brand.tagline}
          </p>
        </ContentContainer>

        <ContentContainer className="flex flex-1 flex-col gap-12 pb-20 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl space-y-10">
            <CampaignIntro />
            <ForestPreviewCards />
          </div>

          <div className="flex w-full justify-center lg:w-auto">
            <PlayerInfoForm onSubmitted={() => goNext()} onBack={goBack} />
          </div>
        </ContentContainer>
      </FullscreenStage>
    </MotionScreen>
  );
}
