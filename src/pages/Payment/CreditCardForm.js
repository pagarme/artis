import React from 'react'
import PropTypes from 'prop-types'
import PaymentCard from 'react-payment-card-component'
import {
  Grid,
  Row,
  Col,
  FormInput,
} from 'former-kit'

import FaCreditCard from 'react-icons/lib/fa/credit-card'
import FaUser from 'react-icons/lib/fa/user'
import FaCalendar from 'react-icons/lib/fa/calendar'
import FaEllipsisH from 'react-icons/lib/fa/ellipsis-h'
import Calendar24 from 'emblematic-icons/svg/Calendar24.svg'

import {
  formatToBRL,
  removeMaskPlaceholder,
} from './../../utils/masks/'

const defaultColSize = 12
const mediumColSize = 6

const CreditCard = ({
  theme,
  isBigScreen,
  installmentInitialValue,
  installmentsOptions,
  amount,
  enableSplitAmount,
  showCreditCard,
  formData,
  handleFlipCard,
  flipped,
  amountPrefixName,
  inputPrefixName = '',
}) => {
  const {
    cardNumber = '•••• •••• •••• ••••',
    holderName = 'Nome Completo',
    expiration = 'MM/AA',
    cvv = '•••',
  } = formData

  const inputsColSize = showCreditCard
    ? mediumColSize
    : defaultColSize

  return (
    <Grid>
      <Row>
        { (showCreditCard && isBigScreen) &&
          <Col
            tv={mediumColSize}
            desk={mediumColSize}
            tablet={defaultColSize}
            palm={defaultColSize}
            align={'center'}
          >
            <PaymentCard
              number={removeMaskPlaceholder(cardNumber)}
              cvv={removeMaskPlaceholder(cvv)}
              holderName={removeMaskPlaceholder(holderName)}
              expiration={removeMaskPlaceholder(expiration)}
              flipped={flipped}
            />
            <h4 className={theme.amount} >
              Valor a pagar: {formatToBRL(amount)}
            </h4>
          </Col>
        }
        <Col
          className={theme.mobilePadding}
          tv={inputsColSize}
          desk={inputsColSize}
          tablet={defaultColSize}
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
                <FormInput
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
              <FormInput
                name={`${inputPrefixName}cardNumber`}
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
              <FormInput
                name={`${inputPrefixName}holderName`}
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
              <FormInput
                name={`${inputPrefixName}expiration`}
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
              <FormInput
                name={`${inputPrefixName}cvv`}
                label="CVV"
                type="number"
                mask="111"
                tooltip={
                  isBigScreen &&
                  `O CVV são os três números que
                  ficam na parte de trás do seu cartão.`
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
                <FormInput
                  options={installmentsOptions}
                  name={`${inputPrefixName}installments`}
                  placeholder="Quantidade de Parcelas"
                  value={installmentInitialValue}
                  icon={!isBigScreen && <Calendar24 size={20} />}
                />
              </Col>
            </Row>
          }
          { (!isBigScreen && showCreditCard) &&
            <Row>
              <h4 className={theme.amount} >
                Valor a pagar: {formatToBRL(amount)}
              </h4>
            </Row>
          }
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
  amount: PropTypes.number.isRequired,
  enableSplitAmount: PropTypes.bool,
  showCreditCard: PropTypes.bool,
  isBigScreen: PropTypes.bool.isRequired,
  formData: PropTypes.shape(),
  handleFlipCard: PropTypes.func,
  flipped: PropTypes.bool,
  amountPrefixName: PropTypes.string,
  inputPrefixName: PropTypes.string,
  installmentsOptions: PropTypes.arrayOf([
    PropTypes.object,
  ]).isRequired,
  installmentInitialValue: PropTypes.string.isRequired,
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
