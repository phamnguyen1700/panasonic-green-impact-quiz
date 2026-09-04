import { useCallback, useMemo, useState } from "react";

import { questions, TOTAL_QUESTIONS } from "@/data/questions";
import { analytics } from "@/services/analytics.service";
import type { QuizAnswer } from "@/types/quiz.types";
import type { QuizOutcome } from "@/types/result.types";
import { calculateResult } from "@/utils/calculateResult";
import { STORAGE_KEYS, writeStorage } from "@/utils/storage";

interface UseQuizEngineOptions {
  onComplete?: (outcome: QuizOutcome, answers: QuizAnswer[]) => void;
}

export function useQuizEngine({ onComplete }: UseQuizEngineOptions = {}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [outcome, setOutcome] = useState<QuizOutcome | null>(null);

  const question = questions[index]!;
  const isLast = index === TOTAL_QUESTIONS - 1;

  const progress = useMemo(
    () => ({
      index,
      total: TOTAL_QUESTIONS,
      ratio: (index + (selectedOptionId ? 1 : 0)) / TOTAL_QUESTIONS,
    }),
    [index, selectedOptionId],
  );

  const select = useCallback((optionId: string) => {
    setSelectedOptionId(optionId);
  }, []);

  const finish = useCallback(
    (finalAnswers: QuizAnswer[]) => {
      const result = calculateResult(finalAnswers);
      setOutcome(result);
      writeStorage(STORAGE_KEYS.quizAnswers, finalAnswers);
      writeStorage(STORAGE_KEYS.outcome, {
        resultId: result.result.id,
        answers: finalAnswers,
        completedAt: new Date().toISOString(),
      });
      onComplete?.(result, finalAnswers);
    },
    [onComplete],
  );

  const next = useCallback(() => {
    if (!selectedOptionId) return;

    const answer: QuizAnswer = {
      questionId: question.id,
      optionId: selectedOptionId,
      answeredAt: new Date().toISOString(),
    };
    const nextAnswers = [...answers.filter((a) => a.questionId !== question.id), answer];
    setAnswers(nextAnswers);
    analytics.questionAnswered(question.id, selectedOptionId, index);

    if (isLast) {
      finish(nextAnswers);
      return;
    }

    setDirection(1);
    setSelectedOptionId(null);
    setIndex((current) => current + 1);
  }, [answers, finish, index, isLast, question.id, selectedOptionId]);

  const back = useCallback(() => {
    if (index === 0) return;
    setDirection(-1);
    const previousIndex = index - 1;
    const previous = questions[previousIndex]!;
    setSelectedOptionId(answers.find((a) => a.questionId === previous.id)?.optionId ?? null);
    setIndex(previousIndex);
  }, [answers, index]);

  const reset = useCallback(() => {
    setIndex(0);
    setDirection(1);
    setAnswers([]);
    setSelectedOptionId(null);
    setOutcome(null);
  }, []);

  return {
    question,
    index,
    direction,
    total: TOTAL_QUESTIONS,
    progress,
    answers,
    selectedOptionId,
    outcome,
    isLast,
    canAdvance: Boolean(selectedOptionId),
    select,
    next,
    back,
    reset,
  };
}
