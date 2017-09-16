import { h } from 'preact'
import { expect } from 'chai'

import Clock from '../Clock'

test('clock', () => {
  expect(<Clock timeout={2000} />).to.deep.equal(
    <section className="clock">00:02</section>
  )
})
