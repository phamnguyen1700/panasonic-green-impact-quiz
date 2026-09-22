import { z } from "zod";

const MAX_AVATAR_SIZE = 400 * 1024 * 1024;

export const playerInfoSchema = z.object({
  name: z.string().trim().min(1, "Bạn hãy điền họ tên để tiếp tục").max(255),
});

export const playerAvatarSchema = z.object({
  file: z
    .instanceof(File, { message: "Bạn cần thêm một ảnh trước khi vào quiz." })
    .refine((file) => file.type.startsWith("image/"), "Bạn hãy chọn đúng file ảnh nhé.")
    .refine((file) => file.size <= MAX_AVATAR_SIZE, "Ảnh cần nhỏ hơn 400MB."),
});

export type PlayerInfoFormValues = z.infer<typeof playerInfoSchema>;
export type PlayerAvatarFormValues = z.infer<typeof playerAvatarSchema>;
