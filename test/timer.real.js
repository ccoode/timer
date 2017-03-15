const Timer = require('../src/utils/Timer.js')

const assert = require('assert')

const fullTime = 10 * 1000
const timer = new Timer({ timeout: fullTime })
const out = {}

timer.watch((state) => {
  out.running = state.running
  out.timeout = state.timeout
})

timer.watch((state) => {
  if (state.timeout === 0) assert.equal(state.running, false)
})

timer.watch((state) => {
  if (state.onStart) assert.equal(state.running, true)
})

timer.start()

/* pause() BEGIN */
setTimeout(() => {
  timer.pause()
  assert.equal(out.running, false)
  out.pre = out.timeout
}, 1500)

setTimeout(() => {
  assert.equal(out.running, false)
  assert.equal(out.pre, out.timeout)
}, 2100)
/* pause() END */


/* start() BEGIN */
setTimeout(() => {
  timer.start()
  assert.equal(out.pre, out.timeout)
  assert.equal(out.running, true)
}, 2500)
/* start() END */

/* reset() BEGIN */
setTimeout(() => {
  timer.reset()
  assert.equal(out.running, false)
  assert.equal(out.timeout, fullTime)
}, 2700)
/* reset() END */


/* stop() BEGIN */
setTimeout(() => {
  timer.start()
  assert.equal(out.running, true)
}, 3000)

setTimeout(() => {
  timer.stop()
  assert.equal(out.running, false)
  assert.equal(out.timeout, 0)
}, 3300)
/* stop() END */
