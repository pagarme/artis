import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  isNil,
} from 'ramda'
import {
  Button,
  ThemeConsumer,
} from 'former-kit'

import { toggleCart } from './../../actions'

import NavigateBack from './../../images/navigate_back.svg'
import NavigateNext from './../../images/navigate_next.svg'
import CartIcon from './../../images/cart.svg'

const consumeTheme = ThemeConsumer('UINavigationBar')

const NavigationBar = ({
  theme,
  handleToggleCart,
  formValid,
  prevTitle,
  nextTitle,
  handlePreviousButton,
  handleNextButton,
}) => {
  const buttonContainerClasses = classNames(theme.buttonContainer, {
    [theme.hidePrevButton]: isNil(handlePreviousButton),
  })

  return (
    <div className={buttonContainerClasses}>
      <Button
        fill="outline"
        onClick={handlePreviousButton}
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
  formValid: PropTypes.bool,
  handlePreviousButton: PropTypes.func,
  handleNextButton: PropTypes.func,
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
  formValid: false,
  prevTitle: 'Ops, voltar',
  nextTitle: 'Continuar',
  handlePreviousButton: null,
  handleNextButton: null,
}

export default connect(null, {
  handleToggleCart: toggleCart,
})(consumeTheme(NavigationBar))
