import { motion } from "framer-motion";
import { Timer } from "lucide-react";

import { campaign } from "@/config/campaign.config";
import { timerTension } from "@/config/motion.config";
import { cn } from "@/utils/cn";

interface QuizTimerProps {
  remaining: number;
  ratio: number;
  isLow: boolean;
  className?: string;
}

const CIRCUMFERENCE = 2 * Math.PI * 22;

export function QuizTimer({ remaining, ratio, isLow, className }: QuizTimerProps) {
  const copy = campaign.quiz;

  return (
    <motion.div
      animate={isLow ? timerTension : { scale: 1 }}
      className={cn(
        "flex items-center gap-3 rounded-full border border-white/25 bg-white/8 py-2 pr-5 pl-2 backdrop-blur-md",
        isLow && "border-sun-glow/60",
        className,
      )}
    >
      <div className="relative grid size-12 place-items-center">
        <svg viewBox="0 0 52 52" className="absolute size-12 -rotate-90">
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
        <Timer className="size-4 text-mist/80" aria-hidden />
      </div>

      <div className="leading-tight">
        <p className="text-[0.65rem] tracking-[0.16em] text-mist/60 uppercase">
          {isLow ? copy.timerWarning : copy.timerLabel}
        </p>
        <p className="font-display text-lg font-bold text-mist tabular-nums">
          {String(remaining).padStart(2, "0")}s
        </p>
      </div>
    </motion.div>
  );
}
