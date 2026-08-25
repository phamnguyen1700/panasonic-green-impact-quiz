import { motion } from "framer-motion";

import { ForestCard } from "@/components/ForestCard";
import { campaign, forestPersonalities } from "@/config/campaign.config";
import { staggerContainer, staggerItem } from "@/config/motion.config";

export function ForestPreviewCards() {
  return (
    <motion.section variants={staggerContainer} initial="hidden" animate="visible">
      <motion.p
        variants={staggerItem}
        className="mb-4 text-xs tracking-[0.16em] text-mist/60 uppercase"
      >
        {campaign.info.previewTitle}
      </motion.p>

      <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {forestPersonalities.map((personality) => (
          <ForestCard
            key={personality.id}
            personality={personality}
            size="sm"
            className="shrink-0"
          />
        ))}
      </div>
    </motion.section>
  );
}
