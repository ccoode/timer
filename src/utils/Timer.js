const now = require('performance-now')

class Timer {
  constructor(settings) {
    this._watchQueue = []
    if (settings) {
      this.setup(settings)
      this.watch(settings.hook)
    }
  }

  setup(settings) {
    if (typeof settings !== 'object') {
      throw new Error('setup(settings), settings need to be a object!')
    }
    let timeout = settings.timeout
    if (typeof timeout !== 'number') {
      timeout = parseInt(timeout, 10)
    }
    if (isNaN(timeout) || typeof timeout !== 'number') {
      throw new Error('setup(settings), settings.timeout need to be a number!')
    }
    if (this._timeoutId) clearTimeout(this._timeoutId)
    this._settings = { timeout }
    this._running = false
    this.total = this._settings.timeout
    this._tick()
  }

  set total(time) {
    this._timeout = time
    this._left = time
  }

  get total() {
    return this._left
  }

  start() {
    if (!this._running) {
      this._running = true
      this._startTime = now()
      this._update()
    }
  }

  pause() {
    if (this._running) {
      if (this._timeoutId) clearTimeout(this._timeoutId)
      this._running = false
      this.total = this.total - (now() - this._startTime)
      this._tick()
    }
  }

  stop() {
    if (this._timeoutId) clearTimeout(this._timeoutId)
    this._running = false
    this.total = 0
    this._tick()
  }

  reset() {
    if (this._timeoutId) clearTimeout(this._timeoutId)
    this._running = false
    this.total = this._settings.timeout
    this._tick()
  }

  watch(fn) {
    if (typeof fn === 'function') {
      this._watchQueue.push(fn)
    }
  }

  _tick() {
    this._watchQueue.forEach(fn =>
      fn({
        timeout: this._timeout,
        running: this._running,
        onStart: this._running && (this._timeout === this._settings.timeout),
      })
    )
  }

  _update() {
    this._tick()
    if (this._timeout > 0) {
      const timeGap = this._timeout % 1000 || 1000
      this._timeout -= timeGap
      this._running = (this._timeout <= 0) ? false : this._running
      this._timeoutId = setTimeout(() => {
        this._update()
      }, timeGap)
    }
  }
}

module.exports = Timer
