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
  children,
  className,
  fill,
  onClick,
  relevance,
  size,
  type,
}) {
  const buttonClasses = classNames(
    className,
    style.button,
    style[fill],
    style[relevance],
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
  relevance: oneOf([
    'high', 'normal', 'low',
  ]),
  size: oneOf([
    'extra-small', 'small', 'default', 'large', 'extra-large',
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
  relevance: 'normal',
  size: 'default',
  type: 'button',
  disabled: false,
  className: '',
}

export default Button
