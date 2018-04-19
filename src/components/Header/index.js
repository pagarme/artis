import React from 'react'
import { themr } from 'react-css-themr'
import PropTypes from 'prop-types'

import {
  length,
  prop,
  propEq,
  slice,
  findIndex,
  filter,
} from 'ramda'

import { ProgressBar } from '..'

const applyThemr = themr('UIHeader')

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
}) => {
  const {
    percentage,
    activeStepIndex,
    filteredSteps,
  } = filterSteps(steps, activeStep)

  return (
    <header className={theme.header}>
      {
        logoSrc
          ? <img
            className={theme.logo}
            src={logoSrc}
            alt={logoAlt}
          />
          : <span />
      }
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
  logoSrc: PropTypes.string,
  logoAlt: PropTypes.string,
  steps: PropTypes.arrayOf(PropTypes.object),
  activeStep: PropTypes.string,
}

Header.defaultProps = {
  theme: {},
  base: 'dark',
  logoSrc: '',
  logoAlt: '',
  steps: [],
  activeStep: '',
}

export default applyThemr(Header)
