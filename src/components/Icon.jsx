import React, { PropTypes } from 'react'
import classNames from 'classnames'

function Icon(props) {
  const className = classNames({
    'fa-stack': true,
    'fa-2x': true,
    hide: props.hide,
  })
  const iconClass = classNames({
    fa: true,
    'fa-stack-1x': true,
    [props.className]: true,
  })
  return (
    <a
      href={`#${props.className.replace('fa-', '')}`}
      className={className}
      onClick={() => { props.onClick() }}
    >
      <i className="fa fa-stack-2x fa-circle" />
      <i className={iconClass} />
    </a>
  )
}

Icon.propTypes = {
  className: PropTypes.string.isRequired,
  hide: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Icon
