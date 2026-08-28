import { createFileRoute } from "@tanstack/react-router";

import { AppProviders } from "@/app/AppProviders";
import { QuizScreen } from "@/features/quiz/QuizScreen";

const title = "Trắc nghiệm tính cách rừng | Sống khỏe góp xanh";
const description =
  "10 câu hỏi nhẹ nhàng giữa rừng xanh để tìm ra khu rừng đang lớn lên trong bạn.";

export const Route = createFileRoute("/quiz")({
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
  component: QuizPage,
});

function QuizPage() {
  return (
    <AppProviders>
      <QuizScreen />
    </AppProviders>
  );
}
