import { create } from "zustand";

import type { AdminUser } from "@/types/adminAuth.types";

interface AdminAuthState {
  admin: AdminUser | null;
  setAdmin: (admin: AdminUser | null) => void;
  clearAdmin: () => void;
}

export const useAdminAuthStore = create<AdminAuthState>((set) => ({
  admin: null,
  setAdmin: (admin) => set({ admin }),
  clearAdmin: () => set({ admin: null }),
}));
