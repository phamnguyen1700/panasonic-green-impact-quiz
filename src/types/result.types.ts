import type { ForestTone } from "@/types/campaign.types";
import type { QuizAnswer } from "@/types/quiz.types";
import type { PlayerInfo } from "@/types/player.types";

export type ForestResultId = "phong-ho" | "dau-nguon" | "bao-ton" | "phuc-hoi" | "sinh-ke";

export interface ForestResult {
  id: ForestResultId;
  title: string;
  subtitle: string;
  forestType: string;
  description: string;
  traits: string[];
  impact: string;
  /** design-system tone token driving the card gradient */
  tone: ForestTone;
  /** resolved asset path — always sourced from assets.config.ts */
  image: string;
}

export interface ResultScore {
  id: ForestResultId;
  score: number;
}

export interface QuizOutcome {
  result: ForestResult;
  scores: ResultScore[];
}

export interface ResultSubmission {
  player: PlayerInfo | null;
  resultId: ForestResultId;
  answers: QuizAnswer[];
  completedAt: string;
}

export interface StoredOutcome {
  resultId: ForestResultId;
  answers: QuizAnswer[];
  completedAt: string;
}
