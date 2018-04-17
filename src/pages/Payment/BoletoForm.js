import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import moment from 'moment'
import { Grid } from 'former-kit'

import {
  Row,
  Col,
  Input,
} from './../../components'

import { applyDiscount } from './../../utils/calculations'
import formatToBRL from './../../utils/helpers/formatToBRL'
import Barcode from '../../images/barcode.svg'

const defaultColSize = 12
const mediumColSize = 6

const Boleto = ({
  theme,
  base,
  data,
  amount,
  enableInputAmount,
  showBoletoDetails,
  amountPrefixName,
}) => {
  const { discount, expirationAt = '' } = data

  const finalDate = expirationAt
    ? moment(expirationAt).format('L')
    : moment().add(1, 'days').format('L')

  return (
    <Grid className={theme[base]}>
      { enableInputAmount &&
        <Row>
          <Col
            tv={mediumColSize}
            desk={mediumColSize}
            tablet={mediumColSize}
            palm={defaultColSize}
          >
            <Input
              name={`${amountPrefixName}`}
              label="Valor à pagar"
              type="number"
            />
          </Col>
        </Row>
      }
      <Row>
        <Col
          tv={defaultColSize}
          desk={defaultColSize}
          tablet={defaultColSize}
          palm={defaultColSize}
        >
          <div className={theme.boletoContainer} >
            <Barcode className={theme.barcodeImg} />
            { showBoletoDetails &&
              <React.Fragment>
                <h4
                  className={
                    classNames(
                      theme.amount,
                      theme.boletoAmount,
                    )
                  }
                >
                  Valor a pagar:
                  {
                    discount
                      ? formatToBRL(applyDiscount(
                        discount.type,
                        discount.value,
                        amount,
                      ))
                      : formatToBRL(amount)
                  }
                </h4>
                <span className={theme.boletoInfo}>
                  Ao finalizar a compra,
                  será gerado um boleto com o valor acima,
                  com data de vencimento para {finalDate}.
                  Depois de pago, o banco leva cerca de
                  3 dias úteis para reconhecer o pagamento.
                </span>
              </React.Fragment>
            }
          </div>
        </Col>
      </Row>
    </Grid>
  )
}

Boleto.propTypes = {
  theme: PropTypes.shape(),
  amount: PropTypes.number.isRequired,
  base: PropTypes.string.isRequired,
  data: PropTypes.shape().isRequired,
  enableInputAmount: PropTypes.bool,
  showBoletoDetails: PropTypes.bool,
  amountPrefixName: PropTypes.string,
}

Boleto.defaultProps = {
  theme: {},
  enableInputAmount: false,
  showBoletoDetails: true,
  amountPrefixName: '',
}

export default Boleto
