import { h } from 'preact'
import classNames from 'classnames'
import Button from './Button'

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
    <Button className={className} onClick={props.onClick}>
      <i className="fa fa-stack-2x fa-circle" />
      <i className={iconClass} />
    </Button>
  )
}

export default Icon
