import { useState } from "react"
import { useFetch } from "../hooks/useFetch"
import { getCompleteAnime } from "../api/animeService"
import { extractAnimeList, normalizeAnimeItem } from "../utils/normalize"
import AnimeGrid from "../components/anime/AnimeGrid"
import Pagination from "../components/ui/Pagination"
import Container from "../components/layout/Container"
import Section from "../components/layout/Section"
import { useNavigate } from "react-router-dom"

export default function CompletePage() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const { data, loading, error, refetch } = useFetch(() => getCompleteAnime(page), [page])

  const animeList = extractAnimeList(data).map(normalizeAnimeItem)
  const totalPages = data?.pagination?.totalPages || null

  return (
    <Container className="pt-24">
      <Section title="Anime Complete">
        <AnimeGrid
          loading={loading}
          error={error}
          animeList={animeList}
          onSelect={(id) => navigate(`/anime/${id}`)}
          onRetry={refetch}
        />
        {!loading && !error && animeList.length > 0 && (
          <div className="mt-8">
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        )}
      </Section>
    </Container>
  )
}
