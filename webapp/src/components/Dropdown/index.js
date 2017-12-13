import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import MdArrowDropDown from 'react-icons/lib/md/arrow-drop-down'
import {
  propEq,
  pipe,
  find,
  prop,
  defaultTo,
} from 'ramda'

import style from './style.css'

class Dropdown extends React.Component {
  constructor (props) {
    super(props)

    this.selectOption = this.selectOption.bind(this)
    this.findSelectedName = this.findSelectedName.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  selectOption (value) {
    this.props.onChange(value)
  }

  findSelectedName () {
    const {
      options,
      value,
    } = this.props

    const selected = pipe(
      find(propEq('value', value)),
      defaultTo({}),
      prop('name'),
      defaultTo(this.props.title || 'Selecione')
    )

    return selected(options)
  }

  handleChange (e) {
    if (!this.props.disabled) {
      this.selectOption(e.target.value)
    }
  }

  render () {
    const containerClass = classnames(style.container, {
      [style.containerDisabled]: this.props.disabled,
      [style.containerError]: this.props.error,
    })

    const dropdownOptions = this.props.options.map(({ value, name }) => {
      const optionClasses = classnames(style.option, {
        [style.isSelected]: this.props.value === value,
      })

      return (
        <option
          key={value}
          className={optionClasses}
          value={value}
        >
          {name}
        </option>
      )
    })

    return (
      <div className={containerClass}>
        <div className={style.buttonGroup}>
          <label
            htmlFor={this.props.name}
            className={style.label}
          >
            {this.props.label}
          </label>

          <MdArrowDropDown
            className={style.arrow}
            color={this.props.disabled ? '#d4d4d4' : '#000'}
          />

          <div
            className={style.input}
          >
            {this.findSelectedName() || this.props.title}

            <select
              onChange={this.handleChange}
              disabled={this.props.disabled}
            >
              {this.props.title &&
                <option
                  disabled
                  className={classnames(style.option, style.disabledOption)}
                >
                  {this.props.title}
                </option>
              }
              {dropdownOptions}
            </select>
          </div>

          {this.props.error &&
            <p
              className={style.secondaryText}
            >
              {this.props.error}
            </p>
          }
        </div>
      </div>
    )
  }
}

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  error: PropTypes.string,
}

Dropdown.defaultProps = {
  value: '',
  disabled: false,
  title: '',
  error: '',
}

export default Dropdown
