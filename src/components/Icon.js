import React from 'react'
import Button from './Button'

const style = {
  fontSize: '3.5rem',
  color: 'inherit',
}

function Icon(props) {
  return (
    <Button style={style} onClick={props.onClick} className={props.hide ? 'hide' : ''}>
      {props.children}
    </Button>
  )
}

export default Icon
