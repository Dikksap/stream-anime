import { motion } from "framer-motion"

export default function AnimeCard({ anime, onClick }) {
  const meta = [anime.episodes && `${anime.episodes} eps`, anime.releaseDay, anime.status]
    .filter(Boolean)
    .join(" • ")

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative cursor-pointer overflow-hidden rounded-[12px] bg-card shadow-card transition-shadow duration-300 hover:shadow-card-hover"
      onClick={() => onClick(anime.id)}
    >
      <div className="aspect-[2/3] w-full overflow-hidden bg-surface-high">
        {anime.poster ? (
          <img
            src={anime.poster}
            alt={anime.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-end bg-gradient-to-br from-surface-high to-card p-3">
            <span className="text-sm font-semibold leading-tight text-text-secondary line-clamp-2">
              {anime.title}
            </span>
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-white">
          {anime.title}
        </h3>
        {meta && <p className="mt-1 text-[11px] text-gray-300">{meta}</p>}
      </div>
    </motion.div>
  )
}
