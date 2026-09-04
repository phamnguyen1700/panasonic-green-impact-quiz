import { FloatingAsset } from "@/components/FloatingAsset";
import { ForestCard } from "@/components/ForestCard";
import { CardStack } from "@/components/layout/CardStack";
import { forestPersonalities } from "@/config/campaign.config";

const layout = [
  {
    className: "-rotate-[9deg] -translate-x-[13rem] -translate-y-[9rem]",
    speed: "slow" as const,
    delay: 0,
  },
  {
    className: "rotate-[10deg] translate-x-[13.5rem] -translate-y-[9.5rem]",
    speed: "medium" as const,
    delay: 0.8,
  },
  {
    className: "-rotate-[7deg] -translate-x-[14rem] translate-y-[8.5rem]",
    speed: "medium" as const,
    delay: 1.6,
  },
  {
    className: "rotate-[8deg] translate-x-[14rem] translate-y-[9rem]",
    speed: "slow" as const,
    delay: 2.2,
  },
];

const compactLayout = [
  {
    className: "-rotate-[10deg] -translate-x-[8.25rem] -translate-y-[5.75rem] scale-[0.72]",
    speed: "slow" as const,
    delay: 0,
  },
  {
    className: "rotate-[10deg] translate-x-[8.5rem] -translate-y-[5.5rem] scale-[0.72]",
    speed: "medium" as const,
    delay: 0.8,
  },
  {
    className: "-rotate-[8deg] -translate-x-[8.5rem] translate-y-[5.75rem] scale-[0.72]",
    speed: "medium" as const,
    delay: 1.6,
  },
  {
    className: "rotate-[8deg] translate-x-[8.5rem] translate-y-[5.75rem] scale-[0.72]",
    speed: "slow" as const,
    delay: 2.2,
  },
];

interface FloatingForestCardsProps {
  compact?: boolean;
  align?: "center" | "left";
}

export function FloatingForestCards({
  compact = false,
  align = "center",
}: FloatingForestCardsProps) {
  const [hero, ...rest] = forestPersonalities;
  const stackClass = compact ? "relative h-[24rem] w-full" : "relative h-[34rem] w-full";
  const alignClass = align === "left" ? "justify-start pl-[9.5rem]" : "justify-center";

  return (
    <CardStack className={`${stackClass} ${alignClass}`}>
      <div
        className={
          compact
            ? "absolute size-[19rem] rounded-full bg-lime-soft/16 blur-[80px]"
            : "absolute size-[26rem] rounded-full bg-lime-soft/20 blur-[90px]"
        }
      />

      {rest.slice(0, 4).map((personality, index) => {
        const place = compact ? compactLayout[index]! : layout[index]!;
        return (
          <FloatingAsset
            key={personality.id}
            speed={place.speed}
            delay={place.delay}
            className={`absolute hidden opacity-90 lg:block ${place.className}`}
          >
            <ForestCard personality={personality} />
          </FloatingAsset>
        );
      })}

      <FloatingAsset speed="slow" delay={0.4} className="absolute z-10">
        <ForestCard
          personality={hero!}
          className={compact ? "w-[12.25rem] scale-100" : "w-[15.5rem] scale-105"}
        />
      </FloatingAsset>
    </CardStack>
  );
}
