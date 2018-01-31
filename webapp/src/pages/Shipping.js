import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PlusIcon from 'react-icons/lib/go/plus'
import { themr } from 'react-css-themr'

import AddressForm from '../containers/AddressForm'
import options from '../utils/states'
import { Grid, Row, Col } from '../components/Grid'
import Button from '../components/Button'
import AddressOptions from '../containers/AddressOptions'

const largeColSize = 12
const mediumColSize = 6

const applyThemr = themr('UIShippingPage')

const addresses = [
  {
    name: 'Mesmo endereço de cobrança',
    street: 'Rua lorem ipsum',
    street_number: 123,
    state: 'SP',
    city: 'São Paulo',
    neighborhood: 'Pirituba',
    complementary: 'Casa de esquina',
    zipcode: '05170500',
  },
  {
    name: 'Casa',
    street: 'Rua lorem ipsum',
    street_number: 123,
    state: 'SP',
    city: 'São Paulo',
    neighborhood: 'Pirituba',
    complementary: 'Casa de esquina',
    zipcode: '05170500',
  },
]

class ShippingPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedAddress: {},
      openAddressForm: false,
    }

    this.toggleOpenAddressForm = this.toggleOpenAddressForm.bind(this)
    this.onChangeAddress = this.onChangeAddress.bind(this)
  }

  onChangeAddress (address) {
    this.setState({ selectedAddress: address })
  }

  toggleOpenAddressForm () {
    const openAddressForm = !this.state.openAddressForm

    this.props.footerButtonVisible(!openAddressForm)
    this.setState({ openAddressForm })
  }

  render () {
    const { theme, isBigScreen } = this.props

    return (
      <div className={theme.page}>
        <AddressForm
          visible={this.state.openAddressForm}
          onCancel={this.toggleOpenAddressForm}
          options={options}
          isBigScreen={isBigScreen}
        />
        <Grid
          hidden={this.state.openAddressForm}
        >
          <Row className={theme.title}>
            {this.props.title}
          </Row>
          <Row>
            <AddressOptions
              addresses={addresses}
              onChange={this.onChangeAddress}
            />
          </Row>
          <Row>
            <Col
              tv={mediumColSize}
              desk={mediumColSize}
              tablet={mediumColSize}
              palm={largeColSize}
            >
              <Button
                size="extra-large"
                fill="double"
                relevance="low"
                className={theme.btnAddNewAddress}
                onClick={this.toggleOpenAddressForm}
              >
                <PlusIcon />
                Cadastrar novo endereço de entrega
              </Button>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

ShippingPage.propTypes = {
  theme: PropTypes.shape({
    page: PropTypes.string,
    title: PropTypes.string,
    btnAddNewAddress: PropTypes.string,
  }),
  title: PropTypes.string.isRequired,
  footerButtonVisible: PropTypes.func,
  isBigScreen: PropTypes.bool.isRequired,
}

ShippingPage.defaultProps = {
  theme: {},
  footerButtonVisible: null,
}

export default applyThemr(ShippingPage)
