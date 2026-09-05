import type { ReactNode } from "react";

import { CampaignEffects } from "./components/CampaignEffects";

export function CampaignExperience({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <CampaignEffects />
    </>
  );
}
