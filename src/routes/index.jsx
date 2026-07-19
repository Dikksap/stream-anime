import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router-dom"
import Spinner from "../components/ui/Spinner"

const HomePage = lazy(() => import("../pages/HomePage"))
const OngoingPage = lazy(() => import("../pages/OngoingPage"))
const CompletePage = lazy(() => import("../pages/CompletePage"))
const SearchPage = lazy(() => import("../pages/SearchPage"))
const GenrePage = lazy(() => import("../pages/GenrePage"))
const SchedulePage = lazy(() => import("../pages/SchedulePage"))
const AnimeDetailPage = lazy(() => import("../pages/AnimeDetailPage"))
const EpisodePlayerPage = lazy(() => import("../pages/EpisodePlayerPage"))
const UnlimitedPage = lazy(() => import("../pages/UnlimitedPage"))

function PageLoader() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spinner className="h-8 w-8" />
    </div>
  )
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
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
    </Suspense>
  )
}
