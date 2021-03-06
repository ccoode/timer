import classNames from 'classnames'
import React from 'react'

function Meta({ right, teamName, hide, thought }) {
  const name = right ? (
    <section className="name">
      <span>{teamName}</span>
      <span className="tag">反方</span>
    </section>
  ) : (
    <section className="name">
      <span className="tag">正方</span>
      <span>{teamName}</span>
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

export default Meta
