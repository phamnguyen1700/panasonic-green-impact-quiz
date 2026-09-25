import type { ReactNode } from "react";

import { BrandLogoHeader } from "@/components/BrandLogoHeader";
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

      <FullscreenStage className="lg:h-[100svh] lg:overflow-hidden">
        <BrandLogoHeader />

        <ContentContainer className="flex min-h-0 flex-1 flex-col pb-3 sm:pb-4">
          {header ? <div className="mb-4">{header}</div> : null}

          <div className="flex min-h-0 flex-1 items-center">
            <div className="mx-auto w-full max-w-5xl">{children}</div>
          </div>

          {footer ? <div className="mt-3 shrink-0 sm:mt-4">{footer}</div> : null}
        </ContentContainer>
      </FullscreenStage>
    </MotionScreen>
  );
}
