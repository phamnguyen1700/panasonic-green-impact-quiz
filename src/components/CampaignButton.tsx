import { motion, type HTMLMotionProps } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { buttonHover, buttonTap } from "@/config/motion.config";
import { cn } from "@/utils/cn";

type Variant = "primary" | "ghost" | "outline";
type Size = "md" | "lg";

interface CampaignButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
}

const variantClass: Record<Variant, string> = {
  primary:
    "text-forest-900 [background-image:var(--gradient-cta)] shadow-[var(--shadow-cta)] hover:brightness-105",
  outline:
    "border border-white/45 text-mist bg-white/8 backdrop-blur-md hover:bg-white/16",
  ghost: "text-mist/85 hover:text-mist",
};

const sizeClass: Record<Size, string> = {
  md: "h-12 px-6 text-sm",
  lg: "h-16 px-9 text-base sm:text-lg",
};

export function CampaignButton({
  children,
  variant = "primary",
  size = "lg",
  withArrow = false,
  className,
  ...props
}: CampaignButtonProps) {
  return (
    <motion.button
      whileHover={props.disabled ? undefined : buttonHover}
      whileTap={props.disabled ? undefined : buttonTap}
      className={cn(
        "group inline-flex items-center justify-center gap-3 rounded-full font-semibold tracking-tight",
        "outline-none focus-visible:ring-2 focus-visible:ring-lime-soft focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        "disabled:cursor-not-allowed disabled:opacity-55",
        variantClass[variant],
        sizeClass[size],
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {withArrow ? (
        <span
          className={cn(
            "grid size-8 place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-1",
            variant === "primary" ? "bg-forest-900/15" : "bg-white/15",
          )}
        >
          <ArrowRight className="size-4" aria-hidden />
        </span>
      ) : null}
    </motion.button>
  );
}
