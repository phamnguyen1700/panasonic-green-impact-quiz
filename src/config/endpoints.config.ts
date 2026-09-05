export const endpoints = {
  health: "/health",
  players: "/players",
  adminAuth: {
    login: "/admin/auth/login",
    logout: "/admin/auth/logout",
    me: "/admin/auth/me",
  },
  adminPlayers: {
    list: "/admin/players",
    detail: (playerId: string) => `/admin/players/${playerId}`,
    export: "/admin/players/export",
  },
} as const;
