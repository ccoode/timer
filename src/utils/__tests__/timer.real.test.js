/* global sleep:false */
const Timer = require('../Timer.js')

const assert = require('assert')

const fullTime = 10000
const timer = new Timer({ timeout: fullTime })
const st = {}

timer.watch((state) => {
  st.running = state.running
  st.timeout = state.timeout
})

timer.watch((state) => {
  if (state.timeout === 0) assert.equal(state.running, false)
})

timer.watch((state) => {
  if (state.onStart) assert.equal(state.running, true)
})

describe('timer real', () => {
  it('works', async () => {
    timer.start()

    /* pause() BEGIN */
    await sleep(10)
    timer.pause()
    assert.equal(st.running, false)
    st.pre = st.timeout

    await sleep(10)
    assert.equal(st.running, false)
    assert.equal(st.pre, st.timeout)
    /* pause() END */

    /* start() BEGIN */
    timer.start()
    assert.equal(st.pre, st.timeout)
    assert.equal(st.running, true)
    /* start() END */

    /* reset() BEGIN */
    await sleep(10)
    timer.reset()
    assert.equal(st.running, false)
    assert.equal(st.timeout, fullTime)
    /* reset() END */

    /* stop() BEGIN */
    timer.start()
    assert.equal(st.running, true)

    await sleep(10)
    timer.stop()
    assert.equal(st.running, false)
    assert.equal(st.timeout, 0)
    /* stop() END */
  })
})
