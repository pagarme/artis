import React from 'react'
import {
  oneOf,
  func,
  node,
  string,
  bool,
  oneOfType,
  arrayOf,
} from 'prop-types'
import classNames from 'classnames'

import style from './style.css'

function Button ({
  disabled,
  onClick,
  fill,
  base,
  relevance,
  size,
  children,
  type,
  className,
}) {
  const buttonClasses = classNames(
    className,
    style.button,
    style[fill],
    style[`${base}-${fill}`],
    style[`${base}-${relevance}`],
    style[size]
  )

  return (
    <button
      disabled={disabled}
      className={buttonClasses}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  type: oneOf(['button', 'submit', 'reset']),
  onClick: func,
  fill: oneOf([
    'flat', 'gradient', 'outline', 'clean',
  ]),
  base: oneOf([
    'dark', 'light',
  ]),
  relevance: oneOf([
    'high', 'normal', 'low',
  ]),
  size: oneOf([
    'extra-small', 'small', 'default', 'large',
  ]),
  children: oneOfType([
    arrayOf(node),
    string,
    node,
  ]).isRequired,
  disabled: bool,
  className: string,
}

Button.defaultProps = {
  onClick: null,
  fill: 'flat',
  base: 'light',
  relevance: 'normal',
  size: 'default',
  type: 'button',
  disabled: false,
  className: '',
}

export default Button
