import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'

import { Grid, Row, Col } from '../components/Grid'
import successIcon from '../images/success-icon.png'
import errorIcon from '../images/error-icon.png'

const applyThemr = themr('UIConfirmationPage')

const defaultColSize = 12

const Confirmation = ({ success, theme }) => (
  <Grid
    className={theme.page}
  >
    <Row>
      <Col
        tv={4}
        desk={4}
        tablet={4}
        className={theme.title}
        alignCenter
      >
        <div className={theme.confirmationIcon}>
          {success && <img
            src={successIcon}
            alt={'Ícone de sucesso'}
            className={theme.successIcon}
          />}

          {!success && <img
            src={errorIcon}
            alt={'Ícone de erro'}
            className={theme.errorIcon}
          />}
        </div>
      </Col>
      <Col
        tv={8}
        desk={8}
        tablet={8}
        palm={defaultColSize}
        className={theme.title}
      >
        {success &&
          <div>
            <p className={theme.success}>
              Seu pagamento foi concluído com sucesso
            </p>
          </div>
        }
        {!success &&
          <div>
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
    </Row>
  </Grid>
)

Confirmation.propTypes = {
  theme: PropTypes.shape({
    page: PropTypes.string,
    title: PropTypes.string,
    info: PropTypes.string,
    error: PropTypes.string,
    confirmation: PropTypes.string,
    successIcon: PropTypes.string,
    errorIcon: PropTypes.string,
    confirmationIcon: PropTypes.string,
  }),
  success: PropTypes.bool,
}

Confirmation.defaultProps = {
  success: true,
  theme: {},
}

export default applyThemr(Confirmation)
