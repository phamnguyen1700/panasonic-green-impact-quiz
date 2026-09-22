import { motion } from "framer-motion";
import { User } from "lucide-react";

import { CampaignBadgeImage, HomeTitleImage } from "@/components/BrandAssets";
import { CampaignButton } from "@/components/CampaignButton";
import { campaign } from "@/config/campaign.config";
import { revealText, staggerContainer, staggerItem } from "@/config/motion.config";

interface HomeHeroProps {
  onStart: () => void;
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
      className={isCentered ? "mx-auto max-w-2xl text-center" : "max-w-xl"}
    >
      {eyebrowPlacement === "top" ? (
        <div className={isCentered ? "mb-4" : "mb-7"}>{eyebrow}</div>
      ) : null}

      <motion.div variants={revealText} className={isCentered ? "mx-auto" : ""}>
        <HomeTitleImage
          className={isCentered ? "mx-auto max-h-45 max-w-[28rem]" : "max-w-[34rem]"}
        />
      </motion.div>

      {showSupporting ? (
        <motion.p
          variants={staggerItem}
          className={`mt-3 text-sm leading-relaxed text-mist/80 text-shadow-scene sm:text-base ${
            isCentered ? "mx-auto max-w-2xl" : "ml-5 max-w-md"
          }`}
        >
          {copy.supporting}
        </motion.p>
      ) : null}

      {showActions ? (
        <motion.div
          variants={staggerItem}
          className={`mt-10 flex w-full flex-col gap-4 ${isCentered ? "items-center" : "items-start"}`}
        >
          <form
            className={`flex w-full flex-col gap-4 ${isCentered ? "items-center" : "items-start"}`}
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
                  className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-mist/75"
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
          </form>
        </motion.div>
      ) : null}
    </motion.div>
  );
}
