import { motion } from "framer-motion";
import { Droplets, Leaf, Sparkles, Users, Waves } from "lucide-react";
import type { ComponentType } from "react";

import { cardHover, staggerItem } from "@/config/motion.config";
import { gradients } from "@/config/theme.config";
import type { ForestPersonality, ForestTone } from "@/types/campaign.types";
import { cn } from "@/utils/cn";

const toneGradient: Record<ForestTone, string> = {
  mint: gradients.cardMint,
  sun: gradients.cardSun,
  aqua: gradients.cardAqua,
  sky: gradients.cardSky,
  moss: gradients.cardMoss,
};

const toneIcon: Record<ForestTone, ComponentType<{ className?: string }>> = {
  mint: Droplets,
  sun: Leaf,
  aqua: Waves,
  sky: Users,
  moss: Sparkles,
};

interface ForestCardProps {
  personality: ForestPersonality;
  size?: "sm" | "md";
  interactive?: boolean;
  className?: string;
}

export function ForestCard({
  personality,
  size = "md",
  interactive = true,
  className,
}: ForestCardProps) {
  const Icon = toneIcon[personality.tone];

  return (
    <motion.article
      variants={staggerItem}
      whileHover={interactive ? cardHover : {}}
      style={{ backgroundImage: toneGradient[personality.tone] }}
      className={cn(
        "relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/40",
        "backdrop-blur-xl shadow-[var(--shadow-card)]",
        size === "md" ? "aspect-[3/4.4] w-[13.5rem] p-5" : "aspect-[3/4.2] w-[9.5rem] p-4",
        className,
      )}
    >
      <div className="absolute -right-8 -top-10 size-32 rounded-full bg-white/25 blur-2xl" />

      <header className="relative flex items-start gap-2 text-forest-900/85">
        <Icon className={size === "md" ? "size-5" : "size-4"} aria-hidden />
        <div className="leading-tight">
          <p className={cn("font-semibold", size === "md" ? "text-sm" : "text-xs")}>
            {personality.name}
          </p>
          <p className={cn("opacity-70", size === "md" ? "text-xs" : "text-[0.65rem]")}>
            {personality.region}
          </p>
        </div>
      </header>

      <div className="relative font-script text-forest-900">
        <p className={size === "md" ? "text-3xl leading-tight" : "text-xl leading-tight"}>
          {personality.traits[0]}
        </p>
        <p className={cn("pl-5 leading-tight", size === "md" ? "text-3xl" : "text-xl")}>
          <span className="pr-2 opacity-60">&</span>
          {personality.traits[1]}
        </p>
      </div>

      <p
        className={cn(
          "relative text-forest-900/75",
          size === "md" ? "text-[0.7rem] leading-relaxed" : "text-[0.6rem] leading-snug",
        )}
      >
        {personality.description}
      </p>
    </motion.article>
  );
}
