import { assets } from "@/config/assets.config";
import type { ForestResult, ForestResultId } from "@/types/result.types";

/**
 * Result mapping (placeholder campaign copy).
 * Order also acts as the deterministic tie-break priority.
 */
export const resultRules: ForestResult[] = [
  {
    id: "phong-ho",
    title: "Rừng Phòng Hộ",
    subtitle: "Người che chở thầm lặng",
    forestType: "Rừng ven biển",
    description:
      "Bạn là hàng cây đứng ở tuyến đầu: chắn gió, giữ cát, giữ cho phía sau mình được bình yên. Không ồn ào, không cần ghi công, nhưng ai cũng thấy an tâm khi có bạn ở đó.",
    traits: ["Dịu dàng", "Bản lĩnh", "Đáng tin"],
    impact: "Một cánh rừng phòng hộ giữ cho làng ven biển đứng vững qua từng mùa bão.",
    tone: "moss",
    image: assets.resultCards["phong-ho"],
  },
  {
    id: "dau-nguon",
    title: "Rừng Đầu Nguồn",
    subtitle: "Người giữ mạch nước",
    forestType: "Rừng thượng nguồn",
    description:
      "Bạn nghĩ xa và làm sâu. Những việc bạn chọn hôm nay thường chỉ đơm kết quả sau nhiều năm — như mạch nước ngầm âm thầm nuôi cả dòng chảy phía hạ lưu.",
    traits: ["Âm thầm", "Kiên định", "Sâu sắc"],
    impact: "Rừng đầu nguồn giữ đất, giữ nước, nuôi những dòng sông đi thật xa.",
    tone: "mint",
    image: assets.resultCards["dau-nguon"],
  },
  {
    id: "bao-ton",
    title: "Rừng Bảo Tồn",
    subtitle: "Người ôm trọn khác biệt",
    forestType: "Rừng đa dạng sinh học",
    description:
      "Trong bạn có chỗ cho mọi loài. Bạn tò mò với cái mới, trân trọng cái cũ, và luôn tin rằng sự khác biệt làm cho khu rừng đẹp hơn chứ không rối hơn.",
    traits: ["Bao dung", "Tò mò", "Tinh tế"],
    impact: "Rừng bảo tồn là ngôi nhà chung của hàng nghìn loài đang cần được ở lại.",
    tone: "sun",
    image: assets.resultCards["bao-ton"],
  },
  {
    id: "phuc-hoi",
    title: "Rừng Phục Hồi",
    subtitle: "Người bắt đầu lại",
    forestType: "Rừng tái sinh",
    description:
      "Bạn không sợ vùng đất trống. Nơi người khác thấy kết thúc, bạn thấy một mùa trồng mới — và bạn kiên trì xanh lại từng ngày, từng mầm nhỏ một.",
    traits: ["Lạc quan", "Kiên cường", "Tươi mới"],
    impact: "Mỗi mầm cây phục hồi là một mảng đồi trọc được trả lại màu xanh.",
    tone: "aqua",
    image: assets.resultCards["phuc-hoi"],
  },
  {
    id: "sinh-ke",
    title: "Rừng Cộng Đồng",
    subtitle: "Người kết nối sinh kế",
    forestType: "Rừng sinh kế",
    description:
      "Bạn tin màu xanh chỉ bền khi con người cùng sống được với nó. Bạn gắn kết mọi người, và biến việc tốt thành việc chung mà ai cũng muốn góp một tay.",
    traits: ["Ấm áp", "Gắn kết", "Bền bỉ"],
    impact: "Rừng cộng đồng nuôi lớn sinh kế, để người giữ rừng và rừng nuôi người.",
    tone: "sky",
    image: assets.resultCards["sinh-ke"],
  },
];

export const RESULT_PRIORITY: ForestResultId[] = resultRules.map((rule) => rule.id);

export const DEFAULT_RESULT_ID: ForestResultId = "phuc-hoi";

export function getResultById(id: ForestResultId): ForestResult {
  return resultRules.find((rule) => rule.id === id) ?? resultRules[0]!;
}
