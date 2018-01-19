import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { themr } from 'react-css-themr'
import { Grid, Row, Col } from '../Grid'

const largeColSize = 12
const mediumColSize = 6
const smallColSize = 4

const applyThemr = themr('UIAddressOptions')

class AddressOptions extends React.Component {
  constructor () {
    super()

    this.state = {
      selected: 0,
    }
  }

  handleClick (index, address) {
    this.setState({ selected: index })
    this.props.onChange(address)
  }

  render () {
    const { theme, addresses } = this.props

    return addresses.map((address, index) => (
      <Col
        key={address.name}
        tv={mediumColSize}
        desk={mediumColSize}
        tablet={mediumColSize}
        palm={largeColSize}
      >
        <div
          role="button"
          tabIndex={index}
          onClick={this.handleClick.bind(this, index, address)}
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
  addresses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      street: PropTypes.string,
      street_number: PropTypes.number,
      state: PropTypes.string,
      city: PropTypes.string,
      neighborhood: PropTypes.string,
      complementary: PropTypes.string,
      zipcode: PropTypes.string,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
}

AddressOptions.defaultProps = {
  theme: {},
}

export default applyThemr(AddressOptions)
