import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  Row,
  Grid,
  Col,
  ThemeConsumer,
  Button,
} from 'former-kit'

const consumeTheme = ThemeConsumer('UISuccessMessageInfo')

const Success = ({ amount, boleto, creditCard, theme }) => {
  const renderTexts = () => {
    let content = null

    if (creditCard.installments) {
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
                {creditCard.installments}x vezes de R$
                {creditCard.installmentValue} com juros de
                {creditCard.installmentRate}% ao mês
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
                {boleto.expireAt}
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
    <Grid>
      <div className={theme.wrapper}>
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
            <p className={theme.value}>R$ {amount}</p>
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
              >
                {boleto.url ? 'Copiar código de barras' : 'Ver pedido'}
              </Button>
            </Col>
          </div>
        </Row>
      </div>
    </Grid>
  )
}

Success.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  boleto: PropTypes.shape({
    barcode: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
    expireAt: PropTypes.string,
  }),
  creditCard: PropTypes.shape({
    installments: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    installmentValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    installmentRate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
