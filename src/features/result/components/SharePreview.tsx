import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2 } from "lucide-react";

import { campaign } from "@/config/campaign.config";
import { sharePreviewEnter } from "@/config/motion.config";
import type { ForestResult } from "@/types/result.types";

import { ResultPoster } from "./ResultPoster";

interface SharePreviewProps {
  result: ForestResult;
  playerName?: string | undefined;
}

/** Social post mockup so the player sees how the card will look when shared. */
export function SharePreview({ result, playerName }: SharePreviewProps) {
  const copy = campaign.result;

  return (
    <motion.aside
      variants={sharePreviewEnter}
      initial="hidden"
      animate="visible"
      className="w-full max-w-sm"
    >
      <p className="mb-3 text-xs tracking-[0.2em] text-mist/55 uppercase">
        {copy.sharePreviewTitle}
      </p>

      <div className="glass-surface overflow-hidden rounded-[1.75rem] p-4">
        <header className="flex items-center gap-3">
          <span
            className="grid size-10 place-items-center rounded-full font-display text-sm font-bold text-forest-900"
            style={{ backgroundImage: "var(--gradient-cta)" }}
          >
            {(playerName ?? campaign.brand.name).charAt(0).toUpperCase()}
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-mist">{playerName ?? campaign.brand.name}</p>
            <p className="text-[0.65rem] text-mist/55">{campaign.brand.tagline}</p>
          </div>
        </header>

        <p className="mt-3 text-sm leading-relaxed text-mist/80">{copy.sharePreviewCaption}</p>
        <p className="mt-1 text-xs text-lime-soft">{copy.shareHashtags}</p>

        <div className="mt-3 overflow-hidden rounded-[1.25rem]">
          <ResultPoster result={result} playerName={playerName} compact />
        </div>

        <footer className="mt-3 flex items-center gap-5 text-mist/55">
          <span className="inline-flex items-center gap-1.5 text-xs">
            <Heart className="size-3.5" aria-hidden /> 128
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs">
            <MessageCircle className="size-3.5" aria-hidden /> 24
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs">
            <Share2 className="size-3.5" aria-hidden /> 16
          </span>
        </footer>
      </div>
    </motion.aside>
  );
}
