import React, { Component, Fragment } from 'react'
import { string } from 'prop-types'
import classNames from 'classnames'
import PlusIcon from 'react-icons/lib/go/plus'

import AddressForm from './AddressForm'
import { Grid, Row, Col } from '../../components/Grid'
import Button from '../../components/Button'

import defaultStyle from '../styles.css'
import style from './styles.css'

const largeColSize = 12
const mediumColSize = 6
const smallColSize = 4

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
      showAddressForm: false,
    }
  }

  onChangeAddress (option) {
    this.setState({ selected: option })
  }

  handleAddNewAddress () {
    this.setState({ showAddressForm: true })
  }

  renderAddresses () {
    return addresses.map((address, index) => (
      <Col
        tv={mediumColSize}
        desk={mediumColSize}
        tablet={mediumColSize}
        palm={largeColSize}
      >
        <div
          role="button"
          tabIndex={index}
          onClick={this.onChangeAddress.bind(this, index)}
          className={
            classNames(
              style.optionBox,
              {
                [style.selected]: this.state.selected === index,
              }
            )
          }
        >
          <div className={style.addressName}>
            {address.name}
          </div>
          <div className={style.addressData}>
            <Grid>
              <Row>
                <Col
                  tv={largeColSize}
                  desk={largeColSize}
                  tablet={largeColSize}
                  palm={largeColSize}
                >
                  <div className={style.field}>Rua</div>
                  <div className={style.value}>
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
                  <div className={style.field}>Nº</div>
                  <div className={style.value}>
                    {address.street_number}
                  </div>
                </Col>
                <Col
                  tv={smallColSize}
                  desk={smallColSize}
                  tablet={smallColSize}
                  palm={smallColSize}
                >
                  <div className={style.field}>Complemento</div>
                  <div className={style.value}>
                    {address.complementary}
                  </div>
                </Col>
                <Col
                  tv={smallColSize}
                  desk={smallColSize}
                  tablet={smallColSize}
                  palm={smallColSize}
                >
                  <div className={style.field}>Bairro</div>
                  <div className={style.value}>
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
                  <div className={style.field}>CEP</div>
                  <div className={style.value}>
                    {address.zipcode}
                  </div>
                </Col>
                <Col
                  tv={smallColSize}
                  desk={smallColSize}
                  tablet={smallColSize}
                  palm={smallColSize}
                >
                  <div className={style.field}>Cidade</div>
                  <div className={style.value}>
                    {address.city}
                  </div>
                </Col>
                <Col
                  tv={smallColSize}
                  desk={smallColSize}
                  tablet={smallColSize}
                  palm={smallColSize}
                >
                  <div className={style.field}>UF</div>
                  <div className={style.value}>
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
    return (
      <Fragment>
        <AddressForm
          visible={this.state.showAddressForm}
        />
        <Grid
          className={
            classNames({
              [style.hidden]: this.state.showAddressForm,
            })
          }
        >
          <Row>
            <Col
              tv={largeColSize}
              desk={largeColSize}
              tablet={largeColSize}
              palm={largeColSize}
              className={defaultStyle.title}
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
                  className={style.btnAddNewAddress}
                  onClick={this.handleAddNewAddress.bind(this)}
                >
                  <PlusIcon />
                  Cadastrar novo endereço de entrega
                </Button>
              </Col>
            </Row>
          </Row>
        </Grid>
      </Fragment>
    )
  }
}

Shipping.propTypes = {
  title: string.isRequired,
}

export default Shipping
