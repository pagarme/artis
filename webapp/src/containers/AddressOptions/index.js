import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { equals } from 'ramda'
import { themr } from 'react-css-themr'
import { Col } from '../../components/Grid'

const largeColSize = 12
const mediumColSize = 6

const applyThemr = themr('UIAddressOptions')

class AddressOptions extends React.Component {
  constructor (props) {
    super(props)

    const { selected, addresses } = props

    this.state = {
      selected: selected || addresses[0],
    }
  }

  handleClick (address) {
    this.setState({ selected: address })
    this.props.onChange(address)
  }

  joinAddressData (address) {
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
      <p className={
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
  render () {
    const { theme, addresses } = this.props

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
          onClick={this.handleClick.bind(this, address)}
          className={
            classNames(
              theme.optionBox,
              {
                [theme.selected]: equals(this.state.selected, address),
              }
            )
          }
        >
          <div className={theme.addressName}>
            {address.name || `Endereço ${index + 1}`}
          </div>
          <div className={theme.addressData}>
            {this.joinAddressData(address)}
          </div>
        </div>
      </Col>
    ))
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
  }).isRequired,
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
  onChange: PropTypes.func.isRequired,
}

AddressOptions.defaultProps = {
  theme: {},
}

export default applyThemr(AddressOptions)
