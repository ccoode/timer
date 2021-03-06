import React from 'react'
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
      <Control controlFns={props.controlFns} running={props.running} end={props.end} />
    </div>
  )
}

export default Team
