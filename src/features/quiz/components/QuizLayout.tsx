import type { ReactNode } from "react";

import { CampaignBadgeImage, PanasonicGreenImpactImage } from "@/components/BrandAssets";
import { MotionScreen } from "@/components/MotionScreen";
import { ScreenBackground } from "@/components/ScreenBackground";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { FullscreenStage } from "@/components/layout/FullscreenStage";
import { assets } from "@/config/assets.config";

interface QuizLayoutProps {
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

/** Shared cinematic frame for every quiz question. */
export function QuizLayout({ header, children, footer }: QuizLayoutProps) {
  return (
    <MotionScreen>
      <ScreenBackground image={assets.backgrounds.quiz} scrim="strong" particles={10} />

      <FullscreenStage>
        <ContentContainer className="flex items-center justify-between pt-12 pb-3 sm:py-8">
          <CampaignBadgeImage className="h-16" />
          <PanasonicGreenImpactImage className="h-14" />
        </ContentContainer>

        <ContentContainer className="flex flex-1 flex-col pb-14">
          {header ? <div className="mb-8">{header}</div> : null}

          <div className="flex flex-1 items-center">
            <div className="mx-auto w-full max-w-6xl">{children}</div>
          </div>

          {footer ? <div className="mt-8">{footer}</div> : null}
        </ContentContainer>
      </FullscreenStage>
    </MotionScreen>
  );
}
