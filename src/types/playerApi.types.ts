export interface CreatePlayerRequest {
  name: string;
  phone: string;
  result: string;
  score: number;
  completeAt: string;
}

export interface CreatePlayerResponse {
  id: string;
  createdAt: string;
}

export interface AdminPlayer {
  id: string;
  name: string;
  phone: string;
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
