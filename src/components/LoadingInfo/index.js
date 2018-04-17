import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'
import { Grid } from 'former-kit'

import { Row, Col } from '../Grid'

const applyThemr = themr('UILoadingInfo')

const defaultColSize = 12

const LoadingInfo = ({ theme, title, subtitle }) => (
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
        <div className={theme.loadingWrapper}>
          <h1 className={theme.loadingText}>{title}</h1>
          <div className={theme.loadingContent} />
        </div>
        <div className={theme.subtitle}>{subtitle}</div>
      </Col>
    </Row>
  </Grid>
)

LoadingInfo.propTypes = {
  theme: PropTypes.shape({
    page: PropTypes.string,
    loadingWrapper: PropTypes.string,
    loadingText: PropTypes.string,
    loadingContent: PropTypes.string,
    subtitle: PropTypes.string,
    col: PropTypes.string,
    row: PropTypes.string,
  }),
  title: PropTypes.string,
  subtitle: PropTypes.string,
}

LoadingInfo.defaultProps = {
  theme: {},
  title: 'Finalizando',
  subtitle: 'Aguarde, dentro de alguns instantes finalizaremos sua compra.',
}

export default applyThemr(LoadingInfo)
