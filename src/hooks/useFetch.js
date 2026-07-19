import { useState, useEffect, useCallback } from 'react'

/**
 * Hook generik untuk memanggil fungsi async (misalnya dari api/*Service.js)
 * dan mengelola state loading, data, error.
 *
 * @param {Function} fetchFn - fungsi async yang mengembalikan data, mis: () => getPosts()
 * @param {Array} deps - dependency array, mirip useEffect
 */
export function useFetch(fetchFn, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const refetch = useCallback(() => {
    let isCancelled = false
    setLoading(true)
    setError(null)

    fetchFn()
      .then((result) => {
        if (!isCancelled) setData(result)
      })
      .catch((err) => {
        if (!isCancelled) setError(err)
      })
      .finally(() => {
        if (!isCancelled) setLoading(false)
      })

    return () => {
      isCancelled = true
    }
  }, deps)

  useEffect(() => {
    const cancel = refetch()
    return cancel
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { data, loading, error, refetch }
}
