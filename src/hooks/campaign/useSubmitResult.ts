import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";

import {
  getResultSubmissionKey,
  submitResult,
  type SubmitResultOutcome,
} from "@/services/submitResult.service";
import { useCampaignResultStore } from "@/store/campaignResultStore";
import type { ResultSubmission } from "@/types/result.types";

export function useSubmitResult() {
  const setSubmitting = useCampaignResultStore((state) => state.setSubmitting);
  const setLastSubmission = useCampaignResultStore((state) => state.setLastSubmission);
  const setLastOutcome = useCampaignResultStore((state) => state.setLastOutcome);
  const lastSubmissionKey = useCampaignResultStore((state) => state.lastSubmissionKey);
  const lastOutcome = useCampaignResultStore((state) => state.lastOutcome);

  const mutation = useMutation<SubmitResultOutcome, Error, ResultSubmission>({
    mutationFn: submitResult,
    onMutate: (submission) => {
      setSubmitting(true);
      setLastSubmission(submission, getResultSubmissionKey(submission));
      setLastOutcome(null);
    },
    onSuccess: (outcome) => {
      setLastOutcome(outcome);
    },
    onError: (error) => {
      setLastOutcome({
        ok: false,
        persisted: false,
        error: error.message,
      });
    },
    onSettled: () => {
      setSubmitting(false);
    },
  });

  const submit = useCallback(
    async (submission: ResultSubmission) => {
      const submissionKey = getResultSubmissionKey(submission);
      const current = useCampaignResultStore.getState();

      if (current.lastSubmissionKey === submissionKey) {
        return current.lastOutcome ?? { ok: true, persisted: false, skipped: true };
      }

      return mutation.mutateAsync(submission);
    },
    [mutation],
  );

  return {
    isSubmitting: mutation.isPending,
    lastSubmissionKey,
    lastOutcome,
    submit,
  };
}
