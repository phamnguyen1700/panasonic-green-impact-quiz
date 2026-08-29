import type { ReactNode } from "react";

import { WaterSurface } from "@/components/effects/water-surface";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <>
      {children}

      <WaterSurface
        color="hsl(0, 0%, 0%)"
        highlightColor="hsl(186 100% 96%)"
        shadowColor="hsl(213 82% 2%)"
        opacity={0.65}
        hoverStrength={0.35}
        clickStrength={10}
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 999,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
