import { z } from "zod";

const VIETNAM_PHONE_PATTERN = /^(?:\+?84|0)(?:\s|\.|-)*[3|5|7|8|9](?:\d(?:\s|\.|-)*){8}$/;
const MAX_AVATAR_SIZE = 400 * 1024 * 1024;

export const playerInfoSchema = z.object({
  name: z.string().trim().min(1, "Bạn hãy điền họ tên để tiếp tục").max(255),
  phone: z
    .string()
    .trim()
    .min(1, "Bạn hãy điền số điện thoại để tiếp tục")
    .regex(VIETNAM_PHONE_PATTERN, "Số điện thoại chưa hợp lệ"),
});

export const playerAvatarSchema = z.object({
  file: z
    .instanceof(File, { message: "Bạn cần thêm một ảnh trước khi vào quiz." })
    .refine((file) => file.type.startsWith("image/"), "Bạn hãy chọn đúng file ảnh nhé.")
    .refine((file) => file.size <= MAX_AVATAR_SIZE, "Ảnh cần nhỏ hơn 400MB."),
});

export type PlayerInfoFormValues = z.infer<typeof playerInfoSchema>;
export type PlayerAvatarFormValues = z.infer<typeof playerAvatarSchema>;
