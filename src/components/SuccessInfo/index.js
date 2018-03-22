import React from 'react'
import { themr } from 'react-css-themr'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ReactGA from 'react-ga'
import copy from 'copy-to-clipboard'
import { connect } from 'react-redux'

import { Row, Col } from '../Grid'
import EmailForm from '../../containers/EmailForm'
import ActionList from '../ActionList'

const applyThemr = themr('UISuccessInfo')

const mediumColSize = 6
const paymentInfo = {
  name: 'Dan Abramov',
  amount: 'R$ 1000.000,00',
  method: 'MasterCard Black',
  address: 'Rua Lorem Ipsum Consectetuer, 1001 - apartamento 101 Água Fria',
  payment: '2x vezes sem juros com 20% de desconto na primeira parcela',
}

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
    } = this.props

    const {
      showBoletoOptions,
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
                  <div className={theme.value}>{paymentInfo.name}</div>
                </div>
              </Row>
              <Row>
                <div>
                  <div className={theme.field}>Valor pago</div>
                  <div className={theme.value}>{paymentInfo.amount}</div>
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
                  >{paymentInfo.address}</div>
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
                download: boletoName || 'boleto.pdf',
                href: boletoUrl,
              },
              {
                text: 'Encaminhar por e-mail',
                onClick: this.toggleEmailForm,
              },
              {
                text: 'Copiar código de barras',
                onClick: handleCopyBarCode.bind(this, boletoBarcode),
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
                  <div className={theme.value}>{paymentInfo.name}</div>
                </div>
              </Row>
              <Row>
                <div>
                  <div className={theme.field}>Valor pago</div>
                  <div className={theme.value}>{paymentInfo.amount}</div>
                </div>
              </Row>
              <Row>
                <div>
                  <div className={theme.field}>Cartão</div>
                  <div className={theme.value}>{paymentInfo.method}</div>
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
                  >{paymentInfo.address}</div>
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
                  >{paymentInfo.payment}</div>
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
      <div className={theme[base]}>
        {
          boletoBarcode || boletoUrl ?
            this.renderBoleto() :
            this.renderCreditcard()
        }
      </div>
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
  boletoName: '',
}

const mapStateToProps = ({ screenSize }) => ({
  isBigScreen: screenSize.isBigScreen,
})

export default connect(mapStateToProps)(applyThemr(SuccessInfo))
