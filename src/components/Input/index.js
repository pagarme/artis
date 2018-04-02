import React from 'react'
import { themr } from 'react-css-themr'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import MdVisibilityOff from 'react-icons/lib/md/visibility-off'
import MdVisibility from 'react-icons/lib/md/visibility'
import MaskedInput from 'react-maskedinput'
import { pick, merge } from 'ramda'

import { Tooltip } from '..'

const applyThemr = themr('UIInput')

class Input extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      displayPassword: false,
    }

    this.handleDisplayPassword = this.handleDisplayPassword.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleDisplayPassword (display) {
    this.setState({ displayPassword: display })
  }

  handleChange (e) {
    if (this.props.onAutocomplete) {
      this.props.onAutocomplete(e)
    }

    if (!this.props.disabled && this.props.onChange) {
      this.props.onChange(e)
    }
  }

  renderPasswordVisibilityIcon () {
    const { value, type, theme } = this.props

    if (value === '' || type !== 'password') {
      return null
    }

    if (this.state.displayPassword) {
      return (
        <MdVisibilityOff
          className={theme.displayPasswordIcon}
          onClick={this.handleDisplayPassword.bind(this, false)}
        />
      )
    }

    return (
      <MdVisibility
        className={theme.displayPasswordIcon}
        onClick={this.handleDisplayPassword.bind(this, true)}
      />
    )
  }

  render () {
    const {
      base,
      disabled,
      error,
      hint,
      icon,
      label,
      multiline,
      type,
      value,
      className,
      onBlur,
      name,
      inputRef,
      mask,
      theme,
      maxLength,
      tooltip,
      tooltipClassName,
    } = this.props

    const inputContainer = classnames(
      theme.inputContainer,
      {
        [theme.multiline]: multiline,
        [theme.error]: error,
      }
    )

    const containerClasses = classnames(
      theme[base],
      theme.container,
      {
        [theme.active]: !disabled && value !== '',
        [theme.disabled]: disabled,
      }
    )

    const contentPresent = classnames({
      [theme.contentPresent]: value !== '',
    })

    const inputProps = merge(
      pick(
        ['disabled', 'placeholder', 'value', 'onFocus', 'onKeyPress'],
        this.props
      ),
      {
        ref: inputRef,
        onBlur,
        onChange: this.handleChange,
        maxLength,
      }
    )

    const inputType = this.state.displayPassword
      ? 'text'
      : type


    const iconClass = classnames(
      theme.icon,
      {
        [theme.iconError]: error,
      }
    )

    return (
      <div className={containerClasses}>
        {icon &&
          <div className={iconClass}>{icon}</div>
        }
        <div className={theme.boxContainer}>
          <div className={inputContainer}>
            {!mask && (multiline
              ? (
                <textarea
                  rows="1"
                  name={name}
                  className={className}
                  {...inputProps}
                />
              ) : (
                <input
                  id={name}
                  name={name}
                  type={inputType}
                  className={className}
                  {...inputProps}
                />
              )
            )}

            {mask &&
              <MaskedInput
                name={name}
                className={className}
                {...inputProps}
                mask={mask}
              />
            }

            {this.renderPasswordVisibilityIcon()}

            <label
              htmlFor={name}
              className={contentPresent}
            >
              {label}
            </label>

            {multiline &&
              <div className={theme.expander}>
                {value}
                <br />
              </div>
            }
            {
              tooltip &&
              <Tooltip
                text={tooltip}
                className={tooltipClassName || theme.tooltip}
              />
            }
          </div>
          {(hint || error) &&
            <p className={theme.secondaryText}>
              {error || hint}
            </p>
          }
        </div>
      </div>
    )
  }
}

Input.propTypes = {
  theme: PropTypes.shape({
    active: PropTypes.string,
    boxContainer: PropTypes.string,
    container: PropTypes.string,
    contentPresent: PropTypes.string,
    disabled: PropTypes.string,
    displayPasswordIcon: PropTypes.string,
    error: PropTypes.string,
    expander: PropTypes.string,
    icon: PropTypes.string,
    inputContainer: PropTypes.string,
    multiline: PropTypes.string,
    secondaryText: PropTypes.string,
    tooltip: PropTypes.string,
    light: PropTypes.string,
    dark: PropTypes.string,
  }),
  base: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onAutocomplete: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string.isRequired,
  multiline: PropTypes.bool,
  type: PropTypes.oneOf([
    'text',
    'email',
    'number',
    'password',
  ]),
  placeholder: PropTypes.string,
  hint: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  icon: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.bool,
  ]),
  className: PropTypes.string,
  mask: PropTypes.string,
  inputRef: PropTypes.func,
  maxLength: PropTypes.string,
  tooltip: PropTypes.string,
  tooltipClassName: PropTypes.string,
}

Input.defaultProps = {
  theme: {},
  base: 'dark',
  type: 'text',
  placeholder: '',
  hint: '',
  disabled: false,
  error: '',
  multiline: false,
  icon: null,
  value: '',
  className: '',
  mask: '',
  inputRef: null,
  onBlur: null,
  onChange: null,
  onAutocomplete: null,
  maxLength: '200',
  tooltip: '',
  tooltipClassName: '',
}

export default applyThemr(Input)
