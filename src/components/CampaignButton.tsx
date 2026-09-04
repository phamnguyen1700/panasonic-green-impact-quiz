import {
  Button as CrystallButton,
  type ButtonProps as CrystallButtonProps,
} from "@elemental-fx/crystall-ui";
import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

import { buttonHover, buttonTap } from "@/config/motion.config";
import { cn } from "@/utils/cn";

type Variant = "primary" | "ghost" | "outline";
type Size = "md" | "lg";

interface CampaignButtonProps
  extends
    Omit<CrystallButtonProps, "children" | "variant" | "size">,
    Pick<HTMLMotionProps<"span">, "initial" | "animate" | "exit" | "variants"> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** @deprecated Campaign buttons are text-only. Kept for compatibility with existing call sites. */
  withArrow?: boolean;
  wrapperClassName?: string;
}

const variantClass: Record<Variant, string> = {
  primary:
    "border-white/28 bg-white/[0.035] text-mist shadow-[var(--efx-crystall-shadow)] hover:border-white/42 hover:bg-white/[0.075]",
  outline:
    "border-white/24 bg-white/[0.02] text-mist shadow-[var(--efx-crystall-shadow)] hover:border-white/38 hover:bg-white/[0.065]",
  ghost:
    "border-white/0 bg-white/0 text-mist/85 hover:border-white/20 hover:bg-white/[0.055] hover:text-mist",
};

const sizeClass: Record<Size, string> = {
  md: "h-12 px-6 text-sm",
  lg: "h-16 px-9 text-base sm:text-lg",
};

const crystallVariant: Record<Variant, CrystallButtonProps["variant"]> = {
  primary: "default",
  outline: "default",
  ghost: "default",
};

const crystallSize: Record<Size, CrystallButtonProps["size"]> = {
  md: "lg",
  lg: "lg",
};

export function CampaignButton({
  children,
  variant = "primary",
  size = "lg",
  withArrow: _withArrow = false,
  className,
  initial,
  animate,
  exit,
  variants,
  wrapperClassName,
  ...props
}: CampaignButtonProps) {
  const isDisabled = Boolean(props.disabled);

  return (
    <motion.span
      initial={initial}
      animate={animate}
      exit={exit}
      variants={variants}
      whileHover={isDisabled ? {} : buttonHover}
      whileTap={isDisabled ? {} : buttonTap}
      className={cn("inline-flex", isDisabled && "cursor-not-allowed", wrapperClassName)}
    >
      <CrystallButton
        data-campaign-button
        variant={crystallVariant[variant]}
        size={crystallSize[size]}
        className={cn(
          "group inline-flex items-center justify-center gap-3 rounded-full font-semibold tracking-tight",
          "outline-none focus-visible:ring-2 focus-visible:ring-lime-soft focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          "disabled:cursor-not-allowed disabled:opacity-55",
          "before:pointer-events-none before:absolute before:inset-px before:rounded-full before:bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0))] before:content-['']",
          "relative overflow-hidden",
          variantClass[variant],
          sizeClass[size],
          className,
        )}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </CrystallButton>
    </motion.span>
  );
}
