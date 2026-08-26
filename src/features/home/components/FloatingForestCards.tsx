import { FloatingAsset } from "@/components/FloatingAsset";
import { ForestCard } from "@/components/ForestCard";
import { CardStack } from "@/components/layout/CardStack";
import { forestPersonalities } from "@/config/campaign.config";

const layout = [
  { className: "-rotate-[9deg] -translate-x-[13rem] -translate-y-[9rem]", speed: "slow" as const, delay: 0 },
  { className: "rotate-[10deg] translate-x-[13.5rem] -translate-y-[9.5rem]", speed: "medium" as const, delay: 0.8 },
  { className: "-rotate-[7deg] -translate-x-[14rem] translate-y-[8.5rem]", speed: "medium" as const, delay: 1.6 },
  { className: "rotate-[8deg] translate-x-[14rem] translate-y-[9rem]", speed: "slow" as const, delay: 2.2 },
];

export function FloatingForestCards() {
  const [hero, ...rest] = forestPersonalities;

  return (
    <CardStack className="relative h-[34rem] w-full">
      <div className="absolute size-[26rem] rounded-full bg-lime-soft/20 blur-[90px]" />

      {rest.slice(0, 4).map((personality, index) => {
        const place = layout[index]!;
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
        <ForestCard personality={hero!} className="w-[15.5rem] scale-105" />
      </FloatingAsset>
    </CardStack>
  );
}
