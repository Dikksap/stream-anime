import { HiTag } from "react-icons/hi2"

export default function GenreCard({ genre, onClick }) {
  return (
    <button
      onClick={() => onClick(genre.slug || genre.id || genre.title)}
      className="group flex items-center gap-3 rounded-[12px] border border-border bg-surface px-5 py-4 text-left transition-all duration-200 hover:border-primary hover:bg-primary"
      aria-label={`Genre ${genre.title || genre}`}
    >
      <HiTag className="h-5 w-5 text-text-secondary transition-colors group-hover:text-white" />
      <span className="text-sm font-medium text-text-primary transition-colors group-hover:text-white">
        {genre.title || genre}
      </span>
    </button>
  )
}
