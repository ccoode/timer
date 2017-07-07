import Clock from '../Clock'
import { h } from 'preact'
import { expect } from 'chai'

test('clock', () => {
  expect(<Clock timeout={2000} />).to.deep.equal(
    <section className='clock'>00:02</section>
  )
})
