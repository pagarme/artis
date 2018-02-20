import React from 'react'
import { themr } from 'react-css-themr'
import PropTypes from 'prop-types'
import FormValidation from 'react-vanilla-form'

const applyThemr = themr('UIForm')

const Form = ({ children, onChange, onSubmit, theme, validation, ...other }) => (
  <FormValidation
    className={theme.form}
    customErrorProp="error"
    onChange={onChange}
    onSubmit={onSubmit}
    validation={validation}
    {...other}
  >
    {children}
  </FormValidation>
)

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  theme: PropTypes.shape({
    form: PropTypes.string,
  }),
  validation: PropTypes.object, // eslint-disable-line
}

Form.defaultProps = {
  onChange: () => {},
  onSubmit: () => {},
  theme: {},
  validation: {},
}

export default applyThemr(Form)
