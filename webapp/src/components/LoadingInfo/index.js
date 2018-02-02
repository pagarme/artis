import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'

import { Grid, Row, Col } from '../Grid'

const applyThemr = themr('UILoadingInfo')

const defaultColSize = 12

const LoadingInfo = ({ theme }) => (
  <Grid
    className={theme.page}
  >
    <Row>
      <Col
        tv={defaultColSize}
        desk={defaultColSize}
        tablet={defaultColSize}
        palm={defaultColSize}
        alignCenter
      >
        <h4 className={theme.loading}>
          Aguarde, finalizando a compra...
        </h4>
      </Col>
    </Row>
  </Grid>
)

LoadingInfo.propTypes = {
  theme: PropTypes.shape({
    field: PropTypes.string,
    value: PropTypes.string,
    mediumSize: PropTypes.string,
    success: PropTypes.string,
    title: PropTypes.string,
  }),
}

LoadingInfo.defaultProps = {
  theme: {},
}

export default applyThemr(LoadingInfo)
