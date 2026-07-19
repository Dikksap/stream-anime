import { useState } from "react"
import { useFetch } from "../hooks/useFetch"
import { getGenreList, getAnimeByGenre } from "../api/animeService"
import { extractAnimeList, normalizeAnimeItem } from "../utils/normalize"
import AnimeGrid from "../components/anime/AnimeGrid"
import Pagination from "../components/ui/Pagination"
import Container from "../components/layout/Container"
import Section from "../components/layout/Section"
import GenreCard from "../components/anime/GenreCard"
import { useNavigate, useParams } from "react-router-dom"

export default function GenrePage() {
  const navigate = useNavigate()
  const { slug } = useParams()
  const [page, setPage] = useState(1)

  const { data: genreData, loading: genreLoading } = useFetch(getGenreList, [])
  const { data: animeData, loading: animeLoading, error, refetch } = useFetch(
    () => slug ? getAnimeByGenre(slug, page) : Promise.resolve(null),
    [slug, page]
  )

  const genres = extractAnimeList(genreData).map(normalizeAnimeItem)
  const animeList = extractAnimeList(animeData).map(normalizeAnimeItem)

  const handleGenre = (s) => {
    setPage(1)
    navigate(`/genre/${s}`)
  }

  return (
    <Container className="pt-24">
      <Section title="Genre">
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {genres.map((g, i) => (
            <GenreCard
              key={g.id || g.title || i}
              genre={g}
              onClick={handleGenre}
            />
          ))}
        </div>

        {slug && (
          <>
            <h3 className="mb-4 text-lg font-semibold capitalize text-text-primary">
              {slug.replace(/-/g, " ")}
            </h3>
            <AnimeGrid
              loading={animeLoading}
              error={error}
              animeList={animeList}
              onSelect={(id) => navigate(`/anime/${id}`)}
              onRetry={refetch}
            />
            {!animeLoading && !error && animeList.length > 0 && (
              <div className="mt-8">
                <Pagination page={page} onPageChange={setPage} />
              </div>
            )}
          </>
        )}
      </Section>
    </Container>
  )
}
