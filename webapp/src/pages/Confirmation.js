import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'
import classNames from 'classnames'
import axios from 'axios'

import {
  Grid,
  Row,
  Col,
  SuccessInfo,
  ErrorInfo,
  LoadingInfo,
} from '../components'

import { tokenData, headers } from '../utils/parsers/request'

import successIcon from '../images/success-icon.png'
import errorIcon from '../images/error-icon.png'

const applyThemr = themr('UIConfirmationPage')

const iconColSize = 4
const contentColSize = 8
const defaultColSize = 12

const baseUrl = 'https://api.mundipagg.com/checkout/v1'
const tokenUrl = `${baseUrl}/tokens`

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
    const { transactionData } = newProps
    const { key, payment } = transactionData

    if (!payment) throw new Error('Ops! Forma de pagamento não identificada.')

    if (!this.isRequesting) {
      this.isRequesting = true

      axios.post(
        tokenUrl,
        headers(key),
        tokenData(transactionData)
      )
        .then(() => this.setState({ success: true, loading: false }))
        .catch(() => this.setState({ success: false, loading: false }))
    }
  }

  render () {
    const { theme, isBigScreen } = this.props
    const { success, loading, barcode } = this.state

    if (loading) return <LoadingInfo />

    return (
      <Grid className={theme.page}>
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
  isBigScreen: PropTypes.bool.isRequired,
}

Confirmation.defaultProps = {
  theme: {},
}

export default applyThemr(Confirmation)
