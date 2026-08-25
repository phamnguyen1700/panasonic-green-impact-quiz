import type { ReactNode } from "react";

/**
 * Campaign-level providers (theme, analytics, future quiz state).
 * Data providers such as QueryClientProvider live in the root route.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
