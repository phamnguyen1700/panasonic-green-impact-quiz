import { useEffect, useRef, useState } from "react";

interface UseQuizTimerOptions {
  /** seconds allowed per question */
  duration: number;
  /** restarts the countdown whenever this value changes */
  resetKey: string | number;
  running?: boolean;
  onExpire?: () => void;
}

export function useQuizTimer({
  duration,
  resetKey,
  running = true,
  onExpire,
}: UseQuizTimerOptions) {
  const [remaining, setRemaining] = useState(duration);
  const expireRef = useRef(onExpire);
  expireRef.current = onExpire;

  useEffect(() => {
    setRemaining(duration);
  }, [duration, resetKey]);

  useEffect(() => {
    if (!running) return;

    const id = window.setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          window.clearInterval(id);
          expireRef.current?.();
          return 0;
        }
        return current - 1;
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
