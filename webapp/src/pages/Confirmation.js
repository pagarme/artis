import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'
import classNames from 'classnames'

import { Grid, Row, Col } from '../components/Grid'
import SuccessInfo from '../components/SuccessInfo'
import ErrorInfo from '../components/ErrorInfo'
import LoadingInfo from '../components/LoadingInfo'
import successIcon from '../images/success-icon.png'
import errorIcon from '../images/error-icon.png'

const applyThemr = themr('UIConfirmationPage')

const iconColSize = 4
const contentColSize = 8
const defaultColSize = 12

class Confirmation extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      success: false,
    }
  }

  render () {
    const { theme, isBigScreen } = this.props
    const { success, loading } = this.state

    if (loading) {
      return <LoadingInfo />
    }

    return (
      <Grid
        className={theme.page}
      >
        <Row
          stretch
        >
          <Col
            tv={iconColSize}
            desk={iconColSize}
            tablet={iconColSize}
            palm={defaultColSize}
            alignCenter
          >
            <div className={
              classNames(
                theme.alignSelfCenter,
                theme.confirmationIcon,
              )
            }
            >
              {success
                ? <img
                  src={successIcon}
                  alt={'Ícone de sucesso'}
                  className={theme.successIcon}
                />
                : <img
                  src={errorIcon}
                  alt={'Ícone de erro'}
                  className={theme.errorIcon}
                />
              }
            </div>
          </Col>
          <Col
            tv={contentColSize}
            desk={contentColSize}
            tablet={contentColSize}
            palm={defaultColSize}
          >
            {success
              ? <SuccessInfo isBigScreen={isBigScreen} />
              : <ErrorInfo isBigScreen={isBigScreen} />
            }
          </Col>
        </Row>
      </Grid>
    )
  }
}

Confirmation.propTypes = {
  theme: PropTypes.shape({
    page: PropTypes.string,
    successIcon: PropTypes.string,
    errorIcon: PropTypes.string,
    alignSelfCenter: PropTypes.string,
    confirmationIcon: PropTypes.string,
  }),
  isBigScreen: PropTypes.bool.isRequired,
}

Confirmation.defaultProps = {
  theme: {},
}

export default applyThemr(Confirmation)
