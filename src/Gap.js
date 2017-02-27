import React, { PropTypes } from 'react'
import Icon from './Icon'
import classNames from 'classnames'

function Gap(props) {
    const divClass = classNames({
        "gap": true,
        "hide": props.hide
    });
    return (
        <div className={divClass}>
            <Icon
                className="fa-arrows-h"
                hide={props.hideTurnBtn}
                onClick={() => { props.onClick() }}
            />
        </div>
    )
}

Gap.propTypes = {
    onClick: PropTypes.func,
    hideTurnBtn: PropTypes.bool,
    hide: PropTypes.bool
}

export default Gap