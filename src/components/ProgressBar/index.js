import React from 'react'
import PropTypes from 'prop-types'
import {
  __,
  clamp,
  divide,
  equals,
  findIndex,
  inc,
  length,
  lt,
  multiply,
  pipe,
  propEq,
} from 'ramda'
import classNames from 'classnames'

import LinearProgress from '../../former-kit/LinearProgress'
import ThemeConsumer from '../../former-kit/ThemeConsumer'

const consumeTheme = ThemeConsumer('UIProgressBar')

const renderSteps = (steps, activeStep, theme) => (
  <div className={theme.steps}>
    {
      steps.map((step, index) => (
        <div
          key={`step-${index + 1}`}
          className={
            classNames(theme.step, {
              [theme.active]: equals(inc(index), activeStep),
              [theme.passed]: lt(inc(index), activeStep),
            })
          }
        >
          { step.icon }
          <span className={theme.title}>
            { step.title }
          </span>
        </div>
      ))
    }
  </div>
)

const ProgressBar = ({
  activeStep,
  steps,
  theme,
}) => {
  const activeStepIndex = inc(findIndex(propEq('page', activeStep), steps))

  const calculateTotalPercentage = pipe(
    length,
    divide(100, __),
    multiply(activeStepIndex))

  const percentage = clamp(0, 100, calculateTotalPercentage(steps))

  return (
    <div>
      {
        steps.length &&
        renderSteps(steps, activeStepIndex, theme)
      }
      <LinearProgress
        max={100}
        label={false}
        value={percentage}
      />
    </div>
  )
}

ProgressBar.propTypes = {
  theme: PropTypes.shape(),
  activeStep: PropTypes.string.isRequired,
  steps: PropTypes.arrayOf(PropTypes.object).isRequired,
}

ProgressBar.defaultProps = {
  theme: {},
}

export default consumeTheme(ProgressBar)
