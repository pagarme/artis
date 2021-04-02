import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { isNil } from 'ramda'
import ThemeConsumer from '../../former-kit/ThemeConsumer'

const consumeTheme = ThemeConsumer('UIButton')

const Button = ({
  children,
  circle,
  className,
  disabled,
  fill,
  icon,
  iconAlignment,
  onClick,
  relevance,
  size,
  theme,
  type,
}) => {
  const buttonClasses = classNames(
    className,
    theme.button,
    theme[fill],
    theme[`${relevance}Relevance`],
    theme[size],
    {
      [theme.iconButton]: !isNil(icon) && isNil(children),
      [theme.circle]: !isNil(icon) && isNil(children) && circle,
    }
  )

  return (
    <button
      disabled={disabled}
      className={buttonClasses}
      onClick={onClick}
      type={type}
    >
      {(!isNil(icon) && iconAlignment === 'start') && icon}
      {!isNil(children) && children }
      {(!isNil(icon) && iconAlignment === 'end') && icon}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
    PropTypes.object,
  ]),
  circle: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  fill: PropTypes.oneOf([
    'flat', 'gradient', 'outline', 'clean',
  ]),
  icon: PropTypes.element,
  iconAlignment: PropTypes.oneOf([
    'start', 'end',
  ]),
  onClick: PropTypes.func,
  relevance: PropTypes.oneOf([
    'high', 'normal', 'low',
  ]),
  size: PropTypes.oneOf([
    'tiny', 'default', 'huge',
  ]),
  theme: PropTypes.shape({
    button: PropTypes.string,
    circle: PropTypes.string,
    clean: PropTypes.string,
    default: PropTypes.string,
    disabled: PropTypes.string,
    flat: PropTypes.string,
    gradient: PropTypes.string,
    highRelevance: PropTypes.string,
    huge: PropTypes.string,
    lowRelevance: PropTypes.string,
    normalRelevance: PropTypes.string,
    outline: PropTypes.string,
    size: PropTypes.string,
    tiny: PropTypes.string,
  }),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
}

Button.defaultProps = {
  children: null,
  circle: false,
  className: '',
  disabled: false,
  fill: 'flat',
  icon: null,
  iconAlignment: 'start',
  onClick: null,
  relevance: 'normal',
  size: 'default',
  theme: {},
  type: 'button',
}

export default consumeTheme(Button)
