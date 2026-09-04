import { CampaignBadgeImage, PanasonicGreenImpactImage } from "@/components/BrandAssets";
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
          <ContentContainer className="relative flex min-h-0 flex-1 flex-col items-center">
            <div className="mt-35">
              <HomeHero
                onStart={goNext}
                align="center"
                eyebrowPlacement="hidden"
                showActions={false}
                showSupporting={false}
              />
            </div>
            <div className="relative z-10 min-h-[15rem] w-full flex-1">
              <HomeForestCarousel className="absolute inset-x-0 top-2" />
            </div>
            <ContentContainer className="pointer-events-auto absolute inset-x-0 bottom-20 z-30 flex justify-center">
              <CampaignButton withArrow onClick={goNext} className="h-14 min-w-[13.75rem] px-8">
                {campaign.home.cta}
              </CampaignButton>
            </ContentContainer>
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
