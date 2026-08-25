import homeBackground from "@/assets/home-bg.jpg";
import infoBackground from "@/assets/info-bg.jpg";

/** All image / element paths live here — never hardcode a path in a component. */
export const assets = {
  backgrounds: {
    home: homeBackground,
    info: infoBackground,
  },
  elements: {
    leaf: "/elements/leaves/leaf.svg",
    particle: "/elements/particles/spark.svg",
  },
} as const;

export type Assets = typeof assets;
