import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import InfoIcon from '../../images/info.svg'
import ThemeConsumer from '../../former-kit/ThemeConsumer'

const consumeTheme = ThemeConsumer('UITooltip')

const Tooltip = ({ text, theme, className }) => (
  <div
    className={classNames(
      theme.wrapper,
      className,
      { [theme.position]: !className }
    )}
  >
    <InfoIcon />
    <div className={theme.content}>
      {text}
    </div>
  </div>
)

Tooltip.propTypes = {
  theme: PropTypes.shape({
    wrapper: PropTypes.string,
    content: PropTypes.string,
  }),
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
}

Tooltip.defaultProps = {
  theme: {},
  className: null,
}

export default consumeTheme(Tooltip)
