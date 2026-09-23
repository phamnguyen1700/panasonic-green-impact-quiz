import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

import { CampaignButton } from "@/components/CampaignButton";
import { campaign } from "@/config/campaign.config";
import { useAppFlow } from "@/hooks/app";
import { useQuizEngine, useQuizTimer } from "@/hooks/quiz";
import { useSubmitResult } from "@/hooks/result";
import { analytics } from "@/services/analytics";
import { usePlayerStore } from "@/store/playerStore";
import { createSubmissionId } from "@/utils/submission";

import { QuestionCard } from "./components/QuestionCard";
import { QuizCountdownOverlay } from "./components/QuizCountdownOverlay";
import { QuizLayout } from "./components/QuizLayout";

const SECONDS_PER_QUESTION = 300;

export function QuizScreen() {
  const copy = campaign.quiz;
  const { go, goBack } = useAppFlow("quiz");
  const player = usePlayerStore((state) => state.player);
  const setOutcome = usePlayerStore((state) => state.setOutcome);
  const resultSubmit = useSubmitResult();
  const canPlay = Boolean(player?.name);
  const [quizAttempt, setQuizAttempt] = useState(0);
  const [questionTimeRemaining, setQuestionTimeRemaining] = useState<Record<string, number>>({});
  const [timeoutOpen, setTimeoutOpen] = useState(false);
  const [countdownOpen, setCountdownOpen] = useState(true);

  const engine = useQuizEngine({
    onComplete: (outcome, answers) => {
      const completedAt = new Date().toISOString();
      const submissionId = createSubmissionId();
      setOutcome({ submissionId, resultId: outcome.result.id, answers, completedAt });
      void (async () => {
        try {
          await resultSubmit.submit({
            submissionId,
            player,
            resultId: outcome.result.id,
            answers,
            completedAt,
          });
        } finally {
          go("result");
        }
      })();
    },
  });

  useEffect(() => {
    analytics.screenView("quiz");
    analytics.quizStarted();
    if (!canPlay) go("home");
  }, [canPlay, go]);

  const handleExpire = useCallback(() => {
    setQuestionTimeRemaining({});
    setQuizAttempt((current) => current + 1);
    engine.reset();
    setTimeoutOpen(true);
  }, [engine]);

  const questionId = engine.question.id;
  const timer = useQuizTimer({
    duration: SECONDS_PER_QUESTION,
    resetKey: `${quizAttempt}:${questionId}`,
    initialRemaining: questionTimeRemaining[questionId] ?? SECONDS_PER_QUESTION,
    running: canPlay && !timeoutOpen && !countdownOpen,
    onTick: (remaining) => {
      setQuestionTimeRemaining((current) =>
        current[questionId] === remaining ? current : { ...current, [questionId]: remaining },
      );
    },
    onExpire: handleExpire,
  });

  const rememberCurrentQuestionTime = () => {
    setQuestionTimeRemaining((current) => ({ ...current, [questionId]: timer.remaining }));
  };

  const handleBack = () => {
    rememberCurrentQuestionTime();
    if (engine.index === 0) {
      goBack();
      return;
    }
    engine.back();
  };

  const handleNext = () => {
    rememberCurrentQuestionTime();
    engine.next({
      durationSeconds: SECONDS_PER_QUESTION,
      remainingSeconds: timer.remaining,
    });
  };

  const handleSelect = (optionId: string) => {
    engine.select(optionId);
  };

  const handleDoubleSelect = (optionId: string) => {
    if (!canPlay || countdownOpen || timeoutOpen || resultSubmit.isSubmitting) return;
    rememberCurrentQuestionTime();
    engine.next({
      optionId,
      durationSeconds: SECONDS_PER_QUESTION,
      remainingSeconds: timer.remaining,
    });
  };

  const handleRestartAfterTimeout = () => {
    setTimeoutOpen(false);
    setCountdownOpen(true);
  };

  return (
    <>
      <QuizLayout
        footer={
          <div className="grid grid-cols-2 gap-4 sm:mx-auto sm:w-full sm:max-w-md">
            <CampaignButton
              type="button"
              variant="ghost"
              size="md"
              onClick={handleBack}
              wrapperClassName="w-full"
              className="h-12 w-full px-5 text-sm"
              disabled={countdownOpen}
            >
              {copy.back}
            </CampaignButton>
            <CampaignButton
              onClick={handleNext}
              disabled={
                !canPlay || countdownOpen || !engine.canAdvance || resultSubmit.isSubmitting
              }
              size="md"
              wrapperClassName="w-full"
              className="h-12 w-full px-5 text-sm"
            >
              {engine.isLast && resultSubmit.isSubmitting
                ? "Đang lưu..."
                : engine.isLast
                  ? copy.finish
                  : copy.next}
            </CampaignButton>
          </div>
        }
      >
        <AnimatePresence mode="wait" custom={engine.direction}>
          <QuestionCard
            key={engine.question.id}
            question={engine.question}
            direction={engine.direction}
            selectedOptionId={engine.selectedOptionId}
            onSelect={handleSelect}
            onDoubleSelect={handleDoubleSelect}
            index={engine.index}
            total={engine.total}
            player={player}
          />
        </AnimatePresence>
      </QuizLayout>

      <QuizCountdownOverlay
        active={countdownOpen && canPlay}
        mode="countdown"
        onComplete={() => setCountdownOpen(false)}
      />
      <QuizCountdownOverlay
        active={timeoutOpen && canPlay}
        mode="timeout"
        title="Hết thời gian!"
        actionLabel="Thử lại nhé"
        onAction={handleRestartAfterTimeout}
      />
    </>
  );
}
