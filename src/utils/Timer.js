const now = require('performance-now')

class Timer {
    constructor(settings) {
        this._watchQueue = []
        if (settings) {
            this.setup(settings)
            if (settings.hook) {
                this._watchQueue.push(settings.hook)
            }
        }
    }

    setup(settings) {
        if (typeof settings !== 'object' || settings !== null) {
            if (typeof settings.timeout !== 'number') {
                settings.timeout = parseInt(settings.timeout, 10)
            }
            if (isNaN(settings.timeout)) {
                throw new Error('setup(settings), settings.timeout need to be a number!')
            }
            if (typeof settings.timeout !== 'number') {
                throw new Error('setup(settings), settings.timeout need to be a number!')
            }
            if (this._timeoutId) clearTimeout(this._timeoutId)
            this._settings = settings
            this._running = false
            this._timeout = this._left = this._settings.timeout
            this._sync()
        } else {
            throw new Error('setup(settings), settings need to be a object!')
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
            if (this._timeoutId) clearTimeout(this._timeoutId)
            this._running = false
            this._timeout = this._left = this._left - (now() - this._startTime)
            this._sync()
        }
    }

    stop() {
        if (this._timeoutId) clearTimeout(this._timeoutId)
        this._running = false
        this._timeout = 0
        this._sync()
    }

    reset() {
        if (this._timeoutId) clearTimeout(this._timeoutId)
        this._running = false
        this._timeout = this._left = this._settings.timeout
        this._sync()
    }

    watch(fn) {
        this._watchQueue.push(fn)
    }

    _sync() {
        this
            ._watchQueue
            .forEach((fn) => {
                fn(
                    {
                        timeout: this._timeout,
                        running: this._running,
                        onStart: this._running && (this._timeout === this._settings.timeout)
                    })
            })
    }

    _update() {
        this._sync()
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