import { useState, useCallback, useEffect } from "react"

const STORAGE_KEY = "anistream-history"
const MAX_ITEMS = 30

export function getHistoryRaw() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeHistory(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {
    // localStorage full or unavailable
  }
}

export default function useWatchHistory() {
  const [version, setVersion] = useState(0)

  // force re-read on mount (page navigation)
  useEffect(() => {
    setVersion((v) => v + 1)
  }, [])

  const history = version >= 0 ? getHistoryRaw() : []

  const addToHistory = useCallback((item) => {
    if (!item?.episodeSlug) return
    const list = getHistoryRaw()
    const filtered = list.filter((e) => e.episodeSlug !== item.episodeSlug)
    const updated = [
      { ...item, watchedAt: new Date().toISOString() },
      ...filtered,
    ].slice(0, MAX_ITEMS)
    writeHistory(updated)
    setVersion((v) => v + 1)
  }, [])

  const clearHistory = useCallback(() => {
    writeHistory([])
    setVersion((v) => v + 1)
  }, [])

  return { history, addToHistory, clearHistory }
}
