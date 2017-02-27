import React, { PropTypes } from 'react'
import toggleFullscreen from './toggleFullscreen'

function Header({title, subtitle, children}) {
    return (
        <header className="site-header">
            <span className="site-title">{title + " - " + subtitle}</span>
            <a id="fullscreen" href="#" className="nav-item" onClick={() => toggleFullscreen()}>
                <i className="fa fa-arrows-alt" aria-hidden="true"></i>
            </a>
            <div className="menu">
                <a className="cover">环节</a>
                <div className="content">{children}</div>
            </div>
        </header>
    )
}

Header.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ])
}
export default Header