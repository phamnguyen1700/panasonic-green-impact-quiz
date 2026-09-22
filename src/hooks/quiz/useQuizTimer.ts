import { useEffect, useRef, useState } from "react";

interface UseQuizTimerOptions {
  /** seconds allowed per question */
  duration: number;
  /** restarts the countdown whenever this value changes */
  resetKey: string | number;
  initialRemaining?: number;
  running?: boolean;
  onTick?: (remaining: number) => void;
  onExpire?: () => void;
}

function clampRemaining(duration: number, remaining?: number) {
  return Math.max(0, Math.min(duration, remaining ?? duration));
}

export function useQuizTimer({
  duration,
  resetKey,
  initialRemaining,
  running = true,
  onTick,
  onExpire,
}: UseQuizTimerOptions) {
  const [remaining, setRemaining] = useState(() => clampRemaining(duration, initialRemaining));
  const expireRef = useRef(onExpire);
  const tickRef = useRef(onTick);
  expireRef.current = onExpire;
  tickRef.current = onTick;

  useEffect(() => {
    const nextRemaining = clampRemaining(duration, initialRemaining);
    setRemaining(nextRemaining);
    tickRef.current?.(nextRemaining);
  }, [duration, resetKey, initialRemaining]);

  useEffect(() => {
    if (!running) return;

    const id = window.setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          window.clearInterval(id);
          tickRef.current?.(0);
          expireRef.current?.();
          return 0;
        }
        const nextRemaining = current - 1;
        tickRef.current?.(nextRemaining);
        return nextRemaining;
      });
    }, 1000);

    return () => window.clearInterval(id);
  }, [running, resetKey, duration]);

  const ratio = duration > 0 ? remaining / duration : 0;

  return {
    remaining,
    ratio,
    isLow: remaining <= 5 && remaining > 0,
    isExpired: remaining === 0,
  };
}
