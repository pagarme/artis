import React, { Fragment } from 'react'
import {
  arrayOf,
  string,
  number,
} from 'prop-types'
import classNames from 'classnames'
import { clamp } from 'ramda'

import { Grid, Row, Col } from '../Grid'

import style from './style.css'

const renderSteps = (steps, activePage) => {
  const colSize = 12 / steps.length

  return (
    <Grid className={style.steps}>
      <Row>
        { steps.map((step, index) => (
          <Col
            key={`colKey-${index + 1}`}
            tv={colSize}
            desk={colSize}
            tablet={colSize}
            className={
              classNames(style.step, {
                [style.active]: index === activePage,
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
        renderSteps(steps, activePage)
      }
      <div className={style.wrapper}>
        <div className={style.progressBar} style={{ width }} />
      </div>
    </Fragment>
  )
}

ProgressBar.propTypes = {
  steps: arrayOf(string).isRequired,
  activePage: number.isRequired,
}

export default ProgressBar
