import type { ReactNode } from "react";

import { MotionScreen } from "@/components/MotionScreen";
import { ScreenBackground } from "@/components/ScreenBackground";
import { ContentContainer } from "@/components/layout/ContentContainer";
import { FullscreenStage } from "@/components/layout/FullscreenStage";
import { assets } from "@/config/assets.config";
import { campaign } from "@/config/campaign.config";

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
        <ContentContainer className="hidden items-center justify-between py-7 sm:flex">
          <p className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-medium tracking-[0.16em] text-mist/90 uppercase backdrop-blur-md">
            {campaign.home.eyebrow}
          </p>
          <p className="hidden text-xs tracking-[0.16em] text-mist/70 uppercase sm:block">
            {campaign.brand.tagline}
          </p>
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
