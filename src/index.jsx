/* eslint-disable import/no-duplicates */
import React from 'react'
import { render } from 'react-dom'
/* eslint-enable import/no-duplicates */
import App from './components/App'
import './styles/main.css'
import settings from '../public/config'

/* eslint-disable global-require */
if (module.hot) {
  require('preact/devtools')
}
/* eslint-enable global-require */

/* global config:false */
Object.assign(settings, config)

/* set activeIndex according hash */
const hash = location.hash.replace('#/', '')
let activeIndex = 0
settings.steps.forEach((step, index) => {
  if (hash === step.name) activeIndex = index
})

render(<App {...settings} activeIndex={activeIndex} />, document.querySelector('#react'))
