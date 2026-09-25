import homeBackground from "@/assets/home-bg.jpg";
import infoBackground from "@/assets/info-bg.jpg";
import quizBackground from "@/assets/quiz-bg.jpg";
import resultBackground from "@/assets/result-bg.jpg";

/** All image / element paths live here — never hardcode a path in a component. */
export const assets = {
  backgrounds: {
    home: homeBackground,
    info: infoBackground,
    quiz: quizBackground,
    result: resultBackground,
  },
  brand: {
    badge: "/assets/5-năm-sống-khỏe-góp-xanh.png",
    headline: "/assets/bạn-là-loại-rừng-nào.png",
    logo: "/assets/pana-green-impact.png",
  },
  resultCards: {
    "phong-ho": "/assets/forest-cards/phong-ho-ven-bien.png",
    "dau-nguon": "/assets/forest-cards/phong-ho-dau-nguon.png",
    "bao-ton": "/assets/forest-cards/bao-ton.png",
    "phuc-hoi": "/assets/forest-cards/phuc-hoi.png",
    "sinh-ke": "/assets/forest-cards/sinh-ke.png",
  },
  elements: {
    homeBottom: "/assets/home-bottom/bottom.png",
    leaf: "/elements/leaves/leaf.svg",
    particle: "/elements/particles/spark.svg",
  },
} as const;

export type Assets = typeof assets;
