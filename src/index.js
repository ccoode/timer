import 'core-js/modules/es6.set'
import 'core-js/modules/es6.map'
import 'core-js/modules/es7.string.pad-start'

import { render } from 'react-dom'
import React from 'react'

import App from './components/App'
import config from './config'

import './styles/main.css'

const settings = window.settings || config

if ('background' in settings) {
  let { opacity } = settings.background
  const { url } = settings.background
  if (typeof url === 'string' && url !== '') {
    opacity = Number(opacity)
    let rule = ''
    if (!Number.isNaN(opacity)) {
      rule += `linear-gradient(rgba(255,255,255,${opacity}),rgba(255,255,255,${opacity})),`
    }
    rule += `url(${url})`
    document.documentElement.style.backgroundImage = rule
  }
}

const hash = decodeURI(window.location.hash.replace('#/', ''))
let defaultIndex = 0
settings.steps.forEach((step, index) => {
  if (hash === step.name) defaultIndex = index
})

render(<App {...settings} defaultIndex={defaultIndex} />, document.getElementById('root'))
