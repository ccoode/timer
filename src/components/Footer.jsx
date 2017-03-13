import React, { PropTypes } from 'react'

function Footer({ info }) {
  return (
    <footer className="site-footer">
      <p>{info}</p>
      <p><a target="_blank" rel="noopener noreferrer" href="https://github.com/ccoode/timer">源代码</a></p>
    </footer>
  )
}

Footer.propTypes = {
  info: PropTypes.string.isRequired,
}

export default Footer