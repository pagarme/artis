import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'

import { Col } from '../components/Grid'

const applyThemr = themr('UIConfirmationPage')

const defaultColSize = 12

const Confirmation = ({ success, theme }) => (
  <Col
    tv={defaultColSize}
    desk={defaultColSize}
    tablet={defaultColSize}
    palm={defaultColSize}
    className={theme.title}
    alignCenter
  >
    {success &&
      <div className={theme.confirmation}>
        <p className={theme.success}>
          Seu pagamento foi concluído com sucesso
        </p>
      </div>
    }
    {!success &&
      <div className={theme.confirmation}>
        <p className={theme.error}>
          Seu pagamento foi recusado
        </p>
        <p className={theme.info}>
          Ocorreu um erro ao processar sua transação,
          tente novamente mais tarde ou entre em contato com seu banco.
        </p>
      </div>
    }
  </Col>
)

Confirmation.propTypes = {
  theme: PropTypes.shape({
    page: PropTypes.string,
    title: PropTypes.string,
    info: PropTypes.string,
    error: PropTypes.string,
    confirmation: PropTypes.string,
  }),
  success: PropTypes.bool,
}

Confirmation.defaultProps = {
  success: true,
  theme: {},
}

export default applyThemr(Confirmation)
