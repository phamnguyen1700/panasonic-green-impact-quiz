/** Ordered campaign screens. Quiz/result screens land in later phases. */
export const SCREENS = ["home", "info", "quiz", "result"] as const;

export type ScreenId = (typeof SCREENS)[number];

export const SCREEN_ROUTES: Record<ScreenId, string> = {
  home: "/",
  info: "/info",
  quiz: "/quiz",
  result: "/result",
};

/** Screens that are implemented today — used to guard navigation. */
export const AVAILABLE_SCREENS: ScreenId[] = ["home", "info"];

export function nextScreen(current: ScreenId): ScreenId {
  const index = SCREENS.indexOf(current);
  return SCREENS[Math.min(index + 1, SCREENS.length - 1)];
}

export function previousScreen(current: ScreenId): ScreenId {
  const index = SCREENS.indexOf(current);
  return SCREENS[Math.max(index - 1, 0)];
}
