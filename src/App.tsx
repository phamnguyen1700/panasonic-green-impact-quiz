import { Navigate, Route, Routes } from "react-router-dom";

import { AppProviders } from "@/app/AppProviders";
import { HomePage } from "@/app/pages/HomePage";
import { InfoPage } from "@/app/pages/InfoPage";
import { QuizPage } from "@/app/pages/QuizPage";
import { ResultPage } from "@/app/pages/ResultPage";

import { RouteMeta } from "./app/RouteMeta";

export function App() {
  return (
    <AppProviders>
      <RouteMeta />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppProviders>
  );
}
