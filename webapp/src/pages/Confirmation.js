import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'
import classNames from 'classnames'

import { Grid, Row, Col } from '../components/Grid'
import successIcon from '../images/success-icon.png'
import errorIcon from '../images/error-icon.png'

const applyThemr = themr('UIConfirmationPage')

const isDesktop = window.innerWidth > 640

const iconColSize = 4
const contentColSize = 8
const mediumColSize = 6
const defaultColSize = 12

const paymentInfo = {
  name: 'Dan Abramov',
  amount: 'R$ 1000.000,00',
  method: 'MasterCard Black',
  address: 'Rua Lorem Ipsum Consectetuer, 1001 - apartamento 101 Água Fria',
  payment: '2x vezes sem juros com 20% de desconto na primeira parcela',
}

class Confirmation extends React.Component {
  renderSuccessInfo () {
    const { theme } = this.props

    return (
      <React.Fragment>
        <Row className={theme.title}>
          <h4 className={
            classNames(
              {
                [theme.textAligned]: !isDesktop,
              },
              theme.success,
            )}
          >
            Seu pagamento foi concluído com sucesso
          </h4>
        </Row>
        {isDesktop && <Row>
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
        </Row>}
      </React.Fragment>
    )
  }

  renderErrorInfo () {
    const { theme } = this.props

    return (
      <div className={
        classNames(
          theme.alignSelfCenter,
          {
            [theme.mediumSize]: isDesktop,
          },
        )
      }
      >
        <Row className={theme.title}>
          <h4 className={
            classNames(
              {
                [theme.textAligned]: !isDesktop,
              },
              theme.error,
            )}
          >
            Seu pagamento foi recusado
          </h4>
          <p className={
            classNames(
              {
                [theme.textAligned]: !isDesktop,
              },
              theme.info,
            )}
          >
            Ocorreu um erro ao processar sua transação,
            tente novamente mais tarde ou entre em contato com seu banco.
          </p>
        </Row>
      </div>
    )
  }

  render () {
    const { theme, success } = this.props

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
            className={theme.title}
            alignCenter
          >
            <div className={
              classNames(
                theme.alignSelfCenter,
                theme.confirmationIcon,
              )
            }
            >
              {success && <img
                src={successIcon}
                alt={'Ícone de sucesso'}
                className={theme.successIcon}
              />}

              {!success && <img
                src={errorIcon}
                alt={'Ícone de erro'}
                className={theme.errorIcon}
              />}
            </div>
          </Col>
          <Col
            tv={contentColSize}
            desk={contentColSize}
            tablet={contentColSize}
            palm={defaultColSize}
          >
            {success &&
              this.renderSuccessInfo()
            }
            {!success &&
              this.renderErrorInfo()
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
    title: PropTypes.string,
    info: PropTypes.string,
    error: PropTypes.string,
    confirmation: PropTypes.string,
    successIcon: PropTypes.string,
    errorIcon: PropTypes.string,
    confirmationIcon: PropTypes.string,
  }),
  success: PropTypes.bool,
}

Confirmation.defaultProps = {
  success: true,
  theme: {},
}

export default applyThemr(Confirmation)
