import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import shortid from 'shortid'
import { themr } from 'react-css-themr'

const applyThemr = themr('UIRadioGroup')

class RadioGroup extends React.Component {
  instanceId = `radio-group-${shortid.generate()}`

  handleChange = (event) => {
    if (!this.props.disabled && this.props.onChange) {
      this.props.onChange(event)
    }
  }

  render () {
    const {
      name,
      disabled,
      error,
      success,
      options,
      value,
      theme,
    } = this.props

    const containerClass = classnames(theme.container, {
      [theme.disabled]: disabled,
      [theme.error]: error,
      [theme.success]: success,
    })

    const radioButtons = options.map((option, index) => (
      <label
        key={option.value}
        className={theme.label}
        htmlFor={`${this.instanceId}-${option.value}-${index}`}
      >
        <input
          type="radio"
          name={name}
          value={option.value}
          id={`${this.instanceId}-${option.value}-${index}`}
          checked={
            (disabled && index === 0) ||
              (value === option.value)
          }
          onChange={this.handleChange}
          className={theme.input}
          disabled={disabled}
        />

        <span className={theme.title}>
          {option.name}
        </span>
      </label>
    ))

    return (
      <div className={containerClass}>
        {radioButtons}
        {(success || error) &&
          <p
            className={theme.secondaryText}
          >
            {success || error}
          </p>
        }
      </div>
    )
  }
}

RadioGroup.propTypes = {
  theme: PropTypes.shape({
    disabled: PropTypes.string,
    error: PropTypes.string,
    radio: PropTypes.string,
    radioGroup: PropTypes.string,
    secondaryText: PropTypes.string,
    label: PropTypes.string,
  }),
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  success: PropTypes.string,
}

RadioGroup.defaultProps = {
  theme: {},
  value: '',
  disabled: false,
  error: '',
  success: '',
  onChange: null,
}

export default applyThemr(RadioGroup)
