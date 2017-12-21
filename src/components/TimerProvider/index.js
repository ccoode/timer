import { Component } from 'preact'
import TimerLogic from '../../utils/Timer'
import shallowEqual from '../../utils/shallowEqual'
import Timer from './Timer'
import Scheduler from './Scheduler'

if (module.hot) {
  global.timers = global.timers || {}
}

class TimerProvider extends Component {
  static Timer = Timer
  static Scheduler = Scheduler

  constructor(props, context) {
    super(props, context)
    const { names, children } = props

    if (!names || names.length < 1) throw Error('prop names should has at least element')
    if (children && children.length && children.length > 1) {
      throw Error('should have only one children')
    }

    /** @type {function[]} */
    this.unwatches = []

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
      this.forceUpdate()
    }
    this.forEachName((name) => {
      this.unwatches.push(this.timers[name].watch(update))
    })
  }

  componentWillUnmount() {
    this.unwatches.forEach(fn => fn())
  }

  getChildContext() {
    const { timers } = this
    const { names, getCustomContext } = this.props
    return {
      timers,
      names,
      custom: getCustomContext && getCustomContext(timers, names),
    }
  }

  render() {
    const { children } = this.props
    return (children && children[0]) || null
  }
}

export default TimerProvider

/**
 * @param {number|string} second
 * @returns {number} millisecond
 */
function convertSecond(second) {
  const millisecond = Math.floor(second) * 1e3
  if (isNaN(millisecond)) throw Error('<TimerProvider timeouts={{ [name]: number }} >')
  return millisecond
}
