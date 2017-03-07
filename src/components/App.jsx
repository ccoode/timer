import React, { Component, PropTypes } from 'react'
import Timer from 'Utils/Timer'
import Gap from 'Components/Gap'
import Footer from 'Components/Footer'
import Header from 'Components/Header'
import Team from 'Components/Team'

class App extends Component {
  static sound = Object.assign({}, ...['start', 'stop', 'alert']
    .map(key => ({ [key]: new Audio(`assets/audio/${key}.wav`) })))
  static methods = ['start', 'stop', 'pause', 'reset']
  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    footer: PropTypes.string.isRequired,
    zf: PropTypes.shape({
      name: PropTypes.string.isRequired,
      thought: PropTypes.string.isRequired
    }).isRequired,
    ff: PropTypes.shape({
      name: PropTypes.string.isRequired,
      thought: PropTypes.string.isRequired
    }).isRequired,
    steps: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      zf: PropTypes.number.isRequired,
      ff: PropTypes.number.isRequired,
    })).isRequired
  }

  constructor(props) {
    super(props)
    const { zf, ff, name } = this.props.steps[0]
    this.state = {
      stepName: name,
      index: 0,
      zf: {
        timeout: (zf * 1000),
        running: false,
      },
      ff: {
        timeout: (ff * 1000),
        running: false,
      },
    }
    this.createTimers()
  }

  getHandler(w) {
    return ((methodName) => {
      if (App.methods.indexOf(methodName) !== -1) {
        this[methodName](w)
      }
    })
  }

  changeStep(index) {
    if (index === this.state.index) return
    const { zf, ff, name } = this.props.steps[index]
    this.zf.timer.setup({ timeout: zf * 1000 })
    this.ff.timer.setup({ timeout: ff * 1000 })
    this.setState({ index, stepName: name })
  }

  next() {
    const { index } = this.state
    this.changeStep((index + 1) % this.props.steps.length)
  }

  turn() {
    const { zf, ff } = this.state
    if (zf.running && !ff.running && !this.ff.end) {
      this.pause('zf')
      this.start('ff')
    } else if (!zf.running && ff.running && !this.zf.end) {
      this.pause('ff')
      this.start('zf')
    }
  }

  createTimers() {
    const hook = w => (state) => {
      switch (true) {
        case state.timeout === 0:
          App.sound.stop.play()
          break
        case state.timeout <= 30000 && state.timeout > 29000:
        case state.timeout > 0 && state.timeout <= 5000:
          App.sound.alert.play()
          break
        case state.onStart === true:
          App.sound.start.play()
          break
        default:
          break
      }

      this.setState({
        [w]: {
          timeout: state.timeout,
          running: state.running,
        },
      })
    }

    const self = this
    const createTimer = w => ({
      get end() {
        return self.state[w].timeout === 0
      },
      get hide() {
        return self.state[w].timeout < 0
      },
      timer: new Timer({ timeout: self.props.steps[0][w] * 1000, hook: hook(w) }),
    })

    this.zf = createTimer('zf')
    this.ff = createTimer('ff')
  }

  renderTeam({ w, hideAll }) {
    const { end, hide } = this[w]
    const { timeout, running } = this.state[w]
    const { name, thought } = this.props[w] // eslint-disable-line react/prop-types
    return (
      <Team
        name={name}
        thought={thought}
        hide={hide}
        end={end}
        timeout={timeout}
        running={running}
        hideAll={hideAll}
        controlFn={this.getHandler(w)}
        right={w === 'ff'}
      />
    )
  }

  render() {
    const { zf, ff, stepName } = this.state
    const hide = this.zf.hide || this.ff.hide
    const zfRffP = (zf.running && !ff.running && !this.ff.end)
    const ffRzfP = (!zf.running && ff.running && !this.zf.end)
    const hideTurnBtn = hide || !(zfRffP || ffRzfP)
    return (
      <div id="root">
        <Header title={this.props.title} subtitle={this.props.subtitle}>
          {
            this.props.steps.map(
              (step, index) => (
                <a
                  href={`#${step.name}`}
                  onClick={() => { this.changeStep(index) }}
                  key={`${step.name}`}
                  className="item"
                >
                  {step.name}
                </a>
              )
            )
          }
        </Header>
        <main>
          <div className="timer">
            {/* 正方 */}
            {this.renderTeam({
              w: 'zf',
              hideAll: hide,
            })}

            {/* 间隔 */}
            <Gap onClick={() => this.turn()} hideTurnBtn={hideTurnBtn} hide={hide} />

            {/* 反方 */}
            {this.renderTeam({
              w: 'ff',
              hideAll: hide,
            })}
          </div>

          {/* 下一个环节按钮 */}
          <div className="next">
            <a href={`#${stepName}`} onClick={() => { this.next() }} className="btn">{stepName}</a>
          </div>
        </main>
        <Footer info={this.props.footer} />
      </div>
    )
  }
}

// Mixin App
Object.assign(App.prototype, ...App.methods.map(key => ({
  [key](w) {
    this[w].timer[key]()
  },
})))

export default App
