import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import {
  AVAILABLE_SCREENS,
  SCREEN_ROUTES,
  nextScreen,
  previousScreen,
  type ScreenId,
} from "@/app/screenFlow";

export function useAppFlow(current: ScreenId) {
  const navigate = useNavigate();

  const go = useCallback(
    (screen: ScreenId) => {
      if (!AVAILABLE_SCREENS.includes(screen)) return;
      void navigate(SCREEN_ROUTES[screen]);
    },
    [navigate],
  );

  return {
    current,
    go,
    goNext: useCallback(() => go(nextScreen(current)), [go, current]),
    goBack: useCallback(() => go(previousScreen(current)), [go, current]),
  };
}
