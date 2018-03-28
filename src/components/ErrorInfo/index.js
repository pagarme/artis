import React from 'react'
import { themr } from 'react-css-themr'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'

import { Row } from '../Grid'

const applyThemr = themr('UIErrorInfo')

const ErrorInfo = ({
  theme,
  isBigScreen,
  title,
  subtitle,
}) => (
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
}

ErrorInfo.defaultProps = {
  theme: {},
  title: 'Seu pagamento foi recusado',
  subtitle: 'Ocorreu um erro ao processar sua transação, tente novamente mais tarde ou entre em contato com seu banco.',
}

const mapStateToProps = ({ screenSize }) => ({
  isBigScreen: screenSize.isBigScreen,
})

export default connect(mapStateToProps)(applyThemr(ErrorInfo))
