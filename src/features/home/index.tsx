import { BrandLogoHeader } from "@/components/BrandLogoHeader";
import { MotionScreen } from "@/components/MotionScreen";
import { ScreenBackground } from "@/components/ScreenBackground";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { FullscreenStage } from "@/components/layout/FullscreenStage";
import { assets } from "@/config/assets.config";
import { campaign } from "@/config/campaign.config";
import { useAppFlow, useIsMobile } from "@/hooks/app";
import { usePlayerStore } from "@/store/playerStore";
import { useState } from "react";

import { FloatingForestCards } from "./components/FloatingForestCards";
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
      <ScreenBackground image={assets.backgrounds.home} scrim="medium" particles={16} />

      <FullscreenStage className="lg:h-[100svh] lg:overflow-hidden">
        <FloatingForestCards fixed />

        <BrandLogoHeader />

        {isMobile ? (
          <ContentContainer className="relative z-20 flex min-h-0 flex-1 flex-col items-center">
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
            <ContentContainer className="relative z-20 flex flex-1 flex-col items-center justify-center text-center xl:-translate-y-20">
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
