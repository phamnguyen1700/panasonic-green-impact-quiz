import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { staggerContainer } from "@/config/motion.config";
import { cn } from "@/utils/cn";

/** Staggered, loosely scattered arrangement for forest cards. */
export function CardStack({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={cn("relative flex items-center justify-center", className)}
    >
      {children}
    </motion.div>
  );
}
