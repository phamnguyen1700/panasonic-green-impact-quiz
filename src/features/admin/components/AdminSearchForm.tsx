import { Search, X } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";

interface AdminSearchFormProps {
  value: string;
  onSearch: (value: string) => void;
}

export function AdminSearchForm({ value, onSearch }: AdminSearchFormProps) {
  const [draft, setDraft] = useState(value);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(draft.trim());
  };

  const handleClear = () => {
    setDraft("");
    onSearch("");
  };

  return (
    <form id="admin-player-search-form" onSubmit={handleSubmit} className="w-full">
      <div className="relative min-w-0">
        <Search
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400"
        />
        <Input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Tìm theo tên"
          className="h-10 bg-white pr-10 pl-9"
        />
        {draft ? (
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-1/2 right-2 grid size-6 -translate-y-1/2 place-items-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            aria-label="Xóa tìm kiếm"
          >
            <X aria-hidden className="size-4" />
          </button>
        ) : null}
      </div>
    </form>
  );
}
