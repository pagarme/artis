import React from 'react'
import { themr } from 'react-css-themr'
import PropTypes from 'prop-types'
import FormValidation from 'react-vanilla-form'

const applyThemr = themr('UIForm')

const Form = ({ theme, validation, children }) => (
  <FormValidation validation={validation} className={theme.form}>
    { children }
  </FormValidation>

)

Form.propTypes = {
  theme: PropTypes.shape({
    form: PropTypes.string,
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  validation: PropTypes.object, // eslint-disable-line
}

Form.defaultProps = {
  validation: {},
  theme: {},
}

export default applyThemr(Form)
