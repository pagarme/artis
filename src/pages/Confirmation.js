import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { allPass, prop, merge, pathOr } from 'ramda'

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

const errorMessages = {
  error: {
    errorTitle: 'Ocorreu um erro ao processar seu pagamento',
    errorSubtitle: 'Tente novamente mais tarde ou entre em contato.',
  },
  unauthorized: {
    errorTitle: 'Seu pagamento foi recusado',
    errorSubtitle: 'Tente novamente mais tarde ou entre em contato com seu banco.',
  },
}

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

const getFileName = pathOr('boleto.pdf', ['method', 'fileName'])

const getErrorMessage = response => (
  (response.status === 'unauthorized') ?
    errorMessages.unauthorized :
    errorMessages.error
)

class Confirmation extends React.Component {
  constructor (props) {
    super(props)

    this.isRequesting = false

    this.state = {
      loading: true,
      success: false,
      errorTitle: '',
      errorSubtitle: '',
      boletoBarcode: '',
      boletoUrl: '',
    }
  }

  componentWillReceiveProps (newProps) {
    this.createATransaction(newProps)
  }

  onRequest = (response) => {
    const { onSuccess, onError } = this.props

    if (response.status === 'authorized') {
      let successState = { success: true, loading: false }

      if (onSuccess) {
        onSuccess(response)
      }

      if (response.boleto_barcode || response.boleto_url) {
        successState = merge(
          successState,
          {
            boletoUrl: response.boleto_url,
            boletoBarcode: response.boleto_barcode,
          }
        )
      }

      return this.setState(successState)
    }

    if (onError) {
      onError(response)
    }

    return this.setState({
      success: false,
      loading: false,
      ...getErrorMessage(response),
    })
  }

  createATransaction (transactionData) {
    if (hasAllData(transactionData) && !this.isRequesting) {
      this.isRequesting = true

      request(transactionData, strategies[strategyName])
        .then(this.onRequest)
        .catch((e) => { throw e })
    }
  }

  render () {
    const { theme, base, payment } = this.props // eslint-disable-line
    const {
      success,
      loading,
      boletoBarcode,
      boletoUrl,
      errorTitle,
      errorSubtitle,
    } = this.state

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
                  boletoBarcode={boletoBarcode}
                  boletoUrl={boletoUrl}
                  boletoName={getFileName(payment)}
                  base={base}
                />
                : <ErrorInfo
                  title={errorTitle}
                  subtitle={errorSubtitle}
                />
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
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
}

Confirmation.defaultProps = {
  theme: {},
  base: 'dark',
  boletoName: '',
  onSuccess: null,
  onError: null,
}

const mapStateToProps = ({ pageInfo }) => ({
  customer: pageInfo.customer,
  billing: pageInfo.billing,
  shipping: pageInfo.shipping,
  payment: pageInfo.payment,
})

export default connect(mapStateToProps)(applyThemr(Confirmation))
