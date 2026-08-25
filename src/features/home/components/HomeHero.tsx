import { motion } from "framer-motion";

import { CampaignButton } from "@/components/CampaignButton";
import { campaign } from "@/config/campaign.config";
import { revealText, staggerContainer, staggerItem } from "@/config/motion.config";

export function HomeHero({ onStart }: { onStart: () => void }) {
  const copy = campaign.home;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="max-w-xl"
    >
      <motion.p
        variants={staggerItem}
        className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-medium tracking-[0.16em] text-mist/90 uppercase backdrop-blur-md"
      >
        {copy.eyebrow}
      </motion.p>

      <h1 className="font-display leading-[0.92] tracking-tight text-shadow-scene">
        <motion.span
          variants={revealText}
          className="block text-[clamp(1.6rem,3.6vw,2.5rem)] font-medium text-mist"
        >
          {copy.headlineTop}
        </motion.span>
        <motion.span
          variants={revealText}
          className="headline-gradient block text-[clamp(3rem,8vw,6.5rem)] font-extrabold"
        >
          {copy.headlineMain}
        </motion.span>
        <motion.span
          variants={revealText}
          className="font-script block pl-6 text-[clamp(2rem,5vw,4rem)] text-mist"
        >
          {copy.headlineTail}
        </motion.span>
      </h1>

      <motion.p
        variants={staggerItem}
        className="mt-7 max-w-md text-base leading-relaxed text-mist/80 text-shadow-scene sm:text-lg"
      >
        {copy.supporting}
      </motion.p>

      <motion.div variants={staggerItem} className="mt-10 flex flex-wrap items-center gap-5">
        <CampaignButton withArrow onClick={onStart}>
          {copy.cta}
        </CampaignButton>
        <span className="text-sm text-mist/65">{copy.footnote}</span>
      </motion.div>
    </motion.div>
  );
}
