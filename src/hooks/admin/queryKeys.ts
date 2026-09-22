export const campaignQueryKeys = {
  all: ["campaign"] as const,
  adminSession: () => [...campaignQueryKeys.all, "adminSession"] as const,
  adminPlayers: () => [...campaignQueryKeys.all, "adminPlayers"] as const,
  adminPlayersList: (query: unknown) =>
    [...campaignQueryKeys.adminPlayers(), "list", query] as const,
  adminPlayerDetail: (playerId: string) =>
    [...campaignQueryKeys.adminPlayers(), "detail", playerId] as const,
};
