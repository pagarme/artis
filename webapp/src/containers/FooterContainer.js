import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Footer from '../components/Footer'

const FooterContainer = ({
  buttonText,
  buttonClick,
  companyName,
  nextButtonDisabled,
  buttonVisible,
}) => (
  <Footer
    buttonText={buttonText}
    buttonClick={buttonClick}
    buttonVisible={buttonVisible}
    companyName={companyName}
    nextButtonDisabled={nextButtonDisabled}
  />
)

FooterContainer.defaultProps = {
  nextButtonDisabled: false,
}

FooterContainer.propTypes = {
  buttonText: PropTypes.string.isRequired,
  buttonClick: PropTypes.func.isRequired,
  companyName: PropTypes.string.isRequired,
  nextButtonDisabled: PropTypes.bool,
  buttonVisible: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  buttonVisible: state.footerState.button.visible,
})

export default connect(mapStateToProps)(Footer)
