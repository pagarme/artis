import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { clamp } from 'ramda'
import { themr } from 'react-css-themr'

import { Grid, Row, Col } from '../Grid'

const applyThemr = themr('UIProgressBar')

const renderSteps = (steps, activePage, theme) => {
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
                  [theme.active]: index === activePage,
                })
              }
            >
              <span className={theme.index}>{ `${index + 1}.` }</span>
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
}) => {
  const totalSteps = steps.length
  const activeStep = activePage + 1
  const shouldRenderSteps = totalSteps > 0

  const totalPercent = clamp(
    0,
    100,
    (100 / totalSteps) * activeStep
  )

  const width = `${totalPercent}%`

  return (
    <Fragment>
      { shouldRenderSteps &&
        renderSteps(steps, activePage, theme)
      }
      <div className={theme.wrapper}>
        <div className={theme.progressBar} style={{ width }} />
      </div>
    </Fragment>
  )
}

ProgressBar.propTypes = {
  theme: PropTypes.shape({
    step: PropTypes.string,
    steps: PropTypes.string,
    wrapper: PropTypes.string,
    progressBar: PropTypes.string,
    index: PropTypes.string,
  }),
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  activePage: PropTypes.number.isRequired,
}

ProgressBar.defaultProps = {
  theme: {},
}

export default applyThemr(ProgressBar)
