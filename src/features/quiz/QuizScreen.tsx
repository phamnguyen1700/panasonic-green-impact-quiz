import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useCallback, useEffect } from "react";

import { CampaignButton } from "@/components/CampaignButton";
import { campaign } from "@/config/campaign.config";
import { useAppFlow } from "@/hooks/useAppFlow";
import { useQuizEngine } from "@/hooks/useQuizEngine";
import { useQuizTimer } from "@/hooks/useQuizTimer";
import { analytics } from "@/services/analytics.service";
import { submitResult } from "@/services/submitResult.service";
import type { PlayerInfo } from "@/types/player.types";
import { STORAGE_KEYS, readStorage } from "@/utils/storage";

import { QuestionCard } from "./components/QuestionCard";
import { QuizLayout } from "./components/QuizLayout";
import { QuizProgress } from "./components/QuizProgress";
import { QuizTimer } from "./components/QuizTimer";

const SECONDS_PER_QUESTION = 25;

export function QuizScreen() {
  const copy = campaign.quiz;
  const { go, goBack } = useAppFlow("quiz");

  const engine = useQuizEngine({
    onComplete: (outcome, answers) => {
      const player = readStorage<PlayerInfo>(STORAGE_KEYS.player);
      void submitResult({
        player,
        resultId: outcome.result.id,
        answers,
        completedAt: new Date().toISOString(),
      });
      go("result");
    },
  });

  useEffect(() => {
    analytics.screenView("quiz");
    analytics.quizStarted();
  }, []);

  const handleExpire = useCallback(() => {
    if (engine.canAdvance) engine.next();
  }, [engine]);

  const timer = useQuizTimer({
    duration: SECONDS_PER_QUESTION,
    resetKey: engine.question.id,
    onExpire: handleExpire,
  });

  const handleBack = () => (engine.index === 0 ? goBack() : engine.back());

  return (
    <QuizLayout
      header={<QuizProgress index={engine.index} total={engine.total} />}
      footer={
        <div className="flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center justify-center gap-2 text-sm text-mist/70 transition-colors hover:text-mist"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {copy.back}
          </button>

          <div className="flex items-center justify-between gap-4 sm:justify-end">
            <QuizTimer remaining={timer.remaining} ratio={timer.ratio} isLow={timer.isLow} />
            <CampaignButton
              onClick={engine.next}
              disabled={!engine.canAdvance}
              withArrow
              size="md"
              className="min-w-[11rem]"
            >
              {engine.isLast ? copy.finish : copy.next}
            </CampaignButton>
          </div>
        </div>
      }
    >
      <AnimatePresence mode="wait" custom={engine.direction}>
        <QuestionCard
          key={engine.question.id}
          question={engine.question}
          direction={engine.direction}
          selectedOptionId={engine.selectedOptionId}
          onSelect={engine.select}
        />
      </AnimatePresence>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: engine.canAdvance ? 0 : 1 }}
        className="mt-5 text-center text-xs text-mist/50"
      >
        {copy.hint}
      </motion.p>
    </QuizLayout>
  );
}
