import React from 'react'
import { mount } from 'enzyme'

import Select from '.'

const options = [
  { name: 'SP', value: 'sp' },
  { name: 'RJ', value: 'rj' },
  { name: 'MG', value: 'mg' },
  { name: 'MT', value: 'mt' },
  { name: 'GO', value: 'go' },
  { name: 'MS', value: 'ms' },
  { name: 'PA', value: 'pa' },
]

const isBigScreen = true
const value = 'sp'

describe('Select', () => {
  describe('Desktop', () => {
    it('option choiced and changed select value', () => {
      const component = mount(
        <Select
          name="name"
          label="Name"
          options={options}
          placeholder="Placeholder"
          isBigScreen={isBigScreen}
        />
      )

      component
        .find('div')
        .at(6)
        .simulate('click')

      expect(
        component
          .find('select')
          .props()
          .defaultValue
      ).toBe(value)
    })
  })
  describe('Mobile', () => {
    it('option choiced and changed select value', () => {
      const component = mount(
        <Select
          name="name"
          label="Name"
          options={options}
          placeholder="Placeholder"
          isBigScreen={!isBigScreen}
        />
      )

      component
        .find('select')
        .simulate('change', value)

      expect(
        component
          .find('select')
          .props()
          .defaultValue
      ).toBe(value)
    })
  })
})
