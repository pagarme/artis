import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import shortid from 'shortid'
import MdArrowDropDown from 'react-icons/lib/md/arrow-drop-down'

class Dropdown extends React.Component {
  constructor (props) {
    super(props)

    this.instanceId = `${props.name}-${shortid.generate()}`
  }

  handleChange = (event) => {
    const { disabled, onChange } = this.props

    if (!disabled && onChange) {
      onChange(event)
    }
  }

  renderOptions () {
    const {
      theme,
      options,
      value,
    } = this.props

    return options.map(({ value: optValue, name }) => {
      const optionClasses = classNames(
        theme.option,
        {
          [theme.active]: value === optValue,
        }
      )

      return (
        <option
          key={optValue}
          className={optionClasses}
          value={optValue}
        >
          {name}
        </option>
      )
    })
  }

  render () {
    const {
      disabled,
      error,
      label,
      placeholder,
      theme,
      base,
      value,
      name,
      icon,
    } = this.props

    const rootClasses = classNames(
      theme[base],
      theme.dropdown,
      {
        [theme.disabled]: disabled,
        [theme.error]: error,
      }
    )

    const iconClass = classNames(
      theme.icon,
      {
        [theme.iconError]: error,
      }
    )

    const hasSecondaryText = theme.secondaryText && error
    const hasLabel = theme.label && label

    return (
      <div className={rootClasses}>
        {
          icon &&
          <div className={iconClass}>{icon}</div>
        }
        <div className={theme.boxContainer}>
          {
            hasLabel &&
            <label
              htmlFor={this.instanceId}
              className={theme.label}
            >
              {label}
            </label>
          }

          <select
            id={this.instanceId}
            className={theme.select}
            onChange={this.handleChange}
            disabled={disabled}
            value={value}
            name={name}
          >
            <option
              disabled
              hidden
              value="placeholder"
              className={classNames(theme.option, theme.placeholder)}
            >
              {placeholder}
            </option>
            {this.renderOptions()}
          </select>

          <MdArrowDropDown
            className={theme.arrowIcon}
          />

          {
            hasSecondaryText &&
            <p className={theme.secondaryText}>
              {error}
            </p>
          }
        </div>
      </div>
    )
  }
}

Dropdown.propTypes = {
  theme: PropTypes.shape({
    arrow: PropTypes.string,
    disabled: PropTypes.string,
    dropdown: PropTypes.string,
    error: PropTypes.string,
    select: PropTypes.string,
    placeholder: PropTypes.string,
    secondaryText: PropTypes.string,
    success: PropTypes.string,
    light: PropTypes.string,
    dark: PropTypes.string,
    arrowIcon: PropTypes.string,
    icon: PropTypes.string,
  }),
  base: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  icon: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.bool,
  ]),
}

Dropdown.defaultProps = {
  theme: {},
  base: 'dark',
  value: 'placeholder',
  disabled: false,
  placeholder: '',
  error: '',
  label: '',
  onChange: null,
  icon: false,
}

export default Dropdown
