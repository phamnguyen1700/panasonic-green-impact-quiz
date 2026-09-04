import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

export function ContentContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("app-container", className)}>{children}</div>;
}
