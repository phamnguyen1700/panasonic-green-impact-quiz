import { CampaignBadgeImage, PanasonicGreenImpactImage } from "@/components/BrandAssets";
import { MotionScreen } from "@/components/MotionScreen";
import { ScreenBackground } from "@/components/ScreenBackground";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { FullscreenStage } from "@/components/layout/FullscreenStage";
import { assets } from "@/config/assets.config";
import { campaign } from "@/config/campaign.config";
import { useAppFlow, useIsMobile } from "@/hooks/app";
import { usePlayerStore } from "@/store/playerStore";
import { useState } from "react";

import { HomeHero } from "./components/HomeHero";

export function HomeScreen() {
  const { goNext } = useAppFlow("home");
  const isMobile = useIsMobile();
  const setPlayerInfo = usePlayerStore((state) => state.setPlayerInfo);
  const existingName = usePlayerStore((state) => state.player?.name ?? "");
  const [playerName, setPlayerName] = useState(existingName);
  const [nameError, setNameError] = useState<string | undefined>();
  const [step, setStep] = useState<"intro" | "rules">("intro");

  const handleNameChange = (value: string) => {
    setPlayerName(value);
    if (nameError) setNameError(undefined);
  };

  const handleStart = () => {
    const normalizedName = playerName.trim();
    if (!normalizedName) {
      setNameError(campaign.info.form.nameRequiredError);
      return;
    }

    setPlayerInfo({ name: normalizedName, createdAt: new Date().toISOString() });
    setStep("rules");
  };

  const handleBeginJourney = () => {
    goNext();
  };

  return (
    <MotionScreen>
      <ScreenBackground image={assets.backgrounds.home} scrim="soft" particles={16} />

      <FullscreenStage className="lg:h-[100svh] lg:overflow-hidden">
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

        {isMobile ? (
          <ContentContainer className="relative flex min-h-0 flex-1 flex-col items-center">
            <div className="mt-20 w-full">
              <HomeHero
                onStart={handleStart}
                onBeginJourney={handleBeginJourney}
                step={step}
                align="center"
                eyebrowPlacement="hidden"
                showSupporting={true}
                buttonClassName="h-12 min-w-[11.5rem] px-7 text-sm"
                playerName={playerName}
                nameError={nameError}
                onNameChange={handleNameChange}
              />
            </div>
          </ContentContainer>
        ) : (
          <>
            <ContentContainer className="relative z-40 flex flex-1 flex-col items-center justify-center text-center xl:-translate-y-20">
              <HomeHero
                onStart={handleStart}
                onBeginJourney={handleBeginJourney}
                step={step}
                align="center"
                eyebrowPlacement="hidden"
                buttonClassName="h-11 min-w-[10.5rem] px-6 text-sm"
                playerName={playerName}
                nameError={nameError}
                onNameChange={handleNameChange}
              />
            </ContentContainer>
          </>
        )}
      </FullscreenStage>
    </MotionScreen>
  );
}
