import React, { PropTypes } from 'react'

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
    timeout: PropTypes.number
}



function convertMS(ms) {
    if (ms >= 0) {
        var s = ms / 1000,
            sec = Math.ceil(s % 60),
            min = Math.floor(s / 60)
        if (sec === 60) {
            min += 1
            sec = 0
        }
        return pad(min) + ":" + pad(sec)
    }
}

function pad(number) {
    if (number < 10) {
        return '0' + number
    }
    return number
}

export default Clock