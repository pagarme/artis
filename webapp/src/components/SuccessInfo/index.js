import React from 'react'
import { themr } from 'react-css-themr'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { Row, Col } from '../Grid'
import isBigScreen from '../../utils/isBigScreen'

const applyThemr = themr('UISuccessInfo')

const mediumColSize = 6
const paymentInfo = {
  name: 'Dan Abramov',
  amount: 'R$ 1000.000,00',
  method: 'MasterCard Black',
  address: 'Rua Lorem Ipsum Consectetuer, 1001 - apartamento 101 Água Fria',
  payment: '2x vezes sem juros com 20% de desconto na primeira parcela',
}

const SuccessInfo = ({ theme }) => (
  <React.Fragment>
    <Row className={theme.title}>
      <h4 className={
        classNames(
          {
            [theme.textAlignedCenter]: !isBigScreen,
          },
          theme.success,
        )}
      >
        Seu pagamento foi concluído com sucesso
      </h4>
    </Row>
    {isBigScreen && <Row>
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

SuccessInfo.propTypes = {
  theme: PropTypes.shape({
    field: PropTypes.string,
    value: PropTypes.string,
    mediumSize: PropTypes.string,
    success: PropTypes.string,
    textAlignedCenter: PropTypes.string,
    title: PropTypes.string,
  }),
}

SuccessInfo.defaultProps = {
  theme: {},
}

export default applyThemr(SuccessInfo)
