import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

export function ContentContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[82rem] px-6 sm:px-10", className)}>{children}</div>
  );
}
