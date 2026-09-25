import type { ForestResultId } from "@/types/result.types";

export type ForestProfileCode = "PH" | "VB" | "DN" | "BT" | "SK";
export type ForestAnswerKey = "A" | "B" | "C" | "D" | "E";

export interface ForestJourneyProfile {
  code: ForestProfileCode;
  resultId: ForestResultId;
  title: string;
  trait: string;
  personalityDetail: string;
}

export interface ForestJourneyOption {
  id: string;
  key: ForestAnswerKey;
  label: string;
  resultCode: ForestProfileCode;
}

export interface ForestJourneyQuestion {
  id: string;
  eyebrow: string;
  prompt: string;
  options: ForestJourneyOption[];
}

export const forestAnswerResultMap: Record<ForestAnswerKey, ForestProfileCode> = {
  A: "PH",
  B: "VB",
  C: "DN",
  D: "BT",
  E: "SK",
};

export const forestJourneyProfiles: ForestJourneyProfile[] = [
  {
    code: "PH",
    resultId: "phuc-hoi",
    title: "Rừng Phục Hồi",
    trait: "Kiên Cường & Lạc Quan",
    personalityDetail:
      "Luôn tràn đầy năng lượng\nYêu đời và thích khám phá\nTự tin đứng dậy sau mỗi lần vấp ngã\n\nChính là tinh thần của những cánh rừng đang hồi sinh tại Xuân Liên, Phong Điền - kiên cường trả lại màu xanh trù phú cho thiên nhiên.",
  },
  {
    code: "VB",
    resultId: "phong-ho",
    title: "Rừng Phòng Hộ Ven Biển",
    trait: "Bản Lĩnh & Dịu Dàng",
    personalityDetail:
      "Nội tâm mạnh mẽ\nGiao diện ôn hoà, dịu dàng\n\nBạn chính là rừng Đước ở Hưng Yên, Sóc Trăng, Bạc Liêu hay Nghệ An - dịu dàng thướt tha nhưng hễ thiên tai ập đến là chủ động làm lá chắn kiên trung bảo vệ cả bản làng.",
  },
  {
    code: "DN",
    resultId: "dau-nguon",
    title: "Rừng Phòng Hộ Đầu Nguồn",
    trait: "Âm Thầm & Bản Lĩnh",
    personalityDetail:
      'Không khoa trương\nHướng nội\nTinh thần trách nhiệm\n\nTương tự cánh rừng phòng hộ từ Hà Tĩnh, Quảng Bình, Sơn La đến Gia Lai, Phú Yên - giữ đất giữ nước và "gánh" cả vùng hạ lưu.',
  },
  {
    code: "BT",
    resultId: "bao-ton",
    title: "Rừng Bảo Tồn",
    trait: "Bao Dung & Sâu Sắc",
    personalityDetail:
      "“Cờ xanh” di động chính hiệu\nBiết lắng nghe và thấu hiểu\nTrân trọng mọi sự khác biệt\n\nNhư những cánh rừng tại các Vườn Quốc Gia như Bến Em, Mường Nhé - chốn bình yên chở che cho muôn loài.",
  },
  {
    code: "SK",
    resultId: "sinh-ke",
    title: "Rừng Sinh Kế",
    trait: "Chân Thành & Chu Toàn",
    personalityDetail:
      "Tư duy sắc sảo\nKhéo vén khéo lo\nTrách nhiệm và tận tâm\n\nNhư những cánh rừng sinh kế trải dài từ Bắc chí Nam - âm thầm vun đắp nền kinh tế xanh và mang lại cuộc sống ấm no cho bà con bản địa.",
  },
];

export const forestJourneyQuestions: ForestJourneyQuestion[] = [
  {
    id: "q1",
    eyebrow: "Câu 01",
    prompt: "Nếu chỉ được trang bị 01 thứ cho hành trình khám phá này, bạn chọn:",
    options: [
      {
        id: "q1a",
        key: "A",
        label:
          "Một tinh thần tràn đầy năng lượng, sẵn sàng biến mọi thử thách thành trải nghiệm thú vị.",
        resultCode: "PH",
      },
      {
        id: "q1b",
        key: "B",
        label: "Quần áo bảo hộ, chống nước kiên cố để chấp mọi thời tiết trong rừng.",
        resultCode: "VB",
      },
      {
        id: "q1c",
        key: "C",
        label: "Bộ dụng cụ sinh tồn, sẵn sàng đối mặt mọi tình huống phát sinh.",
        resultCode: "DN",
      },
      {
        id: "q1d",
        key: "D",
        label: "Tấm bản đồ cùng tài liệu phân biệt các động thực vật khác nhau.",
        resultCode: "BT",
      },
      {
        id: "q1e",
        key: "E",
        label: "Lương thực dồi dào để chăm lo cho sức khỏe cả đoàn.",
        resultCode: "SK",
      },
    ],
  },
  {
    id: "q2",
    eyebrow: "Câu 02",
    prompt: "Bước qua cánh cổng bí ẩn, khu rừng hiện ra trước mắt bạn trông như thế nào?",
    options: [
      {
        id: "q2a",
        key: "A",
        label:
          "Một vạt rừng xanh non đang bừng sáng dưới ánh nắng, không khí trong lành và dễ chịu.",
        resultCode: "PH",
      },
      {
        id: "q2b",
        key: "B",
        label: "Một rặng rừng đước bạt ngàn bên cạnh bờ biển.",
        resultCode: "VB",
      },
      {
        id: "q2c",
        key: "C",
        label: "Một cánh rừng đại ngàn ngập mây trên đỉnh núi cao.",
        resultCode: "DN",
      },
      {
        id: "q2d",
        key: "D",
        label: "Một khu rừng nguyên sinh cổ thụ rợp bóng, nơi muôn loài đang sống yên bình.",
        resultCode: "BT",
      },
      {
        id: "q2e",
        key: "E",
        label: "Một khu rừng sai trĩu quả tự nhiên và thảm cây dược liệu xanh mướt.",
        resultCode: "SK",
      },
    ],
  },
  {
    id: "q3",
    eyebrow: "Câu 03",
    prompt: "Một cành cây lớn bất ngờ gãy đổ làm ngáng đường đi, phản ứng của bạn là:",
    options: [
      {
        id: "q3a",
        key: "A",
        label: "Xem đây là một bẫy thú vị! Ngay lập tức tìm cách nhảy qua.",
        resultCode: "PH",
      },
      {
        id: "q3b",
        key: "B",
        label: "Tìm cách làm dấu báo an toàn/bẫy cho đoàn đi sau.",
        resultCode: "VB",
      },
      {
        id: "q3c",
        key: "C",
        label: "Dùng sức kéo cành cây sang một bên để dọn sạch đường cho đoàn sau.",
        resultCode: "DN",
      },
      {
        id: "q3d",
        key: "D",
        label: "Tò mò về cách đặt bẫy, bạn quan sát để tìm ra câu trả lời.",
        resultCode: "BT",
      },
      {
        id: "q3e",
        key: "E",
        label: "Bẻ gọn các nhánh củi khô trên thân cây để tích trữ làm chất đốt cho buổi tối.",
        resultCode: "SK",
      },
    ],
  },
  {
    id: "q4",
    eyebrow: "Câu 04",
    prompt: "Đang đi một mình thì trời bất ngờ trút mưa rào, bạn sẽ:",
    options: [
      {
        id: "q4a",
        key: "A",
        label: "Vẫn vui vẻ đi tiếp, coi đây là trải nghiệm có 1-0-2.",
        resultCode: "PH",
      },
      {
        id: "q4b",
        key: "B",
        label: "Tìm ngay gốc cây to đứng trú, kiểm tra lại đồ đạc xem có ướt không.",
        resultCode: "VB",
      },
      {
        id: "q4c",
        key: "C",
        label: "Lặng lẽ rảo bước nhanh hơn, kiên trì tiến về phía trước đúng như kế hoạch ban đầu.",
        resultCode: "DN",
      },
      {
        id: "q4d",
        key: "D",
        label: "Chậm lại một nhịp để tận hưởng không khí của rừng trong ngày mưa.",
        resultCode: "BT",
      },
      {
        id: "q4e",
        key: "E",
        label: "Tranh thủ hứng chút nước mưa vào bình để sử dụng khi cần.",
        resultCode: "SK",
      },
    ],
  },
  {
    id: "q5",
    eyebrow: "Câu 05",
    prompt: "Chọn điểm dừng chân cắm trại đêm nay, ưu tiên số 1 của bạn là:",
    options: [
      {
        id: "q5a",
        key: "A",
        label: "Một đỉnh đồi thoáng mát, nơi có thể đón ánh mặt trời bình minh sớm nhất.",
        resultCode: "PH",
      },
      {
        id: "q5b",
        key: "B",
        label: "Một khu đất bằng phẳng, kín gió, có cây chắn xung quanh.",
        resultCode: "VB",
      },
      {
        id: "q5c",
        key: "C",
        label: "Một khoảng đất vững chãi gần nguồn nước.",
        resultCode: "DN",
      },
      {
        id: "q5d",
        key: "D",
        label: "Một góc rừng đẹp, nơi có thể nghe rõ tiếng chim hót và suối chảy.",
        resultCode: "BT",
      },
      {
        id: "q5e",
        key: "E",
        label: "Khu vực khô ráo và có nhiều củi khô để dễ thu gom.",
        resultCode: "SK",
      },
    ],
  },
  {
    id: "q6",
    eyebrow: "Câu 06",
    prompt:
      "Màn đêm buông xuống, một mình trong lều nghe tiếng thú rừng kêu và gió rít bên ngoài, bạn sẽ:",
    options: [
      {
        id: "q6a",
        key: "A",
        label: "Bật nhạc sôi động, để trấn an bản thân.",
        resultCode: "PH",
      },
      {
        id: "q6b",
        key: "B",
        label:
          "Kiểm tra lại chốt khóa lều, chuẩn bị sẵn gậy sinh tồn bên cạnh để sẵn sàng ứng phó.",
        resultCode: "VB",
      },
      {
        id: "q6c",
        key: "C",
        label: "Lặng lẽ giữ bình tĩnh, tính toán các tình huống có thể xảy ra.",
        resultCode: "DN",
      },
      {
        id: "q6d",
        key: "D",
        label: "Tĩnh lặng lắng nghe để khám phá cuộc sống rừng về đêm.",
        resultCode: "BT",
      },
      {
        id: "q6e",
        key: "E",
        label: "Tập trung vào lịch trình di chuyển ngày mai và tranh thủ ngủ sớm để giữ sức.",
        resultCode: "SK",
      },
    ],
  },
  {
    id: "q7",
    eyebrow: "Câu 07",
    prompt:
      "Sáng hôm sau, bạn vô tình phát hiện một dòng suối ngầm đẹp ẩn sâu trong hang đá, phản ứng của bạn:",
    options: [
      {
        id: "q7a",
        key: "A",
        label: "Lao ngay xuống uống một ngụm nước mát lành để nạp lại năng lượng cho bản thân.",
        resultCode: "PH",
      },
      {
        id: "q7b",
        key: "B",
        label:
          "Đứng trên bờ quan sát độ sâu và dòng chảy, đảm bảo an toàn tuyệt đối mới tiến lại gần.",
        resultCode: "VB",
      },
      {
        id: "q7c",
        key: "C",
        label: "Làm mốc dẫn đường giúp đoàn phía sau tìm nguồn nước dễ dàng hơn.",
        resultCode: "DN",
      },
      {
        id: "q7d",
        key: "D",
        label: "Ngồi yên ngắm nhìn sự kỳ diệu của tạo hóa, cảm nhận sự thuần khiết của rừng.",
        resultCode: "BT",
      },
      {
        id: "q7e",
        key: "E",
        label:
          "Tìm cách hứng nước đầy các bình chứa để đảm bảo nguồn nước dùng cho cả chặng đường còn lại.",
        resultCode: "SK",
      },
    ],
  },
  {
    id: "q8",
    eyebrow: "Câu 08",
    prompt: "Đôi chân đã mỏi nhừ mà chặng đường còn dài, bạn làm thế nào để đi tiếp?",
    options: [
      {
        id: "q8a",
        key: "A",
        label: "Tự thưởng cho mình một viên kẹo ngọt, bật một bài nhạc truyền cảm hứng và đi tiếp.",
        resultCode: "PH",
      },
      {
        id: "q8b",
        key: "B",
        label:
          "Tìm một phiến đá kín gió ngồi nghỉ đúng 10 phút để hồi phục thể trạng rồi mới đi tiếp.",
        resultCode: "VB",
      },
      {
        id: "q8c",
        key: "C",
        label: "Tự dặn lòng không được dừng lại cho đến khi hoàn thành mục tiêu.",
        resultCode: "DN",
      },
      {
        id: "q8d",
        key: "D",
        label: "Tranh thủ dựng lều để nghỉ ngơi sớm.",
        resultCode: "BT",
      },
      {
        id: "q8e",
        key: "E",
        label: "Ăn gì đó để nạp năng lượng, tính toán cách di chuyển sao cho tiết kiệm sức nhất.",
        resultCode: "SK",
      },
    ],
  },
  {
    id: "q9",
    eyebrow: "Câu 09",
    prompt:
      'Bạn bắt gặp một "ngôi nhà cây" hoang sơ bị bỏ lại giữa rừng. Nếu được cải tạo nó thành không gian của riêng mình, bạn sẽ:',
    options: [
      {
        id: "q9a",
        key: "A",
        label: "Biến nó thành một đài quan sát ngập nắng.",
        resultCode: "PH",
      },
      {
        id: "q9b",
        key: "B",
        label:
          'Gia cố lại mái nhà và kéo rào chắn kiên cố xung quanh để biến nơi đây thành "pháo đài" an toàn.',
        resultCode: "VB",
      },
      {
        id: "q9c",
        key: "C",
        label:
          "Âm thầm sửa sang lại đường dẫn lên nhà, làm lại bậc thang vững chãi để dễ dàng đi lại.",
        resultCode: "DN",
      },
      {
        id: "q9d",
        key: "D",
        label:
          "Giữ nguyên vẻ hoang sơ, trang trí thêm bằng hoa dại và rêu xanh để ngôi nhà hòa làm một với tự nhiên.",
        resultCode: "BT",
      },
      {
        id: "q9e",
        key: "E",
        label: "Gia cố lại gọn gàng và làm hệ thống hứng nước để có thể sống được lâu dài.",
        resultCode: "SK",
      },
    ],
  },
  {
    id: "q10",
    eyebrow: "Câu 10",
    prompt: "Trở về sau chuyến đi, món quà tinh thần lớn nhất bạn nhận được là:",
    options: [
      {
        id: "q10a",
        key: "A",
        label: "Nguồn năng lượng tươi mới để sẵn sàng chinh phục những thử thách tiếp theo.",
        resultCode: "PH",
      },
      {
        id: "q10b",
        key: "B",
        label: "Sự linh hoạt trước mọi tình huống khác nhau.",
        resultCode: "VB",
      },
      {
        id: "q10c",
        key: "C",
        label: "Sự tự tin vào bản lĩnh nội tại.",
        resultCode: "DN",
      },
      {
        id: "q10d",
        key: "D",
        label: "Sự thông thái và hiểu biết về rừng.",
        resultCode: "BT",
      },
      {
        id: "q10e",
        key: "E",
        label: "Biết trân trọng với những gì mình đang có ở cuộc sống hiện tại.",
        resultCode: "SK",
      },
    ],
  },
];

export const TOTAL_FOREST_JOURNEY_QUESTIONS = forestJourneyQuestions.length;
