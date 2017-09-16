import { h, Component } from 'preact'

import Timer from '../utils/Timer'
import Footer from './Footer'
import Header from './Header'
import Team from './Team'
import Gap from './Gap'
import alert from '../audio/alert.wav'
import start from '../audio/start.wav'
import stop from '../audio/stop.wav'

class App extends Component {
  constructor(props) {
    super(props)
    const { zf, ff, name } = props.steps[props.activeIndex]
    this.state = {
      stepName: name,
      index: props.activeIndex,
      zf: {
        timeout: zf * 1000,
        running: false,
      },
      ff: {
        timeout: ff * 1000,
        running: false,
      },
    }
    this.createTimers()
  }

  static sound = {
    alert: new Audio(alert),
    start: new Audio(start),
    stop: new Audio(stop),
  }

  static methods = ['start', 'stop', 'pause', 'reset']
  static defaultProps = {
    activeIndex: 0,
  }

  getHandler(w) {
    return (methodName) => {
      if (App.methods.indexOf(methodName) !== -1) {
        this[methodName](w)
      }
    }
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
    const { activeIndex, steps } = this.props

    const getHook = w => (state) => {
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

    const createTimer = ({ w, timeout, hook, state }) => ({
      get end() {
        return state[w].timeout === 0
      },
      get hide() {
        return state[w].timeout < 0
      },
      timer: new Timer({ timeout, hook }),
    })

    const wrapper = w => ({
      w,
      timeout: steps[activeIndex][w] * 1000,
      hook: getHook(w),
      state: this.state,
    })

    this.zf = createTimer(wrapper('zf'))
    this.ff = createTimer(wrapper('ff'))
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
    const zfRffP = zf.running && !ff.running && !this.ff.end
    const ffRzfP = !zf.running && ff.running && !this.zf.end
    const hideTurnBtn = hide || !(zfRffP || ffRzfP)
    return (
      <div>
        <Header title={this.props.title} subtitle={this.props.subtitle}>
          {this.props.steps.map((step, index) => (
            <a
              href={`#/${step.name}`}
              onClick={() => {
                this.changeStep(index)
              }}
              key={`${step.name}`}
              className="item"
            >
              {step.name}
            </a>
          ))}
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
            <a
              href={`#/${stepName}`}
              onClick={() => {
                this.next()
              }}
              className="btn"
            >
              {stepName}
            </a>
          </div>
        </main>
        <Footer info={this.props.footer} />
      </div>
    )
  }
}

// Mixin App
Object.assign(
  App.prototype,
  ...App.methods.map(key => ({
    [key](w) {
      this[w].timer[key]()
    },
  }))
)

export default App
