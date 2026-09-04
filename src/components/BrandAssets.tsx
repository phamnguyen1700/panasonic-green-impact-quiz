import { assets } from "@/config/assets.config";
import { cn } from "@/utils/cn";

interface BrandImageProps {
  className?: string;
}

export function CampaignBadgeImage({ className }: BrandImageProps) {
  return (
    <img
      src={assets.brand.badge}
      alt="5 năm Sống khỏe góp xanh"
      className={cn("h-9 w-auto object-contain", className)}
      draggable={false}
    />
  );
}

export function PanasonicGreenImpactImage({ className }: BrandImageProps) {
  return (
    <img
      src={assets.brand.logo}
      alt="Panasonic Green Impact"
      className={cn("h-8 w-auto object-contain", className)}
      draggable={false}
    />
  );
}

export function HomeTitleImage({ className }: BrandImageProps) {
  return (
    <img
      src={assets.brand.headline}
      alt="Bạn là loại rừng nào?"
      className={cn("w-full object-contain", className)}
      draggable={false}
    />
  );
}
