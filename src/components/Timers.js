import { Component } from 'preact'
import Timer from '../utils/Timer'
import shallowEqual from '../utils/shallowEqual'

/*
Usage:
  <Timers
    keys={['zf', 'ff']}
    timeouts={{ zf: 10000, ff: 130000 }}
    render={({ getControlFns, timers: { zf, ff } }) =>
      <JSX />
    }
  />
*/
class Timers extends Component {
  constructor(props, context) {
    super(props, context)
    const { keys, timeouts, render } = this.props

    if (typeof render !== 'function') throw Error('prop render should be a function')
    if (keys.length < 1) throw Error('prop key should has at least element')

    /**
     * @type {{ [x: string]: number }}
     */
    this.timeouts = this.map(timeouts, sec => sec * 1e3)

    /** @type {function[]} */
    this.unMountings = []

    this.state = {
      timers: null,
    }

    /**
     * @type {{ [x: string]: Timer }}
     */
    this.timers = this.mapKey((key) => {
      const timer = new Timer({ timeout: this.timeouts[key] })
      this.unMountings.push(
        timer.watch((state) => {
          this.setState({
            timers: {
              ...this.state.timers,
              [key]: state,
            },
          })
        })
      )
      return timer
    })
  }

  map(data, fn) {
    return this.props.keys.reduce((ret, key) => {
      ret[key] = fn(data[key], key) // eslint-disable-line
      return ret
    }, {})
  }

  mapKey(fn) {
    return this.props.keys.reduce((ret, key) => {
      ret[key] = fn(key) // eslint-disable-line
      return ret
    }, {})
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
    const { start, reset, stop, pause } = this.timers[key]
    return {
      start,
      reset,
      stop,
      pause,
    }
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
