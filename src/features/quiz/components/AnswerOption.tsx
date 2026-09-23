import { motion } from "framer-motion";

import { answerItem, answerSelected, transitions } from "@/config/motion.config";
import { gradients } from "@/config/theme.config";
import type { ForestTone } from "@/types/campaign.types";
import type { QuizOption } from "@/types/quiz.types";
import { cn } from "@/utils/cn";

const toneGradient: Record<ForestTone, string> = {
  mint: gradients.cardMint,
  sun: gradients.cardSun,
  aqua: gradients.cardAqua,
  sky: gradients.cardSky,
  moss: gradients.cardMoss,
};

interface AnswerOptionProps {
  option: QuizOption;
  index: number;
  selected: boolean;
  onSelect: (optionId: string) => void;
  onDoubleSelect?: (optionId: string) => void;
}

export function AnswerOption({ option, selected, onSelect, onDoubleSelect }: AnswerOptionProps) {
  const answerText = option.caption ? `${option.label}. ${option.caption}` : option.label;

  return (
    <motion.button
      type="button"
      variants={answerItem}
      whileHover={{ scale: 1.01, transition: transitions.fast }}
      whileTap={{ scale: 0.99 }}
      animate={selected ? answerSelected : { scale: 1 }}
      onClick={() => onSelect(option.id)}
      onDoubleClick={() => onDoubleSelect?.(option.id)}
      aria-pressed={selected}
      className={cn(
        "group relative flex min-h-17 w-full items-center gap-4 overflow-hidden rounded-full border p-3.5 text-left backdrop-blur-xl sm:min-h-20 sm:px-6 sm:py-4",
        "transition-colors outline-none focus-visible:ring-2 focus-visible:ring-lime-soft",
        selected
          ? "border-lime-soft/80 shadow-[var(--shadow-card)]"
          : "border-transparent bg-white/[0.075] hover:border-lime-soft/40",
      )}
      style={{
        backgroundImage: selected ? toneGradient[option.tone] : undefined,
      }}
    >
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "block text-sm leading-relaxed font-normal sm:text-[0.95rem]",
            selected ? "text-forest-900" : "text-mist",
          )}
        >
          {answerText}
        </span>
      </span>

      {selected ? (
        <motion.span
          layoutId="answer-glow"
          className="pointer-events-none absolute -right-10 -top-12 size-32 rounded-full bg-white/16 blur-2xl"
        />
      ) : null}
    </motion.button>
  );
}
