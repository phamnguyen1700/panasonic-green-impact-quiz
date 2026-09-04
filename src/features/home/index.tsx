import { CampaignButton } from "@/components/CampaignButton";
import { MotionScreen } from "@/components/MotionScreen";
import { ScreenBackground } from "@/components/ScreenBackground";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { FullscreenStage } from "@/components/layout/FullscreenStage";
import { assets } from "@/config/assets.config";
import { campaign } from "@/config/campaign.config";
import { useAppFlow } from "@/hooks/useAppFlow";
import { useIsMobile } from "@/hooks/use-mobile";

import { FloatingForestCards } from "./components/FloatingForestCards";
import { HomeForestCarousel } from "./components/HomeForestCarousel";
import { HomeHero } from "./components/HomeHero";

export function HomeScreen() {
  const { goNext } = useAppFlow("home");
  const isMobile = useIsMobile();

  return (
    <MotionScreen>
      <ScreenBackground image={assets.backgrounds.home} scrim="medium" particles={16} />

      <FullscreenStage>
        {isMobile ? (
          <ContentContainer className="flex justify-center py-8 text-center">
            <div>
              <p className="font-display text-2xl font-extrabold tracking-[0.18em] text-mist text-shadow-scene uppercase">
                Panasonic
              </p>
              <p className="mt-2 text-xs tracking-[0.28em] text-mist/75 uppercase">Green Impact</p>
            </div>
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
          <ContentContainer className="flex flex-1 flex-col items-center justify-start pb-12">
            <HomeHero onStart={goNext} align="center" showActions={false} showSupporting={false} />
            <HomeForestCarousel className="mt-10" />
            <CampaignButton withArrow onClick={goNext} className="mt-3 h-14 min-w-[13.75rem] px-8">
              {campaign.home.cta}
            </CampaignButton>
          </ContentContainer>
        ) : (
          <ContentContainer className="flex flex-1 flex-col items-center gap-10 pb-20 lg:flex-row lg:justify-between lg:gap-6">
            <HomeHero
              onStart={goNext}
              eyebrowPlacement="hidden"
              buttonClassName="min-w-[13rem] px-10"
            />
            <div className="w-full max-w-[42rem] lg:w-1/2">
              <FloatingForestCards />
            </div>
          </ContentContainer>
        )}
      </FullscreenStage>
    </MotionScreen>
  );
}
