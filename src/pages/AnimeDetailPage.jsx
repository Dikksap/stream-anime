import { useState } from "react"
import { useFetch } from "../hooks/useFetch"
import { getAnimeDetail } from "../api/animeService"
import Container from "../components/layout/Container"
import Badge from "../components/ui/Badge"
import Spinner from "../components/ui/Spinner"
import EpisodeCard from "../components/anime/EpisodeCard"
import PrimaryButton from "../components/ui/PrimaryButton"
import { HiArrowLeft, HiPlay } from "react-icons/hi2"
import { useParams, useNavigate } from "react-router-dom"

function renderSynopsis(synopsis) {
  if (!synopsis) return null
  if (typeof synopsis === "string") return synopsis
  if (synopsis.paragraphs && Array.isArray(synopsis.paragraphs))
    return synopsis.paragraphs.filter((p) => p.trim()).join("\n\n")
  return null
}

export default function AnimeDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { data, loading, error, refetch } = useFetch(() => getAnimeDetail(slug), [slug])

  const detail = data?.data?.anime || data?.data || data

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
          <PrimaryButton onClick={refetch} variant="primary" className="mt-4">
            Coba lagi
          </PrimaryButton>
        </div>
      </Container>
    )
  }

  if (!detail) {
    return (
      <Container className="pt-24">
        <p className="py-16 text-center text-text-secondary">Anime tidak ditemukan.</p>
      </Container>
    )
  }

  const synopsisText = renderSynopsis(detail.synopsis)
  const genreList = detail.genreList || detail.genres || []

  return (
    <div>
      <div className="relative h-[300px] w-full overflow-hidden md:h-[450px]">
        {detail.poster ? (
          <img src={detail.poster} alt={detail.title} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-surface-high" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
      </div>

      <Container className="-mt-32 relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
          aria-label="Kembali"
        >
          <HiArrowLeft className="h-4 w-4" />
          Kembali
        </button>

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="w-full flex-shrink-0 lg:w-[280px]">
            {detail.poster && (
              <img
                src={detail.poster}
                alt={detail.title}
                className="w-full rounded-[12px] object-cover shadow-card"
              />
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-extrabold text-text-primary md:text-3xl">
              {detail.title || detail.name}
            </h1>

            <div className="mt-3 flex flex-wrap gap-2">
              {detail.status && <Badge variant="new">{detail.status}</Badge>}
              {detail.type && <Badge variant="genre">{detail.type}</Badge>}
              {detail.score && <Badge variant="trending">★ {detail.score}</Badge>}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:flex sm:flex-wrap">
              {detail.japanese && (
                <span className="text-text-secondary">Japanese: <span className="text-text-primary">{detail.japanese}</span></span>
              )}
              {detail.episodes && (
                <span className="text-text-secondary">Episode: <span className="text-text-primary">{detail.episodes}</span></span>
              )}
              {detail.duration && (
                <span className="text-text-secondary">Durasi: <span className="text-text-primary">{detail.duration}</span></span>
              )}
              {detail.aired && (
                <span className="text-text-secondary">Tayang: <span className="text-text-primary">{detail.aired}</span></span>
              )}
              {detail.studios && (
                <span className="text-text-secondary">Studio: <span className="text-text-primary">{detail.studios}</span></span>
              )}
            </div>

            {genreList.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {Array.isArray(genreList) && genreList.map((g, i) => (
                  <Badge key={i} variant="genre">
                    {g.title || g}
                  </Badge>
                ))}
              </div>
            )}

            {synopsisText && (
              <div className="mt-6">
                <h3 className="mb-2 text-lg font-semibold text-text-primary">Sinopsis</h3>
                <p className="text-sm leading-relaxed text-text-secondary whitespace-pre-line">
                  {synopsisText}
                </p>
              </div>
            )}
          </div>
        </div>

        {Array.isArray(detail.episodeList) && detail.episodeList.length > 0 && (
          <div className="mt-10">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">
              Daftar Episode ({detail.episodeList.length})
            </h3>
            <div className="grid max-h-[400px] gap-2 overflow-y-auto pr-2">
              {detail.episodeList.map((ep, idx) => (
                <EpisodeCard
                  key={ep.slug || ep.episodeId || ep.id || idx}
                  episode={ep}
                  index={idx}
                  onSelect={(slug) => navigate(`/episode/${slug}`)}
                />
              ))}
            </div>
          </div>
        )}

        {Array.isArray(detail.recommendedAnimeList) && detail.recommendedAnimeList.length > 0 && (
          <div className="mt-10">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">Rekomendasi</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {detail.recommendedAnimeList.slice(0, 8).map((rec, i) => (
                <button
                  key={rec.slug || rec.title || i}
                  onClick={() => navigate(`/anime/${rec.slug || rec.title}`)}
                  className="group overflow-hidden rounded-[12px] bg-card text-left transition-all hover:shadow-card-hover"
                >
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={rec.poster || rec.image}
                      alt={rec.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <p className="p-2 text-sm font-medium text-text-primary line-clamp-2">
                    {rec.title}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}
