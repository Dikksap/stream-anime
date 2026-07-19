import { useState } from "react"
import { HiMagnifyingGlass } from "react-icons/hi2"

export default function SearchInput({ onSearch, placeholder = "Cari judul anime..." }) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) onSearch(query.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl">
      <HiMagnifyingGlass className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-[8px] border border-border bg-surface py-3 pl-12 pr-4 text-sm text-text-primary placeholder-text-secondary outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
      />
    </form>
  )
}
