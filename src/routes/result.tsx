import { createFileRoute } from "@tanstack/react-router";

import { AppProviders } from "@/app/AppProviders";
import { ResultScreen } from "@/features/result/ResultScreen";

const title = "Kết quả: bạn là loại rừng nào? | Sống khỏe góp xanh";
const description =
  "Nhận thẻ tính cách rừng cá nhân hóa, tải về và chia sẻ dấu ấn xanh của bạn cùng chiến dịch Sống khỏe góp xanh.";

export const Route = createFileRoute("/result")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResultPage,
});

function ResultPage() {
  return (
    <AppProviders>
      <ResultScreen />
    </AppProviders>
  );
}
