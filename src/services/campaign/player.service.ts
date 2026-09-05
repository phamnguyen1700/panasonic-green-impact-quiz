import { endpoints } from "@/config/endpoints.config";
import { env } from "@/config/env.config";
import { apiClient } from "@/services/api/httpClient";
import type {
  AdminPlayer,
  AdminPlayersExportFile,
  AdminPlayersExportQuery,
  AdminPlayersListResponse,
  AdminPlayersQuery,
  CreatePlayerRequest,
  CreatePlayerResponse,
} from "@/types/playerApi.types";

function toQueryString(query: AdminPlayersQuery = {}) {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== "") params.set(key, String(value));
  });

  const value = params.toString();
  return value ? `?${value}` : "";
}

function getFileNameFromContentDisposition(value: string | undefined) {
  if (!value) return "panasonic-green-impact-players.xlsx";

  const utf8Match = value.match(/filename\*=UTF-8''([^;]+)/i);
  if (utf8Match?.[1]) return decodeURIComponent(utf8Match[1]);

  const fallbackMatch = value.match(/filename="?([^";]+)"?/i);
  return fallbackMatch?.[1] ?? "panasonic-green-impact-players.xlsx";
}

export async function createPlayer(body: CreatePlayerRequest, signal?: AbortSignal) {
  if (!env.apiSubmitEnabled) {
    if (import.meta.env.DEV) console.info("[campaignApi] submit skipped", body);
    return null;
  }

  const response = await apiClient.post<CreatePlayerResponse>(endpoints.players, body, { signal });
  return response.data;
}

export const adminPlayerService = {
  list: async (query?: AdminPlayersQuery, signal?: AbortSignal) => {
    const response = await apiClient.get<AdminPlayersListResponse>(
      `${endpoints.adminPlayers.list}${toQueryString(query)}`,
      { signal },
    );
    return response.data;
  },
  detail: async (playerId: string, signal?: AbortSignal) => {
    const response = await apiClient.get<AdminPlayer>(endpoints.adminPlayers.detail(playerId), {
      signal,
    });
    return response.data;
  },
  export: async (query?: AdminPlayersExportQuery): Promise<AdminPlayersExportFile> => {
    const response = await apiClient.get<Blob>(
      `${endpoints.adminPlayers.export}${toQueryString(query)}`,
      {
        responseType: "blob",
      },
    );
    return {
      blob: response.data,
      fileName: getFileNameFromContentDisposition(response.headers["content-disposition"]),
    };
  },
  exportUrl: (query?: AdminPlayersExportQuery) =>
    `${env.apiBaseUrl}${endpoints.adminPlayers.export}${toQueryString(query)}`,
};
