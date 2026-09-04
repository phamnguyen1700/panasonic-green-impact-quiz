import { motion } from "framer-motion";
import { Timer } from "lucide-react";

import { campaign } from "@/config/campaign.config";
import { timerTension } from "@/config/motion.config";
import { cn } from "@/utils/cn";

interface QuizTimerProps {
  ratio: number;
  isLow: boolean;
  className?: string;
}

const CIRCUMFERENCE = 2 * Math.PI * 22;

export function QuizTimer({ ratio, isLow, className }: QuizTimerProps) {
  return (
    <motion.div
      animate={isLow ? timerTension : { scale: 1 }}
      className={cn(
        "relative grid size-11 place-items-center rounded-full border border-white/25 bg-white/8 backdrop-blur-md",
        isLow && "border-sun-glow/60",
        className,
      )}
      aria-label={isLow ? campaign.quiz.timerWarning : campaign.quiz.timerLabel}
    >
      <svg viewBox="0 0 52 52" className="absolute size-11 -rotate-90">
        <circle
          cx="26"
          cy="26"
          r="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-white/15"
        />
        <motion.circle
          cx="26"
          cy="26"
          r="22"
          fill="none"
          strokeWidth="3"
          strokeLinecap="round"
          stroke="currentColor"
          className={isLow ? "text-sun-soft" : "text-lime-soft"}
          style={{ strokeDasharray: CIRCUMFERENCE }}
          initial={false}
          animate={{ strokeDashoffset: CIRCUMFERENCE * (1 - Math.max(ratio, 0)) }}
          transition={{ duration: 0.9, ease: "linear" }}
        />
      </svg>
      <Timer className="relative size-4 text-mist/80" aria-hidden />
    </motion.div>
  );
}
