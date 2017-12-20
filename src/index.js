import 'babel-polyfill'
import { h, render } from 'preact'
import 'font-awesome/css/font-awesome.min.css'

import App from './components/App'
import './styles/main.css'

const settings = global.config

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

const hash = decodeURI(location.hash.replace('#/', ''))
let defaultIndex = 0
settings.steps.forEach((step, index) => {
  if (hash === step.name) defaultIndex = index
})

main()

if (module.hot) {
  require('preact/devtools')
  module.hot.accept('./components/App', main)
}

function main() {
  render(
    <div id="root">
      <App {...settings} defaultIndex={defaultIndex} />
    </div>,
    document.body,
    document.getElementById('root')
  )
}
