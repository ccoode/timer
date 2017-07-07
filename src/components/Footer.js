import { h } from 'preact'

function Footer ({ info }) {
  return (
    <footer className='site-footer'>
      <p>
        {info}
      </p>
      <p>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://github.com/ccoode/timer'
        >
          源代码
        </a>
      </p>
    </footer>
  )
}

export default Footer
