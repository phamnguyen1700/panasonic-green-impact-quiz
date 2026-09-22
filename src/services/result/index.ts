export {
  calculateSubmissionScore,
  prepareSubmitResultPayload,
  toCreatePlayerRequest,
} from "./resultSubmission.mapper";
export type { SubmitResultPayload } from "./resultSubmission.mapper";
export { getResultSubmissionKey, submitResult } from "./submitResult.service";
export type { SubmitResultOutcome } from "./submitResult.service";
