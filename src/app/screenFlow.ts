/** Ordered campaign screens. Quiz/result screens land in later phases. */
export const SCREENS = ["home", "info", "quiz", "result"] as const;

export type ScreenId = (typeof SCREENS)[number];

export const SCREEN_ROUTES: Record<ScreenId, string> = {
  home: "/",
  info: "/info",
  quiz: "/quiz",
  result: "/result",
};

export const SCREEN_META: Record<ScreenId, { title: string; description: string }> = {
  home: {
    title: "Bạn là loại rừng nào? | 5 năm Sống khỏe góp xanh",
    description:
      "Quiz cảm hứng thiên nhiên: khám phá tính cách rừng của bạn qua 5 dấu ấn xanh của chiến dịch Sống khỏe góp xanh.",
  },
  info: {
    title: "Trước khi vào rừng | Sống khỏe góp xanh",
    description:
      "Để lại tên của bạn để nhận tấm thẻ tính cách rừng cá nhân hóa từ chiến dịch Sống khỏe góp xanh.",
  },
  quiz: {
    title: "Trắc nghiệm tính cách rừng | Sống khỏe góp xanh",
    description: "10 câu hỏi nhẹ nhàng giữa rừng xanh để tìm ra khu rừng đang lớn lên trong bạn.",
  },
  result: {
    title: "Kết quả: bạn là loại rừng nào? | Sống khỏe góp xanh",
    description:
      "Nhận thẻ tính cách rừng cá nhân hóa, tải về và chia sẻ dấu ấn xanh của bạn cùng chiến dịch Sống khỏe góp xanh.",
  },
};

/** Screens that are implemented today — used to guard navigation. */
export const AVAILABLE_SCREENS: ScreenId[] = ["home", "info", "quiz", "result"];

export function pathToScreen(pathname: string): ScreenId {
  const match = AVAILABLE_SCREENS.find((screen) => SCREEN_ROUTES[screen] === pathname);
  return match ?? "home";
}

export function nextScreen(current: ScreenId): ScreenId {
  const index = SCREENS.indexOf(current);
  return SCREENS[Math.min(index + 1, SCREENS.length - 1)]!;
}

export function previousScreen(current: ScreenId): ScreenId {
  const index = SCREENS.indexOf(current);
  return SCREENS[Math.max(index - 1, 0)]!;
}
