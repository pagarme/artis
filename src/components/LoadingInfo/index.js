import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ThemeConsumer from '../../former-kit/ThemeConsumer'
import Grid from '../../former-kit/Grid'
import Row from '../../former-kit/Row'
import Col from '../../former-kit/Col'

const consumeTheme = ThemeConsumer('UILoadingInfo')

const defaultColSize = 12

const LoadingInfo = ({
  theme,
  title,
  subtitle,
  fullscreen,
}) => (
  <Grid
    className={classNames(theme.page, {
      [theme.fullscreen]: fullscreen,
    })}
  >
    <Row>
      <Col
        tv={defaultColSize}
        desk={defaultColSize}
        tablet={defaultColSize}
        palm={defaultColSize}
        align="center"
      >
        <p className={theme.title}>{title}</p>
        <p className={theme.subtitle}>{subtitle}</p>
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
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  fullscreen: PropTypes.bool,
}

LoadingInfo.defaultProps = {
  theme: {},
  fullscreen: false,
}

export default consumeTheme(LoadingInfo)
