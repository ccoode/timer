import { h, render } from 'preact'
import App from './components/App'
import './styles/main.css'
import 'font-awesome/css/font-awesome.min.css'
import settings from './config'

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

render(
  <App {...settings} activeIndex={activeIndex} />,
  document.querySelector('#root')
)
