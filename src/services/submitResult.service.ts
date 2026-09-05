import { analytics } from "./analytics.service";
import { createPlayer } from "@/services/campaign/player.service";
import { prepareSubmitResultPayload } from "@/services/campaign/resultSubmission.mapper";
import type { ResultSubmission } from "@/types/result.types";

export interface SubmitResultOutcome {
  ok: boolean;
  persisted: boolean;
  skipped?: boolean;
  error?: string;
}

export function getResultSubmissionKey(submission: ResultSubmission) {
  return [
    submission.player?.phone ?? "missing-phone",
    submission.resultId,
    submission.completedAt,
  ].join(":");
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
    await createPlayer(payload.body);
    return { ok: true, persisted: true };
  } catch (error) {
    return {
      ok: false,
      persisted: false,
      error: error instanceof Error ? error.message : "unknown_error",
    };
  }
}
