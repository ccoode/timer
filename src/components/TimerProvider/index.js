import { Component } from 'preact'
import TimerLogic from '../../utils/Timer'
import shallowEqual from '../../utils/shallowEqual'
import unlisten from '../../utils/unlisten'
import Timer from './Timer'
import Scheduler from './Scheduler'

if (module.hot) {
  global.timers = global.timers || {}
}

const contextKey = '$$timer'

class TimerProvider extends Component {
  static Timer = Timer
  static Scheduler = Scheduler
  static contextKey = contextKey

  constructor(props, context) {
    super(props, context)
    const { names, children } = props

    if (!names || names.length < 1) throw Error('prop names should has at least element')
    if (children && children.length && children.length > 1) {
      throw Error('should have only one children')
    }

    /** @type {function[]} */
    this.unwatches = []
    this.subscribes = []

    const timersInit = global.timers || {}

    /** @type {{ [x: string]: TimerLogic }} */
    this.timers = this.mapName((oldTimer, name) => {
      const timeout = convertSecond(props.timeouts[name])
      const timer = TimerLogic.isTimer(oldTimer) ? oldTimer : new TimerLogic({ timeout })
      if (oldTimer === timer) {
        if (timer.totalTime !== timeout) {
          timer.setup({ timeout })
        }
      }
      return timer
    }, timersInit)

    if (props.refTimers) {
      props.refTimers(this.timers)
    }
  }

  mapName(fn, init) {
    return this.props.names.reduce((ret, key) => {
      ret[key] = fn(ret[key], key) // eslint-disable-line
      return ret
    }, init || {})
  }

  forEachName(fn) {
    this.props.names.forEach(fn)
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(nextProps.timeouts, this.props.timeouts)) {
      this.forEachName((name) => {
        const timeout = convertSecond(nextProps.timeouts[name])
        const timer = this.timers[name]
        timer.setup({ timeout })
      })
    }
  }

  componentWillMount() {
    const update = () => {
      this.subscribes.forEach(fn => fn())
    }
    this.forEachName((name) => {
      this.unwatches.push(this.timers[name].watch(update))
    })
  }

  componentWillUnmount() {
    this.unwatches.forEach(fn => fn())
  }

  getChildContext() {
    const { timers, subscribe } = this
    const { names, getCustomProps } = this.props
    return {
      [contextKey]: {
        timers,
        names,
        subscribe,
        getCustomProps,
      },
    }
  }

  subscribe = (fn) => {
    if (typeof fn !== 'function') throw Error('should pass a function')
    this.subscribes.push(fn)
    return unlisten(this.subscribes, fn)
  }

  render() {
    const { children } = this.props
    return (children && children[0]) || null
  }
}

/**
 * @param {number|string} second
 * @returns {number} millisecond
 */
function convertSecond(second) {
  const millisecond = Math.floor(second) * 1e3
  if (Number.isNaN(millisecond)) {
    throw Error('<TimerProvider timeouts={{ [name]: number }} >')
  }
  return millisecond
}

export { TimerProvider as default, convertSecond, contextKey, Scheduler, Timer }
