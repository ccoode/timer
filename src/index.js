/* eslint-disable global-require */
import { h, render } from 'preact'
import App from './components/App'
import './styles/main.css'
import 'font-awesome/css/font-awesome.min.css'

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

render(
  <App {...settings} activeIndex={activeIndex} />,
  document.querySelector('#root')
)
