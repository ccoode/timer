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

if ('background' in settings) {
  let { opacity } = settings.background
  const { url } = settings.background
  if (typeof url === 'string' && url !== '') {
    opacity = Number(opacity)
    let rule = ''
    if (!isNaN(opacity)) {
      rule += `linear-gradient(rgba(255,255,255,${opacity}),rgba(255,255,255,${opacity})),`
    }
    rule += `url(${url})`
    document.documentElement.style.backgroundImage = rule
  }
}

/* set activeIndex according hash */
const hash = location.hash.replace('#/', '')
let activeIndex = 0
settings.steps.forEach((step, index) => {
  if (hash === step.name) activeIndex = index
})

render(<App {...settings} activeIndex={activeIndex} />, document.querySelector('#root'))
