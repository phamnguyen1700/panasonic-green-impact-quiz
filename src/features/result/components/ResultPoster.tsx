import { forwardRef } from "react";

import type { ForestResult } from "@/types/result.types";
import { cn } from "@/utils/cn";

interface ResultPosterProps {
  result: ForestResult;
  className?: string;
  compact?: boolean;
}

export const ResultPoster = forwardRef<HTMLImageElement, ResultPosterProps>(function ResultPoster(
  { result, className, compact = false },
  ref,
) {
  return (
    <img
      ref={ref}
      src={result.image}
      alt={result.title}
      className={cn(
        "block h-auto w-full object-contain drop-shadow-[0_18px_45px_rgba(0,0,0,0.24)]",
        compact ? "max-w-full" : "max-h-[38svh] lg:max-h-[34svh]",
        className,
      )}
      loading="lazy"
    />
  );
});
