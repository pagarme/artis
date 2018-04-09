import React from 'react'
import { themr } from 'react-css-themr'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ReactGA from 'react-ga'
import copy from 'copy-to-clipboard'
import { connect } from 'react-redux'

import { Grid, Row, Col } from '../Grid'
import EmailForm from '../../containers/EmailForm'
import ActionList from '../ActionList'

import formatBRL from '../../utils/helpers/formatToBRL'

import successIcon from '../../images/success-icon.png'

const applyThemr = themr('UISuccessInfo')

const iconColSize = 4
const contentColSize = 8
const defaultColSize = 12
const mediumColSize = 6

const handleCopyBarCode = (barcode) => {
  ReactGA.event({
    category: 'Boleto',
    action: 'Copy Bar Code',
  })

  copy(barcode)
}

class SuccessInfo extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showBoletoOptions: false,
      copyText: 'Copiar código de barras',
    }

    this.toggleEmailForm = this.toggleEmailForm.bind(this)
  }

  toggleEmailForm () {
    this.setState(({ showBoletoOptions }) =>
      ({ showBoletoOptions: !showBoletoOptions }))
  }

  renderBoleto () {
    const {
      theme,
      boletoBarcode,
      boletoUrl,
      boletoName,
      isBigScreen,
      paymentInfo,
    } = this.props

    const {
      showBoletoOptions,
      copyText,
    } = this.state

    return (
      <React.Fragment>
        <Row className={theme.title}>
          <h4 className={theme.success}>
            Seu pagamento foi concluído com sucesso
          </h4>
        </Row>
        {
          isBigScreen &&
          <Row>
            <Col
              tv={mediumColSize}
              desk={mediumColSize}
              tablet={mediumColSize}
            >
              <Row>
                <div>
                  <div className={theme.field}>Nome</div>
                  <div className={theme.value}>{paymentInfo.customer}</div>
                </div>
              </Row>
              <Row>
                <div>
                  <div className={theme.field}>Valor pago</div>
                  <div className={theme.value}>{formatBRL(paymentInfo.amount)}</div>
                </div>
              </Row>
            </Col>
            <Col
              tv={mediumColSize}
              desk={mediumColSize}
              tablet={mediumColSize}
            >
              <Row>
                <div>
                  <div className={theme.field}>Endereço de entrega</div>
                  <div className={
                    classNames(
                      theme.value,
                      theme.mediumSize,
                    )}
                  >{paymentInfo.address.street}, {paymentInfo.address.number} -
                    CEP: {paymentInfo.address.zipcode}
                  </div>
                </div>
              </Row>
            </Col>
          </Row>
        }
        {
          showBoletoOptions
            ? <EmailForm
              handleClose={this.toggleEmailForm}
            />
            : <ActionList buttons={[
              {
                text: 'Salvar arquivo',
                download: boletoName,
                href: boletoUrl,
              },
              // {
              //   text: 'Encaminhar por e-mail',
              //   onClick: this.toggleEmailForm,
              // },
              {
                text: copyText,
                onClick: () => {
                  this.setState({ copyText: 'Copiado!' }, () => {
                    handleCopyBarCode(boletoBarcode)
                  })
                },
              },
            ]}
            />
        }
      </React.Fragment>
    )
  }

  renderCreditcard () {
    const {
      theme,
      isBigScreen,
      paymentInfo,
    } = this.props

    return (
      <React.Fragment>
        <Row className={theme.title}>
          <h4 className={theme.success}>
            Seu pagamento foi concluído com sucesso
          </h4>
        </Row>
        {
          isBigScreen &&
          <Row>
            <Col
              tv={mediumColSize}
              desk={mediumColSize}
              tablet={mediumColSize}
            >
              <Row>
                <div>
                  <div className={theme.field}>Nome</div>
                  <div className={theme.value}>{paymentInfo.customer}</div>
                </div>
              </Row>
              <Row>
                <div>
                  <div className={theme.field}>Valor pago</div>
                  <div className={theme.value}>{formatBRL(paymentInfo.amount)}</div>
                </div>
              </Row>
            </Col>
            <Col
              tv={mediumColSize}
              desk={mediumColSize}
              tablet={mediumColSize}
            >
              <Row>
                <div>
                  <div className={theme.field}>Endereço de entrega</div>
                  <div className={
                    classNames(
                      theme.value,
                      theme.mediumSize,
                    )}
                  >{paymentInfo.address.street}, {paymentInfo.address.number} -
                    CEP: {paymentInfo.address.zipcode}
                  </div>
                </div>
              </Row>
              <Row>
                <div>
                  <div className={theme.field}>Quantidade de parcelas</div>
                  <div className={
                    classNames(
                      theme.value,
                      theme.mediumSize,
                    )}
                  >{paymentInfo.installments}</div>
                </div>
              </Row>
            </Col>
          </Row>
        }
      </React.Fragment>
    )
  }

  render () {
    const { theme, base, boletoBarcode, boletoUrl } = this.props

    return (
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
                src={successIcon}
                alt={'Ícone de sucesso'}
                className={theme.successIcon}
              />
            </div>
          </Col>
          <Col
            tv={contentColSize}
            desk={contentColSize}
            tablet={contentColSize}
            palm={defaultColSize}
          >
            <div className={theme[base]}>
              {
                boletoBarcode || boletoUrl ?
                  this.renderBoleto() :
                  this.renderCreditcard()
              }
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

SuccessInfo.propTypes = {
  theme: PropTypes.shape({
    field: PropTypes.string,
    value: PropTypes.string,
    mediumSize: PropTypes.string,
    success: PropTypes.string,
    title: PropTypes.string,
    light: PropTypes.string,
    dark: PropTypes.string,
  }),
  paymentInfo: PropTypes.shape({
    customer: PropTypes.string,
    address: PropTypes.shape({
      street: PropTypes.string,
      number: PropTypes.string,
      complement: PropTypes.string,
      neighborhood: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      zipcode: PropTypes.string,
    }),
    amount: PropTypes.number,
    installments: PropTypes.string,
  }).isRequired,
  base: PropTypes.string,
  isBigScreen: PropTypes.bool.isRequired,
  boletoBarcode: PropTypes.string,
  boletoUrl: PropTypes.string,
  boletoName: PropTypes.string,
}

SuccessInfo.defaultProps = {
  theme: {},
  base: 'dark',
  boletoBarcode: '',
  boletoUrl: '',
  boletoName: 'boleto.pdf',
}

const mapStateToProps = ({ screenSize }) => ({
  isBigScreen: screenSize.isBigScreen,
})

export default connect(mapStateToProps)(applyThemr(SuccessInfo))
