import React from 'react'
import { ThemeConsumer } from 'former-kit'
import PropTypes from 'prop-types'

import {
  isNil,
  length,
  prop,
  propEq,
  slice,
  findIndex,
  filter,
} from 'ramda'

import { ProgressBar } from '..'

import BackIcon from '../../images/navigate_back.svg'
import CloseIcon from '../../images/closeX.svg'

const consumeTheme = ThemeConsumer('UIHeader')

const filterSteps = (pages, active) => {
  const visibleSteps = filter(prop('visible'), pages)
  const activeStepIndex = findIndex(propEq('page', active), pages) + 1
  const activeSteps = slice(1, activeStepIndex, pages)

  const activeStep = filter(prop('visible'), activeSteps).length
  const percentage = (100 / length(visibleSteps)) * (activeStep + 1)

  return {
    percentage,
    activeStepIndex: activeStep,
    filteredSteps: visibleSteps,
  }
}

const Header = ({
  logoSrc,
  logoAlt,
  steps,
  activeStep,
  theme,
  base,
  handlePreviousButton,
  handleCloseButton,
}) => {
  const {
    percentage,
    activeStepIndex,
    filteredSteps,
  } = filterSteps(steps, activeStep)

  return (
    <header className={theme.header}>
      <div className={theme.logoWrapper}>
        {
          isNil(handlePreviousButton) ?
            <span /> :
            <BackIcon
              onClick={handlePreviousButton}
              className={theme.back}
            />
        }
        {
          logoSrc
            ? <img
              className={theme.logo}
              src={logoSrc}
              alt={logoAlt}
            />
            : ''
        }
        <CloseIcon
          className={theme.close}
          onClick={handleCloseButton}
        />
      </div>
      <ProgressBar
        base={base}
        percentage={percentage}
        steps={filteredSteps}
        activeStepIndex={activeStepIndex}
      />
    </header>
  )
}


Header.propTypes = {
  theme: PropTypes.shape({
    logo: PropTypes.string,
    header: PropTypes.string,
  }),
  base: PropTypes.string,
  handleCloseButton: PropTypes.func,
  handlePreviousButton: PropTypes.func,
  logoSrc: PropTypes.string,
  logoAlt: PropTypes.string,
  steps: PropTypes.arrayOf(PropTypes.object),
  activeStep: PropTypes.string,
}

Header.defaultProps = {
  theme: {},
  base: 'dark',
  handleCloseButton: null,
  handlePreviousButton: null,
  logoSrc: '',
  logoAlt: '',
  steps: [],
  activeStep: '',
}

export default consumeTheme(Header)
