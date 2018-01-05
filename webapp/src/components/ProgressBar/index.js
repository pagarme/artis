import React, { Fragment } from 'react'
import {
  arrayOf,
  string,
  number,
  shape,
} from 'prop-types'
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
        { steps.map((step, index) => (
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
            { `${index + 1}. ${step}` }
          </Col>
        ))}
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
    (100 / totalSteps) * activeStep,
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
  theme: shape({
    step: string,
    steps: string,
    wrapper: string,
    progressBar: string,
  }),
  steps: arrayOf(string).isRequired,
  activePage: number.isRequired,
}

ProgressBar.defaultProps = {
  theme: {},
}

export default applyThemr(ProgressBar)
