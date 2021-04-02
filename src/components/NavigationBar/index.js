import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { toggleCart } from './../../redux/actions'
import ThemeConsumer from '../../former-kit/ThemeConsumer'

import NavigateBack from './../../images/navigate_back.svg'
import NavigateNext from './../../images/navigate_next.svg'
import CartIcon from './../../images/cart.svg'
import { Button } from '../'

const consumeTheme = ThemeConsumer('UINavigationBar')

const NavigationBar = ({
  enableCart,
  formValid,
  handleNextButton,
  handlePreviousButton,
  handleToggleCart,
  nextTitle,
  prevTitle,
  theme,
}) => {
  const buttonContainerClasses = classNames(theme.buttonContainer, {
    [theme.hidePrevButton]: !handlePreviousButton || !handlePreviousButton(),
    [theme.hideCartButton]: !enableCart,
  })

  return (
    <div className={buttonContainerClasses}>
      <Button
        fill="outline"
        onClick={handlePreviousButton && handlePreviousButton()
          ? handlePreviousButton()
          : undefined}
        icon={<NavigateBack />}
      >
        {prevTitle}
      </Button>
      <Button
        fill="gradient"
        onClick={handleToggleCart}
        icon={<CartIcon />}
      />
      <Button
        fill="gradient"
        type="submit"
        iconAlignment="end"
        icon={<NavigateNext />}
        disabled={formValid}
        onClick={handleNextButton}
      >
        {nextTitle}
      </Button>
    </div>
  )
}

NavigationBar.propTypes = {
  enableCart: PropTypes.bool,
  formValid: PropTypes.bool,
  handleNextButton: PropTypes.func,
  handlePreviousButton: PropTypes.func,
  handleToggleCart: PropTypes.func.isRequired,
  nextTitle: PropTypes.string,
  prevTitle: PropTypes.string,
  theme: PropTypes.shape({
    buttonContainer: PropTypes.string,
    hidePrevButton: PropTypes.string,
  }),
}

NavigationBar.defaultProps = {
  theme: {},
  enableCart: false,
  formValid: false,
  prevTitle: 'Ops, voltar',
  nextTitle: 'Continuar',
  handlePreviousButton: null,
  handleNextButton: null,
}

export default connect(null, {
  handleToggleCart: toggleCart,
})(consumeTheme(NavigationBar))
