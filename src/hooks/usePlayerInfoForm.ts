import { useCallback, useState } from "react";

import { campaign } from "@/config/campaign.config";
import type { PlayerInfo, PlayerInfoDraft, PlayerInfoErrors } from "@/types/player.types";
import { STORAGE_KEYS, writeStorage } from "@/utils/storage";

const PHONE_PATTERN = /^[0-9\s+.-]{8,15}$/;

export function usePlayerInfoForm(onValid?: (player: PlayerInfo) => void) {
  const [values, setValues] = useState<PlayerInfoDraft>({ name: "", phone: "" });
  const [errors, setErrors] = useState<PlayerInfoErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const setField = useCallback((field: keyof PlayerInfoDraft, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const validate = useCallback((draft: PlayerInfoDraft): PlayerInfoErrors => {
    const copy = campaign.info.form;
    const next: PlayerInfoErrors = {};
    if (!draft.name.trim()) next.name = copy.nameRequiredError;
    if (draft.phone.trim() && !PHONE_PATTERN.test(draft.phone.trim())) {
      next.phone = copy.phoneInvalidError;
    }
    return next;
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const nextErrors = validate(values);
      setErrors(nextErrors);
      if (Object.keys(nextErrors).length > 0) return;

      const player: PlayerInfo = {
        name: values.name.trim(),
        phone: values.phone.trim() || undefined,
        createdAt: new Date().toISOString(),
      };
      writeStorage(STORAGE_KEYS.player, player);
      setSubmitted(true);
      onValid?.(player);
    },
    [values, validate, onValid],
  );

  return {
    values,
    errors,
    submitted,
    setField,
    handleSubmit,
    isValid: values.name.trim().length > 0,
  };
}
