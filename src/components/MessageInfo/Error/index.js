import React from 'react'
import PropTypes from 'prop-types'
import { ThemeConsumer } from 'former-kit'
import ReactGA from 'react-ga'

import NavigateBack from '../../../images/navigate_back.svg'
import Close from '../../../images/close.svg'
import { Button } from '../..'

const consumeTheme = ThemeConsumer('UIErrorMessageInfo')

const questions = [
  'O cartão possui saldo para o valor total da compra?',
  'Você digitou corretamente os dados do cartão?',
  'O cartão está dentro do prazo de validade?',
  'O cartão está desbloqueado?',
]

class Error extends React.Component {
  componentDidMount () {
    ReactGA.pageview('/error')
  }

  checkPayment = () => {
    ReactGA.event({
      category: 'Error',
      action: 'Retry',
    })

    this.props.navigatePreviousPage()
  }

  render () {
    const { theme } = this.props

    const makeQuestionsList = arr => (
      arr.map(item => (
        <li className={theme.question} key={item}>
          { item }
        </li>
      ))
    )

    return (
      <div className={theme.wrapper}>
        <header className={theme.header}>
          <Close
            className={theme.icon}
          />
          <h1 className={theme.title}>Algo deu errado...</h1>
          <h2 className={theme.subtitle}>Sua transação foi recusada</h2>
        </header>
        <div className={theme.content}>
          <h3 className={theme.questionTitle}>
            O que pode ter acontecido?
          </h3>
          <ul className={theme.questionList}>
            {makeQuestionsList(questions)}
          </ul>
        </div>
        <footer className={theme.footer}>
          <Button
            fill="outline"
            icon={<NavigateBack />}
            iconAlignment="start"
            onClick={this.checkPayment}
          >
            Revisar pagamento
          </Button>
        </footer>
      </div>
    )
  }
}

Error.propTypes = {
  theme: PropTypes.shape({
    content: PropTypes.string,
    footer: PropTypes.string,
    header: PropTypes.string,
    question: PropTypes.string,
    subtitle: PropTypes.string,
    title: PropTypes.string,
    wrapper: PropTypes.string,
  }).isRequired,
  navigatePreviousPage: PropTypes.func.isRequired,
}

export default consumeTheme(Error)

