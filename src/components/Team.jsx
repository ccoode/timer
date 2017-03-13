import React, { PropTypes } from 'react'
import classNames from 'classnames'
import Meta from './Meta'
import Control from './Control'
import Clock from './Clock'

function Team(props) {
  const divClass = classNames({
    team: true,
    hide: props.hide,
  })
  return (
    <div className={divClass}>
      <Meta
        right={props.right}
        teamName={props.name}
        thought={props.thought}
        hide={props.hideAll}
      />
      <Clock timeout={props.timeout} />
      <Control
        onClick={props.controlFn}
        running={props.running}
        end={props.end}
      />
    </div>
  )
}

Team.propTypes = {
  controlFn: PropTypes.func.isRequired,
  end: PropTypes.bool.isRequired,
  running: PropTypes.bool.isRequired,
  timeout: PropTypes.number.isRequired,
  hideAll: PropTypes.bool.isRequired,
  hide: PropTypes.bool.isRequired,
  thought: PropTypes.string.isRequired,
  right: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
}
export default Team
