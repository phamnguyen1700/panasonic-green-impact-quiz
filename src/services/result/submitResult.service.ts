import { ApiError } from "@/services/api/httpClient";
import { analytics } from "@/services/analytics";
import { createPlayer } from "@/services/player";
import type { ResultSubmission } from "@/types/result.types";

import { prepareSubmitResultPayload } from "./resultSubmission.mapper";

const RETRY_DELAYS_MS = [700, 1_400, 2_800] as const;

export interface SubmitResultOutcome {
  ok: boolean;
  persisted: boolean;
  alreadySubmitted?: boolean;
  attempts?: number;
  skipped?: boolean;
  error?: string;
}

export function getResultSubmissionKey(submission: ResultSubmission) {
  return submission.submissionId;
}

function wait(delayMs: number) {
  return new Promise((resolve) => globalThis.setTimeout(resolve, delayMs));
}

function shouldRetrySubmit(error: unknown) {
  if (!(error instanceof ApiError)) return true;

  return error.status === 0 || error.status === 429 || error.status >= 500;
}

/** Single entry point the UI calls once a quiz run is finished. */
export async function submitResult(submission: ResultSubmission): Promise<SubmitResultOutcome> {
  analytics.quizCompleted(submission.resultId);
  const payload = prepareSubmitResultPayload(submission);

  if (!payload.body) {
    return {
      ok: false,
      persisted: false,
      skipped: true,
      error: "missing_required_player_contact",
    };
  }

  if (!payload.enabled) {
    if (import.meta.env.DEV) console.info("[submitResult] API submit disabled", payload);
    return { ok: true, persisted: false, skipped: true };
  }

  try {
    let lastError: unknown;
    const maxAttempts = RETRY_DELAYS_MS.length + 1;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        const response = await createPlayer(payload.body);
        return {
          ok: true,
          persisted: true,
          alreadySubmitted: response?.alreadySubmitted ?? false,
          attempts: attempt,
        };
      } catch (error) {
        lastError = error;
        const canRetry = attempt < maxAttempts && shouldRetrySubmit(error);
        if (!canRetry) throw error;
        await wait(RETRY_DELAYS_MS[attempt - 1]!);
      }
    }

    throw lastError;
  } catch (error) {
    return {
      ok: false,
      persisted: false,
      attempts: RETRY_DELAYS_MS.length + 1,
      error: error instanceof Error ? error.message : "unknown_error",
    };
  }
}
