import React from 'react'
import PropTypes from 'prop-types'
import CloseIcon from 'react-icons/lib/io/android-close'
import {
  Button,
  Row,
  Col,
  FormInput,
  ThemeConsumer,
} from 'former-kit'

const consumeTheme = ThemeConsumer('UIEmailForm')
const biggerColSize = 9
const smallerColSize = 3

class EmailForm extends React.Component {
  state = {
    recipient: '',
    email: '',
  }

  handleKeyPress = (e) => {
    const { handleClose } = this.props

    // send email here
    if (e.key === 'Enter') {
      handleClose()
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target

    this.setState({ [name]: value })
  }

  render () {
    const { theme, handleClose } = this.props
    const { recipient, email } = this.state

    return (
      <div className={theme.emailForm}>
        <Row>
          <Col
            tv={biggerColSize}
            desk={biggerColSize}
            tablet={biggerColSize}
            palm={biggerColSize}
          >
            <h4 className={theme.emailFormTitle}>
              Encaminhar por e-mail
            </h4>
          </Col>
          <Col
            tv={smallerColSize}
            desk={smallerColSize}
            tablet={smallerColSize}
            palm={smallerColSize}
            align={'end'}
          >
            <Button
              className={theme.emailFormClose}
              fill="clean"
              onClick={handleClose}
              icon={<CloseIcon size={20} />}
            />
          </Col>
        </Row>
        <Row>
          <FormInput
            name="recipient"
            label="Digite seu nome (opcional)"
            value={recipient}
            onChange={this.handleInputChange}
          />
        </Row>
        <Row>
          <FormInput
            name="email"
            label="Digite o e-mail"
            hint="Aperte Enter para enviar"
            value={email}
            onKeyPress={this.handleKeyPress}
            onChange={this.handleInputChange}
          />
        </Row>
      </div>
    )
  }
}

EmailForm.propTypes = {
  theme: PropTypes.shape({
    emailForm: PropTypes.string,
    emailFormTitle: PropTypes.string,
    emailFormClose: PropTypes.string,
  }),
  handleClose: PropTypes.func.isRequired,
}

EmailForm.defaultProps = {
  theme: {},
}

export default consumeTheme(EmailForm)
