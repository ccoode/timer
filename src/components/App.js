import { h, Component } from 'preact'
import TimerProvider from './TimerProvider'
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

function mapTimersToContext(timers) {
  const { zf, ff } = timers
  const someDisabled = zf.disabled || ff.disabled

  return {
    someDisabled,
    canTurn: !someDisabled && isTurnable(zf, ff),
  }
}

const { Timer, Scheduler } = TimerProvider

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

  renderTimer = ({ getControlFns, timer, name, custom: { someDisabled } }) => {
    const { timeout, running, beginning, end, disabled } = timer
    const { name: teamName, thought } = this.props[name]

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
        name={teamName}
        thought={thought}
        hide={disabled}
        end={end}
        timeout={timeout}
        running={running}
        hideAll={someDisabled}
        controlFns={getControlFns()}
        right={name === 'ff'}
      />
    )
  }

  getTimers = ({ zf, ff }) => {
    this.turn = () => {
      if (zf.running && !ff.running && !ff.end) {
        zf.pause()
        ff.start()
      } else if (!zf.running && ff.running && !zf.end) {
        ff.pause()
        zf.start()
      }
    }
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
          <TimerProvider
            names={magicKeys}
            timeouts={steps[index]}
            getCustomContext={mapTimersToContext}
            refTimers={this.getTimers}
          >
            <div className="timer">
              <Timer name="zf" render={this.renderTimer} />
              <Scheduler
                render={({ custom: { someDisabled, canTurn } }) => (
                  <Gap turn={this.turn} hideTurnBtn={!canTurn} hide={someDisabled} />
                )}
              />
              <Timer name="ff" render={this.renderTimer} />
            </div>
          </TimerProvider>
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
