import React from 'react'

function Footer({ info }) {
  return (
    <footer className="site-footer">
      <p>{info}</p>
      <p>
        <a href="https://github.com/ccoode/timer">GitHub</a>
      </p>
    </footer>
  )
}

export default Footer
