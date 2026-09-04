import { Badge } from "@elemental-fx/crystall-ui";
import { forwardRef } from "react";

import { CampaignBadgeImage } from "@/components/BrandAssets";
import { campaign } from "@/config/campaign.config";
import { gradients } from "@/config/theme.config";
import type { ForestTone } from "@/types/campaign.types";
import type { ForestResult } from "@/types/result.types";
import { cn } from "@/utils/cn";

const toneGradient: Record<ForestTone, string> = {
  mint: gradients.cardMint,
  sun: gradients.cardSun,
  aqua: gradients.cardAqua,
  sky: gradients.cardSky,
  moss: gradients.cardMoss,
};

interface ResultPosterProps {
  result: ForestResult;
  playerName?: string | undefined;
  className?: string;
  /** compact variant used inside the share preview mockup */
  compact?: boolean;
}

/** The exact visual that gets captured for download / share. */
export const ResultPoster = forwardRef<HTMLDivElement, ResultPosterProps>(function ResultPoster(
  { result, playerName, className, compact = false },
  ref,
) {
  const copy = campaign.result;

  return (
    <div
      ref={ref}
      className={cn(
        "relative isolate flex aspect-[4/5] w-full flex-col justify-end overflow-hidden rounded-[2rem] bg-forest-900",
        className,
      )}
    >
      <img
        src={result.image}
        alt={result.forestType}
        className="absolute inset-0 size-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-900 via-forest-900/55 to-forest-900/10" />
      <div className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundImage: gradients.cta }} />

      <div className={cn("relative", compact ? "p-4" : "p-5 sm:p-6")}>
        <CampaignBadgeImage className={compact ? "h-5" : "h-7"} />

        {playerName ? (
          <p className={cn("mt-2 text-mist/70", compact ? "text-[0.6rem]" : "text-sm")}>
            {copy.revealName} <span className="font-semibold text-mist">{playerName}</span>
          </p>
        ) : null}

        <h2
          className={cn(
            "mt-1 font-display font-extrabold tracking-tight text-mist",
            compact ? "text-lg leading-tight" : "text-[clamp(1.6rem,3.4vw,2.5rem)] leading-[1.05]",
          )}
        >
          {result.title}
        </h2>
        <p
          className={cn(
            "mt-1 font-script text-lime-soft",
            compact ? "text-xs" : "text-lg sm:text-xl",
          )}
        >
          {result.subtitle}
        </p>

        {!compact ? (
          <p className="mt-3 line-clamp-3 max-w-md text-[0.78rem] leading-relaxed text-mist/80">
            {result.description}
          </p>
        ) : null}

        <div className={cn("flex flex-wrap gap-2", compact ? "mt-2" : "mt-4")}>
          {result.traits.map((trait) => (
            <Badge
              key={trait}
              className={cn(
                "rounded-full border border-transparent font-medium text-forest-900",
                compact ? "px-2 py-0.5 text-[0.55rem]" : "px-3 py-1.5 text-xs",
              )}
              style={{ backgroundImage: toneGradient[result.tone] }}
            >
              {trait}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
});
