import React from 'react'
import { shallow, mount } from 'enzyme'

import UserIcon from '../../images/user.svg'
import MapIcon from '../../images/map.svg'
import PaymentIcon from '../../images/payment.svg'
import ConfirmationIcon from '../../images/confirmation.svg'

import ProgressBar from './index'

const stepsTitles = [
  {
    page: 'customer',
    title: 'Identificação',
    icon: <UserIcon />,
  },
  {
    page: 'addresses',
    title: 'Endereços',
    icon: <MapIcon />,
  },
  {
    page: 'payment',
    title: 'Forma de Pagamento',
    icon: <PaymentIcon />,
  },
  {
    page: 'confirmation',
    title: 'Confirmação',
    icon: <ConfirmationIcon />,
  },
]

const activeStep = 'addresses'

describe('ProgressBar', () => {
  it('should not render with steps', () => {
    const component = shallow(
      <ProgressBar
        steps={[]}
        activeStep={''}
      />
    ).dive()

    expect(component.find('div').length).toEqual(1)
  })

  it('should render with 4 steps', () => {
    const component = mount(
      <ProgressBar
        steps={stepsTitles}
        activeStep={activeStep}
      />
    )

    expect(
      component.find('div')
        .first()
        .children()
        .first()
        .children().length
    ).toEqual(4)
  })

  it('should check for steps content', () => {
    const component = shallow(
      <ProgressBar
        steps={stepsTitles}
        activeStep={activeStep}
      />
    )

    expect(
      component
        .html()
        .includes('Identificação')
    ).toBeTruthy()
  })
})
