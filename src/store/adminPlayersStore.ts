import { create } from "zustand";

import type { AdminPlayersExportFile } from "@/types/playerApi.types";

interface AdminPlayersState {
  lastExport: AdminPlayersExportFile | null;
  setLastExport: (file: AdminPlayersExportFile | null) => void;
  reset: () => void;
}

export const useAdminPlayersStore = create<AdminPlayersState>((set) => ({
  lastExport: null,
  setLastExport: (lastExport) => set({ lastExport }),
  reset: () => set({ lastExport: null }),
}));
