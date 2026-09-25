import { forwardRef, type CSSProperties } from "react";

import type { ForestResult } from "@/types/result.types";
import { cn } from "@/utils/cn";

interface ResultCardProps {
  result: ForestResult;
  className?: string;
  glassColor?: string;
  glowColor?: string;
  imageClassName?: string;
}

export const ResultCard = forwardRef<HTMLImageElement, ResultCardProps>(function ResultCard(
  {
    result,
    className,
    glassColor = result.cardColor,
    glowColor = result.cardGlowColor,
    imageClassName,
  },
  ref,
) {
  const style = {
    "--result-card-color": glassColor,
    "--result-card-glow": glowColor ?? glassColor,
  } as CSSProperties;

  return (
    <figure
      style={style}
      className={cn(
        "relative isolate aspect-[3/4] w-full overflow-hidden rounded-[1.5rem] border border-white/30 bg-[color-mix(in_srgb,var(--result-card-color)_25%,rgba(255,255,255,0.1))] p-3 shadow-[0_22px_52px_rgba(0,0,0,0.38)] backdrop-blur-xl transition duration-300 ease-out before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_26%_12%,rgba(255,255,255,0.28),transparent_30%),radial-gradient(circle_at_74%_76%,color-mix(in_srgb,var(--result-card-glow)_68%,transparent),transparent_46%)] before:opacity-80 after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:bg-[linear-gradient(145deg,rgba(255,255,255,0.18),rgba(255,255,255,0.04)_42%,rgba(255,255,255,0.08))] hover:scale-[1.025] hover:border-white/45 hover:shadow-[0_24px_56px_rgba(0,0,0,0.46)]",
        className,
      )}
    >
      <img
        ref={ref}
        src={result.image}
        alt={result.title}
        className={cn(
          "relative z-10 block h-full w-full rounded-[1.1rem] object-contain drop-shadow-[0_14px_22px_rgba(0,0,0,0.33)] saturate-[0.98]",
          imageClassName,
        )}
        loading="lazy"
      />
    </figure>
  );
});
