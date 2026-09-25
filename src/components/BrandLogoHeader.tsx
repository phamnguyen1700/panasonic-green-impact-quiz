import { CampaignBadgeImage, PanasonicGreenImpactImage } from "@/components/BrandAssets";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { useIsMobile } from "@/hooks/app";

export function BrandLogoHeader() {
  const isMobile = useIsMobile();

  return isMobile ? (
    <ContentContainer className="flex items-center justify-between pt-12 pb-3">
      <PanasonicGreenImpactImage className="h-15" />
      <CampaignBadgeImage className="h-15" />
    </ContentContainer>
  ) : (
    <ContentContainer className="flex items-center justify-between py-8">
      <PanasonicGreenImpactImage className="h-20" />
      <CampaignBadgeImage className="h-20" />
    </ContentContainer>
  );
}
