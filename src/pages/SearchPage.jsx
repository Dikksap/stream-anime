import { useState, useRef } from "react"
import { searchAnime } from "../api/animeService"
import { extractAnimeList, normalizeAnimeItem } from "../utils/normalize"
import Seo from "../components/Seo"
import SearchInput from "../components/inputs/SearchInput"
import AnimeGrid from "../components/anime/AnimeGrid"
import Container from "../components/layout/Container"
import Section from "../components/layout/Section"
import EmptyState from "../components/ui/EmptyState"
import { HiMagnifyingGlass } from "react-icons/hi2"
import { useNavigate } from "react-router-dom"

export default function SearchPage() {
  const navigate = useNavigate()
  const lastQueryRef = useRef("")
  const [animeList, setAnimeList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (query) => {
    lastQueryRef.current = query
    setLoading(true)
    setError(null)
    setHasSearched(true)
    try {
      const encoded = encodeURIComponent(query)
      const result = await searchAnime(encoded)
      setAnimeList(extractAnimeList(result).map(normalizeAnimeItem))
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="pt-24">
      <Seo title="Cari Anime" description="Cari anime favoritmu berdasarkan judul. Temukan anime subtitle Indonesia terlengkap." url="/search" />
      <Section title="Cari Anime">
        <div className="mb-6">
          <SearchInput onSearch={handleSearch} />
        </div>

        {!hasSearched ? (
          <EmptyState
            icon={HiMagnifyingGlass}
            title="Cari anime favoritmu"
            description="Masukkan judul anime di atas untuk memulai pencarian."
          />
        ) : (
          <AnimeGrid
            loading={loading}
            error={error}
            animeList={animeList}
            onSelect={(id) => navigate(`/anime/${id}`)}
            onRetry={() => handleSearch(lastQueryRef.current)}
          />
        )}
      </Section>
    </Container>
  )
}
