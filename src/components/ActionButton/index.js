import React from 'react'
import PropTypes from 'prop-types'
import ThemeConsumer from '../../former-kit/ThemeConsumer'

import { Button } from '../'

const consumeTheme = ThemeConsumer('UIActionButton')

const ActionButton = ({
  icon,
  onClick,
  subtitle,
  theme,
  title,
}) => (
  <div className={theme.wrapper}>
    <Button
      icon={icon}
      onClick={onClick}
    >
      <div className={theme.textWrapper}>
        <p className={theme.title}>
          {title}
        </p>
        {
          subtitle &&
          <p className={theme.subtitle}>
            {subtitle}
          </p>
        }
      </div>
    </Button>
  </div>
)

ActionButton.propTypes = {
  icon: PropTypes.element,
  onClick: PropTypes.func.isRequired,
  subtitle: PropTypes.string,
  theme: PropTypes.shape({
    wrapper: PropTypes.string,
    textWrapper: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
  }).isRequired,
  title: PropTypes.string.isRequired,
}

ActionButton.defaultProps = {
  icon: null,
  subtitle: '',
}

export default consumeTheme(ActionButton)
