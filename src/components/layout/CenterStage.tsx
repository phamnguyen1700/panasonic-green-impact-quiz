import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

/** Vertically and horizontally centred content region. */
export function CenterStage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-1 items-center justify-center py-16", className)}>{children}</div>
  );
}
