import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  ThemeConsumer,
} from 'former-kit'

import NavigateBack from '../../../images/navigate_back.svg'
import Closes from '../../../images/close.svg'

const consumeTheme = ThemeConsumer('UIErrorMessageInfo')

const questions = [
  'O cartão possui saldo para o valor total da compra?',
  'Você digitou corretamente os dados do cartão?',
  'O cartão está dentro do prazo de validade?',
  'O cartão está desbloqueado?',
]

const Error = ({ navigatePreviousPage, theme }) => {
  const makeQuestionsList = arr => (
    arr.map(item => (
      <li className={theme.question}>
        { item }
      </li>
    ))
  )

  return (
    <div className={theme.wrapper}>
      <div className={theme.box}>
        <Closes
          className={theme.icon}
        />
        <h1 className={theme.title}>Algo deu errado...</h1>
        <h2 className={theme.subtitle}>Sua transação foi recusada</h2>
        <hr className={theme.line} />
        <h3 className={theme.questionTitle}>
          O que pode ter acontecido?
        </h3>
        <ul className={theme.questionList}>
          {makeQuestionsList(questions)}
        </ul>
        <Button
          fill="outline"
          icon={<NavigateBack />}
          iconAlignment="start"
          onClick={navigatePreviousPage}
        >
          Revisar pagamento
        </Button>
      </div>
    </div>
  )
}

Error.propTypes = {
  theme: PropTypes.shape({
    wrapper: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
  navigatePreviousPage: PropTypes.func.isRequired,
}

export default consumeTheme(Error)

