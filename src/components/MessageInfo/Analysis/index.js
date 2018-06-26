import React from 'react'
import PropTypes from 'prop-types'
import { ThemeConsumer } from 'former-kit'

import { Button } from '../..'

import AnalysisImage from '../../../images/confirmacao_analise.svg'

const consumeTheme = ThemeConsumer('UIAnalysisMessageInfo')

const Analysis = ({ closeCheckout, theme }) => (
  <div className={theme.wrapper}>
    <div className={theme.box}>
      <AnalysisImage
        className={theme.icon}
      />
      <h1 className={theme.title}>Pagamento em análise</h1>
      <h2 className={theme.subtitle}>Aguardando confirmação</h2>
      <hr className={theme.line} />
      <h3 className={theme.infoTitle}>
        O que acontece agora?
      </h3>
      <p className={theme.infoSubtitle}>
        Em breve você recebrá um e-mail
        dizendo se deu tudo certo com seu pagamento ou não.
        Caso o pagamento não seja aprovado revise seus dados e tente novamente.
      </p>
      <Button
        fill="outline"
        onClick={closeCheckout}
      >
        Voltar para o site
      </Button>
    </div>
  </div>
)

Analysis.propTypes = {
  theme: PropTypes.shape({
    wrapper: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
  closeCheckout: PropTypes.func.isRequired,
}

export default consumeTheme(Analysis)

