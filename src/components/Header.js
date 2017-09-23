import { h } from 'preact'
import toggleFullscreen from '../utils/toggleFullscreen'

function Header({ title, subtitle, children }) {
  return (
    <header className="site-header">
      <span className="site-title">{`${title} - ${subtitle}`}</span>
      <a id="fullscreen" className="nav-item" onClick={toggleFullscreen}>
        <i className="fa fa-arrows-alt" aria-hidden="true" />
      </a>
      <div className="menu">
        <a className="cover">环节</a>
        <div className="content">{children}</div>
      </div>
    </header>
  )
}

export default Header
