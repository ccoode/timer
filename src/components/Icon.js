import React, { PropTypes } from 'react'
import classNames from 'classnames'

function Icon(props) {
    const iconClass = classNames({
        "fa": true,
        "fa-stack-1x": true,
        [props.className]: true
    })
    return (
        <span
            className={"fa-stack fa-2x" + (props.hide ? " hide" : "")}
            onClick={() => { props.onClick() }}>
            <i className={"fa fa-stack-2x fa-circle"}></i>
            <i className={iconClass}></i>
        </span>
    )
}

Icon.propTypes = {
    className: PropTypes.string.isRequired,
    hide: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
}

export default Icon