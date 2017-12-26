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
// import { themr } from 'react-css-themr'

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
  hidden,
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
      hidden={hidden}
      className={buttonClasses}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  type: oneOf([
    'button',
    'submit',
    'reset',
  ]),
  onClick: func,
  fill: oneOf([
    'flat',
    'outline',
    'clean',
    'double',
  ]),
  relevance: oneOf([
    'high',
    'low',
    'normal',
  ]),
  size: oneOf([
    'extra-small',
    'small',
    'default',
    'large',
    'extra-large',
  ]),
  children: oneOfType([
    arrayOf(node),
    string,
    node,
  ]).isRequired,
  disabled: bool,
  hidden: bool,
  className: string,
}

Button.defaultProps = {
  onClick: null,
  fill: 'flat',
  relevance: 'normal',
  size: 'default',
  type: 'button',
  disabled: false,
  hidden: false,
  className: '',
}

export default Button
