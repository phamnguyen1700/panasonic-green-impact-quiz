import { assets } from "@/config/assets.config";
import { cn } from "@/utils/cn";

interface FloatingForestCardsProps {
  compact?: boolean;
  align?: "center" | "left";
  fixed?: boolean;
}

export function FloatingForestCards({
  compact = false,
  align = "center",
  fixed = false,
}: FloatingForestCardsProps) {
  if (fixed) {
    return (
      <img
        src={assets.elements.homeBottom}
        alt=""
        aria-hidden
        className={cn(
          "pointer-events-none fixed inset-x-0 -bottom-35 z-10 h-auto w-screen max-w-none",
          "[mask-image:linear-gradient(to_top,black_0%,black_72%,transparent_100%)]",
          "[-webkit-mask-image:linear-gradient(to_top,black_0%,black_72%,transparent_100%)]",
        )}
      />
    );
  }

  const stackClass = compact ? "relative h-[10rem] w-full" : "relative h-[13rem] w-screen";
  const alignClass = align === "left" ? "mr-auto" : "mx-auto";

  return (
    <div className={cn(stackClass, alignClass, "overflow-hidden")}>
      <img
        src={assets.elements.homeBottom}
        alt=""
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 h-auto w-full max-w-none",
          "[mask-image:linear-gradient(to_top,black_0%,black_72%,transparent_100%)]",
          "[-webkit-mask-image:linear-gradient(to_top,black_0%,black_72%,transparent_100%)]",
        )}
      />
    </div>
  );
}
