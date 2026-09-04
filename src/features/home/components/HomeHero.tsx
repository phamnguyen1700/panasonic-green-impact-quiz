import { motion } from "framer-motion";

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
}

export function HomeHero({
  onStart,
  align = "left",
  eyebrowPlacement = "top",
  showActions = true,
  showSupporting = true,
  buttonClassName,
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
          className={`mt-7 ml-5 text-base leading-relaxed text-mist/80 text-shadow-scene sm:text-lg ${
            isCentered ? "mx-auto max-w-2xl" : "max-w-md"
          }`}
        >
          {copy.supporting}
        </motion.p>
      ) : null}

      {showActions ? (
        <motion.div
          variants={staggerItem}
          className={`mt-10 flex flex-col gap-4 ${isCentered ? "items-center" : "items-start"}`}
        >
          <div className="flex flex-wrap items-center gap-5">
            <CampaignButton withArrow onClick={onStart} className={buttonClassName}>
              {copy.cta}
            </CampaignButton>
            <span className="text-sm text-mist/65">{copy.footnote}</span>
          </div>
        </motion.div>
      ) : null}
    </motion.div>
  );
}
