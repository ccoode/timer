import React from 'react'
import Clock from '../Clock'

test('clock', () => {
  const wrapper = shallow(<Clock timeout={2000} />)
  expect(wrapper).toMatchSnapshot()
})
