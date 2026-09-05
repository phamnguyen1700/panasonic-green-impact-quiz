import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { SCREEN_META, pathToScreen } from "@/app/screenFlow";

const ROUTE_META: Record<string, { title: string; description: string }> = {
  "/admin": {
    title: "Admin | Panasonic Green Impact",
    description: "Trang quản trị người chơi Panasonic Green Impact.",
  },
};

function setMeta(selector: string, attribute: "content", value: string) {
  const element = document.head.querySelector<HTMLMetaElement>(selector);
  if (element) element.setAttribute(attribute, value);
}

export function RouteMeta() {
  const location = useLocation();

  useEffect(() => {
    const screen = pathToScreen(location.pathname);
    const meta = ROUTE_META[location.pathname] ?? SCREEN_META[screen];

    document.title = meta.title;
    setMeta('meta[name="description"]', "content", meta.description);
    setMeta('meta[property="og:title"]', "content", meta.title);
    setMeta('meta[property="og:description"]', "content", meta.description);
  }, [location.pathname]);

  return null;
}
