import { createFileRoute } from "@tanstack/react-router";

import { AppProviders } from "@/app/AppProviders";
import { InfoScreen } from "@/features/info/InfoScreen";

const title = "Trước khi vào rừng | Sống khỏe góp xanh";
const description =
  "Để lại tên của bạn để nhận tấm thẻ tính cách rừng cá nhân hóa từ chiến dịch Sống khỏe góp xanh.";

export const Route = createFileRoute("/info")({
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
  component: InfoPage,
});

function InfoPage() {
  return (
    <AppProviders>
      <InfoScreen />
    </AppProviders>
  );
}
