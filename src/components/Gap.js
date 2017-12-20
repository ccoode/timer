import { h } from 'preact'
import classNames from 'classnames'
import Icon from './Icon'

function Gap({ turn, hide, hideTurnBtn }) {
  const divClass = classNames({
    gap: true,
    hide,
  })
  return (
    <div className={divClass}>
      <Icon className="fa-arrows-h" hide={hideTurnBtn} onClick={turn} />
    </div>
  )
}

export default Gap
