import { useState, useEffect, useRef, useMemo } from "react"
import { useFetch } from "../hooks/useFetch"
import { getEpisode, getStreamServer } from "../api/animeService"
import useWatchHistory from "../hooks/useWatchHistory"
import Seo from "../components/Seo"
import Container from "../components/layout/Container"
import Spinner from "../components/ui/Spinner"
import PrimaryButton from "../components/ui/PrimaryButton"
import Badge from "../components/ui/Badge"
import { HiArrowLeft, HiPlay, HiChevronLeft, HiChevronRight, HiArrowDownTray, HiArrowTopRightOnSquare } from "react-icons/hi2"
import { useParams, useNavigate } from "react-router-dom"

export default function EpisodePlayerPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [activeQuality, setActiveQuality] = useState(0)
  const [selectedServer, setSelectedServer] = useState(null)
  const [streamUrl, setStreamUrl] = useState(null)
  const [streamLoading, setStreamLoading] = useState(false)
  const [showDownloads, setShowDownloads] = useState(false)
  const autoLoaded = useRef(false)

  const { data, loading, error, refetch } = useFetch(() => getEpisode(slug), [slug])
  const episode = data?.data || data
  const { addToHistory } = useWatchHistory()

  const qualities = episode?.server?.qualities || []
  const downloadQualities = episode?.downloadUrl?.qualities || []
  const episodeList = episode?.info?.episodeList || []
  const genreList = episode?.info?.genreList || []

  // Reset state when slug changes
  useEffect(() => {
    autoLoaded.current = false
    setActiveQuality(0)
    setSelectedServer(null)
    setStreamUrl(null)
    setShowDownloads(false)
  }, [slug])

  // Auto-load first 480p server
  useEffect(() => {
    if (autoLoaded.current || !episode?.server?.qualities) return
    const qIdx = episode.server.qualities.findIndex(
      (q) => q.title?.toLowerCase() === "480p"
    )
    if (qIdx === -1) return
    const server = episode.server.qualities[qIdx]?.serverList?.[0]
    if (!server?.serverId) return

    autoLoaded.current = true
    handleSelectServer(server.serverId, qIdx)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episode])

  const handleSelectServer = async (serverId, qIdx) => {
    setSelectedServer(serverId)
    setActiveQuality(qIdx)
    setStreamLoading(true)
    setStreamUrl(null)
    try {
      const res = await getStreamServer(serverId)
      const url = res?.data?.url || res?.url || res?.data?.link || res?.data?.embedUrl || ""
      setStreamUrl(url)
      if (url) {
        const currentEp = episodeList.find((ep) => ep.episodeId === slug || ep.episodeId?.toLowerCase() === slug?.toLowerCase())
        addToHistory({
          episodeSlug: slug,
          episodeTitle: currentEp?.title || episode?.title || "",
          episodeNumber: currentEp?.eps || currentEp?.episodeNumber || null,
          animeId: episode?.animeId || "",
          animeTitle: episode?.animeId ? episode.animeId.replace(/-/g, " ") : "",
          animePoster: "",
          quality: qualities[qIdx]?.title || "",
          serverName: qualities[qIdx]?.serverList?.find((s) => s.serverId === serverId)?.title?.trim() || "",
        })
      }
    } catch {
      setStreamUrl(null)
    } finally {
      setStreamLoading(false)
    }
  }

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

  const jsonLd = useMemo(() => {
    if (!episode) return null
    return {
      "@context": "https://schema.org",
      "@type": "TVEpisode",
      name: episode.title || "Episode",
      partOfSeries: episode.animeId ? {
        "@type": "TVSeries",
        name: episode.animeId.replace(/-/g, " "),
      } : undefined,
      episodeNumber: episodeList.find((ep) => ep.episodeId === slug)?.eps || undefined,
    }
  }, [episode, episodeList, slug])

  const epTitle = episode?.title || "Episode"
  const seoDesc = episode?.info?.credit
    ? `Nonton ${epTitle} subtitle Indonesia. ${episode.info.credit}`
    : `Nonton streaming ${epTitle} subtitle Indonesia gratis.`

  return (
    <Container className="pt-24">
      <Seo
        title={epTitle}
        description={seoDesc}
        url={`/episode/${slug}`}
        type="video.episode"
        jsonLd={jsonLd}
      />
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
        aria-label="Kembali"
      >
        <HiArrowLeft className="h-4 w-4" />
        Kembali
      </button>

      <div className="mb-4">
        <h1 className="text-xl font-bold text-text-primary md:text-2xl">
          {episode?.title || "Episode"}
        </h1>
        {episode?.releaseTime && (
          <p className="mt-1 text-sm text-text-secondary">{episode.releaseTime}</p>
        )}
      </div>

      {/* Player */}
      <div className="aspect-video w-full overflow-hidden rounded-[12px] bg-surface shadow-card">
        {streamUrl ? (
          <iframe
            key={streamUrl}
            src={streamUrl}
            className="h-full w-full"
            allowFullScreen
            allow="autoplay; encrypted-media; picture-in-picture"
            title="Video Player"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            {streamLoading ? (
              <div className="flex flex-col items-center gap-3">
                <Spinner className="h-8 w-8" />
                <p className="text-sm text-text-secondary">Memuat server...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <HiPlay className="h-12 w-12 text-text-secondary" />
                <p className="text-sm text-text-secondary">
                  Pilih server di bawah untuk mulai menonton
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {streamUrl && (
        <div className="mt-3 flex justify-end">
          <a
            href={streamUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-text-secondary transition-colors hover:text-primary"
          >
            <HiArrowTopRightOnSquare className="h-3.5 w-3.5" />
            Buka di tab baru
          </a>
        </div>
      )}

      {/* Prev / Next navigation */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <PrimaryButton
          variant="outline"
          onClick={() => episode?.hasPrevEpisode && navigate(`/episode/${episode.prevEpisode.episodeId}`)}
          className={!episode?.hasPrevEpisode ? "pointer-events-none opacity-40" : ""}
          aria-label="Episode sebelumnya"
        >
          <HiChevronLeft className="h-4 w-4" />
          Prev
        </PrimaryButton>

        {episode?.animeId && (
          <button
            onClick={() => navigate(`/anime/${episode.animeId}`)}
            className="text-sm font-medium text-text-secondary transition-colors hover:text-primary"
          >
            Lihat semua episode
          </button>
        )}

        <PrimaryButton
          variant="outline"
          onClick={() => episode?.hasNextEpisode && navigate(`/episode/${episode.nextEpisode.episodeId}`)}
          className={!episode?.hasNextEpisode ? "pointer-events-none opacity-40" : ""}
          aria-label="Episode berikutnya"
        >
          Next
          <HiChevronRight className="h-4 w-4" />
        </PrimaryButton>
      </div>

      {/* Server qualities */}
      {qualities.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-3 text-sm font-semibold text-text-primary">Pilih Kualitas & Server</h3>
          <div className="space-y-4">
            {qualities.map((q, qIdx) => (
              <div key={qIdx}>
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    {q.title}
                  </span>
                  {q.serverList.length === 0 && (
                    <span className="text-xs text-text-secondary">Tidak tersedia</span>
                  )}
                </div>
                {q.serverList.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {q.serverList.map((server, sIdx) => {
                      const serverId = server.serverId || sIdx
                      const isActive = selectedServer === serverId
                      return (
                        <button
                          key={serverId}
                          onClick={() => handleSelectServer(serverId, qIdx)}
                          className={`rounded-[8px] border px-4 py-2 text-sm font-medium transition-colors ${
                            isActive
                              ? "border-primary bg-primary text-white"
                              : "border-border bg-surface text-text-secondary hover:bg-surface-high hover:text-text-primary"
                          }`}
                        >
                          {server.title?.trim() || `Server ${sIdx + 1}`}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Episode info */}
      {episode?.info && (
        <div className="mt-8 rounded-[12px] border border-border bg-surface p-5">
          <h3 className="mb-3 text-base font-semibold text-text-primary">Informasi</h3>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {episode.info.type && (
              <span className="text-text-secondary">Type: <span className="text-text-primary">{episode.info.type}</span></span>
            )}
            {episode.info.duration && (
              <span className="text-text-secondary">Durasi: <span className="text-text-primary">{episode.info.duration}</span></span>
            )}
            {episode.info.credit && (
              <span className="text-text-secondary">Credit: <span className="text-text-primary">{episode.info.credit}</span></span>
            )}
            {episode.info.encoder && (
              <span className="text-text-secondary">Encoder: <span className="text-text-primary">{episode.info.encoder}</span></span>
            )}
          </div>

          {genreList.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {genreList.map((g) => (
                <Badge
                  key={g.genreId || g.title}
                  variant="genre"
                  className="cursor-pointer"
                  onClick={() => g.genreId && navigate(`/genre/${g.genreId}`)}
                >
                  {g.title}
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Download links */}
      {downloadQualities.length > 0 && (
        <div className="mt-6 rounded-[12px] border border-border bg-surface p-5">
          <button
            onClick={() => setShowDownloads(!showDownloads)}
            className="flex w-full items-center justify-between"
            aria-label="Toggle download links"
          >
            <h3 className="flex items-center gap-2 text-base font-semibold text-text-primary">
              <HiArrowDownTray className="h-5 w-5" />
              Download
            </h3>
            <span className="text-sm text-text-secondary">{showDownloads ? "Tutup" : "Buka"}</span>
          </button>

          {showDownloads && (
            <div className="mt-4 space-y-4">
              {downloadQualities.map((q, qIdx) => (
                <div key={qIdx}>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-surface-high px-2.5 py-0.5 text-xs font-semibold text-text-primary">
                      {q.title}
                    </span>
                    {q.size && (
                      <span className="text-xs text-text-secondary">{q.size}</span>
                    )}
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {q.urls.map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-[8px] border border-border bg-bg px-4 py-2 text-sm text-text-secondary transition-colors hover:border-primary hover:text-text-primary"
                      >
                        <span>{link.title}</span>
                        <HiArrowDownTray className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Episode list */}
      {episodeList.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-3 text-base font-semibold text-text-primary">Daftar Episode</h3>
          <div className="grid max-h-[400px] gap-2 overflow-y-auto pr-2 sm:grid-cols-2 lg:grid-cols-3">
            {episodeList.map((ep, idx) => {
              const isActive = ep.episodeId === slug
              return (
                <button
                  key={ep.episodeId || idx}
                  onClick={() => ep.episodeId && navigate(`/episode/${ep.episodeId}`)}
                  className={`flex items-center justify-between rounded-[8px] border px-4 py-3 text-left text-sm transition-colors ${
                    isActive
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-surface text-text-secondary hover:bg-surface-high hover:text-text-primary"
                  }`}
                >
                  <span>{ep.title || `Episode ${ep.eps}`}</span>
                  {isActive && <Badge variant="trending">Now</Badge>}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </Container>
  )
}
