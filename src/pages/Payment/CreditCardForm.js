import React from 'react'
import PropTypes from 'prop-types'
import { replace } from 'ramda'
import PaymentCard from 'react-payment-card-component'

import FaCreditCard from 'react-icons/lib/fa/credit-card'
import FaUser from 'react-icons/lib/fa/user'
import FaCalendar from 'react-icons/lib/fa/calendar'
import FaEllipsisH from 'react-icons/lib/fa/ellipsis-h'
import FaPieChart from 'react-icons/lib/fa/pie-chart'

import {
  Grid,
  Row,
  Col,
  Dropdown,
  Input,
} from './../../components'

import formatToBRL from './../../utils/helpers/formatToBRL'
import { generateInstallments } from './../../utils/calculations'

const defaultColSize = 12
const mediumColSize = 6

const removeMask = replace(/_/g, '')

const CreditCard = ({
  theme,
  isBigScreen,
  data,
  installmentsIndex,
  amount,
  enableSplitAmount,
  showCreditCard,
  formData,
  handleFlipCard,
  flipped,
  amountPrefixName,
  inputPrefixName,
}) => {
  const {
    cardNumber = '•••• •••• •••• ••••',
    holderName = 'Nome Completo',
    expiration = 'MM/AA',
    cvv = '•••',
  } = formData

  const { installments } = data

  const installmentsOptions = generateInstallments(
    amount,
    installments[installmentsIndex]
  )

  const inputsColSize = showCreditCard
    ? mediumColSize
    : defaultColSize

  const prefix = inputPrefixName || ''

  return (
    <Grid className={theme.page}>
      <Row>
        { showCreditCard &&
          <Col
            tv={mediumColSize}
            desk={mediumColSize}
            tablet={mediumColSize}
            palm={defaultColSize}
            alignCenter
            hidden={!isBigScreen}
          >
            <PaymentCard
              number={removeMask(cardNumber)}
              cvv={removeMask(cvv)}
              holderName={removeMask(holderName)}
              expiration={removeMask(expiration)}
              flipped={flipped}
            />
            <h4 className={theme.amount} >
              Valor a pagar: {formatToBRL(amount)}
            </h4>
          </Col>
        }
        <Col
          tv={inputsColSize}
          desk={inputsColSize}
          tablet={inputsColSize}
          palm={defaultColSize}
        >
          <Row>
            { enableSplitAmount &&
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
            }
            <Col
              tv={defaultColSize}
              desk={defaultColSize}
              tablet={defaultColSize}
              palm={defaultColSize}
            >
              <Input
                name={`${prefix}cardNumber`}
                label="Número do cartão"
                mask="1111 1111 1111 1111"
                icon={!isBigScreen && <FaCreditCard size={20} />}
              />
            </Col>
          </Row>
          <Row>
            <Col
              tv={defaultColSize}
              desk={defaultColSize}
              tablet={defaultColSize}
              palm={defaultColSize}
            >
              <Input
                name={`${prefix}holderName`}
                label="Nome (igual o do cartão)"
                maxLength="24"
                icon={!isBigScreen && <FaUser size={20} />}
              />
            </Col>
          </Row>
          <Row
            className={theme.tooltipRow}
          >
            <Col
              tv={7}
              desk={7}
              tablet={mediumColSize}
              palm={mediumColSize}
            >
              <Input
                name={`${prefix}expiration`}
                label="Data de validade"
                mask="11/11"
                icon={!isBigScreen && <FaCalendar size={20} />}
              />
            </Col>
            <Col
              tv={5}
              desk={5}
              tablet={mediumColSize}
              palm={mediumColSize}
            >
              <Input
                name={`${prefix}cvv`}
                label="CVV"
                type="number"
                mask="111"
                tooltip={
                  isBigScreen &&
                  'O CVV são os três números que ficam na parte de trás do seu cartão.'
                }
                tooltipClassName={theme.cvvTooltip}
                onFocus={handleFlipCard}
                onBlur={handleFlipCard}
                icon={!isBigScreen && <FaEllipsisH size={20} />}
              />
            </Col>
          </Row>
          {
            installmentsOptions.length &&
            <Row>
              <Col
                tv={defaultColSize}
                desk={defaultColSize}
                tablet={defaultColSize}
                palm={defaultColSize}
              >
                <Dropdown
                  options={installmentsOptions}
                  name={`${prefix}installments`}
                  label="Quantidade de Parcelas"
                  placeholder="Selecione"
                  value={installments[0].initial}
                  icon={!isBigScreen && <FaPieChart size={20} />}
                />
              </Col>
            </Row>
          }
          <Row hidden={isBigScreen || !showCreditCard}>
            <h4 className={theme.amount} >
              Valor a pagar: {formatToBRL(amount)}
            </h4>
          </Row>
        </Col>
      </Row>
    </Grid>
  )
}

CreditCard.propTypes = {
  theme: PropTypes.shape({
    page: PropTypes.string,
    title: PropTypes.string,
    amount: PropTypes.string,
    cvvTooltip: PropTypes.string,
  }),
  data: PropTypes.shape().isRequired,
  amount: PropTypes.number.isRequired,
  enableSplitAmount: PropTypes.bool,
  showCreditCard: PropTypes.bool,
  isBigScreen: PropTypes.bool.isRequired,
  formData: PropTypes.shape(),
  handleFlipCard: PropTypes.func,
  flipped: PropTypes.bool,
  amountPrefixName: PropTypes.string,
  inputPrefixName: PropTypes.string,
  installmentsIndex: PropTypes.number.isRequired,
}

CreditCard.defaultProps = {
  theme: {},
  enableSplitAmount: false,
  showCreditCard: true,
  formData: {},
  handleFlipCard: null,
  flipped: false,
  amountPrefixName: '',
  inputPrefixName: '',
}

export default CreditCard
