import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { equals } from 'ramda'
import { themr } from 'react-css-themr'
import FaTrashO from 'react-icons/lib/fa/trash-o'
import FaPencil from 'react-icons/lib/fa/pencil'
import { connect } from 'react-redux'
import { DropdownButton, Col } from '../../components'

import {
  showFooterButton,
  showProgressBar,
  showAddressForm,
  changeConfirmMethod,
  addAddressToUpdate,
} from '../../actions'

const largeColSize = 12
const mediumColSize = 6

const applyThemr = themr('UIAddressOptions')

class AddressOptions extends React.Component {
  constructor () {
    super()

    this.renderAddressData = this.renderAddressData.bind(this)
    this.renderAddressList = this.renderAddressList.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
  }

  handleRemove (arrayIndex) {
    const { shipping, addresses, onRemove } = this.props

    return () => {
      const clenedAddresses = addresses.filter((elem, index) => index !== arrayIndex)

      const addressesLocal = clenedAddresses.filter(elem => (
        elem.street !== shipping.street &&
        elem.number !== shipping.number
      ))

      onRemove(addressesLocal, clenedAddresses)
    }
  }

  handleUpdate (arrayIndex, address) {
    return () => {
      const { isFormVisible } = this.props

      if (!isFormVisible) {
        this.props.changeConfirmMethod(this.updateAddress(arrayIndex))
        this.props.addAddressToUpdate(address)
      }

      this.props.progressBarVisible(!isFormVisible)
      this.props.footerButtonVisible(isFormVisible)
      this.props.addressFormVisible(!isFormVisible)
    }
  }

  updateAddress (arrayIndex) {
    return (address) => {
      const { addresses, onUpdate, shipping } = this.props
      const localAddresses =
        localStorage.getItem('receiverAddresses')
          ? JSON.parse(localStorage.getItem('receiverAddresses'))
          : []

      const existInLocal =
        localAddresses.reduce((prevVal, elem) =>
          elem.name === addresses[arrayIndex].name && elem.street === addresses[arrayIndex].street,
        0)

      if (existInLocal) {
        const addressesLocal = addresses.filter(elem => (
          elem.street !== shipping.street &&
          elem.number !== shipping.number
        ))

        addressesLocal[arrayIndex - 1] = address

        localStorage.setItem('receiverAddresses', JSON.stringify(addressesLocal))
      }

      addresses[arrayIndex] = address

      onUpdate(addresses, address)
    }
  }

  renderAddressData (address) {
    const { theme } = this.props

    const addressInfo = `${address.street},
      ${address.number},
      ${address.complement},
      ${address.neighborhood},
      ${address.zipcode},
      ${address.city},
      ${address.state}
    `

    return (
      <p
        className={
          classNames(
            theme.text,
            theme.textTruncate
          )
        }
      >
        {addressInfo}
      </p>
    )
  }

  renderAddressList (addresses, theme, onChange, selected) {
    return addresses.map((address, index) => (
      <Col
        key={address.name || `${address.zipcode}-${address.number}`}
        tv={mediumColSize}
        desk={mediumColSize}
        tablet={mediumColSize}
        palm={largeColSize}
      >
        <div
          role="button"
          tabIndex={index}
          onClick={onChange(address)}
          className={
            classNames(
              theme.optionBox,
              {
                [theme.selected]: equals(selected, address),
              }
            )
          }
        >
          <div>
            <div className={theme.addressName}>
              {address.name || `Endereço ${index + 1}`}
            </div>
            <div className={theme.optionsButton}>
              <DropdownButton
                title={
                  <React.Fragment>
                    <div className={theme.point} />
                    <div className={theme.point} />
                    <div className={theme.point} />
                  </React.Fragment>
                }
                tabIndex={index}
              >
                <span //eslint-disable-line
                  className={theme.optionsItem}
                  onClick={this.handleUpdate(index, address)}
                  role="button"
                >
                  <FaPencil color="white" size={17} />
                  <span className={theme.optionsText} >Editar</span>
                </span>
                <span //eslint-disable-line
                  className={theme.optionsItem}
                  onClick={this.handleRemove(index)}
                  role="button"
                >
                  <FaTrashO color="white" size={17} />
                  <span className={theme.optionsText} >Excluir</span>
                </span>
              </DropdownButton>
            </div>
          </div>
          <div className={theme.addressData}>
            {this.renderAddressData(address, theme)}
          </div>
        </div>
      </Col>
    ))
  }

  render () {
    const { addresses, theme, onChange, selected } = this.props

    return (
      <React.Fragment>
        {this.renderAddressList(addresses, theme, onChange, selected)}
      </React.Fragment>
    )
  }
}

AddressOptions.propTypes = {
  theme: PropTypes.shape({
    field: PropTypes.string,
    value: PropTypes.string,
    addressData: PropTypes.string,
    addressName: PropTypes.string,
    selected: PropTypes.string,
    optionBox: PropTypes.string,
    point: PropTypes.string,
    optionsButton: PropTypes.string,
    optionsItem: PropTypes.string,
    optionsText: PropTypes.string,
  }),
  selected: PropTypes.shape({
    name: PropTypes.string,
    street: PropTypes.string,
    number: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    state: PropTypes.string,
    city: PropTypes.string,
    neighborhood: PropTypes.string,
    complement: PropTypes.string,
    zipcode: PropTypes.string,
  }),
  addresses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      street: PropTypes.string,
      number: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      state: PropTypes.string,
      city: PropTypes.string,
      neighborhood: PropTypes.string,
      complement: PropTypes.string,
      zipcode: PropTypes.string,
    })
  ).isRequired,
  shipping: PropTypes.shape({
    name: PropTypes.string,
    street: PropTypes.string,
    number: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    state: PropTypes.string,
    city: PropTypes.string,
    neighborhood: PropTypes.string,
    complement: PropTypes.string,
    zipcode: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  progressBarVisible: PropTypes.func.isRequired,
  footerButtonVisible: PropTypes.func.isRequired,
  isFormVisible: PropTypes.bool.isRequired,
  addressFormVisible: PropTypes.func.isRequired,
  changeConfirmMethod: PropTypes.func.isRequired,
  addAddressToUpdate: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

AddressOptions.defaultProps = {
  theme: {},
  selected: {},
}

const mapStateToProps = ({ pageInfo, shippingPage }) => ({
  shipping: pageInfo.shipping,
  isFormVisible: shippingPage.isFormVisible,
})

const mapDispatchToProps = {
  footerButtonVisible: showFooterButton,
  progressBarVisible: showProgressBar,
  addressFormVisible: showAddressForm,
  changeConfirmMethod,
  addAddressToUpdate,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(applyThemr(AddressOptions))
