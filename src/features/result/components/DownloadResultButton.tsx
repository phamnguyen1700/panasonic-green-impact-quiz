import { Download } from "lucide-react";

import { CampaignButton } from "@/components/CampaignButton";
import { campaign } from "@/config/campaign.config";

interface DownloadResultButtonProps {
  onDownload: () => void | Promise<void>;
  isBusy?: boolean;
}

export function DownloadResultButton({ onDownload, isBusy = false }: DownloadResultButtonProps) {
  const copy = campaign.result;

  return (
    <CampaignButton
      size="md"
      onClick={() => void onDownload()}
      disabled={isBusy}
      className="min-w-[12rem]"
    >
      <span className="inline-flex items-center gap-2">
        <Download className="size-4" aria-hidden />
        {isBusy ? copy.downloading : copy.download}
      </span>
    </CampaignButton>
  );
}
