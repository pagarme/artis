import React from 'react'
import PropTypes from 'prop-types'
import copy from 'copy-to-clipboard'
import ReactGA from 'react-ga'
import { themr } from 'react-css-themr'

import { Row, Col, ActionList, Button } from '../../components'

import EmailForm from '../EmailForm'
import formatToBRL from '../../utils/helpers/formatToBRL'

const mediumColSize = 6
const defaultColSize = 12

const applyThemr = themr('UIBoletoOptions')

class BoletoOptions extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      barcode: '',
      showEmailForm: false,
    }

    this.handleCopyBarCode = this.handleCopyBarCode.bind(this)
    this.toggleEmailForm = this.toggleEmailForm.bind(this)
  }

  /* eslint-disable class-methods-use-this */
  handleCopyBarCode (barcode) {
    ReactGA.event({
      category: 'Boleto',
      action: 'Copy Bar Code',
    })

    copy(barcode)
  }

  toggleEmailForm () {
    ReactGA.event({
      category: 'Boleto',
      action: `${this.state.showEmailForm ? 'Close' : 'Open'} send by email modal`,
    })

    this.setState({ showEmailForm: !this.state.showEmailForm })
  }

  render () {
    const { barcode, showEmailForm } = this.state
    const { theme, amount, isBigScreen } = this.props

    return (
      <Col
        tv={mediumColSize}
        desk={mediumColSize}
        tablet={mediumColSize}
        palm={defaultColSize}
        className={theme.optionsContainer}
      >
        { showEmailForm
          ? <EmailForm
            handleClose={this.toggleEmailForm}
          />
          : <ActionList buttons={[
            {
              text: 'Salvar arquivo',
              disabled: !barcode,
            },
            {
              text: 'Encaminhar por e-mail',
              disabled: !barcode,
              onClick: this.toggleEmailForm,
            },
            {
              text: 'Copiar código de barras',
              disabled: !barcode,
              onClick: this.handleCopyBarCode
                .bind(this, barcode),
            },
          ]}
          />
        }
        <Row hidden={isBigScreen} >
          <Col
            tv={defaultColSize}
            desk={defaultColSize}
            tablet={defaultColSize}
            palm={defaultColSize}
          >
            <h4 className={theme.amount} >
              Valor a pagar: {formatToBRL(amount)}
            </h4>
          </Col>
        </Row>
        <Row hidden={isBigScreen} >
          <Col
            tv={defaultColSize}
            desk={defaultColSize}
            tablet={defaultColSize}
            palm={defaultColSize}
          >
            <Button
              relevance="low"
              disabled={!barcode}
              full
              size="extra-large"
            >
              Fechar
            </Button>
          </Col>
        </Row>
      </Col>
    )
  }
}

BoletoOptions.propTypes = {
  theme: PropTypes.shape({
    optionsContainer: PropTypes.string,
    amount: PropTypes.string,
  }),
  isBigScreen: PropTypes.bool.isRequired,
  amount: PropTypes.number.isRequired,
}

BoletoOptions.defaultProps = {
  theme: {},
}

export default applyThemr(BoletoOptions)
