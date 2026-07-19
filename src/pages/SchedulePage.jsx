import { useFetch } from "../hooks/useFetch"
import { getJadwal } from "../api/animeService"
import { normalizeAnimeItem } from "../utils/normalize"
import Container from "../components/layout/Container"
import Section from "../components/layout/Section"
import Spinner from "../components/ui/Spinner"
import AnimeCard from "../components/anime/AnimeCard"
import { useNavigate } from "react-router-dom"

const dayOrder = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu", "Random"]

export default function SchedulePage() {
  const navigate = useNavigate()
  const { data, loading, error, refetch } = useFetch(getJadwal, [])

  if (loading) {
    return (
      <Container className="pt-24">
        <div className="flex justify-center py-16">
          <Spinner className="h-8 w-8" />
        </div>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="pt-24">
        <div className="flex flex-col items-center py-16 text-center">
          <p className="text-sm text-red-400">{error.message}</p>
          <button
            onClick={refetch}
            className="mt-4 rounded-[8px] bg-primary px-5 py-2 text-sm font-semibold text-white"
          >
            Coba lagi
          </button>
        </div>
      </Container>
    )
  }

  const groups = (data?.data || []).slice().sort(
    (a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
  )

  return (
    <Container className="pt-24">
      <Section title="Jadwal Rilis">
        <div className="space-y-8">
          {groups.map((group) => {
            const list = (group.anime_list || []).map(normalizeAnimeItem)
            if (list.length === 0) return null

            return (
              <div key={group.day}>
                <h3 className="mb-3 text-lg font-semibold text-primary">{group.day}</h3>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {list.map((anime, i) => (
                    <AnimeCard
                      key={anime.id || i}
                      anime={anime}
                      onClick={(id) => navigate(`/anime/${id}`)}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </Section>
    </Container>
  )
}
