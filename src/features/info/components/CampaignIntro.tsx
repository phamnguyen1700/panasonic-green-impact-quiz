import { motion } from "framer-motion";

import { campaign } from "@/config/campaign.config";
import { staggerContainer, staggerItem } from "@/config/motion.config";

interface CampaignIntroProps {
  align?: "left" | "center";
}

export function CampaignIntro({ align = "left" }: CampaignIntroProps) {
  const copy = campaign.info;
  const isCentered = align === "center";

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={isCentered ? "text-center" : undefined}
    >
      <motion.h1
        variants={staggerItem}
        className={`font-display leading-[1.05] font-extrabold tracking-tight text-mist text-shadow-scene ${
          isCentered ? "text-[clamp(2.35rem,11vw,3.6rem)]" : "text-[clamp(2.1rem,4.6vw,3.5rem)]"
        }`}
      >
        {copy.title}
      </motion.h1>

      <motion.p
        variants={staggerItem}
        className={`mt-5 leading-relaxed text-mist/80 text-shadow-scene ${
          isCentered ? "mx-auto max-w-md text-sm" : "max-w-lg"
        }`}
      >
        {copy.intro}
      </motion.p>
    </motion.div>
  );
}
