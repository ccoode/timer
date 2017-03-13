/* eslint-env node, jest */
/* eslint-disable react/jsx-filename-extension */
/* global shallow:false */

import React from 'react'

import App from '../src/components/App'
import Timer from '../src/utils/Timer'

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

it('should render an app', () => {
  const wrapper = shallow(<App {...config} />)
  expect(wrapper).toMatchSnapshot()
})

jest.useFakeTimers()

it('timer', () => {
  const fullTime = 2 * 1000
  const timer = new Timer({ timeout: fullTime })
  const callback = jest.fn()
  timer.watch(callback)
  timer.start()
  expect(setTimeout.mock.calls.length).toBe(1)
  expect(setTimeout.mock.calls[0][1]).toBe(1000)
  jest.runOnlyPendingTimers()
  expect(callback).toBeCalled()
  expect(setTimeout.mock.calls.length).toBe(2)
  expect(setTimeout.mock.calls[1][1]).toBe(1000)
})
