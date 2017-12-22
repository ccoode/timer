import { Component } from 'preact'
import { contextKey } from './index'

class Scheduler extends Component {
  constructor(props, context) {
    super(props, context)
    const { render } = props
    if (typeof render !== 'function') {
      throw Error('<Scheduler>: prop render should be a function')
    }
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

  render() {
    const { timers } = this.context[contextKey]
    return this.props.render({
      ...this.computeCustomProps(),
      timers,
    })
  }
}

export default Scheduler
