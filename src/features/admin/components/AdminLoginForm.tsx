import { LogIn } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getApiErrorMessage } from "@/services/api/httpClient";

interface AdminLoginFormProps {
  isSubmitting: boolean;
  error: unknown;
  onSubmit: (username: string, password: string) => void;
}

export function AdminLoginForm({ isSubmitting, error, onSubmit }: AdminLoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(username.trim(), password);
  };

  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-4 text-slate-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30"
      >
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.18em] text-emerald-300 uppercase">
            Panasonic Green Impact
          </p>
          <h1 className="text-2xl font-semibold text-white">Trang quản trị viên</h1>
          <p className="text-sm text-slate-400">Dùng tài khoản admin đã được cấp.</p>
        </div>

        <div className="mt-6 space-y-4">
          <label className="block space-y-2 text-sm">
            <span className="text-slate-300">Username</span>
            <Input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
              className="border-white/10 bg-slate-900 text-white mt-4"
              required
            />
          </label>

          <label className="block space-y-2 text-sm">
            <span className="text-slate-300">Password</span>
            <Input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              autoComplete="current-password"
              className="border-white/10 bg-slate-900 text-white mt-4"
              required
            />
          </label>
        </div>

        {error ? (
          <p className="mt-4 rounded-md border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-100">
            {getApiErrorMessage(error, "Đăng nhập không thành công.")}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={isSubmitting || !username.trim() || !password}
          className="mt-6 h-11 w-full bg-emerald-500 text-slate-950 hover:bg-emerald-400"
        >
          <LogIn aria-hidden />
          {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>
      </form>
    </main>
  );
}
