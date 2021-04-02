import React from 'react'
import PropTypes from 'prop-types'
import ReactGA from 'react-ga'

import ThemeConsumer from '../../../former-kit/ThemeConsumer'
import NavigateBack from '../../../images/navigate_back.svg'
import Close from '../../../images/close.svg'
import { Button } from '../..'

const consumeTheme = ThemeConsumer('UIErrorMessageInfo')

class Error extends React.Component {
  componentDidMount () {
    ReactGA.pageview('/error')
  }

  getQuestions = (errors) => {
    const questions = {
      creditCard: [
        'O cartão possui saldo para o valor total da compra?',
        'Você digitou corretamente os dados do cartão?',
        'O cartão está dentro do prazo de validade?',
        'O cartão está desbloqueado?',
      ],
      boleto: [
        'Houve um erro desconhecido ao criar a transação com boleto',
        'Entre em contato com o estabelecimento',
      ],
    }

    if (this.checkForBoletoError(errors)) {
      return questions.boleto
    }

    return questions.creditCard
  }

  checkForBoletoError = errors => JSON.stringify(errors).includes('boleto')

  checkPayment = () => {
    ReactGA.event({
      category: 'Error',
      action: 'Retry',
    })

    this.props.handlePreviousButton()()
  }

  makeQuestionsList = (arr, theme) => (
    arr.map(item => (
      <li className={theme.question} key={item}>
        { item }
      </li>
    ))
  )

  render () {
    const { theme, errors = [] } = this.props
    const questions = this.getQuestions(errors)

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
            {this.makeQuestionsList(questions, theme)}
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
  handlePreviousButton: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
  theme: PropTypes.shape({
    content: PropTypes.string,
    footer: PropTypes.string,
    header: PropTypes.string,
    question: PropTypes.string,
    subtitle: PropTypes.string,
    title: PropTypes.string,
    wrapper: PropTypes.string,
  }).isRequired,
}

export default consumeTheme(Error)

