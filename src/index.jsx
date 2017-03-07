import React from 'react'
import { render } from 'react-dom'
import App from 'Components/App'
import 'Styles/main.css'

/* eslint-disable global-require */
if (module.hot) {
  require('preact/devtools')
  require('./public/config.js')
}
/* eslint-enable global-require */

render(<App {...config} />, document.querySelector('#react'))
