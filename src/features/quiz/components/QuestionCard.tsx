import { motion } from "framer-motion";

import { GlassPanel } from "@/components/GlassPanel";
import { answerStagger, questionTransition, revealText } from "@/config/motion.config";
import { useIsMobile } from "@/hooks/app";
import type { PlayerInfo } from "@/types/player.types";
import type { QuizQuestion } from "@/types/quiz.types";

import { AnswerOption } from "./AnswerOption";
import { QuizProgress } from "./QuizProgress";

interface QuestionCardProps {
  question: QuizQuestion;
  direction: number;
  selectedOptionId: string | null;
  onSelect: (optionId: string) => void;
  index: number;
  total: number;
  player: PlayerInfo | null;
}

export function QuestionCard({
  question,
  direction,
  selectedOptionId,
  onSelect,
  index,
  total,
  player,
}: QuestionCardProps) {
  const displayName = player?.name?.trim() || "User";
  const isMobile = useIsMobile();

  const playerPrompt = `${displayName} ơi, trong tình huống này bạn sẽ xử lý thế nào?`;

  const answers = (
    <motion.div
      variants={answerStagger}
      initial="hidden"
      animate="visible"
      className="mt-6 grid gap-3 sm:mt-10 lg:mt-0 lg:h-full lg:grid-rows-5 lg:gap-3.5"
    >
      {question.options.map((option, optionIndex) => (
        <AnswerOption
          key={option.id}
          option={option}
          index={optionIndex}
          selected={selectedOptionId === option.id}
          onSelect={onSelect}
        />
      ))}
    </motion.div>
  );

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
      <GlassPanel
        animated={false}
        className="w-full p-4 sm:p-5 lg:max-h-[calc(100svh-9rem)] lg:overflow-hidden lg:p-5"
      >
        {isMobile ? (
          <div className="space-y-5">
            <section className="min-w-0 pt-1">
              <motion.h1
                variants={revealText}
                initial="hidden"
                animate="visible"
                className="font-display text-xl leading-tight font-extrabold tracking-tight text-mist"
              >
                {question.prompt}
              </motion.h1>

              {answers}
            </section>

            <QuizProgress
              index={index}
              total={total}
              showInlineLabel
              barClassName="h-8 w-full min-w-0"
            />
          </div>
        ) : (
          <div className="grid gap-5 lg:min-h-[28rem] lg:grid-cols-2 lg:items-stretch lg:gap-8 xl:min-h-[31rem]">
            <aside className="grid min-h-[22rem] grid-rows-[1fr_auto] p-2 text-left sm:p-3 lg:min-h-0 lg:pr-6">
              <div className="self-start">
                <motion.h1
                  variants={revealText}
                  initial="hidden"
                  animate="visible"
                  className="font-display text-2xl leading-tight font-extrabold tracking-tight text-mist sm:text-3xl xl:text-[2.35rem]"
                >
                  {question.prompt}
                </motion.h1>
              </div>

              <div className="self-end">
                <p className="mx-auto max-w-96 text-center text-base leading-relaxed font-semibold text-mist">
                  {playerPrompt}
                </p>

                <QuizProgress
                  index={index}
                  total={total}
                  showInlineLabel
                  className="mt-5 w-full"
                  barClassName="h-4 w-full min-w-0"
                  labelClassName="text-lime-soft"
                />
              </div>
            </aside>

            <section className="min-w-0 lg:h-full lg:pl-7">
              {answers}
            </section>
          </div>
        )}
      </GlassPanel>
    </motion.div>
  );
}
