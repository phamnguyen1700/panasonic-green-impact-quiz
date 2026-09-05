import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { adminAuthService } from "@/services/campaign/adminAuth.service";
import { useAdminAuthStore } from "@/store/adminAuthStore";
import type { AdminLoginRequest } from "@/types/adminAuth.types";

import { campaignQueryKeys } from "./queryKeys";

export function useAdminSession() {
  const setAdmin = useAdminAuthStore((state) => state.setAdmin);
  const clearAdmin = useAdminAuthStore((state) => state.clearAdmin);

  return useQuery({
    queryKey: campaignQueryKeys.adminSession(),
    queryFn: async ({ signal }) => {
      try {
        const response = await adminAuthService.me(signal);
        setAdmin(response.admin);
        return response.admin;
      } catch (error) {
        clearAdmin();
        throw error;
      }
    },
    retry: false,
  });
}
export function useAdminLogin() {
  const queryClient = useQueryClient();
  const setAdmin = useAdminAuthStore((state) => state.setAdmin);

  return useMutation({
    mutationFn: (body: AdminLoginRequest) => adminAuthService.login(body),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: campaignQueryKeys.all });
      queryClient.removeQueries({ queryKey: campaignQueryKeys.adminPlayers() });
    },
    onSuccess: async (response) => {
      setAdmin(response.admin);
      queryClient.setQueryData(campaignQueryKeys.adminSession(), response.admin);
      await queryClient.invalidateQueries({ queryKey: campaignQueryKeys.adminPlayers() });
    },
  });
}

export function useAdminLogout() {
  const queryClient = useQueryClient();
  const clearAdmin = useAdminAuthStore((state) => state.clearAdmin);

  return useMutation({
    mutationFn: adminAuthService.logout,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: campaignQueryKeys.all });
      clearAdmin();
      queryClient.removeQueries({ queryKey: campaignQueryKeys.adminPlayers() });
      queryClient.removeQueries({ queryKey: campaignQueryKeys.adminSession() });
    },
    onSettled: async () => {
      clearAdmin();
      queryClient.removeQueries({ queryKey: campaignQueryKeys.adminPlayers() });
      queryClient.removeQueries({ queryKey: campaignQueryKeys.adminSession() });
    },
  });
}
