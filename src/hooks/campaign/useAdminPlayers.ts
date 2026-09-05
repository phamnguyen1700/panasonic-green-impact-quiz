import { useMutation, useQuery } from "@tanstack/react-query";

import { adminPlayerService } from "@/services/campaign/player.service";
import { useAdminPlayersStore } from "@/store/adminPlayersStore";
import type { AdminPlayersExportQuery, AdminPlayersQuery } from "@/types/playerApi.types";

import { campaignQueryKeys } from "./queryKeys";

interface UseAdminPlayersOptions {
  enabled?: boolean;
}

export function useAdminPlayers(
  query: AdminPlayersQuery = {},
  { enabled = true }: UseAdminPlayersOptions = {},
) {
  return useQuery({
    queryKey: campaignQueryKeys.adminPlayersList(query),
    queryFn: ({ signal }) => adminPlayerService.list(query, signal),
    enabled,
  });
}

export function useAdminPlayerDetail(playerId: string | null) {
  return useQuery({
    queryKey: campaignQueryKeys.adminPlayerDetail(playerId ?? ""),
    queryFn: ({ signal }) => adminPlayerService.detail(playerId!, signal),
    enabled: Boolean(playerId),
  });
}

export function useExportAdminPlayers() {
  const setLastExport = useAdminPlayersStore((state) => state.setLastExport);

  return useMutation({
    mutationFn: (query?: AdminPlayersExportQuery) => adminPlayerService.export(query),
    onSuccess: (file) => {
      setLastExport(file);
    },
  });
}
