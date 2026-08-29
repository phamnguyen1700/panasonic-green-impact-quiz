import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";

import { campaign } from "@/config/campaign.config";
import { lightSweep, modalCard, modalOverlay } from "@/config/motion.config";
import { zIndex } from "@/config/theme.config";
import type { ForestResult } from "@/types/result.types";

interface ResultCardModalProps {
  open: boolean;
  onClose: () => void;
  result: ForestResult;
  playerName?: string | undefined;
  poster: ReactNode;
  actions?: ReactNode;
}

export function ResultCardModal({
  open,
  onClose,
  result,
  playerName,
  poster,
  actions,
}: ResultCardModalProps) {
  const copy = campaign.result;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          variants={modalOverlay}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-forest-900/70 p-4 backdrop-blur-md sm:p-8"
          style={{ zIndex: zIndex.modal }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={result.title}
        >
          <motion.div
            variants={modalCard}
            onClick={(event) => event.stopPropagation()}
            className="glass-surface relative my-auto w-full max-w-4xl overflow-hidden rounded-[2rem] p-5 sm:p-8"
          >
            <motion.span
              animate={lightSweep}
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />

            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng"
              className="absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-full border border-white/25 bg-white/10 text-mist backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <X className="size-4" aria-hidden />
            </button>

            <div className="grid gap-7 lg:grid-cols-[minmax(0,20rem)_1fr] lg:items-center">
              <div className="mx-auto w-full max-w-xs">{poster}</div>

              <div className="relative">
                <p className="text-xs tracking-[0.2em] text-lime-soft uppercase">
                  {result.forestType}
                </p>
                <h2 className="mt-2 font-display text-3xl leading-tight font-extrabold text-mist sm:text-4xl">
                  {result.title}
                </h2>
                <p className="mt-1 font-script text-xl text-mist/75">{result.subtitle}</p>

                <p className="mt-4 text-sm leading-relaxed text-mist/80">{result.description}</p>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-[0.65rem] tracking-[0.18em] text-mist/50 uppercase">
                      {copy.traitsLabel}
                    </p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {result.traits.map((trait) => (
                        <li
                          key={trait}
                          className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs text-mist"
                        >
                          {trait}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-[0.65rem] tracking-[0.18em] text-mist/50 uppercase">
                      {copy.impactLabel}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-mist/75">{result.impact}</p>
                  </div>
                </div>

                {playerName ? (
                  <p className="mt-6 text-xs text-mist/50">
                    {copy.revealName} {playerName} · {copy.cardBadge}
                  </p>
                ) : null}

                {actions ? <div className="mt-7 flex flex-wrap gap-3">{actions}</div> : null}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
