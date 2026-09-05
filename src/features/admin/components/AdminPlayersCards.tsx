import type { AdminPlayer } from "@/types/playerApi.types";

interface AdminPlayersCardsProps {
  players: AdminPlayer[];
  isLoading: boolean;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

export function AdminPlayersCards({ players, isLoading }: AdminPlayersCardsProps) {
  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
        Đang tải danh sách người chơi...
      </div>
    );
  }

  if (players.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
        Chưa có người chơi nào.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {players.map((player, index) => (
        <article
          key={player.id}
          className={`rounded-lg border border-slate-200 p-4 ${
            index % 2 === 0 ? "bg-white" : "bg-emerald-50/70"
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate text-base font-semibold text-slate-950">{player.name}</h2>
              <p className="mt-1 text-sm text-slate-500">{player.phone}</p>
            </div>
            <time className="shrink-0 text-right text-xs font-medium text-slate-500">
              {formatDate(player.completedAt)}
            </time>
          </div>

          <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3 text-sm">
            <div className="min-w-0">
              <p className="text-xs font-medium tracking-wide text-slate-400 uppercase">Kết quả</p>
              <p className="mt-1 truncate text-slate-700">{player.result}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium tracking-wide text-slate-400 uppercase">Điểm</p>
              <p className="mt-1 font-semibold text-emerald-700">{player.score}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
