import React, { PropTypes } from 'react'
import classNames from 'classnames'
function Meta({left, teamName, hide, thought}) {
    const name = left
        ? (
            <section className="name">
                <span className="tag">正方</span>
                <span>
                    {teamName}
                </span>
            </section>
        )
        : (
            <section className="name">
                <span>
                    {teamName}
                </span>
                <span className="tag">反方</span>
            </section>
        )
    const metaClass = classNames({
        "meta": true,
        "right": !left,
        "hide": hide
    })
    return (
        <article className={metaClass}>
            {name}
            <section className="thought">{thought}</section>
        </article>
    )
}

Meta.propTypes = {
    left: PropTypes.bool,
    teamName: PropTypes.string,
    hide: PropTypes.bool,
    thought: PropTypes.string
}

export default Meta