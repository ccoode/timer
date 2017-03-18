import React, { PropTypes } from 'react'
import toggleFullscreen from '../utils/toggleFullscreen'

/* eslint-disable jsx-a11y/no-static-element-interactions */
function Header({ title, subtitle, children }) {
  return (
    <header className="site-header">
      <span className="site-title">{`${title} - ${subtitle}`}</span>
      <a id="fullscreen" className="nav-item" onClick={() => toggleFullscreen()}>
        <i className="fa fa-arrows-alt" aria-hidden="true" />
      </a>
      <div className="menu">
        <a className="cover">环节</a>
        <div className="content">{children}</div>
      </div>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
}
export default Header
