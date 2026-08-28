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
      className="min-w-[12rem]"
    >
      <span className="inline-flex items-center gap-2">
        <Share2 className="size-4" aria-hidden />
        {isBusy ? copy.sharing : copy.share}
      </span>
    </CampaignButton>
  );
}
