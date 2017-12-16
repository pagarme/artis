import React from 'react'
import { Grid, Row, Col } from '../components/Grid'

import style from './styles.css'

const renderCols = (colSize, pages) =>
  pages.map(page => (
    <Col
      tv={colSize}
      desk={colSize}
      tablet={colSize}
    >
      { page }
    </Col>
  ))

const renderJoinedPages = (pages) => {
  const colSize = 12 / pages.length

  if (!pages.length) return null

  return (
    <Grid className={style.page}>
      <Row>
        { renderCols(colSize, pages) }
      </Row>
    </Grid>
  )
}

export default renderJoinedPages
