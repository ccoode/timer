import { h, Component } from 'preact'
import Timers from './Timers'
import Team from './Team'
import Gap from './Gap'
import Footer from './Footer'
import Header from './Header'
import Button from './Button'
import alert from '../audio/alert.wav'
import start from '../audio/start.wav'
import stop from '../audio/stop.wav'

const magicKeys = ['zf', 'ff']

const sounds = {
  alert: new Audio(alert),
  start: new Audio(start),
  stop: new Audio(stop),
}

function isTurnable(zf, ff) {
  const zfRffP = zf.running && !ff.running && !ff.end
  const ffRzfP = !zf.running && ff.running && !zf.end
  return zfRffP || ffRzfP
}

function getUrlFromStepName(name) {
  return `#/${name}`
}

class App extends Component {
  constructor(props) {
    super(props)

    const { defaultIndex, steps } = props

    this.state = {
      stepName: steps[defaultIndex].name,
      index: props.defaultIndex,
    }
  }

  static defaultProps = {
    defaultIndex: 0,
  }

  renderTeam({ key, timer, controlFns, someDisabled }) {
    const { timeout, running, beginning, end, disabled } = timer
    const { name, thought } = this.props[key]

    switch (true) {
      case timeout === 0:
        sounds.stop.play()
        break
      case timeout <= 30e3 && timeout > 29e3:
      case timeout > 0 && timeout <= 5e3:
        sounds.alert.play()
        break
      case beginning:
        sounds.start.play()
        break
      default:
        break
    }

    return (
      <Team
        name={name}
        thought={thought}
        hide={disabled}
        end={end}
        timeout={timeout}
        running={running}
        hideAll={someDisabled}
        controlFns={controlFns}
        right={key === 'ff'}
      />
    )
  }

  renderTimers = ({ getControlFns, timers: { zf, ff } }) => {
    const someDisabled = zf.disabled || ff.disabled
    const canTurn = !someDisabled && isTurnable(zf, ff)
    if (!this.turn) {
      this.turn = () => {
        if (zf.running && !ff.running && !ff.end) {
          zf.pause()
          ff.start()
        } else if (!zf.running && ff.running && !zf.end) {
          ff.pause()
          zf.start()
        }
      }
    }
    if (!this.handleKeyDown) {
      this.handleKeyDown = ({ key }) => {
        const c = key.toLowerCase()
        if (c === 'a') {
          zf.toggle()
        } else if (c === 'l') {
          ff.toggle()
        } else if (c === 'q') {
          zf.toggleReset()
        } else if (c === 'p') {
          ff.toggleReset()
        } else if (c === 'g') {
          this.turn()
        } else if (c === 'n') {
          this.next()
        }
      }
      window.addEventListener('keydown', this.handleKeyDown)
    }

    return (
      <div className="timer">
        {this.renderTeam({
          someDisabled,
          key: 'zf',
          timer: zf,
          controlFns: getControlFns('zf'),
        })}
        <Gap turn={this.turn} hideTurnBtn={!canTurn} hide={someDisabled} />
        {this.renderTeam({
          someDisabled,
          key: 'ff',
          timer: ff,
          controlFns: getControlFns('ff'),
        })}
      </div>
    )
  }

  changeStep(index) {
    if (index === this.state.index) return
    const { name } = this.props.steps[index]
    this.setState({ index, stepName: name }, () => {
      window.location.hash = `/${name}`
    })
  }

  handleMenuItemClick = (e) => {
    this.changeStep(e.target.dataset.index)
  }

  next = () => {
    const { index } = this.state
    this.changeStep((index + 1) % this.props.steps.length)
  }

  renderMenuItem = ({ name }, index) => (
    <Button
      data-index={index}
      href={getUrlFromStepName(name)}
      onClick={this.handleMenuItemClick}
      key={name}
      className="menu-item"
    >
      {name}
    </Button>
  )

  componentWillUnmount() {
    if (this.handleKeyDown) {
      window.removeEventListener('keydown', this.handleKeyDown)
    }
  }

  // eslint-disable-next-line
  render({ steps, title, subtitle, footer }, { stepName, index }) {
    return (
      <div>
        <Header
          title={title}
          subtitle={subtitle}
          menuItems={steps.map(this.renderMenuItem)}
        />
        <main>
          <Timers keys={magicKeys} timeouts={steps[index]} render={this.renderTimers} />
          {/* 下一个环节按钮 */}
          <div className="next">
            <Button
              href={getUrlFromStepName(stepName)}
              onClick={this.next}
              className="btn"
            >
              {stepName}
            </Button>
          </div>
        </main>
        <Footer info={footer} />
      </div>
    )
  }
}

export default App
