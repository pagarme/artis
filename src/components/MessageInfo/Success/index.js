import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import moment from 'moment'
import {
  Row,
  Col,
  ThemeConsumer,
  Button,
} from 'former-kit'
import ReactGA from 'react-ga'
import copy from 'copy-to-clipboard'

import { formatToBRL } from '../../../utils/masks/'
import SuccessIcon from '../../../images/confirmacao_sucesso.svg'

const consumeTheme = ThemeConsumer('UISuccessMessageInfo')

const Success = ({ amount, boleto, creditCard, theme }) => {
  const formatExpirationAt = value => (
    value
      ? moment(value).format('L')
      : moment().add(1, 'days').format('L')
  )

  const handleBarcodeCopy = (barcode) => {
    ReactGA.event({
      category: 'Boleto',
      action: 'Copy Bar Code',
    })

    copy(barcode)
  }

  const handleBoletoSaveFile = fileUrl => (
    () => {
      ReactGA.event({
        category: 'Boleto',
        action: 'Download boleto',
      })

      window.open(fileUrl, '_blank')
    }
  )

  const handleCloseCheckout = () => {
    const { targetElement } = this.props

    ReactGA.event({
      category: 'Header',
      action: 'Click - Close Button',
    })

    this.setState({ closingEffect: true })

    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(
        targetElement
      )
    }, 500)
  }

  const renderTexts = () => {
    let content = null

    if (creditCard.installmentText) {
      content = (
        <Fragment>
          <Row className={theme.noPadding}>
            <Col
              tv={12}
              desk={12}
              tablet={12}
              palm={12}
              className={theme.noPaddingBottom}
            >
              <p className={theme.subtitle}>Parcelamento:</p>
              <p className={theme.value}>
                {creditCard.installmentText}
              </p>
            </Col>
          </Row>
        </Fragment>
      )
    }

    if (boleto.url) {
      content = (
        <Fragment>
          <Row className={theme.noPadding}>
            <Col
              tv={12}
              desk={12}
              tablet={12}
              palm={12}
              className={theme.noPaddingBottom}
            >
              <p className={theme.subtitle}>Vencimento:</p>
              <p className={theme.value}>
                {formatExpirationAt(boleto.expirationAt)}
              </p>
            </Col>
          </Row>
          <Row className={theme.noPadding}>
            <Col
              tv={12}
              desk={12}
              tablet={12}
              palm={12}
              className={theme.noPaddingBottom}
            >
              <p className={theme.subtitle}>Código de barras:</p>
              <p className={theme.value}>
                {boleto.barcode}
              </p>
            </Col>
          </Row>
        </Fragment>
      )
    }

    return content
  }

  return (
    <div className={theme.wrapper}>
      <div className={theme.box}>
        <Row className={theme.noPadding}>
          <Col
            tv={12}
            desk={12}
            tablet={12}
            palm={12}
            className={theme.noPaddingBottom}
          >
            <SuccessIcon />
          </Col>
        </Row>
        <Row className={theme.noPadding}>
          <Col
            tv={12}
            desk={12}
            tablet={12}
            palm={12}
            className={theme.noPaddingBottom}
          >
            <h1 className={theme.title}>Deu tudo certo!</h1>
            <hr className={theme.line} />
          </Col>
        </Row>
        <Row className={theme.noPadding}>
          <Col
            tv={12}
            desk={12}
            tablet={12}
            palm={12}
            className={theme.noPaddingBottom}
          >
            <p className={theme.subtitle}>
              {
                boleto.url ? 'Valor a pagar:' : 'Valor pago:'
              }
            </p>
            <p className={theme.value}>{formatToBRL(amount)}</p>
          </Col>
        </Row>
        { renderTexts() }
        <Row className={
          classNames(theme.noPadding, theme.centerJustifyContent)}
        >
          <div
            className={theme.buttonsWrapper}
          >
            <Col
              tv={6}
              desk={6}
              tablet={6}
              palm={6}
              className={theme.buttonColumn}
            >
              <Button
                fill="gradient"
                onClick={
                  boleto.url
                    ? handleBoletoSaveFile(boleto.url)
                    : handleCloseCheckout
                }
              >
                {boleto.url ? 'Salvar arquivo' : 'Fechar'}
              </Button>
            </Col>
            <Col
              tv={6}
              desk={6}
              tablet={6}
              palm={6}
              className={theme.buttonColumn}
            >
              <Button
                fill="outline"
                onClick={boleto.url ? handleBarcodeCopy(boleto.barcode) : ''}
              >
                {boleto.url ? 'Copiar código' : 'Ver pedido'}
              </Button>
            </Col>
          </div>
        </Row>
      </div>
    </div>
  )
}

Success.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  boleto: PropTypes.shape({
    barcode: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
    expirationAt: PropTypes.string,
  }),
  creditCard: PropTypes.shape({
    installmentText: PropTypes.string,
  }),
  theme: PropTypes.shape({
    buttonsWrapper: PropTypes.string,
    buttonColumn: PropTypes.string,
    centerJustifyContent: PropTypes.string,
    noPadding: PropTypes.string,
    noPaddingBottom: PropTypes.string,
    subtitle: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
}

Success.defaultProps = {
  boleto: {},
  creditCard: {},
}

export default consumeTheme(Success)
