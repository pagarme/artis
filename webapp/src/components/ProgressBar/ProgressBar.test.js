import React from 'react'
import { shallow } from 'enzyme'

import ProgressBar from './index'
import { Grid, Col } from '../Grid/index'

describe('ProgressBar', () => {
  it('should not render with steps', () => {
    const component = shallow(
      <ProgressBar
        steps={[]}
        activePage={0}
      />
    )

    expect(component.find(Grid).length).toEqual(0)
  })

  it('should render with 4 steps', () => {
    const component = shallow(
      <ProgressBar
        steps={[
          'Im',
          'Multiple',
          'Steps',
          'Behold',
        ]}
        activePage={0}
      />
    )

    expect(component.find(Col).length).toEqual(4)
  })

  it('should check for steps content', () => {
    const component = shallow(
      <ProgressBar
        steps={[
          'Still',
          'Some Steps',
        ]}
        activePage={1}
      />
    )

    expect(component.html().includes('1. Still')).toBeTruthy()
  })

  it('should not allow width greater than 100%', () => {
    const component = shallow(
      <ProgressBar
        steps={[
          'Long',
          'Journey',
        ]}
        activePage={552}
      />
    )

    expect(component.html().includes('width:100%')).toBeTruthy()
  })
})
