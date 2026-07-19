import { motion } from "framer-motion"
import { HiPlay, HiPlus } from "react-icons/hi2"
import Badge from "../ui/Badge"
import PrimaryButton from "../ui/PrimaryButton"
import { useNavigate } from "react-router-dom"

export default function HeroBanner({ anime }) {
  const navigate = useNavigate()
  if (!anime) return null

  const handleWatch = () => {
    if (anime.id) navigate(`/anime/${anime.id}`)
  }

  return (
    <div className="relative h-[500px] w-full overflow-hidden md:h-[700px]">
      <div className="absolute inset-0">
        {anime.poster ? (
          <img
            src={anime.poster}
            alt={anime.title}
            fetchpriority="high"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-surface-high" />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/70 via-bg/30 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-4 pb-12 sm:p-8 lg:p-[60px]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-[1280px]"
        >
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge variant="trending">Trending</Badge>
            {anime.episodes && (
              <Badge variant="new">{anime.episodes} Episodes</Badge>
            )}
            {anime.releaseDay && anime.releaseDay !== "None" && (
              <Badge variant="genre">{anime.releaseDay}</Badge>
            )}
          </div>

          <h1 className="mb-3 max-w-2xl text-3xl font-extrabold leading-tight text-white drop-shadow-lg md:text-5xl">
            {anime.title}
          </h1>

          <div className="mb-6 flex flex-wrap gap-3 text-sm text-gray-300">
            {anime.status && <span>{anime.status}</span>}
            {anime.episodes && <span>• {anime.episodes} eps</span>}
          </div>

          <div className="flex flex-wrap gap-3">
            <PrimaryButton variant="primary" onClick={handleWatch} aria-label="Tonton sekarang">
              <HiPlay className="h-5 w-5" />
              Tonton
            </PrimaryButton>
            <PrimaryButton variant="outline" aria-label="Tambah ke daftar">
              <HiPlus className="h-5 w-5" />
              My List
            </PrimaryButton>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
