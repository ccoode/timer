/* eslint-disable no-underscore-dangle */
import now from 'performance-now'
import unlisten from './unlisten'

class Timer {
  /**
   * @param {{ timeout: number }} settings
   */
  constructor(settings) {
    this.watches = []
    this.timeout = NaN
    this.running = false
    this.end = false
    this.beginning = false
    this.disabled = false
    this.setup(settings)
  }

  static isTimer(instance) {
    return instance && instance.constructor === this
  }

  setup(settings) {
    if (!settings || typeof settings !== 'object') {
      throw new Error('setup(settings), settings need to be a object!')
    }
    const timeout = Math.floor(settings.timeout)
    if (Number.isNaN(timeout)) {
      throw new Error('setup(settings), settings.timeout need to be a number!')
    }
    this.totalTime = timeout
    this.reset()
  }

  setTotal(total = 0) {
    if (this._timeoutId) clearTimeout(this._timeoutId)
    this._timeoutId = null
    this._running = false
    this._timeout = total
    this._left = total
    this.updateState()
  }

  updateState() {
    const state = {
      timeout: this._timeout,
      running: this._running,
      beginning: this._running && this._timeout === this.totalTime,
      end: this._timeout <= 0,
      disabled: this.totalTime < 0,
    }
    Object.assign(this, state)
    this.watches.forEach(fn => fn(state))
  }

  tick = () => {
    this.updateState()
    if (this._timeout > 0) {
      const timeGap = this._timeout % 1000 || 1000
      this._timeout -= timeGap
      this._running = this._timeout <= 0 ? false : this._running
      this._timeoutId = setTimeout(this.tick, timeGap)
    }
  }

  start = () => {
    if (!this._running) {
      this._running = true
      this._startTime = now()
      this.tick()
    }
  }

  toggle = () => {
    if (this._running) {
      this.pause()
    } else if (this._timeout > 0) {
      this.start()
    }
  }

  toggleReset = () => {
    if (!this._running && this._timeout <= 0) {
      this.reset()
    } else {
      this.stop()
    }
  }

  pause = () => {
    if (this._running) {
      this.setTotal(this._left - (now() - this._startTime))
    }
  }

  stop = () => {
    this.setTotal(0)
  }

  reset = () => {
    this.setTotal(this.totalTime)
  }

  watch(fn) {
    if (typeof fn !== 'function') {
      throw Error('fn should be a function')
    }
    this.watches.push(fn)
    return unlisten(this.watches, fn)
  }
}

export default Timer
