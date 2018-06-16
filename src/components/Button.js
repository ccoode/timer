import React from 'react'

const Button = ({ className: cn, href: url, ...props }) => {
  const className = cn ? `${cn} button` : 'button'
  const href = url || 'javascript:void(0)'
  return <a href={href} className={className} {...props} />
}

export default Button
