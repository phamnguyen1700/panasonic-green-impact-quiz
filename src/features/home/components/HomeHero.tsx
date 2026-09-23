import { AnimatePresence, motion } from "framer-motion";
import { User } from "lucide-react";

import { CampaignBadgeImage, HomeTitleImage } from "@/components/BrandAssets";
import { CampaignButton } from "@/components/CampaignButton";
import { campaign } from "@/config/campaign.config";
import {
  homeStepItem,
  homeStepPanel,
  revealText,
  staggerContainer,
  staggerItem,
} from "@/config/motion.config";

interface HomeHeroProps {
  onStart: () => void;
  onBeginJourney: () => void;
  step: "intro" | "rules";
  align?: "left" | "center";
  eyebrowPlacement?: "top" | "hidden";
  showActions?: boolean;
  showSupporting?: boolean;
  buttonClassName?: string;
  playerName: string;
  nameError?: string | undefined;
  onNameChange: (value: string) => void;
}

export function HomeHero({
  onStart,
  onBeginJourney,
  step,
  align = "left",
  eyebrowPlacement = "top",
  showActions = true,
  showSupporting = true,
  buttonClassName,
  playerName,
  nameError,
  onNameChange,
}: HomeHeroProps) {
  const copy = campaign.home;
  const isCentered = align === "center";
  const panelViewportClassName = "relative min-h-[13.5rem] w-full";
  const panelClassName = `absolute inset-x-0 top-0 flex w-full flex-col gap-4 ${
    isCentered ? "items-center" : "items-start"
  }`;
  const copyGroupClassName = `flex flex-col gap-3 ${isCentered ? "items-center" : "items-start"}`;
  const copyClassName = `text-xs leading-relaxed text-mist/80 text-shadow-scene sm:text-sm ${
    isCentered ? "mx-auto max-w-4xl" : "ml-5 max-w-2xl"
  }`;
  const rulesCopyClassName = `text-xs leading-relaxed text-mist/80 text-shadow-scene sm:text-sm ${
    isCentered ? "mx-auto max-w-md" : "ml-5 max-w-sm"
  }`;
  const exitAround = {
    first: { x: isCentered ? -34 : -24, y: -20 },
    second: { x: isCentered ? 34 : 18, y: -16 },
    action: { x: 0, y: 28 },
  };
  const eyebrow = (
    <motion.div variants={staggerItem} className="inline-flex items-center">
      <CampaignBadgeImage className={isCentered ? "h-8" : "h-10"} />
    </motion.div>
  );

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={isCentered ? "mx-auto w-full max-w-4xl text-center" : "max-w-xl"}
    >
      {eyebrowPlacement === "top" ? (
        <div className={isCentered ? "mb-4" : "mb-7"}>{eyebrow}</div>
      ) : null}

      <motion.div variants={revealText} className={isCentered ? "mx-auto" : ""}>
        <HomeTitleImage
          className={isCentered ? "mx-auto max-h-45 max-w-[28rem]" : "max-w-[34rem]"}
        />
      </motion.div>

      {showActions ? (
        <div className={panelViewportClassName}>
          <AnimatePresence mode="wait">
            {step === "intro" ? (
              <motion.div
                key="home-intro"
                variants={homeStepPanel}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={panelClassName}
              >
                {showSupporting ? (
                  <div className={copyGroupClassName}>
                    {copy.supporting.map((line, index) => (
                      <motion.p
                        key={line}
                        custom={index === 0 ? exitAround.first : exitAround.second}
                        variants={homeStepItem}
                        className={copyClassName}
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>
                ) : null}

                <motion.form
                  custom={exitAround.action}
                  variants={homeStepItem}
                  className={`flex w-full flex-col gap-4 ${
                    isCentered ? "items-center" : "items-start"
                  }`}
                  onSubmit={(event) => {
                    event.preventDefault();
                    onStart();
                  }}
                >
                  <div className="w-full max-w-[20rem]">
                    <div className="relative">
                      <input
                        value={playerName}
                        onChange={(event) => onNameChange(event.target.value)}
                        placeholder="Tên của bạn là.."
                        autoComplete="name"
                        className={`h-12 w-full rounded-lg border bg-white/10 px-4 pr-11 text-sm font-semibold text-mist shadow-[0_0_28px_oklch(0.88_0.2_128_/_0.16)] backdrop-blur-md transition-colors outline-none placeholder:text-mist/60 hover:border-lime-soft/45 focus:border-lime-soft/80 focus:bg-white/15 ${
                          nameError ? "border-sun-glow/80" : "border-transparent"
                        }`}
                      />
                      <User
                        className="pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2 text-mist/75"
                        aria-hidden
                      />
                    </div>
                    {nameError ? <p className="mt-2 text-xs text-sun-soft">{nameError}</p> : null}
                  </div>

                  <div
                    className={`flex flex-wrap items-center gap-5 ${
                      isCentered ? "justify-center" : "justify-start"
                    }`}
                  >
                    <CampaignButton withArrow type="submit" className={buttonClassName}>
                      {copy.cta}
                    </CampaignButton>
                    <span className="text-sm text-mist/65">{copy.footnote}</span>
                  </div>
                </motion.form>
              </motion.div>
            ) : (
              <motion.div
                key="home-rules"
                variants={homeStepPanel}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={panelClassName}
              >
                <div className={copyGroupClassName}>
                  {copy.rules.map((line, index) => (
                    <motion.p
                      key={line}
                      custom={index === 0 ? exitAround.first : exitAround.second}
                      variants={homeStepItem}
                      className={rulesCopyClassName}
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>

                <motion.div
                  custom={exitAround.action}
                  variants={homeStepItem}
                  className={`flex flex-wrap items-center gap-5 ${
                    isCentered ? "justify-center" : "justify-start"
                  }`}
                >
                  <CampaignButton
                    type="button"
                    onClick={onBeginJourney}
                    className={buttonClassName}
                  >
                    {copy.startJourney}
                  </CampaignButton>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : null}
    </motion.div>
  );
}
