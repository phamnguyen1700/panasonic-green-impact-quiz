import { httpClient } from "./httpClient";
import type { ResultSubmission } from "@/types/result.types";

/**
 * Placeholder Google Sheet sink.
 * Set VITE_GOOGLE_SHEET_ENDPOINT to a Apps Script / webhook URL to activate.
 */
const endpoint = import.meta.env["VITE_GOOGLE_SHEET_ENDPOINT"] as string | undefined;

export interface SheetRow {
  name: string;
  phone: string;
  resultId: string;
  answers: string;
  completedAt: string;
}

export function toSheetRow(submission: ResultSubmission): SheetRow {
  return {
    name: submission.player?.name ?? "",
    phone: submission.player?.phone ?? "",
    resultId: submission.resultId,
    answers: submission.answers.map((answer) => answer.optionId).join("|"),
    completedAt: submission.completedAt,
  };
}

export async function appendResultRow(submission: ResultSubmission): Promise<boolean> {
  const row = toSheetRow(submission);

  if (!endpoint) {
    // Placeholder mode — no backend wired yet.
    if (import.meta.env.DEV) console.info("[googleSheet] skipped (no endpoint)", row);
    return false;
  }

  await httpClient.post(endpoint, row);
  return true;
}
