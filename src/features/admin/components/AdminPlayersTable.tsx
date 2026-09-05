import type { AdminPlayer } from "@/types/playerApi.types";

interface AdminPlayersTableProps {
  players: AdminPlayer[];
  isLoading: boolean;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

export function AdminPlayersTable({ players, isLoading }: AdminPlayersTableProps) {
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
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold tracking-wide text-slate-500 uppercase">
            <tr>
              <th className="px-4 py-3">Tên</th>
              <th className="px-4 py-3">Số điện thoại</th>
              <th className="px-4 py-3">Kết quả</th>
              <th className="px-4 py-3 text-right">Điểm</th>
              <th className="px-4 py-3">Hoàn thành</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {players.map((player, index) => (
              <tr
                key={player.id}
                className={
                  index % 2 === 0
                    ? "bg-white hover:bg-slate-50"
                    : "bg-emerald-50/50 hover:bg-emerald-50"
                }
              >
                <td className="px-4 py-3 font-medium text-slate-950">{player.name}</td>
                <td className="px-4 py-3">{player.phone}</td>
                <td className="px-4 py-3">{player.result}</td>
                <td className="px-4 py-3 text-right tabular-nums">{player.score}</td>
                <td className="px-4 py-3 whitespace-nowrap">{formatDate(player.completedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
