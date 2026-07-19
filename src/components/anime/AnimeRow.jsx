import { useRef } from "react"
import { motion } from "framer-motion"
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2"
import AnimeCard from "./AnimeCard"

export default function AnimeRow({ title, animeList, onSelect }) {
  const rowRef = useRef(null)

  const scroll = (dir) => {
    if (!rowRef.current) return
    const amount = rowRef.current.clientWidth * 0.75
    rowRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" })
  }

  return (
    <section className="mb-10">
      {title && (
        <h2 className="mb-4 text-xl font-bold text-text-primary">{title}</h2>
      )}

      <div className="group relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 z-10 hidden h-full w-12 items-center justify-center bg-gradient-to-r from-bg to-transparent opacity-0 transition-opacity group-hover:opacity-100 lg:flex"
          aria-label="Scroll kiri"
        >
          <HiChevronLeft className="h-6 w-6 text-text-primary" />
        </button>

        <div
          ref={rowRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none]"
        >
          {animeList.map((anime, idx) => (
            <motion.div
              key={anime.id || idx}
              className="w-[160px] flex-shrink-0 sm:w-[180px]"
            >
              <AnimeCard anime={anime} onClick={onSelect} />
            </motion.div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 z-10 hidden h-full w-12 items-center justify-center bg-gradient-to-l from-bg to-transparent opacity-0 transition-opacity group-hover:opacity-100 lg:flex"
          aria-label="Scroll kanan"
        >
          <HiChevronRight className="h-6 w-6 text-text-primary" />
        </button>
      </div>
    </section>
  )
}
