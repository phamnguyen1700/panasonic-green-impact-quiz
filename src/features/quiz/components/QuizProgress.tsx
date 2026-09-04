import { motion } from "framer-motion";

import { motionTokens } from "@/config/theme.config";
import { cn } from "@/utils/cn";

interface QuizProgressProps {
  index: number;
  total: number;
  className?: string;
  barClassName?: string;
  showInlineLabel?: boolean;
}

export function QuizProgress({
  index,
  total,
  className,
  barClassName,
  showInlineLabel = false,
}: QuizProgressProps) {
  const ratio = (index + 1) / total;

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "relative mx-auto h-1.5 w-1/2 min-w-[10rem] overflow-hidden rounded-full bg-white/15",
          barClassName,
        )}
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full [background-image:var(--gradient-cta)]"
          initial={false}
          animate={{ width: `${ratio * 100}%` }}
          transition={{ duration: motionTokens.duration.base, ease: motionTokens.easing.organic }}
        />
        {showInlineLabel ? (
          <span className="absolute inset-0 grid place-items-center text-[0.65rem] font-semibold tracking-[0.18em] text-mist uppercase">
            Câu {index + 1}/{total}
          </span>
        ) : null}
      </div>
    </div>
  );
}
