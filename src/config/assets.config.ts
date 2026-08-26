import homeBackground from "@/assets/home-bg.jpg";
import infoBackground from "@/assets/info-bg.jpg";
import quizBackground from "@/assets/quiz-bg.jpg";
import resultBackground from "@/assets/result-bg.jpg";
import forestPhongHo from "@/assets/forest-phong-ho.jpg";
import forestDauNguon from "@/assets/forest-dau-nguon.jpg";
import forestBaoTon from "@/assets/forest-bao-ton.jpg";
import forestPhucHoi from "@/assets/forest-phuc-hoi.jpg";
import forestSinhKe from "@/assets/forest-sinh-ke.jpg";

/** All image / element paths live here — never hardcode a path in a component. */
export const assets = {
  backgrounds: {
    home: homeBackground,
    info: infoBackground,
    quiz: quizBackground,
    result: resultBackground,
  },
  resultCards: {
    "phong-ho": forestPhongHo,
    "dau-nguon": forestDauNguon,
    "bao-ton": forestBaoTon,
    "phuc-hoi": forestPhucHoi,
    "sinh-ke": forestSinhKe,
  },
  elements: {
    leaf: "/elements/leaves/leaf.svg",
    particle: "/elements/particles/spark.svg",
  },
} as const;

export type Assets = typeof assets;
