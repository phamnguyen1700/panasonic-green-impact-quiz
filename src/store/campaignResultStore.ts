import { create } from "zustand";

import type { SubmitResultOutcome } from "@/services/submitResult.service";
import type { ResultSubmission } from "@/types/result.types";

interface CampaignResultState {
  lastSubmission: ResultSubmission | null;
  lastSubmissionKey: string | null;
  lastOutcome: SubmitResultOutcome | null;
  isSubmitting: boolean;
  setSubmitting: (isSubmitting: boolean) => void;
  setLastSubmission: (submission: ResultSubmission, submissionKey: string) => void;
  setLastOutcome: (outcome: SubmitResultOutcome | null) => void;
  reset: () => void;
}

export const useCampaignResultStore = create<CampaignResultState>((set) => ({
  lastSubmission: null,
  lastSubmissionKey: null,
  lastOutcome: null,
  isSubmitting: false,
  setSubmitting: (isSubmitting) => set({ isSubmitting }),
  setLastSubmission: (lastSubmission, lastSubmissionKey) =>
    set({ lastSubmission, lastSubmissionKey }),
  setLastOutcome: (lastOutcome) => set({ lastOutcome }),
  reset: () =>
    set({
      lastSubmission: null,
      lastSubmissionKey: null,
      lastOutcome: null,
      isSubmitting: false,
    }),
}));
