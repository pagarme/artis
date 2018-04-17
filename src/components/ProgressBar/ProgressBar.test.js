import React from 'react'
import { shallow } from 'enzyme'
import { Grid } from 'former-kit'

import ProgressBar from './index'
import { Col } from '../Grid/index'

const stepsTitles = [
  {
    page: 'customer',
    title: 'Identificação',
    visible: true,
  },
  {
    page: 'addresses',
    title: 'Endereços',
    visible: true,
  },
  {
    page: 'payment',
    title: 'Forma de Pagamento',
    visible: true,
  },
  {
    page: 'singleCreditCard',
    visible: false,
  },
  {
    page: 'singleBoleto',
    visible: false,
  },
  {
    page: 'creditCardAndBoleto',
    visible: false,
  },
  {
    page: 'confirmation',
    title: 'Confirmação',
    visible: true,
  },
]

const active = 'customer'

describe('ProgressBar', () => {
  it('should not render with steps', () => {
    const component = shallow(
      <ProgressBar
        steps={[]}
        activePage={''}
      />
    )

    expect(component.find(Grid).length).toEqual(0)
  })

  it('should render with 4 steps', () => {
    const component = shallow(
      <ProgressBar
        steps={stepsTitles}
        activePage={active}
      />
    ).dive()

    expect(component.find(Col).length).toEqual(4)
  })

  it('should check for steps content', () => {
    const component = shallow(
      <ProgressBar
        steps={stepsTitles}
        activePage={active}
      />
    )

    expect(
      component
        .html()
        .includes('<span>1.</span>Identificação')
    ).toBeTruthy()
  })

  it('should not allow width greater than 100%', () => {
    const component = shallow(
      <ProgressBar
        steps={stepsTitles}
        activePage={active}
      />
    )

    expect(component.html().includes('width:25%')).toBeTruthy()
  })
})
