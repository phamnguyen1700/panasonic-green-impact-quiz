import { forestJourneyQuestions, forestJourneyProfiles } from "@/data/forestJourney";
import type { ForestTone } from "@/types/campaign.types";
import type { ForestResultId } from "@/types/result.types";
import type { QuizQuestion } from "@/types/quiz.types";

const resultTone: Record<ForestResultId, ForestTone> = {
  "phong-ho": "moss",
  "dau-nguon": "mint",
  "bao-ton": "sun",
  "phuc-hoi": "aqua",
  "sinh-ke": "sky",
};

const resultIdByCode = new Map(
  forestJourneyProfiles.map((profile) => [profile.code, profile.resultId] as const),
);

/** 10 forest journey questions sourced from campaign CSV. */
export const questions: QuizQuestion[] = forestJourneyQuestions.map((question) => ({
  id: question.id,
  eyebrow: question.eyebrow,
  prompt: question.prompt,
  options: question.options.map((option) => {
    const resultId = resultIdByCode.get(option.resultCode)!;

    return {
      id: option.id,
      label: option.label,
      caption: "",
      tone: resultTone[resultId],
      scores: { [resultId]: 1 },
    };
  }),
}));

export const TOTAL_QUESTIONS = questions.length;
