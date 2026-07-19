import { motion } from "framer-motion"

export default function HistoryCard({ item, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative cursor-pointer overflow-hidden rounded-[12px] bg-card shadow-card transition-shadow duration-300 hover:shadow-card-hover"
      onClick={() => onClick(item.id)}
    >
      <div className="aspect-[2/3] w-full overflow-hidden bg-surface-high">
        {item.poster ? (
          <img
            src={item.poster}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : null}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-black/40 via-black/60 to-black/80">
          <span className="text-3xl font-extrabold tracking-wide text-white drop-shadow-lg md:text-4xl">
            {item.episodeLabel || item.episodes || ""}
          </span>
          <span className="mt-2 px-3 text-center text-sm font-semibold leading-tight text-white drop-shadow-md line-clamp-2">
            {item.title}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
