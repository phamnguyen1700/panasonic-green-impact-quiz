import { motion } from "framer-motion";
import { resultReveal, revealText, staggerContainer } from "@/config/motion.config";
import { forestJourneyProfiles } from "@/data/forestJourney";
import type { ForestResult } from "@/types/result.types";

interface ResultRevealProps {
  result: ForestResult;
  playerName?: string | undefined;
}

export function ResultReveal({ result, playerName }: ResultRevealProps) {
  const displayName = playerName?.trim() || "bạn";
  const profile = forestJourneyProfiles.find((item) => item.resultId === result.id);
  const trait = profile?.trait ?? result.traits.join(" & ");

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="relative text-center"
    >
      <motion.p variants={revealText} className="text-sm font-semibold text-mist/80 sm:text-lg">
        Đại ngàn đã lắng nghe {displayName}!
      </motion.p>

      <motion.h1
        variants={resultReveal}
        className="mt-2 inline-flex flex-col items-center text-mist"
      >
        <span className="font-display text-[clamp(1.25rem,3.25vw,2.25rem)] leading-tight font-extrabold tracking-tight">
          Bạn là
        </span>
        <span className="relative mt-1 inline-block overflow-hidden font-script text-[clamp(2.35rem,6vw,4.6rem)] leading-[1.12] text-[#fff4cf]">
          {result.title}
          <motion.span
            animate={{ left: ["-55%", "115%"] }}
            transition={{ duration: 1.8, ease: [0.45, 0, 0.55, 1], repeat: Infinity }}
            className="pointer-events-none absolute inset-y-0 w-1/2 skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent"
          />
        </span>
      </motion.h1>

      <motion.p
        variants={revealText}
        className="mt-2 font-display text-lg font-extrabold tracking-wide text-lime-soft sm:text-xl"
      >
        {trait}
      </motion.p>
    </motion.div>
  );
}
