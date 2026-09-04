import { motion } from "framer-motion";
import { Check } from "lucide-react";

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
}

export function AnswerOption({ option, selected, onSelect }: AnswerOptionProps) {
  return (
    <motion.button
      type="button"
      variants={answerItem}
      whileHover={{ scale: 1.01, transition: transitions.fast }}
      whileTap={{ scale: 0.99 }}
      animate={selected ? answerSelected : { scale: 1 }}
      onClick={() => onSelect(option.id)}
      aria-pressed={selected}
      className={cn(
        "group relative flex min-h-20 w-full items-center gap-4 overflow-hidden rounded-[1.5rem] border p-4 text-left backdrop-blur-xl sm:min-h-24 sm:p-5",
        "transition-colors outline-none focus-visible:ring-2 focus-visible:ring-lime-soft",
        selected
          ? "border-lime-soft/80 shadow-[var(--shadow-card)]"
          : "border-transparent hover:border-transparent",
      )}
      style={{
        backgroundImage: selected ? toneGradient[option.tone] : undefined,
        backgroundColor: selected ? undefined : "oklch(1 0 0 / 0.08)",
      }}
    >
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "block text-sm leading-relaxed font-normal sm:text-base",
            selected ? "text-forest-900" : "text-mist",
          )}
        >
          {option.label}. {option.caption}
        </span>
      </span>

      {selected ? (
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/18 text-forest-900">
          <Check className="size-4" aria-hidden />
        </span>
      ) : null}

      {selected ? (
        <motion.span
          layoutId="answer-glow"
          className="pointer-events-none absolute -right-10 -top-12 size-32 rounded-full bg-white/35 blur-2xl"
        />
      ) : null}
    </motion.button>
  );
}
