import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import moment from 'moment'
import {
  Grid,
  Row,
  Col,
  FormInput,
} from 'former-kit'

import { applyDiscount } from './../../utils/calculations'
import { formatToBRL } from './../../utils/masks'
import Barcode from '../../images/barcode.svg'

const defaultColSize = 12
const mediumColSize = 6

const Boleto = ({
  theme,
  base,
  data,
  amount,
  amountPrefixName,
  enableInputAmount,
  showBoletoDetails,
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
            <FormInput
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
  amount: PropTypes.number.isRequired,
  base: PropTypes.string.isRequired,
  amountPrefixName: PropTypes.string,
  data: PropTypes.shape().isRequired,
  enableInputAmount: PropTypes.bool,
  showBoletoDetails: PropTypes.bool,
  theme: PropTypes.shape(),
}

Boleto.defaultProps = {
  amountPrefixName: '',
  enableInputAmount: false,
  showBoletoDetails: true,
  theme: {},
}

export default Boleto
