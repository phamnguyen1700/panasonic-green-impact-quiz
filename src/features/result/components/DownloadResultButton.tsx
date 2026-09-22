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
      wrapperClassName="min-w-0 flex-1 sm:flex-none"
      className="min-w-0 px-4 text-xs sm:min-w-[12rem] sm:px-6 sm:text-sm"
    >
      <Download className="size-4 shrink-0" aria-hidden />
      <span>{isBusy ? copy.downloading : copy.download}</span>
    </CampaignButton>
  );
}
