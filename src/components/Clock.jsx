import React, { PropTypes } from 'react'

function pad(number) {
  if (number < 10) {
    return `0${number}`
  }
  return number
}

function convertMS(ms) {
  if (ms < 0) return 0
  const s = ms / 1000
  let sec = Math.ceil(s % 60)
  let min = Math.floor(s / 60)
  if (sec === 60) {
    min += 1
    sec = 0
  }
  return `${pad(min)}:${pad(sec)}`
}

/**
 * timeout(ms) => MM:ss
 */
function Clock({ timeout }) {
  return (
    <section className="clock">
      {convertMS(timeout)}
    </section>
  )
}

Clock.propTypes = {
  timeout: PropTypes.number.isRequired,
}

export default Clock
