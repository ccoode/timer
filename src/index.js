/* eslint-disable global-require */
import 'babel-polyfill'
import { h, render } from 'preact'
import 'font-awesome/css/font-awesome.min.css'

import App from './components/App'
import './styles/main.css'

if (module.hot) {
  require('preact/devtools')
}

const settings = window.config

/* set activeIndex according hash */
const hash = location.hash.replace('#/', '')
let activeIndex = 0
settings.steps.forEach((step, index) => {
  if (hash === step.name) activeIndex = index
})

render(<App {...settings} activeIndex={activeIndex} />, document.querySelector('#root'))
