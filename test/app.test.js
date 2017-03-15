import React from 'react'

import App from '../src/components/App'

const config = {
  title: 'abc',
  subtitle: 'abc',
  footer: 'abc',
  zf: {
    name: '',
    thought: '',
  },
  ff: {
    name: '',
    thought: '',
  },
  steps: [
    {
      name: '1',
      zf: 110,
      ff: 12,
    },
    {
      name: '2',
      zf: 111,
      ff: 22,
    },
    {
      name: '3',
      zf: 90,
      ff: -1,
    },
  ],
}

test('should render an app', () => {
  shallow(<App {...config} />)
})


