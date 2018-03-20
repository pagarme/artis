import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { clamp } from 'ramda'
import { themr } from 'react-css-themr'

import { Grid, Row, Col } from '../Grid'

const applyThemr = themr('UIProgressBar')

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
                  [theme.active]: index === activeStep - 1,
                  [theme.passed]: index < activeStep - 1,
                })
              }
            >
              <span className={theme.stepIndex}>{ `${index + 1}.` }</span>
              { step }
            </Col>
          ))
        }
      </Row>
    </Grid>
  )
}

const ProgressBar = ({
  steps,
  activePage,
  theme,
  base,
}) => {
  const totalSteps = steps.length
  const activeStep = steps.indexOf(activePage) + 1
  const shouldRenderSteps = totalSteps > 0

  const totalCalc = (100 / totalSteps) * activeStep
  const totalPercent = clamp(0, 100, totalCalc)
  const width = `${totalPercent}%`

  return (
    <div className={theme[base]}>
      { shouldRenderSteps &&
        renderSteps(steps, activeStep, theme)
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
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  activePage: PropTypes.string.isRequired,
}

ProgressBar.defaultProps = {
  theme: {},
  base: 'dark',
}

export default applyThemr(ProgressBar)
