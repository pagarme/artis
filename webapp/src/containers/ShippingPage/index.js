import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import PlusIcon from 'react-icons/lib/go/plus'
import { themr } from 'react-css-themr'

import AddressForm from '../../containers/AddressFormContainer'
import options from '../../helpers/states'
import { Grid, Row, Col } from '../../components/Grid'
import Button from '../../components/Button'
import { footerButton } from '../../actions'

const largeColSize = 12
const mediumColSize = 6
const smallColSize = 4

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

class Shipping extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selected: 0,
      openAddressForm: false,
    }
  }

  onChangeAddress (option) {
    this.setState({ selected: option })
  }

  toggleOpenAddressForm () {
    const openAddressForm = !this.state.openAddressForm

    this.props.footerButton({ visible: !openAddressForm })
    this.setState({ openAddressForm })
  }

  renderAddresses () {
    const { theme } = this.props

    return addresses.map((address, index) => (
      <Col
        tv={mediumColSize}
        desk={mediumColSize}
        tablet={mediumColSize}
        palm={largeColSize}
        key={address.name}
      >
        <div
          role="button"
          tabIndex={index}
          onClick={this.onChangeAddress.bind(this, index)}
          className={
            classNames(
              theme.optionBox,
              {
                [theme.selected]: this.state.selected === index,
              }
            )
          }
        >
          <div className={theme.addressName}>
            {address.name}
          </div>
          <div className={theme.addressData}>
            <Grid>
              <Row>
                <Col
                  tv={largeColSize}
                  desk={largeColSize}
                  tablet={largeColSize}
                  palm={largeColSize}
                >
                  <div className={theme.field}>Rua</div>
                  <div className={theme.value}>
                    {address.street}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col
                  tv={smallColSize}
                  desk={smallColSize}
                  tablet={smallColSize}
                  palm={smallColSize}
                >
                  <div className={theme.field}>Nº</div>
                  <div className={theme.value}>
                    {address.street_number}
                  </div>
                </Col>
                <Col
                  tv={smallColSize}
                  desk={smallColSize}
                  tablet={smallColSize}
                  palm={smallColSize}
                >
                  <div className={theme.field}>Complemento</div>
                  <div className={theme.value}>
                    {address.complementary}
                  </div>
                </Col>
                <Col
                  tv={smallColSize}
                  desk={smallColSize}
                  tablet={smallColSize}
                  palm={smallColSize}
                >
                  <div className={theme.field}>Bairro</div>
                  <div className={theme.value}>
                    {address.neighborhood}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col
                  tv={smallColSize}
                  desk={smallColSize}
                  tablet={smallColSize}
                  palm={smallColSize}
                >
                  <div className={theme.field}>CEP</div>
                  <div className={theme.value}>
                    {address.zipcode}
                  </div>
                </Col>
                <Col
                  tv={smallColSize}
                  desk={smallColSize}
                  tablet={smallColSize}
                  palm={smallColSize}
                >
                  <div className={theme.field}>Cidade</div>
                  <div className={theme.value}>
                    {address.city}
                  </div>
                </Col>
                <Col
                  tv={smallColSize}
                  desk={smallColSize}
                  tablet={smallColSize}
                  palm={smallColSize}
                >
                  <div className={theme.field}>UF</div>
                  <div className={theme.value}>
                    {address.state}
                  </div>
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
      </Col>
    ))
  }

  render () {
    const { theme } = this.props

    return (
      <div className={theme.page}>
        <AddressForm
          visible={this.state.openAddressForm}
          handleClose={this.toggleOpenAddressForm.bind(this)}
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
            {this.renderAddresses()}
            <Row>
              <Col
                tv={mediumColSize}
                desk={mediumColSize}
                tablet={mediumColSize}
                palm={mediumColSize}
              >
                <Button
                  size="extra-large"
                  fill="double"
                  relevance="low"
                  className={theme.btnAddNewAddress}
                  onClick={this.toggleOpenAddressForm.bind(this)}
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

Shipping.propTypes = {
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
  footerButton: PropTypes.func.isRequired,
}

Shipping.defaultProps = {
  theme: {},
}

const mapDispatchToProps = dispatch => ({
  footerButton: value => dispatch(footerButton(value)),
})

export default connect(null, mapDispatchToProps)(applyThemr(Shipping))
