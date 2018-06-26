import React from 'react'
import { shallow } from 'enzyme'

import ActionButton from '.'

const theme = {}
const title = 'Título'

describe('ActionButton', () => {
  it('should render title', () => {
    const onClick = jest.fn()

    const component = shallow(
      <ActionButton
        onClick={onClick}
        title={title}
        theme={theme}
      />
    ).dive()

    const titleText = component.find('p').text()

    expect(titleText).toEqual(title)
  })

  it('should trigger onClick function', () => {
    const onClick = jest.fn()

    const component = shallow(
      <ActionButton
        onClick={onClick}
        title={title}
        theme={theme}
      />
    ).dive()

    component.find('ThemedButton')
      .first()
      .simulate('click')

    expect(onClick).toHaveBeenCalled()
  })
})
