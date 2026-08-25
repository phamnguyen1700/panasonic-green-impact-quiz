import { MotionScreen } from "@/components/MotionScreen";
import { ScreenBackground } from "@/components/ScreenBackground";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { FullscreenStage } from "@/components/layout/FullscreenStage";
import { assets } from "@/config/assets.config";
import { campaign } from "@/config/campaign.config";
import { useAppFlow } from "@/hooks/useAppFlow";

import { FloatingForestCards } from "./components/FloatingForestCards";
import { HomeHero } from "./components/HomeHero";

export function HomeScreen() {
  const { goNext } = useAppFlow("home");

  return (
    <MotionScreen>
      <ScreenBackground image={assets.backgrounds.home} scrim="medium" particles={16} />

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

        <ContentContainer className="flex flex-1 flex-col items-center gap-10 pb-20 lg:flex-row lg:justify-between lg:gap-6">
          <HomeHero onStart={goNext} />
          <div className="w-full max-w-[42rem] lg:w-1/2">
            <FloatingForestCards />
          </div>
        </ContentContainer>
      </FullscreenStage>
    </MotionScreen>
  );
}
