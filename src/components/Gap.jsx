import React, { PropTypes } from 'react'
import classNames from 'classnames'
import Icon from './Icon'

function Gap(props) {
  const divClass = classNames({
    gap: true,
    hide: props.hide,
  })
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
  onClick: PropTypes.func.isRequired,
  hideTurnBtn: PropTypes.bool.isRequired,
  hide: PropTypes.bool.isRequired,
}

export default Gap
