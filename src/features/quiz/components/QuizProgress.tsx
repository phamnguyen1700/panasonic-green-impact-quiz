import { motion } from "framer-motion";

import { campaign } from "@/config/campaign.config";
import { motionTokens } from "@/config/theme.config";
import { cn } from "@/utils/cn";

interface QuizProgressProps {
  index: number;
  total: number;
  className?: string;
}

export function QuizProgress({ index, total, className }: QuizProgressProps) {
  const copy = campaign.quiz;
  const ratio = (index + 1) / total;

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-3 flex items-baseline justify-between text-mist/75">
        <p className="text-xs tracking-[0.16em] uppercase">
          {copy.progressLabel} {String(index + 1).padStart(2, "0")}
          <span className="opacity-50"> / {String(total).padStart(2, "0")}</span>
        </p>
        <p className="text-xs tracking-[0.16em] uppercase opacity-60">{copy.eyebrow}</p>
      </div>

      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/15">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full [background-image:var(--gradient-cta)]"
          initial={false}
          animate={{ width: `${ratio * 100}%` }}
          transition={{ duration: motionTokens.duration.base, ease: motionTokens.easing.organic }}
        />
      </div>

      <div className="mt-3 flex gap-1.5">
        {Array.from({ length: total }).map((_, dot) => (
          <motion.span
            key={dot}
            initial={false}
            animate={{
              opacity: dot <= index ? 1 : 0.28,
              scale: dot === index ? 1.35 : 1,
            }}
            transition={{ duration: motionTokens.duration.fast }}
            className="block size-1.5 rounded-full bg-lime-soft"
          />
        ))}
      </div>
    </div>
  );
}
