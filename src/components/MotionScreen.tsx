import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { screenEnter, screenExit } from "@/config/motion.config";
import { cn } from "@/utils/cn";

interface MotionScreenProps {
  children: ReactNode;
  className?: string;
}

/** Cinematic wrapper applying the shared screen enter/exit language. */
export function MotionScreen({ children, className }: MotionScreenProps) {
  return (
    <motion.main
      variants={{ ...screenEnter, ...screenExit }}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn("relative min-h-[100svh] w-full overflow-hidden", className)}
    >
      {children}
    </motion.main>
  );
}
