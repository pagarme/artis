import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { ThemeConsumer } from 'former-kit'
import ReactGA from 'react-ga'
import copy from 'copy-to-clipboard'
import { propOr } from 'ramda'

import { ActionButton, Button } from './../../'
import { formatToBRL } from '../../../utils/masks/'
import SuccessIcon from '../../../images/confirmacao_sucesso.svg'
import CopyIcon from '../../../images/copy.svg'
import DownloadIcon from '../../../images/download.svg'
import CloseXIcon from '../../../images/closeX.svg'
import OrderIcon from '../../../images/pedido.svg'

const consumeTheme = ThemeConsumer('UISuccessMessageInfo')

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

const handleSeeOrder = url => () => {
  ReactGA.event({
    category: 'Success',
    action: 'See order',
  })

  openLink(url)
}

const handleBoletoSaveFile = fileUrl =>
  () => {
    ReactGA.event({
      category: 'Boleto',
      action: 'Download boleto',
    })

    openLink(fileUrl)
  }

class Success extends React.Component {
  componentDidMount () {
    ReactGA.pageview('/success')
  }

  renderTexts = () => {
    const {
      theme,
      creditCard,
      boleto,
    } = this.props

    const installmentText = propOr('', 'installmentText', creditCard)

    if (installmentText.length > 0) {
      return (
        <Fragment>
          <h3 className={theme.infoField}>Parcelamento:</h3>
          <p className={theme.infoValue}>
            {creditCard.installmentText}
          </p>
        </Fragment>
      )
    }

    if (boleto.url) {
      return (
        <Fragment>
          <h3 className={theme.infoField}>Vencimento:</h3>
          <p className={theme.infoValue}>
            {formatExpirationAt(boleto.expirationAt)}
          </p>
          <h3 className={theme.infoField}>Código de barras:</h3>
          <p className={theme.infoValue}>
            {boleto.barcode}
          </p>
          <div className={theme.boletoButtonsWrapper}>
            <ActionButton
              onClick={handleBarcodeCopy(boleto.barcode)}
              title="Copiar código"
              icon={<CopyIcon className={theme.whiteIcon} />}
            />
            <ActionButton
              onClick={handleBoletoSaveFile(boleto.url)}
              title="Salvar código"
              icon={<DownloadIcon className={theme.whiteIcon} />}
            />
          </div>
        </Fragment >
      )
    }

    return null
  }

  render () {
    const {
      amount,
      boleto,
      closeCheckout,
      orderUrl,
      theme,
    } = this.props

    return (
      <section className={theme.wrapper}>
        <header className={theme.header}>
          <SuccessIcon className={theme.icon} />
          <h1 className={theme.title}>Deu tudo certo!</h1>
        </header>
        <div className={theme.content}>
          <h3 className={theme.infoField}>
            {
              boleto.url ? 'Valor a pagar:' : 'Valor pago:'
            }
          </h3>
          <p className={theme.infoValue}>{formatToBRL(amount)}</p>
          { this.renderTexts() }
        </div>
        <footer
          className={theme.footer}
        >
          {
            orderUrl &&
            <Button
              fill="outline"
              icon={<OrderIcon className={theme.whiteIcon} />}
              onClick={handleSeeOrder(orderUrl)}
            >
              Ver pedido
            </Button>
          }
          <Button
            fill="gradient"
            icon={<CloseXIcon className={theme.whiteIcon} />}
            onClick={closeCheckout}
          >
            Fechar
          </Button>
        </footer>
      </section>
    )
  }
}
Success.propTypes = {
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  boleto: PropTypes.shape({
    barcode: PropTypes.number,
    expirationAt: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
  }),
  creditCard: PropTypes.shape({
    installmentText: PropTypes.string,
  }),
  theme: PropTypes.shape({
    boletoButtonsWrapper: PropTypes.string,
    content: PropTypes.string,
    footer: PropTypes.string,
    header: PropTypes.string,
    icon: PropTypes.string,
    infoField: PropTypes.string,
    infoValue: PropTypes.string,
    title: PropTypes.string,
    whiteIcon: PropTypes.string,
    wrapper: PropTypes.string,
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
