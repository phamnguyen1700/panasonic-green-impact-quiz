import { endpoints } from "@/config/endpoints.config";
import { env } from "@/config/env.config";
import { apiClient } from "@/services/api/httpClient";
import type { CreatePlayerRequest, CreatePlayerResponse } from "@/types/playerApi.types";

export async function createPlayer(body: CreatePlayerRequest, signal?: AbortSignal) {
  if (!env.apiSubmitEnabled) {
    if (import.meta.env.DEV) console.info("[campaignApi] submit skipped", body);
    return null;
  }

  const response = await apiClient.post<CreatePlayerResponse>(endpoints.players, body, { signal });
  return response.data;
}
