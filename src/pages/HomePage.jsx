import { useFetch } from "../hooks/useFetch";
import { getHome, getAnimeDetail } from "../api/animeService";
import { normalizeAnimeItem } from "../utils/normalize";
import useWatchHistory from "../hooks/useWatchHistory";
import Seo from "../components/Seo";
import HeroBanner from "../components/hero/HeroBanner";
import AnimeRow from "../components/anime/AnimeRow";
import HistoryCard from "../components/anime/HistoryCard";
import Section from "../components/layout/Section";
import Container from "../components/layout/Container";
import GenreCard from "../components/anime/GenreCard";
import Spinner from "../components/ui/Spinner";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const popularGenres = [
  { title: "Action", slug: "action" },
  { title: "Adventure", slug: "adventure" },
  { title: "Comedy", slug: "comedy" },
  { title: "Drama", slug: "drama" },
  { title: "Fantasy", slug: "fantasy" },
  { title: "Horror", slug: "horror" },
  { title: "Romance", slug: "romance" },
  { title: "Sci-Fi", slug: "sci-fi" },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { data: homeData, loading, error, refetch } = useFetch(getHome, []);
  const { history } = useWatchHistory();
  const [posterCache, setPosterCache] = useState({});

  const home = homeData?.data || homeData;
  const ongoingList = (home?.ongoing?.animeList || []).map(normalizeAnimeItem);
  const completedList = (home?.completed?.animeList || []).map(
    normalizeAnimeItem,
  );

  const heroAnime = ongoingList[0] || completedList[0] || null;

  // Build poster lookup from already-loaded data
  const posterLookup = {};
  ongoingList.forEach((a) => {
    if (a.id) posterLookup[a.id] = a.poster;
  });
  completedList.forEach((a) => {
    if (a.id) posterLookup[a.id] = a.poster;
  });

  // Fetch missing posters for history items, but keep API calls limited to avoid rate limiter queueing.
  useEffect(() => {
    const missing = history.filter(
      (item) => !posterLookup[item.animeId] && !posterCache[item.animeId],
    );
    const uniqueIds = [
      ...new Set(missing.map((m) => m.animeId).filter(Boolean)),
    ];
    const idsToFetch = uniqueIds.slice(0, 5);
    if (idsToFetch.length === 0) return;

    let cancel = false;

    Promise.allSettled(
      idsToFetch.map(async (animeId) => {
        if (cancel) return;
        try {
          const res = await getAnimeDetail(animeId);
          const detail = res?.data?.anime || res?.data || res;
          if (!cancel && detail?.poster) {
            setPosterCache((prev) => ({ ...prev, [animeId]: detail.poster }));
          }
        } catch {
          // silently fail, poster stays empty
        }
      }),
    );

    return () => {
      cancel = true;
    };
  }, [history, posterLookup, posterCache]);

  const historyList = history.map((item) => ({
    id: item.episodeSlug,
    title: item.animeTitle || item.episodeTitle || "Episode",
    poster:
      item.animePoster ||
      posterLookup[item.animeId] ||
      posterCache[item.animeId] ||
      "",
    episodeLabel: item.episodeNumber ? `Eps ${item.episodeNumber}` : "Lanjut",
  }));

  const handleSelect = (id) => {
    if (id) navigate(`/anime/${id}`);
  };
  const handleGenre = (slug) => {
    if (slug) navigate(`/genre/${slug}`);
  };
  const handleHistorySelect = (slug) => {
    if (slug) navigate(`/episode/${slug}`);
  };

  const historyRowRef = useRef(null);
  const scrollHistory = (dir) => {
    if (!historyRowRef.current) return;
    const amount = historyRowRef.current.clientWidth * 0.75;
    historyRowRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="pt-24">
        <div className="flex flex-col items-center py-16 text-center">
          <p className="text-sm text-red-400">
            {error.message || "Gagal memuat data"}
          </p>
          <PrimaryButton onClick={refetch} variant="primary" className="mt-4">
            Coba lagi
          </PrimaryButton>
        </div>
      </Container>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AniStream",
    url: "https://www.sankavollerei.web.id",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.sankavollerei.web.id/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div>
      <Seo
        title="Beranda"
        description="Nonton streaming anime subtitle Indonesia gratis. Anime ongoing terbaru, anime completed, dan rekomendasi anime populer setiap hari."
        url="/"
        jsonLd={jsonLd}
      />
      <HeroBanner anime={heroAnime} />

      <Container className="pt-8">
        {historyList.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-bold text-text-primary">
              Lanjut Tonton
            </h2>
            <div className="group relative">
              <button
                onClick={() => scrollHistory("left")}
                className="absolute left-0 top-0 z-10 hidden h-full w-12 items-center justify-center bg-gradient-to-r from-bg to-transparent opacity-0 transition-opacity group-hover:opacity-100 lg:flex"
                aria-label="Scroll kiri"
              >
                <HiChevronLeft className="h-6 w-6 text-text-primary" />
              </button>
              <div
                ref={historyRowRef}
                className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none]"
              >
                {historyList.map((item) => (
                  <div
                    key={item.id}
                    className="w-[160px] flex-shrink-0 sm:w-[180px]"
                  >
                    <HistoryCard item={item} onClick={handleHistorySelect} />
                  </div>
                ))}
              </div>
              <button
                onClick={() => scrollHistory("right")}
                className="absolute right-0 top-0 z-10 hidden h-full w-12 items-center justify-center bg-gradient-to-l from-bg to-transparent opacity-0 transition-opacity group-hover:opacity-100 lg:flex"
                aria-label="Scroll kanan"
              >
                <HiChevronRight className="h-6 w-6 text-text-primary" />
              </button>
            </div>
          </section>
        )}

        <AnimeRow
          title="Ongoing"
          animeList={ongoingList}
          onSelect={handleSelect}
        />

        <AnimeRow
          title="Completed"
          animeList={completedList}
          onSelect={handleSelect}
        />

        <Section title="Popular Genres">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {popularGenres.map((g) => (
              <GenreCard key={g.slug} genre={g} onClick={handleGenre} />
            ))}
          </div>
        </Section>
      </Container>
    </div>
  );
}
