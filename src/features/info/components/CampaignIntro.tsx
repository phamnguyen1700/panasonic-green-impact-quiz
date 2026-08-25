import { motion } from "framer-motion";
import { Sprout } from "lucide-react";

import { campaign } from "@/config/campaign.config";
import { staggerContainer, staggerItem } from "@/config/motion.config";

export function CampaignIntro() {
  const copy = campaign.info;

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible">
      <motion.p
        variants={staggerItem}
        className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs tracking-[0.16em] text-mist/85 uppercase backdrop-blur-md"
      >
        <Sprout className="size-3.5" aria-hidden />
        {copy.eyebrow}
      </motion.p>

      <motion.h1
        variants={staggerItem}
        className="font-display text-[clamp(2.1rem,4.6vw,3.5rem)] leading-[1.05] font-extrabold tracking-tight text-mist text-shadow-scene"
      >
        {copy.title}
      </motion.h1>

      <motion.p
        variants={staggerItem}
        className="mt-5 max-w-lg leading-relaxed text-mist/80 text-shadow-scene"
      >
        {copy.intro}
      </motion.p>

      <motion.ul variants={staggerContainer} className="mt-7 space-y-3">
        {copy.bullets.map((bullet) => (
          <motion.li
            key={bullet}
            variants={staggerItem}
            className="flex items-start gap-3 text-sm text-mist/75"
          >
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-lime-soft" />
            {bullet}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
