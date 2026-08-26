import { questions } from "@/data/questions";
import { DEFAULT_RESULT_ID, RESULT_PRIORITY, getResultById } from "@/data/resultRules";
import type { QuizAnswer } from "@/types/quiz.types";
import type { ForestResultId, QuizOutcome, ResultScore } from "@/types/result.types";

const optionIndex = new Map(
  questions.flatMap((question) => question.options.map((option) => [option.id, option] as const)),
);

/** Tally option weights, then pick the highest with a deterministic tie-break. */
export function calculateResult(answers: QuizAnswer[]): QuizOutcome {
  const totals = new Map<ForestResultId, number>(RESULT_PRIORITY.map((id) => [id, 0]));

  for (const answer of answers) {
    const option = optionIndex.get(answer.optionId);
    if (!option) continue;
    for (const [id, weight] of Object.entries(option.scores)) {
      const key = id as ForestResultId;
      totals.set(key, (totals.get(key) ?? 0) + (weight ?? 0));
    }
  }

  const scores: ResultScore[] = RESULT_PRIORITY.map((id) => ({
    id,
    score: totals.get(id) ?? 0,
  })).sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return RESULT_PRIORITY.indexOf(a.id) - RESULT_PRIORITY.indexOf(b.id);
  });

  const top = scores[0];
  const winner = !top || top.score === 0 ? DEFAULT_RESULT_ID : top.id;

  return { result: getResultById(winner), scores };
}
