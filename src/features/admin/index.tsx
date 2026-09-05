import { LogOut, RefreshCw, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { useAdminLogin, useAdminLogout, useAdminSession } from "@/hooks/campaign/useAdminAuth";
import { useAdminPlayers } from "@/hooks/campaign/useAdminPlayers";
import { useIsMobile } from "@/hooks/use-mobile";
import { getApiErrorMessage } from "@/services/api/httpClient";
import { useAdminAuthStore } from "@/store/adminAuthStore";
import { useAdminPlayersStore } from "@/store/adminPlayersStore";

import { AdminExportButton } from "./components/AdminExportButton";
import { AdminLoginForm } from "./components/AdminLoginForm";
import { AdminPlayersCards } from "./components/AdminPlayersCards";
import { AdminPlayersTable } from "./components/AdminPlayersTable";
import { AdminSearchForm } from "./components/AdminSearchForm";

const DEFAULT_QUERY = { pageSize: 100 };

export function AdminScreen() {
  const isMobile = useIsMobile();
  const [search, setSearch] = useState("");
  const [isRefreshAnimating, setIsRefreshAnimating] = useState(false);
  const admin = useAdminAuthStore((state) => state.admin);
  const resetAdminPlayers = useAdminPlayersStore((state) => state.reset);
  const session = useAdminSession();
  const login = useAdminLogin();
  const logout = useAdminLogout();
  const isAuthenticated = Boolean(admin);
  const playersQuery = useMemo(
    () => ({
      ...DEFAULT_QUERY,
      ...(search ? { search } : {}),
    }),
    [search],
  );
  const exportQuery = useMemo(() => (search ? { search } : undefined), [search]);
  const players = useAdminPlayers(playersQuery, { enabled: isAuthenticated });
  const isRefreshing = players.isFetching || isRefreshAnimating;

  useEffect(() => {
    if (!isAuthenticated) {
      resetAdminPlayers();
    }
  }, [isAuthenticated, resetAdminPlayers]);

  if (session.isLoading && !admin) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-950 text-sm text-slate-300">
        Đang kiểm tra phiên đăng nhập...
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <AdminLoginForm
        isSubmitting={login.isPending}
        error={login.error}
        onSubmit={(username, password) => login.mutate({ username, password })}
      />
    );
  }

  const handleLogout = () => {
    login.reset();
    resetAdminPlayers();
    logout.mutate();
  };

  const handleRefresh = async () => {
    const startedAt = Date.now();
    setIsRefreshAnimating(true);

    try {
      await players.refetch();
    } finally {
      const elapsed = Date.now() - startedAt;
      window.setTimeout(() => setIsRefreshAnimating(false), Math.max(600 - elapsed, 0));
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-4 text-slate-950 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-5">
        <header className="space-y-4 rounded-lg border border-slate-200 bg-white p-4 sm:p-5">
          <div className="grid grid-cols-[minmax(0,1fr)_2.5rem] gap-2">
            <div className="min-w-0">
              <p className="text-xs font-semibold tracking-[0.18em] text-emerald-700 uppercase">
                Panasonic Green Impact
              </p>
              <h1 className="mt-1 text-2xl font-semibold">Danh sách người chơi</h1>
              <p className="mt-1 text-sm text-slate-500">
                Tài khoản: {admin?.username ?? session.data?.username}
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              disabled={logout.isPending}
              aria-label="Đăng xuất"
              title="Đăng xuất"
              className="size-10 text-slate-500 hover:bg-slate-100 hover:text-slate-950"
            >
              <LogOut aria-hidden />
            </Button>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_2.5rem] gap-2">
            <AdminSearchForm value={search} onSearch={setSearch} />
            <Button
              type="submit"
              form="admin-player-search-form"
              size="icon"
              className="size-10 shrink-0"
              aria-label="Tìm theo tên"
              title="Tìm"
            >
              <Search aria-hidden />
            </Button>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_2.5rem] gap-2">
            <AdminExportButton query={exportQuery} />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="size-10 text-slate-500 hover:bg-slate-100 hover:text-slate-950"
              aria-label="Làm mới danh sách"
              title="Làm mới"
            >
              <RefreshCw aria-hidden className={isRefreshing ? "animate-spin" : ""} />
            </Button>
          </div>
        </header>

        {players.error ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {getApiErrorMessage(players.error, "Không tải được danh sách người chơi.")}
          </div>
        ) : null}

        <section>
          {isMobile ? (
            <AdminPlayersCards players={players.data?.items ?? []} isLoading={players.isLoading} />
          ) : (
            <AdminPlayersTable players={players.data?.items ?? []} isLoading={players.isLoading} />
          )}
        </section>
      </div>
    </main>
  );
}
