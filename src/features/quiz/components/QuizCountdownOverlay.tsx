import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const countdownSteps = ["Hãy sẵn sàng!", "3", "2", "1"] as const;
const STEP_DURATION_MS = 1000;

type QuizOverlayMode = "countdown" | "timeout";

interface QuizCountdownOverlayProps {
  active: boolean;
  mode: QuizOverlayMode;
  onComplete?: () => void;
  title?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function QuizCountdownOverlay({
  active,
  mode,
  onComplete,
  title = "Hết thời gian!",
  actionLabel = "Thử lại nhé",
  onAction,
}: QuizCountdownOverlayProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = countdownSteps[stepIndex]!;
  const isCountdown = mode === "countdown";

  useEffect(() => {
    if (active && isCountdown) setStepIndex(0);
  }, [active, isCountdown]);

  useEffect(() => {
    if (!active || !isCountdown) return;

    const timer = window.setTimeout(() => {
      if (stepIndex >= countdownSteps.length - 1) {
        onComplete?.();
        return;
      }

      setStepIndex((current) => current + 1);
    }, STEP_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [active, isCountdown, onComplete, stepIndex]);

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24 }}
          className="fixed inset-0 z-40 grid place-items-center bg-forest-900/58 px-container-gutter text-center backdrop-blur-sm"
        >
          {isCountdown ? (
            <AnimatePresence mode="wait">
              <motion.p
                key={currentStep}
                initial={{ opacity: 0, y: 18, scale: 0.96, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -18, scale: 1.04, filter: "blur(10px)" }}
                transition={{ duration: 0.36, ease: [0.16, 0.84, 0.44, 1] }}
                className="font-display text-[clamp(4rem,14vw,10rem)] leading-none font-extrabold text-mist text-shadow-scene"
              >
                {currentStep}
              </motion.p>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.96, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, scale: 1.03, filter: "blur(10px)" }}
              transition={{ duration: 0.36, ease: [0.16, 0.84, 0.44, 1] }}
              className="flex flex-col items-center gap-8"
            >
              <p className="font-display text-[clamp(4rem,14vw,10rem)] leading-none font-extrabold text-mist text-shadow-scene">
                {title}
              </p>
              <button
                type="button"
                onClick={onAction}
                className="rounded-full bg-white/[0.075] px-9 py-3 text-sm font-semibold text-mist shadow-[var(--efx-crystall-shadow)] backdrop-blur-md transition-colors hover:bg-white/[0.12] focus-visible:ring-2 focus-visible:ring-lime-soft focus-visible:outline-none"
              >
                {actionLabel}
              </button>
            </motion.div>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
