import type { ForestTone } from "@/types/campaign.types";
import type { ForestResultId } from "@/types/result.types";

/** Score weights an option contributes to each forest personality. */
export type OptionScores = Partial<Record<ForestResultId, number>>;

export interface QuizOption {
  id: string;
  label: string;
  /** short supporting line under the option label */
  caption: string;
  tone: ForestTone;
  scores: OptionScores;
}

export interface QuizQuestion {
  id: string;
  /** short label shown above the question, e.g. "Câu 03" */
  eyebrow: string;
  prompt: string;
  hint?: string;
  options: QuizOption[];
}

export interface QuizAnswer {
  questionId: string;
  optionId: string;
  answeredAt: string;
}

export interface QuizProgressState {
  index: number;
  total: number;
  ratio: number;
}
