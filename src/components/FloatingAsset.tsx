import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { floatingMedium, floatingSlow } from "@/config/motion.config";
import { cn } from "@/utils/cn";

interface FloatingAssetProps {
  children: ReactNode;
  speed?: "slow" | "medium";
  delay?: number;
  className?: string;
}

/** Wraps any element in a calm, wind-like drifting loop. */
export function FloatingAsset({
  children,
  speed = "slow",
  delay = 0,
  className,
}: FloatingAssetProps) {
  const preset = speed === "slow" ? floatingSlow : floatingMedium;

  return (
    <motion.div
      animate={preset}
      transition={{ ...preset.transition, delay }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
