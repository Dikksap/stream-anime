export class RateLimitError extends Error {
  constructor(message, retryAfterMs) {
    super(message)
    this.name = 'RateLimitError'
    this.retryAfterMs = retryAfterMs
  }
}

class RateLimiter {
  constructor(limit, windowMs, { maxQueueSize = Infinity, queueTimeoutMs = null } = {}) {
    this.limit = limit
    this.windowMs = windowMs
    this.maxQueueSize = maxQueueSize
    this.queueTimeoutMs = queueTimeoutMs
    this.queue = []
    this.timestamps = []
    this._processing = false
  }

  acquire() {
    return new Promise((resolve, reject) => {
      if (this.queue.length >= this.maxQueueSize) {
        reject(new RateLimitError('Rate limiter queue is full', this._getWaitTime()))
        return
      }
      this.queue.push({ resolve, reject, queuedAt: Date.now() })
      this._process()
    })
  }

  async _process() {
    if (this._processing) return
    this._processing = true

    while (this.queue.length > 0) {
      const now = Date.now()
      this._prune(now)

      if (this.timestamps.length < this.limit) {
        const entry = this.queue.shift()

        if (this.queueTimeoutMs && now - entry.queuedAt >= this.queueTimeoutMs) {
          entry.reject(new RateLimitError('Request timed out in rate limiter queue', this._getWaitTime()))
          continue
        }

        this.timestamps.push(Date.now())
        entry.resolve()
      } else {
        const oldest = this.timestamps[0]
        const waitMs = oldest + this.windowMs - now
        await new Promise((r) => setTimeout(r, waitMs))
      }
    }

    this._processing = false
  }

  _prune(now) {
    this.timestamps = this.timestamps.filter((ts) => now - ts < this.windowMs)
  }

  _getWaitTime() {
    if (this.timestamps.length < this.limit) return 0
    this._prune(Date.now())
    if (this.timestamps.length < this.limit) return 0
    const oldest = this.timestamps[0]
    return Math.max(0, oldest + this.windowMs - Date.now())
  }

  getQueueSize() {
    return this.queue.length
  }
}

export default RateLimiter
