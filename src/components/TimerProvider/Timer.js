import { Component } from 'preact'

class Timer extends Component {
  constructor(props, context) {
    super(props, context)
    const { name, render } = props
    if (typeof render !== 'function') {
      throw Error('<Timer>: prop render should be a function')
    }
    if (!name) throw Error('<Timer>:prop name should be provided')
    if (context.names.indexOf(name) < 0) {
      throw Error('<Timer>: name not providered in provider')
    }
    this.timer = context.timers[name]
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

  getRenderProps() {
    const { getControlFns, timer } = this
    const { custom } = this.context
    const { name } = this.props
    return {
      timer,
      getControlFns,
      custom,
      name,
    }
  }

  render() {
    return this.props.render(this.getRenderProps())
  }
}

export default Timer
