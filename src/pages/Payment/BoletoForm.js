import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import {
  Grid,
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
  data,
  amount,
  enableInputAmount,
  showBoletoDetails,
  amountPrefixName,
}) => {
  const { discount } = data

  return (
    <Grid className={theme.page}>
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
                    discount ?
                      formatToBRL(applyDiscount(discount.type, discount.value, amount)) :
                      formatToBRL(amount)
                  }
                </h4>
                <span className={theme.boletoInfo}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris risus nunc, malesuada vitae libero venenatis,
                  vehicula luctus nulla. Aliquam erat volutpat.
                  Sed porttitor ex vestibulum augue fermentum molestie.
                  Sed id convallis augue. Nam id malesuada nisl.
                  Quisque quis orci eget.
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
