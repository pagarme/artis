import React from 'react'
import PropTypes from 'prop-types'

import classNames from 'classnames'
import { themr } from 'react-css-themr'
import {
  LinearProgress,
} from 'former-kit'

const applyThemr = themr('UIProgressBar')

const renderSteps = (steps, activeStep, theme) => (
  <div className={theme.steps}>
    {
      steps.map((step, index) => (
        <div
          key={`step-${index + 1}`}
          className={
            classNames(theme.step, {
              [theme.active]: index === activeStep,
              [theme.passed]: index < activeStep,
            })
          }
        >
          { step.icon }
          { step.title }
        </div>
      ))
    }
  </div>
)

const ProgressBar = ({
  theme,
  base,
  steps,
  activeStepIndex,
  percentage,
}) => (
  <div className={theme[base]}>
    {
      steps.length &&
      renderSteps(steps, activeStepIndex, theme)
    }
    <LinearProgress label="Linear Progress" percent={percentage} />
  </div>
)

ProgressBar.propTypes = {
  theme: PropTypes.shape(),
  base: PropTypes.string,
  steps: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeStepIndex: PropTypes.number,
  percentage: PropTypes.number,
}

ProgressBar.defaultProps = {
  theme: {},
  base: 'dark',
  activeStepIndex: 0,
  percentage: 0,
}

export default applyThemr(ProgressBar)
