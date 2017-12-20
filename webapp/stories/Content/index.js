import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'

import Content from '../../src/components/Content'
import style from './styles.css'

const pages = [
  {
    joinRule: 'onDesktop',
    component: <div
      className={style.page}
      title="Dados Pessoais"
      stepTitle="Identificação"
    />,
  },
  {
    joinRule: 'onDesktop',
    component: <div
      className={style.page}
      title="Endereço de Cobrança"
    />,
  },
  {
    component: <div
      className={style.page}
      title="Dados de Pagamento"
      stepTitle="Forma de Pagamento"
    />,
  },
]

class Wrapper extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      navigateTo: null,
    }
  }

  navigateTo (navigateTo) {
    this.setState({ navigateTo })
  }

  render () {
    return (
      <Fragment>
        <Content
          pages={pages}
          navigateTo={this.state.navigateTo}
        />
        <button onClick={this.navigateTo.bind(this, 'first')}>First</button>
        <button onClick={this.navigateTo.bind(this, 'prev')}>Previous</button>
        <button onClick={this.navigateTo.bind(this, 'next')}>Next</button>
        <button onClick={this.navigateTo.bind(this, 'last')}>Last</button>
      </Fragment>
    )
  }
}

storiesOf('Content', module)
  .add('Page transition', () => (
    <Wrapper />
  ))
