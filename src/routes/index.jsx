import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import OngoingPage from "../pages/OngoingPage";
import CompletePage from "../pages/CompletePage";
import SearchPage from "../pages/SearchPage";
import GenrePage from "../pages/GenrePage";
import SchedulePage from "../pages/SchedulePage";
import AnimeDetailPage from "../pages/AnimeDetailPage";
import EpisodePlayerPage from "../pages/EpisodePlayerPage";
import UnlimitedPage from "../pages/UnlimitedPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/ongoing" element={<OngoingPage />} />
      <Route path="/complete" element={<CompletePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/genre" element={<GenrePage />} />
      <Route path="/genre/:slug" element={<GenrePage />} />
      <Route path="/schedule" element={<SchedulePage />} />
      <Route path="/anime/:slug" element={<AnimeDetailPage />} />
      <Route path="/episode/:slug" element={<EpisodePlayerPage />} />
      <Route path="/semua-anime" element={<UnlimitedPage />} />
    </Routes>
  );
}
