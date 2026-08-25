import type { ReactNode } from "react";

import { zIndex } from "@/config/theme.config";
import { cn } from "@/utils/cn";

interface FullscreenStageProps {
  children: ReactNode;
  className?: string;
}

/** Content layer that sits above the background scene and fills the viewport. */
export function FullscreenStage({ children, className }: FullscreenStageProps) {
  return (
    <div
      className={cn("relative flex min-h-[100svh] w-full flex-col", className)}
      style={{ zIndex: zIndex.content }}
    >
      {children}
    </div>
  );
}
