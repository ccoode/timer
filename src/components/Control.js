import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import React from 'react'
import faPlay from '@fortawesome/fontawesome-free-solid/faPlayCircle'
import faPauseCircle from '@fortawesome/fontawesome-free-solid/faPauseCircle'
import faStopCircle from '@fortawesome/fontawesome-free-solid/faStopCircle'
import faRecycle from '@fortawesome/fontawesome-free-solid/faRedo'
import Icon from './Icon'

function Control({ running, end, controlFns }) {
  return (
    <section className="control">
      <Icon hide={running || end} onClick={controlFns.start}>
        <FontAwesomeIcon icon={faPlay} size="2x" />
      </Icon>

      <Icon hide={!running || end} onClick={controlFns.pause}>
        <FontAwesomeIcon icon={faPauseCircle} size="2x" />
      </Icon>

      <Icon hide={end} onClick={controlFns.stop}>
        <FontAwesomeIcon icon={faStopCircle} size="2x" />
      </Icon>

      <Icon hide={!end} className="fa-repeat" onClick={controlFns.reset}>
        <FontAwesomeIcon icon={faRecycle} size="2x" />
      </Icon>
    </section>
  )
}

export default Control
