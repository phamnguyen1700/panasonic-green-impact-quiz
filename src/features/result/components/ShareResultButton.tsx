import { Share2 } from "lucide-react";

import { CampaignButton } from "@/components/CampaignButton";
import { campaign } from "@/config/campaign.config";

interface ShareResultButtonProps {
  onShare: () => void | Promise<void>;
  isBusy?: boolean;
}

export function ShareResultButton({ onShare, isBusy = false }: ShareResultButtonProps) {
  const copy = campaign.result;

  return (
    <CampaignButton
      variant="outline"
      size="md"
      onClick={() => void onShare()}
      disabled={isBusy}
      wrapperClassName="min-w-0 flex-1 sm:flex-none"
      className="min-w-0 px-4 text-xs sm:min-w-[12rem] sm:px-6 sm:text-sm"
    >
      <Share2 className="size-4 shrink-0" aria-hidden />
      <span>{isBusy ? copy.sharing : copy.share}</span>
    </CampaignButton>
  );
}
