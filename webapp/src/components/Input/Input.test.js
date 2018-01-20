import React from 'react'
import { shallow } from 'enzyme'

import Input from './index'

describe('Input', () => {
  const value = 'Sheldon'

  describe('singleline', () => {
    it('should trigger onChange', () => {
      const onChange = jest.fn()

      const component = shallow(
        <Input
          name="name"
          label="Name"
          onChange={onChange}
        />
      ).dive()

      component
        .find('input')
        .first()
        .simulate('change', value)

      expect(onChange).toHaveBeenCalled()
      expect(onChange).toHaveBeenLastCalledWith(value)
    })

    it('should mount with disabled', () => {
      const onChange = jest.fn()

      const component = shallow(
        <Input
          name="name"
          label="Name"
          onChange={onChange}
          disabled
        />
      ).dive()

      component
        .find('input')
        .first()
        .simulate('change', value)

      expect(onChange).not.toHaveBeenCalled()
      expect(onChange).not.toHaveBeenLastCalledWith(value)
    })

    it('should mount with error', () => {
      const onChange = jest.fn()

      const component = shallow(
        <Input
          name="name"
          label="Name"
          onChange={onChange}
          error="Error"
        />
      ).dive()

      component
        .find('input')
        .first()
        .simulate('change', value)

      expect(onChange).toHaveBeenCalled()
      expect(onChange).toHaveBeenLastCalledWith(value)
      expect(component.find('p').first().text()).toBe('Error')
    })

    it('should mount with all props', () => {
      const onChange = jest.fn()

      const component = shallow(
        <Input
          name="name"
          label="Name"
          onChange={onChange}
          value="hihihi"
          type="password"
          placeholder="Your name"
          hint="Hi"
          error="Error"
        />
      ).dive()

      component
        .find('input')
        .first()
        .simulate('change', value)

      expect(onChange).toHaveBeenCalled()
      expect(onChange).toHaveBeenLastCalledWith(value)
    })
  })

  describe('multiline', () => {
    it('should trigger onChange', () => {
      const onChange = jest.fn()

      const component = shallow(
        <Input
          name="name"
          label="Name"
          multiline
          onChange={onChange}
        />
      ).dive()

      component
        .find('textarea')
        .first()
        .simulate('change', value)

      expect(onChange).toHaveBeenCalled()
      expect(onChange).toHaveBeenLastCalledWith(value)
    })

    it('should mount with disabled', () => {
      const onChange = jest.fn()

      const component = shallow(
        <Input
          name="name"
          label="Name"
          onChange={onChange}
          multiline
          disabled
        />
      ).dive()

      component
        .find('textarea')
        .first()
        .simulate('change', value)

      expect(onChange).not.toHaveBeenCalled()
      expect(onChange).not.toHaveBeenLastCalledWith(value)
    })

    it('should mount with error', () => {
      const onChange = jest.fn()

      const component = shallow(
        <Input
          name="name"
          label="Name"
          onChange={onChange}
          multiline
          error="Error"
        />
      ).dive()

      component
        .find('textarea')
        .first()
        .simulate('change', value)

      expect(onChange).toHaveBeenCalled()
      expect(onChange).toHaveBeenLastCalledWith(value)
      expect(component.find('p').first().text()).toBe('Error')
    })

    it('should mount with all props', () => {
      const onChange = jest.fn()

      const component = shallow(
        <Input
          name="name"
          label="Name"
          onChange={onChange}
          value="hihihi"
          type="password"
          placeholder="Your name"
          hint="Hi"
          error="Error"
          multiline
        />
      ).dive()

      component
        .find('textarea')
        .first()
        .simulate('change', value)

      expect(onChange).toHaveBeenCalled()
      expect(onChange).toHaveBeenLastCalledWith(value)
    })

    it('should mount input type number', () => {
      const onChange = jest.fn()

      const component = shallow(
        <Input
          name="name"
          label="Label"
          type="number"
          onChange={onChange}
        />
      )

      expect(component.html().indexOf('type="number"')).toBeGreaterThan(0)
    })
  })
})
