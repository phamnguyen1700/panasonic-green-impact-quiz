import { motion } from "framer-motion";

import { CampaignButton } from "@/components/CampaignButton";
import { GlassPanel } from "@/components/GlassPanel";
import { TextInput } from "@/components/TextInput";
import { campaign } from "@/config/campaign.config";
import { staggerContainer, staggerItem } from "@/config/motion.config";
import { usePlayerInfoForm } from "@/hooks/usePlayerInfoForm";
import type { PlayerInfo } from "@/types/player.types";

interface PlayerInfoFormProps {
  onSubmitted: (player: PlayerInfo) => void;
  onBack: () => void;
}

export function PlayerInfoForm({ onSubmitted, onBack }: PlayerInfoFormProps) {
  const copy = campaign.info.form;
  const { values, errors, setField, handleSubmit, isValid } = usePlayerInfoForm(onSubmitted);

  return (
    <GlassPanel tone="deep" className="w-full max-w-md rounded-[2.25rem]">
      <motion.form
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        onSubmit={handleSubmit}
        className="space-y-5"
        noValidate
      >
        <motion.div variants={staggerItem}>
          <TextInput
            label={copy.nameLabel}
            placeholder={copy.namePlaceholder}
            value={values.name}
            onChange={(event) => setField("name", event.target.value)}
            error={errors.name}
            autoComplete="name"
          />
        </motion.div>

        <motion.div variants={staggerItem}>
          <TextInput
            label={copy.phoneLabel}
            hint={copy.phoneOptionalHint}
            placeholder={copy.phonePlaceholder}
            value={values.phone}
            onChange={(event) => setField("phone", event.target.value)}
            error={errors.phone}
            inputMode="tel"
            autoComplete="tel"
          />
        </motion.div>

        <motion.p variants={staggerItem} className="text-xs leading-relaxed text-mist/55">
          {copy.consent}
        </motion.p>

        <motion.div variants={staggerItem} className="flex items-center gap-4 pt-1">
          <CampaignButton type="submit" withArrow disabled={!isValid} className="flex-1">
            {copy.cta}
          </CampaignButton>
          <CampaignButton type="button" variant="ghost" size="md" onClick={onBack}>
            {copy.back}
          </CampaignButton>
        </motion.div>
      </motion.form>
    </GlassPanel>
  );
}
