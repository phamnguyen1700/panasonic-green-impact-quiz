import { motion } from "framer-motion";

import { GlassPanel } from "@/components/GlassPanel";
import { answerStagger, questionTransition, revealText } from "@/config/motion.config";
import { campaign } from "@/config/campaign.config";
import type { QuizQuestion } from "@/types/quiz.types";

import { AnswerOption } from "./AnswerOption";

interface QuestionCardProps {
  question: QuizQuestion;
  direction: number;
  selectedOptionId: string | null;
  onSelect: (optionId: string) => void;
}

export function QuestionCard({
  question,
  direction,
  selectedOptionId,
  onSelect,
}: QuestionCardProps) {
  return (
    <motion.div
      key={question.id}
      custom={direction}
      variants={questionTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full"
    >
      <GlassPanel animated={false} className="w-full p-6 sm:p-9">
        <motion.p
          variants={revealText}
          initial="hidden"
          animate="visible"
          className="text-xs tracking-[0.22em] text-lime-soft uppercase"
        >
          {question.eyebrow}
        </motion.p>

        <motion.h1
          variants={revealText}
          initial="hidden"
          animate="visible"
          className="mt-3 font-display text-2xl leading-tight font-extrabold tracking-tight text-mist sm:text-4xl"
        >
          {question.prompt}
        </motion.h1>

        <p className="mt-3 text-sm text-mist/60">{question.hint ?? campaign.quiz.hint}</p>

        <motion.div
          variants={answerStagger}
          initial="hidden"
          animate="visible"
          className="mt-7 grid gap-3 sm:grid-cols-2"
        >
          {question.options.map((option, index) => (
            <AnswerOption
              key={option.id}
              option={option}
              index={index}
              selected={selectedOptionId === option.id}
              onSelect={onSelect}
            />
          ))}
        </motion.div>
      </GlassPanel>
    </motion.div>
  );
}
