import React, { PropTypes } from 'react'
import classNames from 'classnames'

function Meta({ right, teamName, hide, thought }) {
  const name = right
    ? (
      <section className="name">
        <span>
          {teamName}
        </span>
        <span className="tag">反方</span>
      </section>

    )
    : (
      <section className="name">
        <span className="tag">正方</span>
        <span>
          {teamName}
        </span>
      </section>
    )
  const metaClass = classNames({
    meta: true,
    right,
    hide,
  })
  return (
    <section className={metaClass}>
      {name}
      <section className="thought">{thought}</section>
    </section>
  )
}

Meta.propTypes = {
  right: PropTypes.bool.isRequired,
  teamName: PropTypes.string.isRequired,
  hide: PropTypes.bool.isRequired,
  thought: PropTypes.string.isRequired,
}

export default Meta
