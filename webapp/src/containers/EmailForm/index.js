import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'
import CloseIcon from 'react-icons/lib/io/android-close'

import { Row, Col } from '../../components/Grid'
import Input from '../../components/Input'
import Button from '../../components/Button'

const applyThemr = themr('UIEmailForm')
const biggerColSize = 9
const smallerColSize = 3

class EmailForm extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      recipient: '',
      email: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleKeyPress (e) {
    const { handleClose } = this.props

    // send email here
    if (e.key === 'Enter') {
      handleClose()
    }
  }

  handleInputChange (e) {
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
            alignEnd
          >
            <Button
              className={theme.emailFormClose}
              fill="clean"
              onClick={handleClose}
              relevance="high"
            >
              <CloseIcon />
            </Button>
          </Col>
        </Row>
        <Row>
          <Input
            name="recipient"
            label="Digite seu nome (opcional)"
            value={recipient}
            onChange={this.handleInputChange}
          />
        </Row>
        <Row>
          <Input
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
  // content: PropTypes.any, // add this when the container sends emails
}

EmailForm.defaultProps = {
  theme: {},
}

export default applyThemr(EmailForm)
