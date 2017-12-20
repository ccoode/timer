import { Component } from 'preact'
import Timer from '../utils/Timer'
import shallowEqual from '../utils/shallowEqual'

/*
Usage:
  <Timers
    keys={['zf', 'ff']} // magic keys here
    timeouts={{ zf: 10, ff: 13 }} // unit: second
    render={({ getControlFns, timers: { zf, ff } }) =>
      <JSX />
    }
  />
*/
if (module.hot) {
  global.timers = global.timers || {}
}

class Timers extends Component {
  constructor(props, context) {
    super(props, context)
    const { keys, timeouts, render } = this.props

    if (typeof render !== 'function') throw Error('prop render should be a function')
    if (!keys || keys.length < 1) throw Error('prop key should has at least element')

    /**
     * @type {{ [x: string]: number }} millisecond
     */
    this.timeouts = this.map(timeouts, sec => sec * 1e3)

    /** @type {function[]} */
    this.unMountings = []

    /**
     * @type {{ [x: string]: { [y: string]: function } }}
     */
    this.fnsCache = {}

    const update = () => {
      this.forceUpdate()
    }

    /**
     * @type {{ [x: string]: Timer }}
     */
    this.timers = this.mapKey((oldTimer, key) => {
      const timeout = this.timeouts[key]
      const timer = Timer.isTimer(oldTimer) ? oldTimer : new Timer({ timeout })
      if (oldTimer === timer) {
        if (oldTimer.totalTime !== timeout) {
          oldTimer.setup({ timeout })
        }
      }
      this.unMountings.push(timer.watch(update))
      return timer
    }, global.timers || {})
  }

  map(data, fn) {
    return this.props.keys.reduce((ret, key) => {
      ret[key] = fn(data[key], key) // eslint-disable-line
      return ret
    }, {})
  }

  mapKey(fn, init) {
    return this.props.keys.reduce((ret, key) => {
      ret[key] = fn(ret[key], key) // eslint-disable-line
      return ret
    }, init || {})
  }

  forEachKey(fn) {
    this.props.keys.forEach(fn)
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.timeouts, this.props.timeouts)) {
      this.timeouts = this.map(nextProps.timeouts, sec => sec * 1e3)
      this.forEachKey((key) => {
        this.timers[key].setup({ timeout: this.timeouts[key] })
      })
    }
  }

  componentWillUnmount() {
    this.unMountings.forEach(fn => fn())
  }

  getControlFns = (key) => {
    const { timers } = this
    this.fnsCache[key] =
      this.fnsCache[key] ||
      (function tryGetControlFns() {
        if (!timers[key]) throw Error(`key ${key} not exists`)
        const { start, reset, stop, pause } = timers[key]
        return { start, reset, stop, pause }
      }())
    return this.fnsCache[key]
  }

  getRenderProps() {
    const { getControlFns, timers } = this
    return {
      timers,
      getControlFns,
    }
  }

  render() {
    return this.props.render(this.getRenderProps())
  }
}

export default Timers
