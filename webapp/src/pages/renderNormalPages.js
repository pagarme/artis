import React from 'react'
import { Grid, Row, Col } from '../components/Grid'

import style from './styles.css'

const renderCols = (colSize, pages) =>
  pages.map(page => (
    <Grid className={style.page}>
      <Row>
        <Col
          tv={colSize}
          desk={colSize}
          tablet={colSize}
        >
          { page }
        </Col>
      </Row>
    </Grid>
  ))

const renderNormalPages = (pages) => {
  const colSize = 12

  return renderCols(colSize, pages)
}

export default renderNormalPages
