import { h } from 'preact'
import Icon from './Icon'

function Control({ running, end, controlFns }) {
  return (
    <section className="control">
      <Icon hide={running || end} className="fa-play" onClick={controlFns.start} />

      <Icon hide={!running || end} className="fa-pause" onClick={controlFns.pause} />

      <Icon hide={end} className="fa-stop" onClick={controlFns.stop} />

      <Icon hide={!end} className="fa-repeat" onClick={controlFns.reset} />
    </section>
  )
}

export default Control
