import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { themr } from 'react-css-themr'

const applyThemr = themr('UIButton')

function Button ({
  base,
  id,
  children,
  relevance,
  disabled,
  onClick,
  size,
  theme,
  type,
  hidden,
  full,
  fill,
  className,
  textAlign,
}) {
  const buttonClasses = classNames(
    className,
    theme.button,
    theme[textAlign],
    theme[fill],
    theme[base],
    theme[`${relevance}Relevance`],
    theme[size],
    { [theme.full]: full }
  )

  return (
    <button
      id={id}
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
  theme: PropTypes.shape({
    button: PropTypes.string,
    outline: PropTypes.string,
    clean: PropTypes.string,
    highRelevance: PropTypes.string,
    lowRelevance: PropTypes.string,
    light: PropTypes.string,
    dark: PropTypes.string,
    tiny: PropTypes.string,
    small: PropTypes.string,
    default: PropTypes.string,
    large: PropTypes.string,
    'extra-large': PropTypes.string,
    full: PropTypes.string,
  }).isRequired,
  id: PropTypes.string,
  type: PropTypes.oneOf([
    'button',
    'submit',
    'reset',
  ]),
  textAlign: PropTypes.oneOf([
    'center',
    'left',
    'right',
  ]),
  onClick: PropTypes.func,
  fill: PropTypes.oneOf([
    'outline',
    'clean',
    'double',
    'flat',
  ]),
  base: PropTypes.oneOf([
    'dark', 'light',
  ]),
  relevance: PropTypes.oneOf([
    'high',
    'low',
    'normal',
  ]),
  size: PropTypes.oneOf([
    'tiny',
    'small',
    'default',
    'large',
    'extra-large',
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  disabled: PropTypes.bool,
  hidden: PropTypes.bool,
  full: PropTypes.bool,
  className: PropTypes.string,
}

Button.defaultProps = {
  theme: {},
  id: null,
  fill: 'flat',
  base: 'dark',
  relevance: 'normal',
  size: 'default',
  type: 'button',
  disabled: false,
  hidden: false,
  textAlign: 'center',
  full: false,
  className: '',
  onClick: null,
}

export default applyThemr(Button)
