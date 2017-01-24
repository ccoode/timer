class Timer {
    constructor(settings) {
        this._watchQueue = []
        if (settings) {
            this.setup(settings)
            if (settings.hook) {
                this
                    ._watchQueue
                    .push(settings.hook)
            }
        }
    }

    setup(settings) {
        this._settings = settings
        this._running = false
        this._timeout = this._left = this._settings.timeout
        this._sync()
    }

    start() {
        this._running = true
        this._startTime = Date.now()
        this._update()
    }

    pause() {
        this._running = false
        this._timeout = this._left = this._left - (Date.now() - this._startTime)
        this._sync()
    }

    stop() {
        this._running = false
        this._timeout = 0
        this._sync()
    }

    reset() {
        this._running = false
        this._timeout = this._left = this._settings.timeout
        this._sync()
    }

    watch(fn) {
        this
            ._watchQueue
            .push(fn)
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
        if (this._running) {
            this._sync()
            if (this._timeout <= 0)
                this._running = false

            if (this._timeout > 0) {
                const timeGap = this._timeout % 1000 || 1000
                this._timeout -= timeGap
                setTimeout(() => {
                    this._update()
                }, timeGap)
            }
        }
    }
}

module.exports = Timer