/* eslint-disable no-underscore-dangle */
const now = require('performance-now')

class Timer {
  constructor(settings) {
    this._watchQueue = []
    this._update = this._update.bind(this)
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
    this._settings = { timeout }
    this.reset()
  }

  set _total(time) {
    this._timeout = time
    this._left = time
  }

  get _total() {
    return this._left
  }

  _setState(total = 0) {
    if (this._timeoutId) clearTimeout(this._timeoutId)
    this._timeoutId = null
    this._running = false
    this._total = total
    this._tick()
  }

  _tick() {
    const state = {
      timeout: this._timeout,
      running: this._running,
      onStart: this._running && this._timeout === this._settings.timeout,
    }
    this._watchQueue.forEach(fn => fn(state))
  }

  _update() {
    this._tick()
    if (this._timeout > 0) {
      const timeGap = this._timeout % 1000 || 1000
      this._timeout -= timeGap
      this._running = this._timeout <= 0 ? false : this._running
      this._timeoutId = setTimeout(this._update, timeGap)
    }
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
      const newTotal = this._total - (now() - this._startTime)
      this._setState(newTotal)
    }
  }

  stop() {
    this._setState(0)
  }

  reset() {
    this._setState(this._settings.timeout)
  }

  watch(fn) {
    if (typeof fn === 'function') {
      this._watchQueue.push(fn)
    }
  }
}

module.exports = Timer
