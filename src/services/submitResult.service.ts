import { analytics } from "./analytics.service";
import { appendResultRow } from "./googleSheet.service";
import type { ResultSubmission } from "@/types/result.types";

export interface SubmitResultOutcome {
  ok: boolean;
  persisted: boolean;
  error?: string;
}

/** Single entry point the UI calls once a quiz run is finished. */
export async function submitResult(submission: ResultSubmission): Promise<SubmitResultOutcome> {
  analytics.quizCompleted(submission.resultId);

  try {
    const persisted = await appendResultRow(submission);
    return { ok: true, persisted };
  } catch (error) {
    return {
      ok: false,
      persisted: false,
      error: error instanceof Error ? error.message : "unknown_error",
    };
  }
}
