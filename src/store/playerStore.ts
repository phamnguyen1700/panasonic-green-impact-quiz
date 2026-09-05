import { create } from "zustand";

import type { PlayerInfo } from "@/types/player.types";
import type { QuizAnswer } from "@/types/quiz.types";
import type { ForestResultId } from "@/types/result.types";

export interface PlayerOutcome {
  resultId: ForestResultId;
  answers: QuizAnswer[];
  completedAt: string;
}

interface PlayerState {
  player: PlayerInfo | null;
  avatarUrl: string | null;
  outcome: PlayerOutcome | null;
  setPlayerInfo: (player: PlayerInfo) => void;
  setPlayerAvatar: (avatar: { avatarUrl: string; avatarFileName: string }) => void;
  setOutcome: (outcome: PlayerOutcome) => void;
  clearOutcome: () => void;
  resetPlayer: () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  player: null,
  avatarUrl: null,
  outcome: null,
  setPlayerInfo: (player) => set({ player }),
  setPlayerAvatar: ({ avatarUrl, avatarFileName }) =>
    set((state) => ({
      avatarUrl,
      player: state.player ? { ...state.player, avatarFileName } : state.player,
    })),
  setOutcome: (outcome) => set({ outcome }),
  clearOutcome: () => set({ outcome: null }),
  resetPlayer: () => set({ player: null, avatarUrl: null, outcome: null }),
}));
