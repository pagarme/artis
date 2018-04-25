import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'
import {
  Grid,
  Row,
  Col,
} from 'former-kit'

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
        align={'center'}
      >
        <p className={theme.title}>Processando sua compra</p>
        <p className={theme.subtitle}>Aguenta firme, é rapidinho</p>
        <div className={theme.wrapper}>
          <div className={theme.loadingAnimation} />
        </div>
      </Col>
    </Row>
  </Grid>
)

LoadingInfo.propTypes = {
  theme: PropTypes.shape({
    page: PropTypes.string,
    wrapper: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    loadingAnimation: PropTypes.string,
    col: PropTypes.string,
    row: PropTypes.string,
  }),
}

LoadingInfo.defaultProps = {
  theme: {},
}

export default applyThemr(LoadingInfo)
