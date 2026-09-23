import { forwardRef } from "react";

import type { ForestResult } from "@/types/result.types";
import { cn } from "@/utils/cn";

interface ResultCardProps {
  result: ForestResult;
  className?: string;
}

export const ResultCard = forwardRef<HTMLImageElement, ResultCardProps>(function ResultCard(
  { result, className },
  ref,
) {
  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-[1.5rem] shadow-[0_16px_38px_rgba(0,0,0,0.2)] transition-shadow duration-300 ease-out hover:shadow-[0_20px_46px_rgba(0,0,0,0.24)]",
        className,
      )}
    >
      <img
        ref={ref}
        src={result.image}
        alt={result.title}
        className="block h-auto max-h-[48svh] w-full rounded-[1.5rem] object-contain opacity-88 saturate-[0.95] lg:max-h-[44svh]"
        loading="lazy"
      />
    </figure>
  );
});
