export interface CreatePlayerRequest {
  submissionId: string;
  name: string;
  result: string;
  score: number;
  completeAt: string;
}

export type PlayerSubmissionStatus = "accepted" | "already_submitted";

export interface CreatePlayerResponse {
  submissionId: string;
  status: PlayerSubmissionStatus;
  id: string | null;
  createdAt: string | null;
  alreadySubmitted: boolean;
}

export interface AdminPlayer {
  id: string;
  name: string;
  result: string;
  score: number;
  completedAt: string;
  createdAt: string;
}

export interface AdminPlayersListResponse {
  items: AdminPlayer[];
  nextCursor: string | null;
  hasMore: boolean;
  pageSize: number;
}

export interface AdminPlayersQuery {
  pageSize?: number;
  cursor?: string;
  search?: string;
  result?: string;
  from?: string;
  to?: string;
}

export type AdminPlayersExportQuery = Omit<AdminPlayersQuery, "pageSize" | "cursor">;

export interface AdminPlayersExportFile {
  blob: Blob;
  fileName: string;
}
