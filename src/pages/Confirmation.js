import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { allPass, prop } from 'ramda'

import {
  Grid,
  Row,
  Col,
  SuccessInfo,
  ErrorInfo,
  LoadingInfo,
} from '../components'

import { request, strategies } from '../utils/parsers/request'

import successIcon from '../images/success-icon.png'
import errorIcon from '../images/error-icon.png'

const applyThemr = themr('UIConfirmationPage')

const iconColSize = 4
const contentColSize = 8
const defaultColSize = 12

const strategyName = 'pagarme'

const hasAllData = allPass([
  prop('customer'),
  prop('billing'),
  prop('shipping'),
  prop('payment'),
  prop('amount'),
  prop('publickey'),
  prop('postback'),
  prop('items'),
])

class Confirmation extends React.Component {
  state = {
    loading: true,
    success: false,
    barcode: '',
  }

  componentWillReceiveProps (newProps) {
    this.createATransaction(newProps)
  }

  isRequesting = false

  createATransaction (transactionData) {
    if (hasAllData(transactionData) && !this.isRequesting) {
      this.isRequesting = true

      request(transactionData, strategies[strategyName])
        .then(() => {
          this.setState({ success: true, loading: false })
        })
        .catch(() => this.setState({ success: false, loading: false }))
    }
  }

  render () {
    const { theme, base } = this.props
    const { success, loading, barcode } = this.state

    if (loading) return <LoadingInfo />

    return (
      <Grid
        id="confirmation-page"
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
              {success
                ? <img
                  src={successIcon}
                  alt={'Ícone de sucesso'}
                  className={theme.successIcon}
                />
                : <img
                  src={errorIcon}
                  alt={'Ícone de erro'}
                  className={theme.errorIcon}
                />
              }
            </div>
          </Col>
          <Col
            tv={contentColSize}
            desk={contentColSize}
            tablet={contentColSize}
            palm={defaultColSize}
          >
            {
              success
                ? <SuccessInfo
                  barcode={barcode}
                  base={base}
                />
                : <ErrorInfo />
            }
          </Col>
        </Row>
      </Grid>
    )
  }
}

Confirmation.propTypes = {
  theme: PropTypes.shape({
    page: PropTypes.string,
    successIcon: PropTypes.string,
    errorIcon: PropTypes.string,
    alignSelfCenter: PropTypes.string,
    confirmationIcon: PropTypes.string,
    light: PropTypes.string,
    dark: PropTypes.string,
  }),
  base: PropTypes.string,
}

Confirmation.defaultProps = {
  theme: {},
  base: 'dark',
}

const mapStateToProps = ({ pageInfo }) => ({
  customer: pageInfo.customer,
  billing: pageInfo.billing,
  shipping: pageInfo.shipping,
  payment: pageInfo.payment,
})

export default connect(mapStateToProps)(applyThemr(Confirmation))
