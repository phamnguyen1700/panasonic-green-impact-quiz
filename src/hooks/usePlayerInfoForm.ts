import { useCallback, useState } from "react";

import { playerInfoSchema } from "@/schema/player";
import { usePlayerStore } from "@/store/playerStore";
import type { PlayerInfo, PlayerInfoDraft, PlayerInfoErrors } from "@/types/player.types";

export function usePlayerInfoForm(onValid?: (player: PlayerInfo) => void) {
  const setPlayerInfo = usePlayerStore((state) => state.setPlayerInfo);
  const [values, setValues] = useState<PlayerInfoDraft>({ name: "", phone: "" });
  const [errors, setErrors] = useState<PlayerInfoErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const setField = useCallback((field: keyof PlayerInfoDraft, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const parsed = playerInfoSchema.safeParse(values);
      if (!parsed.success) {
        const fieldErrors = parsed.error.flatten().fieldErrors;
        setErrors({
          name: fieldErrors.name?.[0],
          phone: fieldErrors.phone?.[0],
        });
        return;
      }

      const player: PlayerInfo = {
        name: parsed.data.name,
        phone: parsed.data.phone,
        createdAt: new Date().toISOString(),
      };
      setPlayerInfo(player);
      setSubmitted(true);
      onValid?.(player);
    },
    [setPlayerInfo, values, onValid],
  );

  return {
    values,
    errors,
    submitted,
    setField,
    handleSubmit,
  };
}
