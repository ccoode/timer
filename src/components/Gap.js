import React from 'react'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faArrowsAltH from '@fortawesome/fontawesome-free-solid/faArrowsAltH'
import classNames from 'classnames'
import Icon from './Icon'

function Gap({ turn, hide, hideTurnBtn }) {
  const divClass = classNames({
    gap: true,
    hide,
  })

  return (
    <div className={divClass}>
      <Icon hide={hideTurnBtn} onClick={turn}>
        <FontAwesomeIcon icon={faArrowsAltH} size="2x" />
      </Icon>
    </div>
  )
}

export default Gap
