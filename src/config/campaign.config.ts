import type { CampaignCopy, ForestPersonality } from "@/types/campaign.types";

export const campaign: CampaignCopy = {
  brand: {
    name: "Sống khỏe góp xanh",
    tagline: "Panasonic Green Impact",
    years: "5 năm",
  },
  home: {
    eyebrow: "5 năm Sống khỏe góp xanh",
    headlineTop: "Bạn là",
    headlineMain: "loại rừng",
    headlineTail: "nào?",
    supporting:
      "Năm cánh rừng, năm tính cách. Trả lời vài câu hỏi nhẹ nhàng để khám phá khu rừng đang lớn lên trong bạn — và dấu ấn xanh bạn để lại cho thiên nhiên.",
    cta: "Chơi ngay",
    footnote: "Chỉ mất 1 phút · 5 câu hỏi",
  },
  info: {
    eyebrow: "Trước khi vào rừng",
    title: "Để lại đôi dòng về bạn",
    intro:
      "Mỗi khu rừng Panasonic trồng đều mang một dấu ấn riêng cho thiên nhiên và cộng đồng. Hãy cho chúng mình biết bạn là ai, để tấm thẻ “Bạn là rừng gì” trở thành của riêng bạn.",
    bullets: [
      "5 tính cách rừng lấy cảm hứng từ 5 dấu ấn xanh",
      "Thẻ kết quả cá nhân hóa để chia sẻ",
      "Thông tin của bạn chỉ dùng cho chiến dịch",
    ],
    form: {
      nameLabel: "Tên của bạn",
      namePlaceholder: "Ví dụ: Minh Anh",
      nameRequiredError: "Bạn hãy điền tên để nhận thẻ rừng nhé",
      phoneLabel: "Số điện thoại",
      phonePlaceholder: "09xx xxx xxx",
      phoneOptionalHint: "Không bắt buộc",
      phoneInvalidError: "Số điện thoại chưa hợp lệ",
      consent: "Thông tin được bảo mật và chỉ dùng cho chiến dịch Sống khỏe góp xanh.",
      cta: "Bắt đầu",
      back: "Quay lại",
    },
    previewTitle: "5 tính cách rừng đang chờ bạn",
  },
};

export const forestPersonalities: ForestPersonality[] = [
  {
    id: "phong-ho",
    name: "Rừng phòng hộ",
    region: "Ven biển",
    traits: ["Dịu Dàng", "Bản Lĩnh"],
    description: "Chắn gió, giữ cát, âm thầm che chở cho cả một vùng làng.",
    tone: "moss",
  },
  {
    id: "dau-nguon",
    name: "Rừng đầu nguồn",
    region: "Thượng nguồn",
    traits: ["Âm Thầm", "Kiên Định"],
    description: "Giữ nước, giữ đất, bền bỉ nuôi những dòng chảy đi xa.",
    tone: "mint",
  },
  {
    id: "bao-ton",
    name: "Rừng bảo tồn",
    region: "Đa dạng",
    traits: ["Bao Dung", "Sâu Sắc"],
    description: "Ôm trọn muôn loài, trân trọng từng khác biệt nhỏ nhất.",
    tone: "sun",
  },
  {
    id: "phuc-hoi",
    name: "Rừng phục hồi",
    region: "Tái sinh",
    traits: ["Lạc Quan", "Kiên Cường"],
    description: "Từ vùng đất trống, kiên trì xanh lại từng ngày một.",
    tone: "aqua",
  },
  {
    id: "sinh-ke",
    name: "Rừng cộng đồng",
    region: "Sinh kế",
    traits: ["Ấm Áp", "Bền Bỉ"],
    description: "Gắn kết con người, nuôi lớn sinh kế cùng màu xanh.",
    tone: "sky",
  },
];
