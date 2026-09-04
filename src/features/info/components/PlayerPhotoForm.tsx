import { motion } from "framer-motion";
import { ImageUp } from "lucide-react";
import type { ChangeEvent, FormEvent } from "react";
import { useId, useState } from "react";

import { CampaignButton } from "@/components/CampaignButton";
import { GlassPanel } from "@/components/GlassPanel";
import { campaign } from "@/config/campaign.config";
import { staggerContainer, staggerItem } from "@/config/motion.config";
import { setPlayerAvatar } from "@/services/playerAvatar.service";
import type { PlayerInfo } from "@/types/player.types";
import { STORAGE_KEYS, writeStorage } from "@/utils/storage";

const MAX_IMAGE_SIZE = 400 * 1024 * 1024;

interface PlayerPhotoFormProps {
  player: PlayerInfo;
  onSubmitted: () => void;
  onBack: () => void;
}

export function PlayerPhotoForm({ player, onSubmitted, onBack }: PlayerPhotoFormProps) {
  const inputId = useId();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null;
    setError(null);

    if (!nextFile) {
      setFile(null);
      setPreview(null);
      return;
    }

    if (!nextFile.type.startsWith("image/")) {
      setError("Bạn hãy chọn đúng file ảnh nhé.");
      setFile(null);
      setPreview(null);
      return;
    }

    if (nextFile.size > MAX_IMAGE_SIZE) {
      setError("Ảnh cần nhỏ hơn 400MB.");
      setFile(null);
      setPreview(null);
      return;
    }

    const nextPreview = setPlayerAvatar(nextFile);
    setFile(nextFile);
    setPreview(nextPreview);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      setError("Bạn cần thêm một ảnh trước khi vào quiz.");
      return;
    }

    writeStorage(STORAGE_KEYS.player, {
      ...player,
      avatarFileName: file.name,
    });
    onSubmitted();
  };

  return (
    <GlassPanel tone="deep" className="flex h-[23rem] w-[28rem] max-w-full rounded-[2.25rem]">
      <motion.form
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit}
        className="flex w-full flex-col space-y-5"
        noValidate
      >
        <motion.div variants={staggerItem} className="space-y-3">
          <p className="text-sm font-medium text-mist/90">Ảnh của bạn</p>
          <label
            htmlFor={inputId}
            className="mx-auto flex size-55 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-full border border-transparent bg-white/[0.04] text-center transition-colors hover:border-transparent hover:bg-white/[0.07]"
          >
            {preview ? (
              <img src={preview} alt="" className="size-full object-cover" />
            ) : (
              <span className="flex flex-col items-center gap-2 px-4 text-mist/70">
                <ImageUp className="size-7" aria-hidden />
                <span className="text-sm">CHỌN ẢNH</span>
                <span className="text-[0.65rem] leading-tight text-mist/45">
                  JPG, PNG, dưới 400MB
                </span>
              </span>
            )}
          </label>
          <input
            id={inputId}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleFileChange}
          />
          {error ? <p className="text-xs text-sun-soft">{error}</p> : null}
        </motion.div>

        <motion.div variants={staggerItem} className="mt-auto grid grid-cols-2 gap-4 pt-1">
          <CampaignButton
            type="button"
            variant="ghost"
            size="md"
            onClick={onBack}
            wrapperClassName="w-full"
            className="h-12 w-full px-6 text-sm"
          >
            {campaign.info.form.back}
          </CampaignButton>
          <CampaignButton
            type="submit"
            disabled={!file}
            wrapperClassName="w-full"
            className="h-12 w-full px-6 text-sm"
          >
            Bắt đầu
          </CampaignButton>
        </motion.div>
      </motion.form>
    </GlassPanel>
  );
}
