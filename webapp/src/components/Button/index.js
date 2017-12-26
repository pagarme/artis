import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { themr } from 'react-css-themr'

const applyThemr = themr('UIButton')

function Button ({
  base,
  children,
  relevance,
  disabled,
  onClick,
  size,
  theme,
  type,
  hidden,
  fill,
}) {
  const buttonClasses = classNames(
    theme.button,
    theme[fill],
    theme[base],
    theme[`${relevance}Relevance`],
    theme[size]
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
  theme: PropTypes.shape({
    button: PropTypes.string,
    disabled: PropTypes.string,
    size: PropTypes.string,
    flat: PropTypes.string,
    gradient: PropTypes.string,
    outline: PropTypes.string,
    clean: PropTypes.string,
    highRelevance: PropTypes.string,
    normalRelevance: PropTypes.string,
    lowRelevance: PropTypes.string,
    light: PropTypes.string,
    dark: PropTypes.string,
    tiny: PropTypes.string,
    small: PropTypes.string,
    default: PropTypes.string,
    large: PropTypes.string,
  }).isRequired,
  type: PropTypes.oneOf([
    'button',
    'submit',
    'reset',
  ]),
  onClick: PropTypes.func,
  fill: PropTypes.oneOf([
    'flat',
    'gradient',
    'outline',
    'clean',
    'double',
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
  className: PropTypes.string,
}

Button.defaultProps = {
  theme: {},
  fill: 'flat',
  base: 'dark',
  relevance: 'normal',
  size: 'default',
  type: 'button',
  disabled: false,
  hidden: false,
  className: '',
  onClick: null,
}

export default applyThemr(Button)
