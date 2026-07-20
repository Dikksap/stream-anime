import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import AnimeCard from "./AnimeCard";

export default function AnimeRow({ title, animeList, onSelect }) {
  const rowRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  const scroll = (dir) => {
    if (!rowRef.current) return;
    const amount = rowRef.current.clientWidth * 0.75;
    rowRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="mb-10">
      {title && (
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-bold text-text-primary">{title}</h2>
          {animeList.length > 4 && (
            <button
              onClick={() => setExpanded((value) => !value)}
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-primary hover:text-primary"
              aria-expanded={expanded}
            >
              {expanded ? "Sembunyikan" : "Lihat seluruhnya"}
            </button>
          )}
        </div>
      )}

      <div className="group relative">
        {!expanded && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 z-10 hidden h-full w-12 items-center justify-center bg-gradient-to-r from-bg to-transparent opacity-0 transition-opacity group-hover:opacity-100 lg:flex"
            aria-label="Scroll kiri"
          >
            <HiChevronLeft className="h-6 w-6 text-text-primary" />
          </button>
        )}

        <div
          ref={rowRef}
          className={`gap-4 pb-2 ${expanded ? "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6" : "flex overflow-x-auto scroll-smooth [scrollbar-width:none]"}`}
        >
          {animeList.map((anime, idx) => (
            <motion.div
              key={anime.id || idx}
              className={`${expanded ? "w-full" : "w-[160px] flex-shrink-0 sm:w-[180px]"}`}
            >
              <AnimeCard anime={anime} onClick={onSelect} />
            </motion.div>
          ))}
        </div>

        {!expanded && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 z-10 hidden h-full w-12 items-center justify-center bg-gradient-to-l from-bg to-transparent opacity-0 transition-opacity group-hover:opacity-100 lg:flex"
            aria-label="Scroll kanan"
          >
            <HiChevronRight className="h-6 w-6 text-text-primary" />
          </button>
        )}
      </div>
    </section>
  );
}
