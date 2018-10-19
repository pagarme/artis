import React from 'react'
import PropTypes from 'prop-types'
import { ThemeConsumer } from 'former-kit'
import ReactGA from 'react-ga'

import { Button } from '../..'

import AnalysisImage from '../../../images/confirmacao_analise.svg'

const consumeTheme = ThemeConsumer('UIAnalysisMessageInfo')

class Analysis extends React.Component {
  componentDidMount () {
    ReactGA.pageview('/analysis')
  }

  render () {
    const {
      closeCheckout,
      theme,
      subtitle,
      title,
      text,
    } = this.props

    return (
      <div className={theme.wrapper}>
        <div className={theme.box}>
          <AnalysisImage
            className={theme.icon}
          />
          <h1 className={theme.title}>
            { title }
          </h1>
          <h2 className={theme.subtitle}>
            { subtitle }
          </h2>
          <hr className={theme.line} />
          <h3 className={theme.infoTitle}>
            O que acontece agora?
          </h3>
          <p className={theme.infoSubtitle}>
            { text }
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
  }
}

Analysis.propTypes = {
  theme: PropTypes.shape({
    wrapper: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
  closeCheckout: PropTypes.func.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  text: PropTypes.string,
}

Analysis.defaultProps = {
  title: 'Pagamento em análise',
  subtitle: 'Aguardando confirmação',
  text: `Em breve você recebrá um e-mail
  dizendo se deu tudo certo com seu pagamento ou não.
  Caso o pagamento não seja aprovado revise seus dados e tente novamente.`,
}

export default consumeTheme(Analysis)

