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
    "phong-ho": "/assets/forest-cards/result-card/THẺ KẾT QUẢ - KHÔNG NỀ NỀN - PHÒNG HỘ VEN BIỂN.png",
    "dau-nguon": "/assets/forest-cards/result-card/THẺ KẾT QUẢ - KHÔNG NỀ NỀN - PHÒNG HỘ ĐẦU NGUỒN.png",
    "bao-ton": "/assets/forest-cards/result-card/THẺ KẾT QUẢ - KHÔNG NỀ NỀN - BẢO TỒN ĐA DẠNG SINH HỌC.png",
    "phuc-hoi": "/assets/forest-cards/result-card/THẺ KẾT QUẢ - KHÔNG NỀ NỀN - PHỤC HỒI.png",
    "sinh-ke": "/assets/forest-cards/result-card/THẺ KẾT QUẢ - KHÔNG NỀ NỀN - SINH KẾ.png",
  },
  downloadCards: {
    "phong-ho": "/assets/forest-cards/download-card/THẺ KẾT QUẢ - CÓ NỀN - PHÒNG HỘ VEN BIỂN.png",
    "dau-nguon": "/assets/forest-cards/download-card/THẺ KẾT QUẢ - CÓ NỀN - PHÒNG HỘ ĐẦU NGUỒN.png",
    "bao-ton": "/assets/forest-cards/download-card/THẺ KẾT QUẢ - CÓ NỀN - BẢO TỒN ĐA DẠNG SINH HỌC.png",
    "phuc-hoi": "/assets/forest-cards/download-card/THẺ KẾT QUẢ - CÓ NỀN - PHỤC HỒI.png",
    "sinh-ke": "/assets/forest-cards/download-card/THẺ KẾT QUẢ - CÓ NỀN - SINH KẾ.png",
  },
  elements: {
    homeBottom: "/assets/home-bottom/bottom.png",
    leaf: "/elements/leaves/leaf.svg",
    particle: "/elements/particles/spark.svg",
  },
} as const;

export type Assets = typeof assets;
