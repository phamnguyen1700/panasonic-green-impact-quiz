import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

import { fadeScale } from "@/config/motion.config";
import { cn } from "@/utils/cn";

interface GlassPanelProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  /** softer, near-transparent surface */
  tone?: "default" | "deep" | "light";
  animated?: boolean;
}

const toneClass = {
  default: "glass-surface",
  deep: "glass-surface bg-forest-900/35",
  light: "glass-surface bg-white/25",
} as const;

export function GlassPanel({
  children,
  tone = "default",
  animated = true,
  className,
  ...props
}: GlassPanelProps) {
  return (
    <motion.div
      variants={animated ? fadeScale : undefined}
      initial={animated ? "hidden" : undefined}
      animate={animated ? "visible" : undefined}
      className={cn("rounded-[2rem] p-6 sm:p-8", toneClass[tone], className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
