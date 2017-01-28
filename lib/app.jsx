/** @jsx h */
import { h, render, Component } from 'preact';
import Timer from './index.js'
import '../config'
if (module.hot) {
    require('preact/devtools');
}

function Meta(props) {
    const teamName = props.isZ
        ? (
            <section className="teamName">
                <span className="meta">正方</span>
                <span>
                    {props.teamName}
                </span>
            </section>
        )
        : (
            <section className="teamName right">
                <span>
                    {props.teamName}
                </span>
                <span className="meta">反方</span>
            </section>
        )

    return (
        <article className={"teamMeta" + (props.forceHide ? " force-hide" : "")}>
            {teamName}
            <section className="thought">{props.thought}</section>
        </article>
    )
}

function Clock(props) {
    return (
        <section className="clock">
            {convertMS(props.timeout)}
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
                } }>
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
                {() => { props.onClick('start') } }>
                <i className="fa fa-circle fa-stack-2x"></i>
                <i className="fa fa-play fa-stack-1x"></i>
            </span>
            <span
                className={"fa-stack fa-2x" + (!props.running || props.end
                    ? " hide"
                    : "")}
                onClick=
                {() => { props.onClick('pause') } }>
                <i className="fa fa-circle fa-stack-2x"></i>
                <i className="fa fa-pause fa-stack-1x"></i>
            </span>
            <span
                className={"fa-stack fa-2x" + (props.end
                    ? " hide"
                    : "")}
                onClick=
                {() => { props.onClick('stop') } }>
                <i className="fa fa-circle fa-stack-2x"></i>
                <i className="fa fa-stop fa-stack-1x"></i>
            </span>
            <span
                className={"fa-stack fa-2x" + (props.end
                    ? ""
                    : " hide")}
                onClick=
                {() => { props.onClick('reset') } }>
                <i className="fa fa-circle fa-stack-2x"></i>
                <i className="fa fa-repeat fa-stack-1x"></i>
            </span>
        </section>
    )
}

function Header(props) {
    return (
        <header className="site-header">
            <span className="site-title">{config.title + " - " + config.subtitle}</span>
            <a id="fullscreen" href="#" className="nav-item" onClick={() => toggleFullscreen()}>
                <i className="fa fa-arrows-alt" aria-hidden="true"></i>
            </a>
            <div className="menu-container">
                <a className="nav-item menu-btn">环节</a>
                <div className="menu">{props.list}</div>
            </div>
        </header>
    )
}

function Footer() {
    return (
        <footer className="site-footer">
            <p>{config.footer}</p>
            <p><a href="https://github.com/ccoode/timer">源代码</a></p>
        </footer>
    )
}

class App extends Component {
    constructor() {
        super()
        let {zf, ff, name} = config.steps[0];
        this.startSound = new Audio("assets/audio/begin.wav")
        this.stopSound = new Audio("assets/audio/stop.wav")
        this.alertSound = new Audio("assets/audio/alert.wav")
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
        this.zf = {}
        this.ff = {}
        this.list = config.steps.map((step, key) =>
            <a onClick={() => { this.changeStep(key) } } key={key}>{step.name}</a>
        );
        const hook = (w) => (state) => {
            switch (true) {
                case 0 === state.timeout:
                    this.stopSound.play();
                    break;
                case state.timeout <= 30000 && state.timeout > 29000:
                case state.timeout > 0 && state.timeout <= 5000:
                    this.alertSound.play();
                    break;
                case state.onStart === true:
                    this.startSound.play();
                    break;
            }

            this.setState({
                [w]: {
                    timeout: state.timeout,
                    running: state.running
                }
            })
        }

        this.zf.timer = new Timer({ timeout: zf * 1000, hook: hook('zf') })
        this.ff.timer = new Timer({ timeout: ff * 1000, hook: hook('ff') })
    }

    changeStep(i) {
        if (i == this.state.index) return;
        let {zf, ff, name} = config.steps[i];
        this.zf.timer.setup({ timeout: zf * 1000 })
        this.ff.timer.setup({ timeout: ff * 1000 })
        this.setState({ index: i, stepName: name })
    }

    start(w) {
        this[w].timer.start()
    }

    pause(w) {
        this[w].timer.pause()
    }

    reset(w) {
        this[w].timer.reset()
    }

    stop(w) {
        this[w].timer.stop()
    }

    next() {
        const {index} = this.state;
        this.changeStep((index + 1) % config.steps.length);
    }

    turn() {
        const {zf, ff} = this.state,
            zfEnd = (zf.timeout <= 0),
            ffEnd = (ff.timeout <= 0)
        if (zf.running && !ff.running && !ffEnd) {
            this.pause('zf')
            this.start('ff')
        } else if (!zf.running && ff.running && !zfEnd) {
            this.pause('ff')
            this.start('zf')
        }
    }

    getHandler(w) {
        return (key => {
            switch (key) {
                case 'start': this.start(w); break;
                case 'stop': this.stop(w); break;
                case 'pause': this.pause(w); break;
                case 'reset': this.reset(w); break;
            }
        })
    }

    render() {
        const {zf, ff, stepName} = this.state,
            zfEnd = (zf.timeout === 0),
            ffEnd = (ff.timeout === 0),
            zfForceHide = (zf.timeout < 0),
            ffForceHide = (ff.timeout < 0),
            forceHide = zfForceHide || ffForceHide,
            showTurn = (!forceHide &&
                zf.running && !ff.running && !ffEnd ||
                !zf.running && ff.running && !zfEnd)

        return (
            <div id="root">
                <Header list={this.list} />
                <main>
                    <div className="timer">
                        <div className={"contain" + (zfForceHide ? " force-hide" : "")}>
                            <Meta teamName={config.zf.name} isZ={true} thought={config.zf.thought} forceHide={forceHide} />
                            <Clock timeout={zf.timeout} />
                            <Control
                                onClick={this.getHandler('zf')}
                                running={zf.running}
                                end={zfEnd}
                                />
                        </div>
                        <Middle turn={() => this.turn()} show={showTurn} forceHide={forceHide} />
                        <div className={"contain right" + (ffForceHide ? " force-hide" : "")}>
                            <Meta teamName={config.ff.name} isZ={false} thought={config.ff.thought} forceHide={forceHide} />
                            <Clock timeout={ff.timeout} />
                            <Control
                                onClick={this.getHandler('ff')}
                                running={ff.running}
                                end={ffEnd}
                                />
                        </div>
                    </div>
                    <div id="wrapper">
                        <a id="turnBtn" onClick={() => { this.next() } } className="btn">{stepName}</a>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }
}

render(
    <App />, document.querySelector('#react'));

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
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function toggleFullscreen() {
    var fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled;
    var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
    if (fullscreenEnabled && !fullscreenElement) {
        launchFullscreen(document.documentElement)
    } else if (fullscreenElement) {
        exitFullscreen()
    }
}