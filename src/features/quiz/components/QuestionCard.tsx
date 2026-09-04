import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { GlassPanel } from "@/components/GlassPanel";
import { answerStagger, questionTransition, revealText } from "@/config/motion.config";
import { useIsMobile } from "@/hooks/use-mobile";
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
  avatarUrl: string | null;
  timer?: ReactNode;
}

export function QuestionCard({
  question,
  direction,
  selectedOptionId,
  onSelect,
  index,
  total,
  player,
  avatarUrl,
  timer,
}: QuestionCardProps) {
  const displayName = player?.name?.trim() || "USER";
  const isMobile = useIsMobile();

  const avatar = (className: string, initialClassName: string) => (
    <div
      className={`${className} grid place-items-center overflow-hidden rounded-full border border-lime-soft/70 bg-white/10 shadow-[0_0_36px_oklch(0.88_0.2_128_/_0.22)]`}
    >
      {avatarUrl ? (
        <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
      ) : (
        <span className={`${initialClassName} font-display font-bold text-mist`}>
          {displayName.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );

  const answers = (
    <motion.div
      variants={answerStagger}
      initial="hidden"
      animate="visible"
      className="mt-6 grid gap-3 sm:mt-10"
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
      <GlassPanel animated={false} className="w-full p-5 sm:p-6 lg:p-7">
        {isMobile ? (
          <div className="space-y-5">
            <div className="grid grid-cols-[1fr_3fr] items-center gap-4">
              {avatar("size-20", "text-2xl")}
              <p className="text-left text-sm leading-relaxed font-semibold text-mist">
                {displayName}, hãy chọn điều gần với tính cách của bạn nhất nhé
              </p>
            </div>

            <QuizProgress
              index={index}
              total={total}
              showInlineLabel
              barClassName="h-8 w-full min-w-0"
            />

            <section className="relative min-w-0 pt-2">
              <div className="absolute right-0 top-0">{timer}</div>

              <motion.h1
                variants={revealText}
                initial="hidden"
                animate="visible"
                className="pr-14 font-display text-2xl leading-tight font-extrabold tracking-tight text-mist"
              >
                {question.prompt}
              </motion.h1>

              {answers}
            </section>
          </div>
        ) : (
          <div className="grid gap-7 lg:grid-cols-[minmax(13rem,1fr)_minmax(0,2fr)] lg:items-stretch lg:gap-9">
            <aside className="flex min-h-[28rem] flex-col items-center p-2 pt-6 text-center sm:p-4 sm:pt-8 lg:pr-8">
              {avatar("size-56 sm:size-64 lg:size-72", "text-3xl")}

              <p className="mt-auto max-w-64 text-sm leading-relaxed font-semibold text-mist sm:text-base">
                {displayName}, hãy chọn điều gần với tính cách của bạn nhất nhé
              </p>

              <div className="mt-auto w-full pt-8">
                <p className="mb-3 text-xs tracking-[0.18em] text-lime-soft uppercase">
                  Câu {index + 1}/{total}
                </p>

                <QuizProgress
                  index={index}
                  total={total}
                  className="w-full"
                  barClassName="h-5 w-full min-w-0"
                />
              </div>
            </aside>

            <section className="relative min-w-0 pt-2 lg:pl-9">
              <div className="absolute right-0 top-0">{timer}</div>

              <motion.h1
                variants={revealText}
                initial="hidden"
                animate="visible"
                className="pr-14 font-display text-2xl leading-tight font-extrabold tracking-tight text-mist sm:text-4xl"
              >
                {question.prompt}
              </motion.h1>

              {answers}
            </section>
          </div>
        )}
      </GlassPanel>
    </motion.div>
  );
}
