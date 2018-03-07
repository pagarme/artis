import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PlusIcon from 'react-icons/lib/go/plus'
import { themr } from 'react-css-themr'
import { isNil } from 'ramda'
import { connect } from 'react-redux'
import Form from 'react-vanilla-form'

import AddressForm from '../containers/AddressForm'

import {
  Grid,
  Row,
  Col,
  Button,
  AddressOptions,
} from '../components'

import options from '../utils/data/states'

import { addPageInfo, showProgressBar } from '../actions'

const defaultColSize = 12
const mediumColSize = 6

const applyThemr = themr('UIShippingPage')

class ShippingPage extends Component {
  constructor (props) {
    super(props)

    const { shipping, addresses } = this.props

    this.state = {
      addresses: !isNil(shipping) ? [...addresses, shipping] : addresses,
      selected: !isNil(shipping) ? shipping : {},
      openAddressForm: false,
    }

    this.toggleOpenAddressForm = this.toggleOpenAddressForm.bind(this)
    this.addAddress = this.addAddress.bind(this)
    this.handleChangeForm = this.handleChangeForm.bind(this)
    this.onChangeAddress = this.onChangeAddress.bind(this)
  }

  onChangeAddress (address) {
    this.setState({ selected: address })
  }

  handleChangeForm (values) {
    this.setState(values)
  }

  addAddress (address) {
    this.setState(({ addresses }) => ({
      addresses: [...addresses, address],
      selected: address,
    }))

    this.toggleOpenAddressForm()
  }

  toggleOpenAddressForm () {
    const openAddressForm = !this.state.openAddressForm

    this.props.progressBarVisible(!openAddressForm)
    this.setState({ openAddressForm })
  }

  render () {
    const { addresses, selected } = this.state
    const { theme } = this.props

    return (
      <div className={theme.page}>
        <AddressForm
          visible={this.state.openAddressForm}
          onCancel={this.toggleOpenAddressForm}
          options={options}
          onConfirm={this.addAddress}
        />
        <Form
          data={this.state}
          onChange={this.handleChangeForm}
          onSubmit={this.props.handleSubmit}
          customErrorProp="error"
        >
          <Grid
            hidden={this.state.openAddressForm}
          >
            <Row className={theme.title}>
              {this.props.title}
            </Row>
            <Row>
              <AddressOptions
                addresses={addresses}
                selected={selected}
                onChange={this.onChangeAddress}
              />
            </Row>
            <Row>
              <Col
                tv={mediumColSize}
                desk={mediumColSize}
                tablet={mediumColSize}
                palm={defaultColSize}
              >
                <Button
                  id="shipping-page-add-address-btn"
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
            <Row>
              <Col
                desk={defaultColSize}
                tv={defaultColSize}
                tablet={defaultColSize}
                palm={defaultColSize}
                alignEnd
              >
                <Button
                  size="extra-large"
                  relevance="normal"
                  type="submit"
                  className={theme.button}
                >
                  Confirmar
                </Button>
              </Col>
            </Row>
          </Grid>
        </Form>
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
  shipping: PropTypes.shape({
    name: PropTypes.string,
    street: PropTypes.string,
    number: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    complement: PropTypes.string,
    neighborhood: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipcode: PropTypes.string,
  }),
  addresses: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    street: PropTypes.string,
    number: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    complement: PropTypes.string,
    neighborhood: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipcode: PropTypes.string,
  })),
  title: PropTypes.string.isRequired,
  progressBarVisible: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

ShippingPage.defaultProps = {
  theme: {},
  shipping: {},
  addresses: [],
}

const mapStateToProps = ({ pageInfo }) => ({
  shipping: pageInfo.shipping,
  addresses: pageInfo.addresses,
})

export default connect(mapStateToProps, {
  progressBarVisible: showProgressBar,
  handlePageChange: addPageInfo,
})(applyThemr(ShippingPage))
