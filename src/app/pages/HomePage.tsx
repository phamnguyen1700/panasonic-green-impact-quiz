import { CampaignExperience } from "@/features/campaign";
import { HomeScreen } from "@/features/home";

export function HomePage() {
  return (
    <CampaignExperience>
      <HomeScreen />
    </CampaignExperience>
  );
}
