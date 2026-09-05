import { endpoints } from "@/config/endpoints.config";
import { env } from "@/config/env.config";
import { questions } from "@/data/questions";
import { getResultById } from "@/data/resultRules";
import type { CreatePlayerRequest } from "@/types/playerApi.types";
import type { ResultSubmission } from "@/types/result.types";

export interface SubmitResultPayload {
  endpoint: string;
  enabled: boolean;
  body: CreatePlayerRequest | null;
}

export function calculateSubmissionScore(submission: ResultSubmission) {
  return submission.answers.reduce((total, answer) => {
    const question = questions.find((item) => item.id === answer.questionId);
    const option = question?.options.find((item) => item.id === answer.optionId);
    return total + (option?.scores[submission.resultId] ?? 0);
  }, 0);
}

export function toCreatePlayerRequest(submission: ResultSubmission): CreatePlayerRequest | null {
  if (!submission.player?.name || !submission.player.phone) return null;

  const result = getResultById(submission.resultId);

  return {
    name: submission.player.name,
    phone: submission.player.phone,
    result: result.title,
    score: calculateSubmissionScore(submission),
    completeAt: submission.completedAt,
  };
}

export function prepareSubmitResultPayload(submission: ResultSubmission): SubmitResultPayload {
  return {
    endpoint: endpoints.players,
    enabled: env.apiSubmitEnabled,
    body: toCreatePlayerRequest(submission),
  };
}
