import React from 'react'
import PropTypes from 'prop-types'

const SomeButton = ({ children, onClick }) => (
  <button onClick={onClick}>{ children }</button>
)

SomeButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
}

export default SomeButton
