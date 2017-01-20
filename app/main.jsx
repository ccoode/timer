import React from 'react';
import ReactDOM from 'react-dom';
import config from '../config.json';

function Step(props) {
    return <a onClick= {() => props.onClick()} href="#">
        {props.value}
    </a>
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
        <article className="teamMeta">
            {teamName}
            <section className="thought">{props.support}</section>
        </article>
    )
}

function Clock(props) {
    return (
        <section className="clock">
            {convertMS(props.timeOut)}
        </section>
    )
}

function Middle(props) {
    return (
        <div className="middle">
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
    var {start, pause, clear, reset} = props.onClicks;

    return (
        <section className="control">
            <span
                className={"fa-stack fa-2x" + (props.running || props.end
                ? " hide"
                : "")}
                onClick=
                {() => {start()}}>
                <i className="fa fa-circle fa-stack-2x"></i>
                <i className="fa fa-play fa-stack-1x"></i>
            </span>
            <span
                className={"fa-stack fa-2x" + (props.running
                ? ""
                : " hide")}
                onClick=
                {() => {pause()}}>
                <i className="fa fa-circle fa-stack-2x"></i>
                <i className="fa fa-pause fa-stack-1x"></i>
            </span>
            <span
                className={"fa-stack fa-2x" + (props.end
                ? " hide"
                : "")}
                onClick=
                {() => {clear()}}>
                <i className="fa fa-circle fa-stack-2x"></i>
                <i className="fa fa-stop fa-stack-1x"></i>
            </span>
            <span
                className={"fa-stack fa-2x" + (props.end
                ? ""
                : " hide")}
                onClick=
                {() => {reset()}}>
                <i className="fa fa-circle fa-stack-2x"></i>
                <i className="fa fa-repeat fa-stack-1x"></i>
            </span>
        </section>
    )
}

class App extends React.Component {
    constructor() {
        super()
        let {zf, ff, name} = config.steps[0];
        let totalZF = zf * 1000,
            totalFF = ff * 1000;
        this.startSound = new Audio("assets/audio/begin.wav")
        this.stopSound = new Audio("assets/audio/stop.wav")
        this.alertSound = new Audio("assets/audio/alert.wav")
        this.state = {
            stepName: name,
            index: 0,
            zf: {
                timeOut: totalZF,
                left: totalZF,
                running: false
            },
            ff: {
                timeOut: totalFF,
                left: totalFF,
                running: false
            }
        }
    }

    updateTimer(w) {
        var {running, timeOut, startTime, left} = this.state[w];
        var timeGap = (timeOut % 1000) || 1000;
        if (running && timeOut - 1000 > 0) 
            var timeoutID = setTimeout(() => {
                this.updateTimer(w)
            }, 1000)

        var timeOut = running
            ? timeOut - timeGap
            : timeOut;
        if (timeOut > 0 && timeOut <= 5000 || timeOut > 29000 && timeOut <= 30000) 
            this.alertSound.play()
        if (timeOut <= 0) {
            running = false;
            this
                .startSound
                .play()
        }
        this.setState({
            [w]: {
                timeOut,
                running,
                startTime,
                left,
                timeoutID
            }
        })
    }

    changeStep(i) {
        if (i == this.state.index) 
            return;
        if (this.state.zf.running) 
            clearTimeout(this.state.zf.timeoutID)
        if (this.state.ff.running) 
            clearTimeout(this.state.ff.timeoutID)

        let {zf, ff, name} = config.steps[i];
        let totalZF = zf * 1000,
            totalFF = ff * 1000;
        let state = {
            stepName: name,
            index: i,
            zf: {
                timeOut: totalZF,
                left: totalZF,
                running: false
            },
            ff: {
                timeOut: totalFF,
                left: totalFF,
                running: false
            }
        }
        this.setState(state)
    }

    start(w) {

        var {timeOut, left} = this.state[w]

        if (timeOut > 0) {
            const timeGap = timeOut % 1000 || 1000,
                timeoutID = setTimeout(() => {
                    this.updateTimer(w)
                }, timeGap);
            this.setState({
                [w]: {
                    timeOut: timeOut,
                    left: left,
                    startTime: performance.now(),
                    running: true,
                    timeoutID: timeoutID
                }
            });
            this
                .startSound
                .play();
        }
    }

    pause(w) {
        var {left, startTime, timeoutID} = this.state[w];
        var time = performance.now(),
            left = left - (time - startTime)
        clearTimeout(timeoutID);
        this.setState({
            [w]: {
                timeOut: left,
                left: left,
                running: false,
                startTime: null
            }
        })
    }

    reset(w) {
        var {index, [w]: {
                timeoutID
            }} = this.state
        var total = config.steps[index][w] * 1000
        clearTimeout(timeoutID)
        this.setState({
            [w]: {
                left: total,
                timeOut: total,
                running: false
            }
        })
    }

    clear(w) {
        var {timeoutID} = this.state[w]
        clearTimeout(timeoutID)
        this.setState({
            [w]: {
                left: 0,
                timeOut: 0,
                running: false
            }
        })
    }

    next() {
        var {index} = this.state;
        this.changeStep((index + 1) % config.steps.length);
    }

    turn() {
        const {zf, ff} = this.state
        zf.end = (zf.timeOut <= 0)
        ff.end = (ff.timeOut <= 0)
        if (zf.running && !ff.running && !ff.end) {
            this.pause('zf')
            this.start('ff')
        } else if (!zf.running && ff.running && !zf.end) {
            this.pause('ff')
            this.start('zf')
        }
    }

    render() {
        const {zf, ff} = this.state
        zf.end = (zf.timeOut <= 0)
        ff.end = (ff.timeOut <= 0)
        const showTurn = (zf.running && !ff.running && !ff.end || !zf.running && ff.running && !zf.end)
        const lists = config
            .steps
            .map((step, key) => {
                return (<Step value={step.name} onClick= { () => { this.changeStep(key) } } key={key}/>)
            });
        return (
            <div id="root">
                <header className="site-header">
                    <span className="site-title">
                        {config.title + " - " + config.subtitle}
                    </span>
                    <div className="menu-container">
                        <a className="menu-btn" href="#">
                            环节
                        </a>
                        <div className="menu">
                            {lists}
                        </div>
                    </div>

                </header>

                <main>
                    <div className="timer">
                        <div className="contain">
                            <Meta teamName={config.zfname} isZ={true} support={config.zfbian}/>
                            <Clock timeOut={this.state.zf.timeOut}/>
                            <Control
                                onClicks={{
                                start: () => {
                                    this.start('zf')
                                },
                                pause: () => {
                                    this.pause('zf')
                                },
                                clear: () => {
                                    this.clear('zf')
                                },
                                reset: () => {
                                    this.reset('zf')
                                }
                            }}
                                running={this.state.zf.running}
                                end={this.state.zf.timeOut <= 0}/>
                        </div>
                        <Middle turn={() => this.turn()} show={showTurn}/>
                        <div className="contain right">
                            <Meta teamName={config.ffname} isZ={false} support={config.ffbian}/>
                            <Clock timeOut={this.state.ff.timeOut}/>
                            <Control
                                onClicks={{
                                start: () => {
                                    this.start('ff')
                                },
                                pause: () => {
                                    this.pause('ff')
                                },
                                clear: () => {
                                    this.clear('ff')
                                },
                                reset: () => {
                                    this.reset('ff')
                                }
                            }}
                                running={this.state.ff.running}
                                end={this.state.ff.timeOut <= 0}/>
                        </div>
                    </div>
                    <div>
                        <a
                            href="#"
                            id="turnBtn"
                            onClick={() => {
                            this.next()
                        }}
                            className="btn">{this.state.stepName}</a>
                    </div>
                </main>
                <footer className="site-footer">
                    <p>{config.footer}</p>
                    <p>
                        <a href="https://github.com/ccoode/timer">源代码</a>
                    </p>
                </footer>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>, document.querySelector('#react'));

function convertMS(ms) {
    return pad(Math.floor(ms / 1000 / 60)) + ":" + pad(Math.ceil(ms / 1000 % 60))
}

function pad(number) {
    if (number < 10) {
        return '0' + number
    }
    return number
}