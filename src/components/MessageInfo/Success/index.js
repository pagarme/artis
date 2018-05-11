import React, { Fragment } from 'react'
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
import { propOr } from 'ramda'

import { DarkButton } from './../../'
import { formatToBRL } from '../../../utils/masks/'
import SuccessIcon from '../../../images/confirmacao_sucesso.svg'
import CopyIcon from '../../../images/copy.svg'
import DownloadIcon from '../../../images/download.svg'
import CloseXIcon from '../../../images/closeX.svg'
import OrderIcon from '../../../images/pedido.svg'

const consumeTheme = ThemeConsumer('UISuccessMessageInfo')

const Success = ({
  amount,
  boleto,
  closeCheckout,
  creditCard,
  orderUrl,
  theme,
}) => {
  const openLink = url => () => window.open(url, '_blank')

  const formatExpirationAt = value => (
    value
      ? moment(value).format('L')
      : moment().add(1, 'days').format('L')
  )

  const handleBarcodeCopy = barcode => (
    () => {
      ReactGA.event({
        category: 'Boleto',
        action: 'Copy Bar Code',
      })

      copy(barcode)
    }
  )

  const handleBoletoSaveFile = fileUrl =>
    () => {
      ReactGA.event({
        category: 'Boleto',
        action: 'Download boleto',
      })

      openLink(fileUrl)
    }

  const renderTexts = () => {
    const installmentText = propOr('', 'installmentText', creditCard)
    if (installmentText.length > 0) {
      return (
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
      return (
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

          <Row className={theme.boletoButtonsWrapper}>
            <Col
              tv={6}
              desk={6}
              tablet={6}
              palm={6}
              className={theme.noPaddingBottom}
            >
              <DarkButton
                onClick={handleBarcodeCopy(boleto.barcode)}
                title="Copiar código"
                icon={<CopyIcon className={theme.whiteIcon} />}
              />
            </Col>
            <Col
              tv={6}
              desk={6}
              tablet={6}
              palm={6}
              className={theme.noPaddingBottom}
            >
              <DarkButton
                onClick={handleBoletoSaveFile(boleto.url)}
                title="Salvar código"
                icon={<DownloadIcon className={theme.whiteIcon} />}
              />
            </Col>
          </Row>
        </Fragment >
      )
    }

    return null
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
            <SuccessIcon className={theme.headerIcon} />
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
                icon={<CloseXIcon className={theme.whiteIcon} />}
                onClick={closeCheckout}
                size="tiny"
              >
                Fechar
              </Button>
            </Col>
            {
              orderUrl &&
              <Col
                tv={6}
                desk={6}
                tablet={6}
                palm={6}
                className={theme.buttonColumn}
              >
                <Button
                  fill="outline"
                  icon={<OrderIcon className={theme.whiteIcon} />}
                  onClick={openLink(orderUrl)}
                  size="tiny"
                >
                  Ver pedido
                </Button>
              </Col>
            }
          </div>
        </Row>
      </div>
    </div>
  )
}

Success.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  boleto: PropTypes.shape({
    barcode: PropTypes.number,
    name: PropTypes.string,
    url: PropTypes.string,
    expirationAt: PropTypes.string,
  }),
  creditCard: PropTypes.shape({
    installmentText: PropTypes.string,
  }),
  theme: PropTypes.shape({
    buttonColumn: PropTypes.string,
    buttonsWrapper: PropTypes.string,
    centerJustifyContent: PropTypes.string,
    noPadding: PropTypes.string,
    noPaddingBottom: PropTypes.string,
    subtitle: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string,
    whiteIcon: PropTypes.string,
  }).isRequired,
  closeCheckout: PropTypes.func,
  orderUrl: PropTypes.string,
}

Success.defaultProps = {
  boleto: {},
  creditCard: {},
  closeCheckout: null,
  orderUrl: '',
}

export default consumeTheme(Success)
