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
        <ContentContainer className="flex items-center justify-between py-7">
          <p className="font-display text-sm leading-tight font-semibold text-mist">
            <span className="mr-2 text-2xl font-extrabold">5</span>
            {campaign.brand.name}
          </p>
          <p className="hidden text-xs tracking-[0.16em] text-mist/70 uppercase sm:block">
            {campaign.brand.tagline}
          </p>
        </ContentContainer>

        <ContentContainer className="flex flex-1 flex-col pb-14">
          {header ? <div className="mb-8">{header}</div> : null}

          <div className="flex flex-1 items-center">
            <div className="mx-auto w-full max-w-3xl">{children}</div>
          </div>

          {footer ? <div className="mt-8">{footer}</div> : null}
        </ContentContainer>
      </FullscreenStage>
    </MotionScreen>
  );
}
