import { HiPlay } from "react-icons/hi2"

export default function EpisodeCard({ episode, index, onSelect }) {
  const slug = episode.slug || episode.episodeId || episode.id
  const label = episode.title || episode.episode || `Episode ${index + 1}`

  return (
    <button
      onClick={() => onSelect(slug)}
      className="flex w-full items-center gap-3 rounded-[8px] border border-border bg-surface px-4 py-3 text-left transition-colors hover:bg-surface-high"
      aria-label={`Tonton ${label}`}
    >
      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
        {index + 1}
      </span>
      <span className="flex-1 text-sm font-medium text-text-primary">{label}</span>
      <HiPlay className="h-4 w-4 text-text-secondary" />
    </button>
  )
}
