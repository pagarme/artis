import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  ThemeConsumer,
} from 'former-kit'

const consumeTheme = ThemeConsumer('UIDarkButton')

const DarkButton = ({
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

DarkButton.propTypes = {
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

DarkButton.defaultProps = {
  icon: null,
  subtitle: '',
}

export default consumeTheme(DarkButton)
