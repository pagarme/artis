import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { prop, propEq, findIndex, filter, slice, length } from 'ramda'
import { themr } from 'react-css-themr'

import { Grid, Row, Col } from '../Grid'

const applyThemr = themr('UIProgressBar')

const getStepsPayload = (pages, active) => {
  const visibleSteps = filter(prop('visible'), pages)
  const activeStepIndex = findIndex(propEq('page', active), pages) + 1
  const activeSteps = slice(1, activeStepIndex, pages)

  const activeStep = filter(prop('visible'), activeSteps).length
  const percentage = (100 / length(visibleSteps)) * (activeStep + 1)

  return {
    percentage,
    activeStep,
    stepsList: visibleSteps,
  }
}

const renderSteps = (steps, activeStep, theme) => {
  const colSize = 12 / steps.length

  return (
    <Grid className={theme.steps}>
      <Row>
        { steps
          .map((step, index) => (
            <Col
              key={`colKey-${index + 1}`}
              tv={colSize}
              desk={colSize}
              tablet={colSize}
              className={
                classNames(theme.step, {
                  [theme.active]: index === activeStep,
                  [theme.passed]: index < activeStep,
                })
              }
            >
              <span className={theme.stepIndex}>{ `${index + 1}.` }</span>
              { step.title }
            </Col>
          ))
        }
      </Row>
    </Grid>
  )
}

const ProgressBar = ({
  theme,
  base,
  steps,
  activePage,
}) => {
  const {
    stepsList,
    activeStep,
    percentage,
  } = getStepsPayload(steps, activePage)

  const width = `${percentage}%`

  return (
    <div className={theme[base]}>
      { stepsList.length &&
        renderSteps(stepsList, activeStep, theme)
      }
      <div className={theme.wrapper}>
        <div className={theme.progressBar} style={{ width }} />
      </div>
    </div>
  )
}

ProgressBar.propTypes = {
  theme: PropTypes.shape({
    step: PropTypes.string,
    steps: PropTypes.string,
    wrapper: PropTypes.string,
    progressBar: PropTypes.string,
    index: PropTypes.string,
    active: PropTypes.string,
    passed: PropTypes.string,
    light: PropTypes.string,
    dark: PropTypes.string,
  }),
  base: PropTypes.string,
  steps: PropTypes.arrayOf(PropTypes.object).isRequired,
  activePage: PropTypes.string,
}

ProgressBar.defaultProps = {
  theme: {},
  base: 'dark',
  activePage: '',
}

export default applyThemr(ProgressBar)
