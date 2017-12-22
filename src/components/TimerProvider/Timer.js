import { Component } from 'preact'
import { contextKey } from './index'

class Timer extends Component {
  constructor(props, context) {
    super(props, context)
    const { name, render } = props
    if (typeof render !== 'function') {
      throw Error('<Timer>: prop render should be a function')
    }
    if (!name) throw Error('<Timer>:prop name should be provided')
    const { names, timers } = context[contextKey]
    if (names.indexOf(name) < 0) {
      throw Error('<Timer>: name not providered in provider')
    }
    this.timer = timers[name]
  }

  getControlFns = () => {
    const { timer } = this
    this.fnsCache =
      this.fnsCache ||
      (function tryGetControlFns() {
        const { start, reset, stop, pause } = timer
        return { start, reset, stop, pause }
      }())
    return this.fnsCache
  }

  componentWillMount() {
    this.unsubscribe = this.context[contextKey].subscribe(() => {
      this.forceUpdate()
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  computeCustomProps() {
    const { getCustomProps, names, timers } = this.context[contextKey]
    return getCustomProps(timers, names)
  }

  getRenderProps() {
    const { getControlFns, timer } = this
    const { name } = this.props
    return {
      ...this.computeCustomProps(),
      timer,
      getControlFns,
      name,
    }
  }

  render() {
    return this.props.render(this.getRenderProps())
  }
}

export default Timer
