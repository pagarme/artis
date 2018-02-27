import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
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

const mockStore = configureStore([])
const store = mockStore({
  pageInfo: {
    shipping: {
      name: 'Mesmo endereço de cobrança',
      street: 'Rua lorem ipsum',
      street_number: 123,
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Pirituba',
      complementary: 'Casa de esquina',
      zipcode: '05170500',
    },
  },
  shippingPage: {
    isFormVisible: false,
  },
})

describe('AddressOptions', () => {
  it('should trigger onChange', () => {
    const onChange = jest.fn()
    const onRemove = jest.fn()
    const onUpdate = jest.fn()

    const component = mount(
      <Provider store={store}>
        <AddressOptions
          addresses={addresses}
          onChange={onChange}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      </Provider>
    )

    component
      .find('[role="button"]')
      .first()
      .simulate('click')

    expect(onChange).toHaveBeenCalled()
  })

  it('should return expected address', () => {
    const onChange = jest.fn()
    const onRemove = jest.fn()
    const onUpdate = jest.fn()

    const component = mount(
      <Provider store={store}>
        <AddressOptions
          addresses={addresses}
          onChange={onChange}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      </Provider>
    )

    component
      .find('[role="button"]')
      .at(1)
      .simulate('click')

    expect(onChange).toBeCalledWith(addresses[1])
  })
})
