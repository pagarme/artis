import React from 'react'
import { themr } from 'react-css-themr'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { Grid } from 'former-kit'

import { Col, Row } from '../Grid'

import errorIcon from '../../images/error-icon.png'

const applyThemr = themr('UIErrorInfo')

const iconColSize = 4
const contentColSize = 8
const defaultColSize = 12

const ErrorInfo = ({
  theme,
  base,
  isBigScreen,
  title,
  subtitle,
}) => (
  <Grid
    className={classNames(theme[base], theme.page)}
  >
    <Row stretch>
      <Col
        tv={iconColSize}
        desk={iconColSize}
        tablet={iconColSize}
        palm={defaultColSize}
        alignCenter
      >
        <div className={
          classNames(
            theme.alignSelfCenter,
            theme.confirmationIcon,
          )
        }
        >
          <img
            src={errorIcon}
            alt={'Ícone de erro'}
            className={theme.errorIcon}
          />
        </div>
      </Col>
      <Col
        tv={contentColSize}
        desk={contentColSize}
        tablet={contentColSize}
        palm={defaultColSize}
      >
        <div className={
          classNames(
            theme.alignSelfCenter,
            {
              [theme.mediumSize]: isBigScreen,
            },
          )
        }
        >
          <Row className={theme.title}>
            <h4 className={
              classNames(
                {
                  [theme.textAlignedCenter]: !isBigScreen,
                },
                theme.error,
              )}
            >
              {title}
            </h4>
            <p className={
              classNames(
                {
                  [theme.textAlignedCenter]: !isBigScreen,
                },
                theme.info,
              )}
            >
              {subtitle}
            </p>
          </Row>
        </div>
      </Col>
    </Row>
  </Grid>
)

ErrorInfo.propTypes = {
  theme: PropTypes.shape({
    alignSelfCenter: PropTypes.string,
    textAlignedCenter: PropTypes.string,
    mediumSize: PropTypes.string,
    title: PropTypes.string,
    info: PropTypes.string,
    error: PropTypes.string,
  }),
  isBigScreen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  base: PropTypes.string,
}

ErrorInfo.defaultProps = {
  theme: {},
  base: 'dark',
  title: 'Seu pagamento foi recusado',
  subtitle: `Ocorreu um erro ao processar sua transação,
    tente novamente mais tarde ou entre em contato com seu banco.`,
}

const mapStateToProps = ({ screenSize }) => ({
  isBigScreen: screenSize.isBigScreen,
})

export default connect(mapStateToProps)(applyThemr(ErrorInfo))
