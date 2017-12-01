import React from 'react'
import { shallow } from 'enzyme'

import Input from './index'

describe('Input', () => {
  const value = 'Leonardo'

  describe('singleline', () => {
    it('should trigger onChange', () => {
      const onChange = jest.fn()

      const component = shallow(
        <Input
          name="name"
          label="Name"
          onChange={onChange}
        />
      )

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
      )

      component
        .find('input')
        .first()
        .simulate('change', value)

      expect(onChange).not.toHaveBeenCalled()
      expect(onChange).not.toHaveBeenLastCalledWith(value)
    })

    it('should mount with success', () => {
      const onChange = jest.fn()

      const component = shallow(
        <Input
          name="name"
          label="Name"
          onChange={onChange}
          success="Success"
        />
      )

      component
        .find('input')
        .first()
        .simulate('change', value)

      expect(onChange).toHaveBeenCalled()
      expect(onChange).toHaveBeenLastCalledWith(value)
      expect(component.find('p').first().text()).toBe('Success')
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
      )

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
          boxed
          hint="Hi"
          error="Error"
        />
      )

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
      )

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
      )

      component
        .find('textarea')
        .first()
        .simulate('change', value)

      expect(onChange).not.toHaveBeenCalled()
      expect(onChange).not.toHaveBeenLastCalledWith(value)
    })

    it('should mount with success', () => {
      const onChange = jest.fn()

      const component = shallow(
        <Input
          name="name"
          label="Name"
          onChange={onChange}
          multiline
          success="Success"
        />
      )

      component
        .find('textarea')
        .first()
        .simulate('change', value)

      expect(onChange).toHaveBeenCalled()
      expect(onChange).toHaveBeenLastCalledWith(value)
      expect(component.find('p').first().text()).toBe('Success')
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
      )

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
          boxed
          hint="Hi"
          error="Error"
          multiline
        />
      )

      component
        .find('textarea')
        .first()
        .simulate('change', value)

      expect(onChange).toHaveBeenCalled()
      expect(onChange).toHaveBeenLastCalledWith(value)
    })
  })
})
