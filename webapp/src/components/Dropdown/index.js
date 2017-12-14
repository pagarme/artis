import React from 'react'
import { string, bool, func, arrayOf, shape } from 'prop-types'
import classnames from 'classnames'
import ArrowIcon from 'react-icons/lib/md/arrow-drop-down'
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

    this.findSelectedName = this.findSelectedName.bind(this)
    this.handleChange = this.handleChange.bind(this)
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
      this.props.onChange(e.target.value)
    }
  }

  render () {
    const { disabled, error, options } = this.props

    const containerClass = classnames(style.container, {
      [style.containerDisabled]: disabled,
      [style.containerError]: error,
    })

    const dropdownOptions = options.map(({ value, name }) => {
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

          <ArrowIcon
            className={classnames(style.arrow, {
              [style.arrowDisabledColor]: disabled,
              [style.arrowEnabledColor]: !disabled,
            })}
          />

          <div
            className={style.input}
          >
            {this.findSelectedName() || this.props.title}

            <select
              onChange={this.handleChange}
              disabled={disabled}
              defaultValue="title"
            >
              <option
                disabled
                hidden
                value="title"
                className={classnames(style.option, style.disabledOption)}
              >
                {this.props.title}
              </option>
              {dropdownOptions}
            </select>
          </div>

          {error &&
            <p
              className={style.secondaryText}
            >
              {error}
            </p>
          }
        </div>
      </div>
    )
  }
}

Dropdown.propTypes = {
  name: string.isRequired,
  label: string.isRequired,
  options: arrayOf(
    shape({
      value: string,
      name: string,
    })
  ).isRequired,
  onChange: func.isRequired,
  value: string,
  disabled: bool,
  title: string,
  error: string,
}

Dropdown.defaultProps = {
  value: '',
  disabled: false,
  title: '',
  error: '',
}

export default Dropdown
