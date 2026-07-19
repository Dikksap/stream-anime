import { useRef, useState, useEffect } from "react"
import { useFetch } from "../hooks/useFetch"
import { getAllAnime } from "../api/animeService"
import { normalizeAnimeItem } from "../utils/normalize"
import Container from "../components/layout/Container"
import Section from "../components/layout/Section"
import Skeleton from "../components/ui/Skeleton"
import { useNavigate } from "react-router-dom"

function SkeletonLetter() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i}>
          <Skeleton className="mb-2 h-5 w-10" />
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {Array.from({ length: 8 }).map((_, j) => (
              <Skeleton key={j} className="h-4 w-24" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function UnlimitedPage() {
  const navigate = useNavigate()
  const { data, loading, error, refetch } = useFetch(getAllAnime, [])
  const [activeLetter, setActiveLetter] = useState(null)
  const sectionRefs = useRef({})

  const groups = data?.data?.list || []
  const letters = groups.map((g) => g.startWith)

  useEffect(() => {
    if (groups.length > 0) setActiveLetter(groups[0].startWith)
  }, [groups])

  const scrollTo = (letter) => {
    setActiveLetter(letter)
    sectionRefs.current[letter]?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveLetter(entry.target.dataset.letter)
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px" }
    )
    for (const ref of Object.values(sectionRefs.current)) {
      if (ref) observer.observe(ref)
    }
    return () => observer.disconnect()
  }, [groups])

  if (error) {
    return (
      <Container className="pt-24">
        <Section title="Semua Anime">
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-sm text-red-400">{error.message || "Gagal memuat data"}</p>
            <button
              onClick={refetch}
              className="mt-4 rounded-[8px] bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              Coba lagi
            </button>
          </div>
        </Section>
      </Container>
    )
  }

  return (
    <>
      <div className="fixed left-0 top-16 z-40 hidden h-[calc(100vh-4rem)] w-10 flex-col items-center gap-0.5 overflow-y-auto border-r border-border bg-bg/80 py-3 backdrop-blur-sm md:flex">
        {letters.map((letter) => (
          <button
            key={letter}
            onClick={() => scrollTo(letter)}
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded text-[11px] font-bold transition-colors ${
              activeLetter === letter
                ? "bg-primary text-white"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {letter}
          </button>
        ))}
      </div>

      <Container className="pt-24 md:pl-14">
        <Section title="Semua Anime">
          {loading ? (
            <SkeletonLetter />
          ) : (
            <div className="space-y-6">
              {groups.map((group) => {
                const list = (group.animeList || []).map(normalizeAnimeItem)
                if (list.length === 0) return null
                return (
                  <div
                    key={group.startWith}
                    ref={(el) => { sectionRefs.current[group.startWith] = el }}
                    data-letter={group.startWith}
                  >
                    <h3 className="mb-2 text-lg font-bold text-text-primary">
                      {group.startWith}
                    </h3>
                    <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                      {list.map((anime, idx) => (
                        <button
                          key={anime.id || idx}
                          onClick={() => navigate(`/anime/${anime.id}`)}
                          className="text-sm text-text-secondary transition-colors hover:text-primary"
                        >
                          {anime.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </Section>
      </Container>
    </>
  )
}
