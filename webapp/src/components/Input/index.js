import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import MdVisibilityOff from 'react-icons/lib/md/visibility-off'
import MdVisibility from 'react-icons/lib/md/visibility'

import { pick } from 'ramda'

import style from './style.css'

class Input extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      displayPassword: false,
    }

    this.handleDisplayPassword = this.handleDisplayPassword.bind(this)
  }

  handleDisplayPassword (display) {
    this.setState({ displayPassword: display })
  }

  renderPasswordVisibilityIcon () {
    const { value, type } = this.props

    if (value === '' || type !== 'password') {
      return null
    }

    if (this.state.displayPassword) {
      return (
        <MdVisibilityOff
          className={style.displayPasswordIcon}
          onClick={this.handleDisplayPassword.bind(this, false)}
        />
      )
    }

    return (
      <MdVisibility
        className={style.displayPasswordIcon}
        onClick={this.handleDisplayPassword.bind(this, true)}
      />
    )
  }

  render () {
    const {
      disabled,
      error,
      hint,
      icon,
      label,
      multiline,
      type,
      value,
      className,
      onChange,
      name,
    } = this.props

    const inputContainer = classnames(style.inputContainer, {
      [style.multiline]: multiline,
      [style.error]: error,
    })

    const containerClasses = classnames(style.container, {
      [style.active]: !disabled && value !== '',
      [style.disabled]: disabled,
    })

    const contentPresent = classnames({
      [style.contentPresent]: value !== '',
    })

    const inputProps = pick(
      ['disabled', 'placeholder', 'value'],
      this.props
    )

    const inputType = type === 'text' || this.state.displayPassword
      ? 'text'
      : 'password'

    return (
      <div className={containerClasses}>
        {icon &&
          <div className={style.icon}>{icon}</div>
        }
        <div className={style.boxContainer}>
          <div className={inputContainer}>
            {multiline
              ? (
                <textarea
                  rows="1"
                  name={name}
                  className={className}
                  onChange={disabled ? null : onChange}
                  {...inputProps}
                />
              ) : (
                <input
                  id={name}
                  name={name}
                  type={inputType}
                  className={className}
                  onChange={disabled ? null : onChange}
                  {...inputProps}
                />
              )
            }

            {this.renderPasswordVisibilityIcon()}

            <label
              htmlFor={name}
              className={contentPresent}
            >
              {label}
            </label>

            {multiline &&
              <div className={style.expander}>
                {value}
                <br />
              </div>
            }
          </div>
          {(hint || error) &&
            <p className={style.secondaryText}>
              {error || hint}
            </p>
          }
        </div>
      </div>
    )
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
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
  icon: PropTypes.element,
  className: PropTypes.string,
}

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  hint: '',
  disabled: false,
  error: '',
  multiline: false,
  icon: null,
  value: '',
  className: '',
}

export default Input
