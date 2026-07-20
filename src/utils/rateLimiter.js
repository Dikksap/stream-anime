class RateLimiter {
  constructor(limit, windowMs) {
    this.limit = limit
    this.windowMs = windowMs
    this.queue = []
    this.timestamps = []
    this._processing = false
  }

  acquire() {
    return new Promise((resolve) => {
      this.queue.push(resolve)
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
        const resolve = this.queue.shift()
        this.timestamps.push(Date.now())
        resolve()
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
}

export default RateLimiter
