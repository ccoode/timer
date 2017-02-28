import React, { PropTypes } from 'react'
import classNames from 'classnames'
import Meta from 'Components/Meta'
import Control from 'Components/Control'
import Clock from 'Components/Clock'

function Team(props) {
    const divClass = classNames({
        "team": true,
        "hide": props.hide,
        "right": !props.left
    })
    return (
        <div className={divClass}>
            <Meta
                left={props.left}
                teamName={props.name}
                thought={props.thought}
                hide={props.hideAll}
            />
            <Clock timeout={props.timeout} />
            <Control
                onClick={props.controlFn}
                running={props.running}
                end={props.end}
            />
        </div>
    )
}

Team.propTypes = {
    controlFn: PropTypes.func,
    end: PropTypes.bool,
    running: PropTypes.bool,
    timeout: PropTypes.number,
    hideAll: PropTypes.bool,
    hide: PropTypes.bool,
    thought: PropTypes.string,
    left: PropTypes.bool,
    name: PropTypes.string
}
export default Team