import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PlusIcon from 'react-icons/lib/go/plus'
import { themr } from 'react-css-themr'
import { equals, filter, isNil, not, pipe } from 'ramda'
import { connect } from 'react-redux'

import AddressForm from '../containers/AddressForm'

import {
  Grid,
  Row,
  Col,
  Button,
  AddressOptions,
} from '../components'

import options from '../utils/data/states'

import {
  addPageInfo,
  showFooterButton,
  showProgressBar,
  showAddressForm,
  changeConfirmMethod,
  addAddressToUpdate,
} from '../actions'

const largeColSize = 12
const mediumColSize = 6

const applyThemr = themr('UIShippingPage')

class ShippingPage extends Component {
  constructor (props) {
    super(props)

    const { shipping, addresses } = this.props

    this.state = {
      addresses: !isNil(shipping) ? [shipping, ...addresses] : addresses,
      selected: !isNil(shipping) ? shipping : {},
    }

    this.toggleOpenAddressForm = this.toggleOpenAddressForm.bind(this)
    this.addAddress = this.addAddress.bind(this)
    this.removeAddress = this.removeAddress.bind(this)
    this.onChangeAddress = this.onChangeAddress.bind(this)
    this.updateState = this.updateState.bind(this)
  }

  componentWillUnmount () {
    const { selected, addresses } = this.state

    const removeSelected = filter(
      pipe(
        equals(selected),
        not
      )
    )

    this.props.handlePageChange('shipping', selected)
    this.props.handlePageChange('addresses', removeSelected(addresses))
  }

  onChangeAddress (address) {
    return () => (
      this.setState({ selected: address })
    )
  }

  updateState (addresses, selected) {
    this.setState({
      addresses,
      selected,
    })

    this.toggleOpenAddressForm()
  }

  addAddress (address) {
    const localAddresses =
      localStorage.getItem('receiverAddresses')
        ? JSON.parse(localStorage.getItem('receiverAddresses'))
        : []

    localAddresses.push(address)

    localStorage.setItem('receiverAddresses', JSON.stringify(localAddresses))

    this.setState(({ addresses }) => ({
      addresses: [...addresses, address],
      selected: address,
    }))

    this.toggleOpenAddressForm()
  }

  removeAddress (addressesLocal, addressesState) {
    localStorage.setItem('receiverAddresses', JSON.stringify(addressesLocal))
    const selected = addressesState && addressesState[0]

    setTimeout(() => {
      this.setState({
        addresses: addressesState,
        selected,
      })
    }, 1)
  }

  toggleOpenAddressForm () {
    const { isFormVisible } = this.props

    if (!isFormVisible) {
      this.props.changeConfirmMethod(this.addAddress)
    } else {
      this.props.addAddressToUpdate(null)
    }

    this.props.progressBarVisible(!isFormVisible)
    this.props.footerButtonVisible(isFormVisible)
    this.props.addressFormVisible(!isFormVisible)
  }

  render () {
    const { addresses, selected } = this.state
    const { theme, isFormVisible, confirmMethod } = this.props

    return (
      <div className={theme.page}>
        <AddressForm
          visible={isFormVisible}
          onCancel={this.toggleOpenAddressForm}
          options={options}
          onConfirm={confirmMethod || this.addAddress}
        />
        <Grid
          hidden={isFormVisible}
        >
          <Row className={theme.title}>
            {this.props.title}
          </Row>
          <Row>
            <AddressOptions
              addresses={addresses}
              selected={selected}
              onChange={this.onChangeAddress}
              onUpdate={this.updateState}
              onRemove={this.removeAddress}
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
  footerButtonVisible: PropTypes.func.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  isFormVisible: PropTypes.bool.isRequired,
  addressFormVisible: PropTypes.func.isRequired,
  changeConfirmMethod: PropTypes.func.isRequired,
  addAddressToUpdate: PropTypes.func.isRequired,
  confirmMethod: PropTypes.func,
}

ShippingPage.defaultProps = {
  theme: {},
  shipping: {},
  addresses: [],
  footerButtonVisible: null,
  confirmMethod: null,
}

const mapStateToProps = ({ pageInfo, addressOptions }) => ({
  shipping: pageInfo.shipping,
  addresses: pageInfo.addresses,
  isFormVisible: addressOptions.isFormVisible,
  confirmMethod: addressOptions.confirmMethod,
})

const mapDispatchToProps = dispatch => ({
  handlePageChange: (page, pageInfo) => {
    dispatch(addPageInfo({ page, pageInfo }))
  },
  footerButtonVisible: isFormVisible => dispatch(showFooterButton(isFormVisible)),
  progressBarVisible: isFormVisible => dispatch(showProgressBar(isFormVisible)),
  addressFormVisible: isFormVisible => dispatch(showAddressForm(isFormVisible)),
  changeConfirmMethod: method => dispatch(changeConfirmMethod(method)),
  addAddressToUpdate: address => dispatch(addAddressToUpdate(address)),
})


export default connect(mapStateToProps, mapDispatchToProps)(applyThemr(ShippingPage))
