import React from 'react'
import { mount } from 'enzyme'
import { Row, Col } from 'former-kit'

import ActionList from './index'

describe('ActionList', () => {
  it('should render with 2 rows and 2 cols', () => {
    const component = mount(
      <ActionList
        buttons={[
          { text: 'teste', disabled: false },
          { text: 'teste 2', disabled: true },
        ]}
      />
    )

    expect(component.find(Row).length).toEqual(2)
    expect(component.find(Col).length).toEqual(2)
  })

  it('should trigger onclick function', () => {
    const onClick = jest.fn()

    const component = mount(
      <ActionList
        buttons={[
          { text: 'teste', disabled: false, onClick },
        ]}
      />
    )


    component.find('button')
      .first()
      .simulate('click')

    expect(onClick).toHaveBeenCalled()
  })

  it('should not trigger onclick function whilst button disabled', () => {
    const onClick = jest.fn()

    const component = mount(
      <ActionList
        buttons={[
          { text: 'teste', disabled: true, onClick },
        ]}
      />
    )


    component.find('button')
      .first()
      .simulate('click')

    expect(onClick).not.toHaveBeenCalled()
  })
})
