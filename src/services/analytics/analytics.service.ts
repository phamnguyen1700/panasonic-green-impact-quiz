/** No-op analytics façade — swap the sink later without touching UI code. */

type EventPayload = Record<string, string | number | boolean | null | undefined>;

const enabled = import.meta.env.DEV;

function emit(event: string, payload?: EventPayload) {
  if (enabled) console.info(`[analytics] ${event}`, payload ?? {});
}

export const analytics = {
  screenView: (screen: string) => emit("screen_view", { screen }),
  quizStarted: () => emit("quiz_started"),
  questionAnswered: (questionId: string, optionId: string, index: number) =>
    emit("question_answered", { questionId, optionId, index }),
  quizCompleted: (resultId: string) => emit("quiz_completed", { resultId }),
  resultDownloaded: (resultId: string) => emit("result_downloaded", { resultId }),
  resultShared: (resultId: string, channel: string) => emit("result_shared", { resultId, channel }),
};

export type Analytics = typeof analytics;
