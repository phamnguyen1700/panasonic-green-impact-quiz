import type { CampaignCopy } from "@/types/campaign.types";

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
    supporting: [
      "Trong 5 năm qua, hành trình Sống Khỏe Góp Xanh của Panasonic đã phủ xanh 22 cánh rừng từ Bắc chí Nam. Mỗi khu rừng mang một dấu ấn riêng biệt: từ dịu dàng, điềm tĩnh đến sôi nổi, kiên cường.",
      "Còn bạn thì sao? Hãy bước vào rừng, trải nghiệm các tình huống bất ngờ trên đường đi và khám phá xem bạn mang năng lượng của cánh rừng nào của Panasonic nhé!",
    ],
    rules: [
      "Trên hành trình khám phá đại ngàn, bạn sẽ đối mặt với 10 tình huống trải nghiệm khác nhau.",
      'Hãy chọn nhanh theo phản xạ tự nhiên nhất để tìm thấy "bản thể rừng" đang ẩn giấu bên trong nhé!',
    ],
    cta: "Khám phá ngay",
    startJourney: "Bắt đầu hành trình",
    footnote: "",
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
      nameLabel: "Họ và tên",
      namePlaceholder: "Tên của bạn là...",
      nameRequiredError: "Bạn hãy điền tên để nhận thẻ rừng nhé",
      consent:
        "Mọi thông tin sẽ được bảo mật và chỉ phục vụ cho chiến dịch 5 năm Sống khỏe góp xanh.",
      cta: "Tiếp tục",
      back: "Quay lại",
    },
  },
  quiz: {
    eyebrow: "Hành trình vào rừng",
    progressLabel: "Câu",
    timerLabel: "Thời gian",
    timerWarning: "Sắp hết giờ",
    timeExpiredTitle: "Hết thời gian",
    timeExpiredDescription: "Bắt đầu lại nhé",
    restart: "Bắt đầu lại",
    next: "Tiến lên",
    finish: "Xem kết quả",
    back: "Quay lại",
    hint: "Chọn điều gần với bạn nhất",
  },
  result: {
    eyebrow: "Kết quả của bạn",
    revealLine: "Khu rừng trong bạn là",
    revealName: "Bạn là",
    cardBadge: "Sống khỏe góp xanh · 5 năm",
    traitsLabel: "Tính cách nổi bật",
    impactLabel: "Dấu ấn xanh",
    download: "Tải thẻ kết quả",
    downloading: "Đang tạo ảnh…",
    share: "Chia sẻ Facebook",
    sharing: "Đang mở chia sẻ…",
    replay: "Chơi lại",
    sharePreviewTitle: "Xem trước khi chia sẻ",
    sharePreviewCaption:
      "🌿 Bạn là loại rừng nào?\n\n" +
      "Mỗi người đều mang trong mình một dấu ấn riêng, giống như những cánh rừng mà Panasonic đang góp phần vun trồng.\n\n" +
      "Cùng mình khám phá khu rừng trong bạn qua hành trình 5 năm Sống khỏe góp xanh nhé!",

    shareHashtags: "#SongKhoeGopXanh #PanasonicGreenImpact",
    saved: "Đã lưu thẻ kết quả về máy",
    shareFallback: "Đã sao chép nội dung chia sẻ",
  },
};
