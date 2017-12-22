import { Component } from 'preact'

class Scheduler extends Component {
  constructor(props, context) {
    super(props, context)
    const { render } = props
    if (typeof render !== 'function') {
      throw Error('<Scheduler>: prop render should be a function')
    }
  }

  render() {
    const { custom, timers } = this.context
    return this.props.render({
      timers,
      custom,
    })
  }
}

export default Scheduler
