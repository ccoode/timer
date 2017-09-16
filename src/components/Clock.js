import { h } from 'preact'

function convertMS(ms) {
  if (ms < 0) return 0
  const s = ms / 1000
  let sec = Math.ceil(s % 60)
  let min = Math.floor(s / 60)
  if (sec === 60) {
    min += 1
    sec = 0
  }

  min = min.toString().padStart(2, '0')
  sec = sec.toString().padStart(2, '0')

  return `${min}:${sec}`
}

/**
 * timeout(ms) => MM:ss
 */
function Clock({ timeout }) {
  return <section className="clock">{convertMS(timeout)}</section>
}

export default Clock
