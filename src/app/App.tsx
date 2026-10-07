import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { AppProviders } from "@/app/AppProviders";

import { RouteMeta } from "./RouteMeta";

const HomePage = lazy(() =>
  import("@/app/pages/HomePage").then((module) => ({ default: module.HomePage })),
);
const InfoPage = lazy(() =>
  import("@/app/pages/InfoPage").then((module) => ({ default: module.InfoPage })),
);
const QuizPage = lazy(() =>
  import("@/app/pages/QuizPage").then((module) => ({ default: module.QuizPage })),
);
const ResultPage = lazy(() =>
  import("@/app/pages/ResultPage").then((module) => ({ default: module.ResultPage })),
);
const AdminPage = lazy(() =>
  import("@/app/pages/AdminPage").then((module) => ({ default: module.AdminPage })),
);

function RouteLoadingFallback() {
  return (
    <div
      aria-live="polite"
      className="flex min-h-screen items-center justify-center bg-[#f6f2dc] px-6 text-center text-sm font-semibold text-[#315832]"
    >
      Đang tải...
    </div>
  );
}

export function App() {
  return (
    <AppProviders>
      <RouteMeta />
      <Suspense fallback={<RouteLoadingFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AppProviders>
  );
}
