import { h } from 'preact'
import classNames from 'classnames'
import Icon from './Icon'

function Gap(props) {
  const divClass = classNames({
    gap: true,
    hide: props.hide,
  })
  return (
    <div className={divClass}>
      <Icon className="fa-arrows-h" hide={props.hideTurnBtn} onClick={props.onClick} />
    </div>
  )
}

export default Gap
