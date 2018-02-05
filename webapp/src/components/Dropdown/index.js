import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import shortid from 'shortid'
import { themr } from 'react-css-themr'
import { Scrollbars } from 'react-custom-scrollbars'
import { find, prop, propEq, compose, merge } from 'ramda'

import AngleDownIcon from 'react-icons/lib/fa/angle-down'
import AngleUpIcon from 'react-icons/lib/fa/angle-up'

const applyThemr = themr('UIDropdown')

class Dropdown extends Component {
  constructor (props) {
    super(props)

    const getValueProp = prop('value')
    const getOptionsProp = prop('options')

    const findSelectedOption = find(
      propEq('value', getValueProp(props)),
    )

    const getSelectedProp = compose(findSelectedOption, getOptionsProp)

    this.state = {
      isOpen: false,
      selected: merge({
        name: null,
        value: null,
      }, getSelectedProp(props)),
    }

    this.id = shortid.generate()

    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.handleDropdownOpen = this.handleDropdownOpen.bind(this)
    this.renderScrollbarThumb = this.renderScrollbarThumb.bind(this)
    this.renderOptions = this.renderOptions.bind(this)
  }

  handleDropdownOpen () {
    if (!this.props.disabled) {
      this.setState(state => ({ isOpen: !state.isOpen }))
    }
  }

  handleOnBlur () {
    setTimeout(() => this.setState({ isOpen: false }), 200)
  }

  handleOnClickOption (selected) {
    this.setState({ selected })
    this.props.onChange(selected)
  }

  renderScrollbarThumb () {
    const { theme } = this.props

    return <div className={theme.scrollbarThumb} />
  }

  renderOptions () {
    const { theme, options } = this.props
    const { selected } = this.state

    return options.map((option, index) => {
      const isSelected = option.value === selected.value

      const optionClasses = classNames(theme.option, {
        [theme.selected]: isSelected,
      })

      return (
        <div
          role="option"
          tabIndex={index}
          key={option.value}
          aria-selected={isSelected ? 'true' : 'false'}
          className={optionClasses}
          onClick={this.handleOnClickOption.bind(this, option)}
        >
          {option.name}
        </div>
      )
    })
  }

  render () {
    const {
      isOpen,
      selected,
    } = this.state

    const {
      theme,
      id,
      label,
      disabled,
      error,
    } = this.props

    const wrapperClasses = classNames(theme.wrapper, {
      [theme.isOpen]: isOpen,
      [theme.labelEffect]: selected.value,
      [theme.disabled]: disabled,
      [theme.error]: error,
    })

    const optionsWrapperClasses = classNames(theme.optionsWrapper, {
      [theme.isOpen]: isOpen,
    })

    return (
      <div className={wrapperClasses}>
        <div
          role="listbox"
          tabIndex="0"
          id={id || this.id}
          className={theme.dropdown}
          onClick={this.handleDropdownOpen}
          onBlur={this.handleOnBlur}
        >
          <label
            htmlFor={id || this.id}
            className={theme.label}
          >
            {label}
          </label>
          <div className={theme.icon}>
            {isOpen ? <AngleUpIcon /> : <AngleDownIcon />}
          </div>
          {selected.value
            ? (
              <div className={theme.selectedValue}>
                {selected.name}
              </div>
            )
            : ''
          }
        </div>
        <div className={optionsWrapperClasses}>
          <Scrollbars
            style={{ height: 100 }}
            renderThumbVertical={this.renderScrollbarThumb}
          >
            {this.renderOptions()}
          </Scrollbars>
        </div>
        {error &&
          <span className={theme.errorText}>{error}</span>
        }
      </div>
    )
  }
}

Dropdown.propTypes = {
  theme: PropTypes.shape({
    dropdown: PropTypes.string,
    label: PropTypes.string,
    labelEffect: PropTypes.string,
    icon: PropTypes.string,
    wrapper: PropTypes.string,
    optionsWrapper: PropTypes.string,
    option: PropTypes.string,
    scrollbarThumb: PropTypes.string,
    selectedValue: PropTypes.string,
    disabled: PropTypes.string,
    error: PropTypes.string,
    errorText: PropTypes.string,
  }),
  label: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.oneOf([PropTypes.string, PropTypes.number]), // eslint-disable-line
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  onChange: PropTypes.func,
}

Dropdown.defaultProps = {
  theme: {},
  id: '',
  label: '',
  value: '',
  disabled: false,
  error: '',
  onChange: null,
}

export default applyThemr(Dropdown)
