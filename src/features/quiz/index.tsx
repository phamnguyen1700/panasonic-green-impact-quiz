import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

import { CampaignButton } from "@/components/CampaignButton";
import { campaign } from "@/config/campaign.config";
import { useAppFlow } from "@/hooks/useAppFlow";
import { useQuizEngine } from "@/hooks/useQuizEngine";
import { useQuizTimer } from "@/hooks/useQuizTimer";
import { analytics } from "@/services/analytics.service";
import { getPlayerAvatar } from "@/services/playerAvatar.service";
import { submitResult } from "@/services/submitResult.service";
import type { PlayerInfo } from "@/types/player.types";
import { STORAGE_KEYS, readStorage } from "@/utils/storage";

import { QuestionCard } from "./components/QuestionCard";
import { QuizLayout } from "./components/QuizLayout";
import { QuizTimer } from "./components/QuizTimer";

const SECONDS_PER_QUESTION = 25;

export function QuizScreen() {
  const copy = campaign.quiz;
  const { go, goBack } = useAppFlow("quiz");
  const [player, setPlayer] = useState<PlayerInfo | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

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
    setPlayer(readStorage<PlayerInfo>(STORAGE_KEYS.player));
    setAvatarUrl(getPlayerAvatar());
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
      footer={
        <div className="grid grid-cols-2 gap-4 sm:mx-auto sm:w-full sm:max-w-md">
          <CampaignButton
            type="button"
            variant="ghost"
            size="md"
            onClick={handleBack}
            wrapperClassName="w-full"
            className="h-12 w-full px-5 text-sm"
          >
            {copy.back}
          </CampaignButton>
          <CampaignButton
            onClick={engine.next}
            disabled={!engine.canAdvance}
            size="md"
            wrapperClassName="w-full"
            className="h-12 w-full px-5 text-sm"
          >
            {engine.isLast ? copy.finish : copy.next}
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
          onSelect={engine.select}
          index={engine.index}
          total={engine.total}
          player={player}
          avatarUrl={avatarUrl}
          timer={<QuizTimer ratio={timer.ratio} isLow={timer.isLow} />}
        />
      </AnimatePresence>
    </QuizLayout>
  );
}
