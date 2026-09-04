import { motion } from "framer-motion";

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
    <motion.p
      variants={staggerItem}
      className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-medium tracking-[0.16em] text-mist/90 uppercase backdrop-blur-md"
    >
      {copy.eyebrow}
    </motion.p>
  );

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={isCentered ? "mx-auto max-w-2xl text-center" : "max-w-xl"}
    >
      {eyebrowPlacement === "top" ? <div className="mb-6">{eyebrow}</div> : null}

      <h1 className="font-display leading-[0.92] tracking-tight text-shadow-scene">
        <motion.span
          variants={revealText}
          className={`block font-medium text-mist ${
            isCentered ? "text-[clamp(2.25rem,10vw,3.4rem)]" : "text-[clamp(1.6rem,3.6vw,2.5rem)]"
          }`}
        >
          {copy.headlineTop}
        </motion.span>
        <motion.span
          variants={revealText}
          className={`headline-gradient block font-extrabold ${
            isCentered ? "text-[clamp(4.45rem,20vw,7rem)]" : "text-[clamp(3rem,8vw,6.5rem)]"
          }`}
        >
          {copy.headlineMain}
        </motion.span>
        <motion.span
          variants={revealText}
          className={`font-script block text-mist ${
            isCentered ? "text-[clamp(3rem,13.5vw,4.8rem)]" : "pl-6 text-[clamp(2rem,5vw,4rem)]"
          }`}
        >
          {copy.headlineTail}
        </motion.span>
      </h1>

      {showSupporting ? (
        <motion.p
          variants={staggerItem}
          className={`mt-7 text-base leading-relaxed text-mist/80 text-shadow-scene sm:text-lg ${
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
