import { Download, Loader2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useExportAdminPlayers } from "@/hooks/campaign/useAdminPlayers";
import { cn } from "@/lib/utils";
import { getApiErrorMessage } from "@/services/api/httpClient";
import { downloadFile } from "@/services/campaign/download.service";
import type { AdminPlayersExportQuery } from "@/types/playerApi.types";

interface AdminExportButtonProps {
  className?: string;
  query?: AdminPlayersExportQuery;
}

export function AdminExportButton({ className, query }: AdminExportButtonProps) {
  const [isDownloadAnimating, setIsDownloadAnimating] = useState(false);
  const exportPlayers = useExportAdminPlayers();
  const isExporting = exportPlayers.isPending || isDownloadAnimating;

  const handleExport = async () => {
    const startedAt = Date.now();
    setIsDownloadAnimating(true);

    try {
      const file = await exportPlayers.mutateAsync(query);
      downloadFile(file.blob, file.fileName);
    } finally {
      const elapsed = Date.now() - startedAt;
      window.setTimeout(() => setIsDownloadAnimating(false), Math.max(600 - elapsed, 0));
    }
  };

  return (
    <div className="space-y-2">
      <Button
        type="button"
        onClick={handleExport}
        disabled={isExporting}
        className={cn("w-full bg-[#217346] text-white shadow-sm hover:bg-[#1a5c38]", className)}
      >
        {isExporting ? <Loader2 aria-hidden className="animate-spin" /> : <Download aria-hidden />}
        {isExporting ? "Đang export..." : "Export Excel"}
      </Button>
      {exportPlayers.error ? (
        <p className="max-w-56 text-xs text-red-600">
          {getApiErrorMessage(exportPlayers.error, "Không export được file Excel.")}
        </p>
      ) : null}
    </div>
  );
}
