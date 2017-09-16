import { h } from 'preact'
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
  /* eslint-disable jsx-a11y/no-static-element-interactions */
  return (
    <a
      className={className}
      onClick={() => {
        props.onClick()
      }}
    >
      <i className="fa fa-stack-2x fa-circle" />
      <i className={iconClass} />
    </a>
  )
}

export default Icon
