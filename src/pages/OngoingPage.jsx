import { useState } from "react"
import { useFetch } from "../hooks/useFetch"
import { getOngoing } from "../api/animeService"
import { extractAnimeList, normalizeAnimeItem } from "../utils/normalize"
import Seo from "../components/Seo"
import AnimeGrid from "../components/anime/AnimeGrid"
import Pagination from "../components/ui/Pagination"
import Container from "../components/layout/Container"
import Section from "../components/layout/Section"
import { useNavigate } from "react-router-dom"

export default function OngoingPage() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const { data, loading, error, refetch } = useFetch(() => getOngoing(page), [page])

  const animeList = extractAnimeList(data).map(normalizeAnimeItem)
  const totalPages = data?.pagination?.totalPages || null

  const pageTitle = page > 1 ? `Ongoing Halaman ${page}` : "Anime Ongoing"
  const pageDesc = `Daftar anime ongoing (tayang) terbaru halaman ${page} — nonton streaming subtitle Indonesia.`

  const paginationLinks = []
  if (page > 1) paginationLinks.push({ rel: "prev", href: `/ongoing${page > 2 ? `?page=${page - 1}` : ""}` })
  if (totalPages && page < totalPages) paginationLinks.push({ rel: "next", href: `/ongoing?page=${page + 1}` })

  return (
    <Container className="pt-24">
      <Seo title={pageTitle} description={pageDesc} url={`/ongoing${page > 1 ? `?page=${page}` : ""}`} paginationLinks={paginationLinks} />
      <Section title="Anime Ongoing">
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
