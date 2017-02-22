/** @jsx h */
import { h, render, Component } from 'preact'
import Timer from './index.js'
import './main.css'
import '../dist/config'
if (module.hot) {
    require('preact/devtools')
}

function Meta({isZ, teamName, forceHide, thought}) {
    const team = isZ
        ? (
            <section className="teamName">
                <span className="meta">正方</span>
                <span>
                    {teamName}
                </span>
            </section>
        )
        : (
            <section className="teamName right">
                <span>
                    {teamName}
                </span>
                <span className="meta">反方</span>
            </section>
        )

    return (
        <article className={"teamMeta" + (forceHide ? " force-hide" : "")}>
            {team}
            <section className="thought">{thought}</section>
        </article>
    )
}

/**
 * timeout(ms) => MM:ss 
 */
function Clock({timeout}) {
    return (
        <section className="clock">
            {convertMS(timeout)}
        </section>
    )
}

function Middle(props) {
    return (
        <div className={"middle" + (props.forceHide ? " force-hide" : "")}>
            <span
                className={"fa-stack fa-2x" + (props.show
                    ? ""
                    : " hide")}
                onClick={() => {
                    props.turn()
                }}>
                <i className="fa fa-circle fa-stack-2x"></i>
                <i className="fa fa-arrows-h fa-stack-1x"></i>
            </span>
        </div>
    )
}

function Control(props) {
    return (
        <section className="control">
            <span
                className={"fa-stack fa-2x" + (props.running || props.end
                    ? " hide"
                    : "")}
                onClick=
                {() => { props.onClick('start') }}>
                <i className="fa fa-circle fa-stack-2x"></i>
                <i className="fa fa-play fa-stack-1x"></i>
            </span>
            <span
                className={"fa-stack fa-2x" + (!props.running || props.end
                    ? " hide"
                    : "")}
                onClick=
                {() => { props.onClick('pause') }}>
                <i className="fa fa-circle fa-stack-2x"></i>
                <i className="fa fa-pause fa-stack-1x"></i>
            </span>
            <span
                className={"fa-stack fa-2x" + (props.end
                    ? " hide"
                    : "")}
                onClick=
                {() => { props.onClick('stop') }}>
                <i className="fa fa-circle fa-stack-2x"></i>
                <i className="fa fa-stop fa-stack-1x"></i>
            </span>
            <span
                className={"fa-stack fa-2x" + (props.end
                    ? ""
                    : " hide")}
                onClick=
                {() => { props.onClick('reset') }}>
                <i className="fa fa-circle fa-stack-2x"></i>
                <i className="fa fa-repeat fa-stack-1x"></i>
            </span>
        </section>
    )
}

function Header({list, title, subtitle}) {
    return (
        <header className="site-header">
            <span className="site-title">{title + " - " + subtitle}</span>
            <a id="fullscreen" href="#" className="nav-item" onClick={() => toggleFullscreen()}>
                <i className="fa fa-arrows-alt" aria-hidden="true"></i>
            </a>
            <div className="menu-container">
                <a className="nav-item menu-btn">环节</a>
                <div className="menu">{list}</div>
            </div>
        </header>
    )
}

function Footer({info}) {
    return (
        <footer className="site-footer">
            <p>{info}</p>
            <p><a href="https://github.com/ccoode/timer">源代码</a></p>
        </footer>
    )
}

class App extends Component {
    static sound = ["start", "stop", "alert"].reduce((obj, key) => {
        obj[key] = new Audio(`assets/audio/${key}.wav`)
        return obj
    }, {})
    static methods = ['start', 'stop', 'pause', 'reset']
    config = this.props.config
    list = this.config.steps.map((step, key) =>
        <a onClick={() => { this.changeStep(key) }} key={key}>{step.name}</a>
    )
    constructor(props) {
        super(props)
        const {zf, ff, name} = this.config.steps[0]
        this.state = {
            stepName: name,
            index: 0,
            zf: {
                timeout: (zf * 1000),
                running: false
            },
            ff: {
                timeout: (ff * 1000),
                running: false
            }
        }
        this.createTimers()
    }

    createTimers() {
        const self = this
        const hook = w => state => {
            switch (true) {
                case 0 === state.timeout:
                    App.sound.stop.play()
                    break
                case state.timeout <= 30000 && state.timeout > 29000:
                case state.timeout > 0 && state.timeout <= 5000:
                    App.sound.alter.play()
                    break
                case state.onStart === true:
                    App.sound.start.play()
                    break
            }

            this.setState({
                [w]: {
                    timeout: state.timeout,
                    running: state.running
                }
            })
        }
        const createTimer = w => ({
            get end() {
                return self.state[w].timeout === 0
            },
            get forceHide() {
                return self.state[w].timeout < 0
            },
            timer: new Timer({ timeout: this.config.steps[0][w] * 1000, hook: hook(w) })
        })
        this.zf = createTimer('zf')
        this.ff = createTimer('ff')
    }

    changeStep(index) {
        if (index == this.state.index) return
        let {zf, ff, name} = this.config.steps[index]
        this.zf.timer.setup({ timeout: zf * 1000 })
        this.ff.timer.setup({ timeout: ff * 1000 })
        this.setState({ index, stepName: name })
    }

    next() {
        const {index} = this.state
        this.changeStep((index + 1) % this.config.steps.length)
    }

    turn() {
        const {zf, ff} = this.state
        if (zf.running && !ff.running && !this.ff.end) {
            this.pause('zf')
            this.start('ff')
        } else if (!zf.running && ff.running && !this.zf.end) {
            this.pause('ff')
            this.start('zf')
        }
    }

    getHandler(w) {
        return (methodName => {
            if (App.methods.indexOf(methodName) !== -1) {
                this[methodName](w)
            }
        })
    }

    render() {
        const {zf, ff, stepName} = this.state,
            forceHide = this.zf.forceHide || this.ff.forceHide,
            showTurn = (!forceHide &&
                zf.running && !ff.running && !this.ff.end ||
                !zf.running && ff.running && !this.zf.end)
        return (
            <div id="root">
                <Header list={this.list} title={this.config.title} subtitle={this.config.subtitle} />
                <main>
                    <div className="timer">
                        {/*正方*/}
                        <div className={"contain" + (this.zf.forceHide ? " force-hide" : "")}>
                            <Meta isZ teamName={this.config.zf.name} thought={this.config.zf.thought} forceHide={forceHide} />
                            <Clock timeout={zf.timeout} />
                            <Control
                                onClick={this.getHandler('zf')}
                                running={zf.running}
                                end={this.zf.end}
                            />
                        </div>

                        {/*轮流切换*/}
                        <Middle turn={() => this.turn()} show={showTurn} forceHide={forceHide} />

                        {/*反方*/}
                        <div className={"contain right" + (this.ff.forceHide ? " force-hide" : "")}>
                            <Meta teamName={this.config.ff.name} isZ={false} thought={this.config.ff.thought} forceHide={forceHide} />
                            <Clock timeout={ff.timeout} />
                            <Control
                                onClick={this.getHandler('ff')}
                                running={ff.running}
                                end={this.ff.end}
                            />
                        </div>
                    </div>

                    {/*下一个环节按钮*/}
                    <div id="wrapper">
                        <a id="next" onClick={() => { this.next() }} className="btn">{stepName}</a>
                    </div>
                </main>
                <Footer info={this.config.footer} />
            </div>
        )
    }
}

// Mixin App
Object.assign(App.prototype, App.methods.reduce(function (obj, key) {
    obj[key] = function (w) {
        this[w].timer[key]()
    }
    return obj
}, {}))

// eslint-disable-next-line no-undef
render(<App config={config} />, document.querySelector('#react'))

function convertMS(ms) {
    if (ms >= 0) {
        var s = ms / 1000,
            sec = Math.ceil(s % 60),
            min = Math.floor(s / 60)
        if (sec === 60) {
            min += 1
            sec = 0
        }
        return pad(min) + ":" + pad(sec)
    }
}

function pad(number) {
    if (number < 10) {
        return '0' + number
    }
    return number
}

function launchFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen()
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen()
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen()
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen()
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
    }
}

function toggleFullscreen() {
    var fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled
    var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement
    if (fullscreenEnabled && !fullscreenElement) {
        launchFullscreen(document.documentElement)
    } else if (fullscreenElement) {
        exitFullscreen()
    }
}