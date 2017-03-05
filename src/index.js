import React from 'react'
import { render } from 'react-dom'
import App from 'Components/App'
import 'Styles/main.css'

if (module.hot) {
    require('preact/devtools')
    require('./public/config.js')
}

render(<App config={config} />, document.querySelector('#react'))
