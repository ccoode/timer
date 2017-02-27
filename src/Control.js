import React, { PropTypes } from 'react'
import Icon from './Icon'

function Control(props) {
    return (
        <section className="control">
            <Icon
                hide={props.running || props.end}
                className="fa-play"
                onClick={() => { props.onClick('start') }}
            />

            <Icon
                hide={!props.running || props.end}
                className="fa-pause"
                onClick={() => { props.onClick('pause') }}
            />

            <Icon
                hide={props.end}
                className="fa-stop"
                onClick={() => { props.onClick('stop') }}
            />

            <Icon
                hide={!props.end}
                className="fa-repeat"
                onClick={() => { props.onClick('reset') }}
            />
        </section >
    )
}

Control.propTypes = {
    end: PropTypes.bool,
    onClick: PropTypes.func,
    running: PropTypes.running
}

export default Control