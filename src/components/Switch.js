import { Component } from 'react'

class Switch extends Component {
  state = {
    on: Boolean(this.props.defaultOn),
  }

  toggle = on => {
    this.setState({
      on: on === undefined ? !this.state.on : !!on,
    })
  }

  render() {
    const { toggle } = this
    const { render } = this.props
    const { on } = this.state

    return render({
      toggle,
      on,
    })
  }
}

export default Switch
