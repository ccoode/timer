import classNames from 'classnames'
import { h } from 'preact'
import Button from './Button'
import Switch from './Switch'
import toggleFullscreen from '../utils/toggleFullscreen'

const Header = ({ title, subtitle, menuItems }) => (
  <header className="site-header">
    <span className="site-title">{`${title} - ${subtitle}`}</span>
    <Button id="fullscreen" className="nav-item" onClick={toggleFullscreen}>
      <i className="fa fa-arrows-alt" aria-hidden="true" />
    </Button>
    <Switch
      render={({ toggle, on }) => (
        <div
          className={classNames({
            open: on,
            menu: true,
          })}
        >
          <Button className="menu-btn" onClick={() => toggle()}>
            环节
          </Button>
          <div className="menu-content" onClick={() => toggle(false)}>
            {menuItems}
          </div>
        </div>
      )}
    />
  </header>
)

export default Header
