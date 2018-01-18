import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PlusIcon from 'react-icons/lib/go/plus'
import { themr } from 'react-css-themr'

import AddressForm from '../containers/AddressForm'
import options from '../utils/states'
import { Grid, Row, Col } from '../components/Grid'
import Button from '../components/Button'
import AddressOptions from '../components/AddressOptions'

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
    const { theme } = this.props

    return (
      <div className={theme.page}>
        <AddressForm
          visible={this.state.openAddressForm}
          onCancel={this.toggleOpenAddressForm}
          options={options}
        />
        <Grid
          hidden={this.state.openAddressForm}
        >
          <Row>
            <Col
              tv={largeColSize}
              desk={largeColSize}
              tablet={largeColSize}
              palm={largeColSize}
              className={theme.title}
              alignLeft
            >
              {this.props.title}
            </Col>
            <AddressOptions
              addresses={addresses}
              onChange={this.onChangeAddress}
            />
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
    field: PropTypes.string,
    value: PropTypes.string,
    addressData: PropTypes.string,
    addressName: PropTypes.string,
    selected: PropTypes.string,
    optionBox: PropTypes.string,
  }),
  title: PropTypes.string.isRequired,
  footerButtonVisible: PropTypes.func,
}

ShippingPage.defaultProps = {
  theme: {},
  footerButtonVisible: null,
}

export default applyThemr(ShippingPage)
