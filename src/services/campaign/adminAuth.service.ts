import { endpoints } from "@/config/endpoints.config";
import { apiClient } from "@/services/api/httpClient";
import type {
  AdminAuthResponse,
  AdminLoginRequest,
  AdminLogoutResponse,
} from "@/types/adminAuth.types";

export const adminAuthService = {
  login: async (body: AdminLoginRequest) => {
    const response = await apiClient.post<AdminAuthResponse>(endpoints.adminAuth.login, body);
    return response.data;
  },
  logout: async () => {
    const response = await apiClient.post<AdminLogoutResponse>(endpoints.adminAuth.logout, null);
    return response.data;
  },
  me: async (signal?: AbortSignal) => {
    const response = await apiClient.get<AdminAuthResponse>(endpoints.adminAuth.me, {
      signal,
    });
    return response.data;
  },
};
