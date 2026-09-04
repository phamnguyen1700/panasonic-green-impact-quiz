import { motion } from "framer-motion";

import { campaign } from "@/config/campaign.config";
import { lightSweep, resultReveal, revealText, staggerContainer } from "@/config/motion.config";
import type { ForestResult } from "@/types/result.types";

interface ResultRevealProps {
  result: ForestResult;
  playerName?: string | undefined;
}

export function ResultReveal({ result, playerName }: ResultRevealProps) {
  const copy = campaign.result;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="relative text-center"
    >
      <motion.p
        variants={revealText}
        className="text-xs tracking-[0.24em] text-lime-soft uppercase"
      >
        {copy.eyebrow}
      </motion.p>

      <motion.p variants={revealText} className="mt-4 text-base text-mist/75 sm:text-lg">
        {playerName ? `${copy.revealName} ${playerName}, ` : ""}
        {copy.revealLine}
      </motion.p>

      <motion.h1
        variants={resultReveal}
        className="relative mt-2 inline-block overflow-hidden font-display text-[clamp(2.25rem,7vw,5rem)] leading-[0.98] font-extrabold tracking-tight text-mist"
      >
        {result.title}
        <motion.span
          animate={lightSweep}
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent"
        />
      </motion.h1>

      <motion.p
        variants={revealText}
        className="mt-3 font-script text-xl text-lime-soft sm:text-2xl"
      >
        {result.subtitle}
      </motion.p>
    </motion.div>
  );
}
