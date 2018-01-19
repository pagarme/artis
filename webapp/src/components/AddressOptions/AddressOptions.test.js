import React from 'react'
import { mount } from 'enzyme'
import AddressOptions from '.'

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

describe('AddressOptions', () => {
  it('should trigger onChange', () => {
    const onChange = jest.fn()

    const component = mount(
      <AddressOptions
        addresses={addresses}
        onChange={onChange}
      />
    )

    component
      .find('[role="button"]')
      .first()
      .simulate('click')

    expect(onChange).toHaveBeenCalled()
  })

  it('should return expected address', () => {
    const onChange = jest.fn()

    const component = mount(
      <AddressOptions
        addresses={addresses}
        onChange={onChange}
      />
    )

    component
      .find('[role="button"]')
      .at(1)
      .simulate('click')

    expect(onChange).toBeCalledWith(addresses[1])
  })
})
