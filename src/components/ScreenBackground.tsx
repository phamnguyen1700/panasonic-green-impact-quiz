import { motion } from "framer-motion";

import { particleDrift } from "@/config/motion.config";
import { zIndex } from "@/config/theme.config";
import { cn } from "@/utils/cn";

interface ScreenBackgroundProps {
  image: string;
  /** how strong the dark scrim over the photo is */
  scrim?: "soft" | "medium" | "strong";
  particles?: number;
  className?: string;
}

const scrimOpacity = { soft: "opacity-60", medium: "opacity-80", strong: "opacity-95" } as const;

export function ScreenBackground({
  image,
  scrim = "medium",
  particles = 14,
  className,
}: ScreenBackgroundProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <motion.div
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 0.84, 0.44, 1] }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})`, zIndex: zIndex.background }}
      />

      <div
        className={cn("scene-scrim absolute inset-0", scrimOpacity[scrim])}
        style={{ zIndex: zIndex.scrim }}
      />

      <div className="absolute inset-0" style={{ zIndex: zIndex.particles }}>
        {Array.from({ length: particles }).map((_, index) => (
          <motion.span
            key={index}
            animate={particleDrift(index)}
            className="absolute block rounded-full bg-lime-soft/70 blur-[1px]"
            style={{
              left: `${(index * 97) % 100}%`,
              width: 3 + (index % 4) * 2,
              height: 3 + (index % 4) * 2,
            }}
          />
        ))}
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-forest-900 to-transparent"
        style={{ zIndex: zIndex.particles }}
      />
    </div>
  );
}
