import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Row,
  Col,
  ThemeConsumer,
} from 'former-kit'

const consumeTheme = ThemeConsumer('UIActionList')
const defaultColSize = 12

const ActionList = ({ theme, buttons }) => (
  <React.Fragment>
    {
      buttons.map(buttonInfo => (
        <Row key={buttonInfo.text}>
          <Col
            tv={defaultColSize}
            desk={defaultColSize}
            tablet={defaultColSize}
            palm={defaultColSize}
          >
            <Button
              textAlign="left"
              relevance="low"
              fill="outline"
              disabled={buttonInfo.disabled || false}
              full
              size="huge"
              className={theme.actionButton}
              onClick={buttonInfo.onClick}
              type={buttonInfo.href ? 'link' : 'button'}
              href={buttonInfo.href}
              download={buttonInfo.download}
            >
              {buttonInfo.text}
            </Button>
          </Col>
        </Row>
      ))
    }
  </React.Fragment>
)

ActionList.propTypes = {
  theme: PropTypes.shape({
    actionButton: PropTypes.string,
  }),
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      disabled: PropTypes.bool,
      text: PropTypes.string,
      onClick: PropTypes.func,
      href: PropTypes.string,
      download: PropTypes.string,
    })
  ).isRequired,
}

ActionList.defaultProps = {
  theme: {},
}

export default consumeTheme(ActionList)
