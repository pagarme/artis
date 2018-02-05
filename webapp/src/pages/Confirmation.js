import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'
import classNames from 'classnames'

import { Grid, Row, Col } from '../components/Grid'
import SuccessInfo from '../components/SuccessInfo'
import ErrorInfo from '../components/ErrorInfo'
import LoadingInfo from '../components/LoadingInfo'
import successIcon from '../images/success-icon.png'
import errorIcon from '../images/error-icon.png'

const applyThemr = themr('UIConfirmationPage')

const iconColSize = 4
const contentColSize = 8
const defaultColSize = 12

const baseUrl = 'https://api.mundipagg.com/checkout/v1/'

const defaultToken = {
  type: 'order',
  currency: 'BRL',
}

const getBoletoData = payment => ({
  instructions: payment.method.instructions || '',
  due_at: payment.method.expirationAt,
})

const getCreditcardData = ({ method, info }) => ({
  statement_descriptor: method.statementDescriptor || '',
  installments: [
    {
      Number: info.installments.value,
      Total: info.installments.amount,
    },
  ],
})

const getSpecificData = payment => (
  payment.method.type === 'boleto' ?
    getBoletoData(payment) :
    getCreditcardData(payment)
)

const getTokenData = (payment, postback) => {
  const { method } = payment

  return {
    ...defaultToken,
    success_url: postback,
    payment_settings: {
      accepted_payment_methods: [method.type],
      [method.type]: getSpecificData(payment),
    },
  }
}

class Confirmation extends React.Component {
  constructor (props) {
    super(props)

    this.isRequesting = false

    this.state = {
      loading: true,
      success: false,
      barcode: '',
    }
  }

  componentWillReceiveProps (newProps) {
    const {
      postback,
      key,
    } = this.props.transactionData

    const {
      payment,
    } = newProps.transactionData

    if (payment && !this.isRequesting) {
      this.isRequesting = true

      const tokenPayload = {
        method: 'POST',
        headers: {
          Authorization: `Basic ${key}`,
        },
        data: getTokenData(payment, postback),
      }

      fetch(`${baseUrl}/tokens`, tokenPayload)
        .then((res) => {
          if (res.status < 300 && res.ok) {
            this.setState({ success: true, loading: false })
          } else {
            this.setState({ success: false, loading: false })
          }
        })
    }
  }

  render () {
    const {
      theme,
      isBigScreen,
    } = this.props

    const {
      success,
      loading,
      barcode,
    } = this.state

    if (loading) {
      return <LoadingInfo />
    }

    return (
      <Grid
        className={theme.page}
      >
        <Row
          stretch
        >
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
                  isBigScreen={isBigScreen}
                  barcode={barcode}
                />
                : <ErrorInfo isBigScreen={isBigScreen} />
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
  }),
  transactionData: PropTypes.shape({
    amount: PropTypes.number,
    customer: PropTypes.object,
    shipping: PropTypes.object,
    billing: PropTypes.object,
    payment: PropTypes.object,
    postback: PropTypes.string,
    key: PropTypes.string,
  }).isRequired,
  isBigScreen: PropTypes.bool.isRequired,
}

Confirmation.defaultProps = {
  theme: {},
}

export default applyThemr(Confirmation)
