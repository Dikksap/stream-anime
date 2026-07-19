import AnimeCard from "./AnimeCard"
import Skeleton from "../ui/Skeleton"
import Spinner from "../ui/Spinner"

function GridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="aspect-[2/3] w-full rounded-[12px]" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
    </div>
  )
}

export default function AnimeGrid({ loading, error, animeList, onSelect, onRetry }) {
  if (loading) return <GridSkeleton />

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-sm text-red-400">{error.message || "Gagal memuat data"}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 rounded-[8px] bg-primary px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            Coba lagi
          </button>
        )}
      </div>
    )
  }

  if (!animeList || animeList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-sm text-text-secondary">Tidak ada anime ditemukan.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {animeList.map((anime, idx) => (
        <AnimeCard key={anime.id || idx} anime={anime} onClick={onSelect} />
      ))}
    </div>
  )
}
