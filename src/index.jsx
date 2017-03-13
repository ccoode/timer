/* eslint-disable import/no-duplicates */
/* global config:false */

import React from 'react'
import { render } from 'react-dom'
/* eslint-enable import/no-duplicates */
import App from './components/App'
import './styles/main.css'

/* eslint-disable global-require */
if (module.hot) {
  require('preact/devtools')
  require('./public/config.js')
}
/* eslint-enable global-require */

/* set activeIndex according hash */
const hash = location.hash.replace('#', '')
let activeIndex = 0
config.steps.forEach((step, index) => {
  if (hash === step.name) activeIndex = index
})

render(<App {...config} activeIndex={activeIndex} />, document.querySelector('#react'))
