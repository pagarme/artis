import React from 'react'
import { themr } from 'react-css-themr'
import PropTypes from 'prop-types'

import {
  Row,
  Col,
} from './../Grid'
import Button from './../Button'

const applyThemr = themr('UIActionList')
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
              fill="double"
              disabled={buttonInfo.disabled || false}
              full
              size="extra-large"
              className={theme.actionButton}
              onClick={buttonInfo.onClick}
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
    })
  ).isRequired,
}

ActionList.defaultProps = {
  theme: {},
}

export default applyThemr(ActionList)
