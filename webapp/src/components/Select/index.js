import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'
import classnames from 'classnames'
import shortid from 'shortid'
import { Scrollbars } from 'react-custom-scrollbars'

import AngleDownIcon from 'react-icons/lib/fa/angle-down'
import AngleUpIcon from 'react-icons/lib/fa/angle-up'
import ArrowDownIcon from 'react-icons/lib/md/arrow-drop-down'

const applyThemr = themr('UISelect')

class Select extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedName: '',
      selectedValue: '',
      isOpen: false,
    }

    this.instanceId = `${props.name}-${shortid.generate()}`

    this.renderThumb = this.renderThumb.bind(this)
    this.handleSelectItemMobile = this.handleSelectItemMobile.bind(this)
    this.handleOpenOptions = this.handleOpenOptions.bind(this)
    this.handleOnLeave = this.handleOnLeave.bind(this)
  }

  handleSelectItemMobile (event) {
    const { onChange } = this.props
    const value = event.target.value

    this.setState({ selectedValue: value })

    if (onChange) { onChange(value) }
  }

  handleOnLeave () {
    setTimeout(() => {
      this.handleOpenOptions()
    }, 120)
  }

  handleSelectItemDesktop (item) {
    const { onChange } = this.props

    this.setState({
      selectedName: item.name,
      selectedValue: item.value,
    })

    if (onChange) { onChange(item.value) }
  }

  handleOpenOptions () {
    this.setState({ isOpen: !this.state.isOpen })
  }

  renderThumb ({ style, ...props }) { // eslint-disable-line
    const thumbStyle = {
      backgroundColor: '#00f385',
    }

    return (
      <div
        style={{ ...thumbStyle }}
        {...props}
      />
    )
  }

  renderOnMobile () {
    const {
      label,
      hint,
      name,
      error,
      theme,
      placeholder,
      options,
      value,
    } = this.props

    const { selectedValue } = this.state

    const selectClass = classnames(
      theme.select,
      {
        [theme.error]: error,
      }
    )

    const arrowClass = classnames(
      theme.arrow,
      {
        [theme.arrowDoubleBorder]: error,
      }
    )

    const mobileContainer = classnames(
      theme.container,
      theme.mobileContainer
    )

    const optionsHTML = options.map(({ value: optionValue, name: text }) => (
      <option
        key={optionValue}
        value={optionValue}
        className={theme.option}
      >
        {text}
      </option>
    ))

    return (
      <div className={mobileContainer}>
        <label
          htmlFor={this.instanceId}
          className={theme.label}
        >
          {label}
        </label>

        <select
          className={selectClass}
          name={name}
          onChange={this.handleSelectItemMobile}
          defaultValue={value || selectedValue}
        >
          <option
            disabled
          >
            {placeholder}
          </option>
          {optionsHTML}
        </select>

        {(hint || error) &&
          <span className={theme.secondaryText}>
            {error || hint}
          </span>
        }

        <ArrowDownIcon
          className={arrowClass}
        />
      </div>
    )
  }

  renderOnDesktop () {
    const {
      theme,
      placeholder,
      name,
      label,
      error,
      hint,
      value,
      options,
    } = this.props

    const {
      selectedValue,
      selectedName,
      isOpen,
    } = this.state

    const optionsHTML = options.map((obj, index) => (
      <div
        key={obj.name}
        role="button"
        tabIndex={index}
        className={theme.optionContainer}
        onClick={this.handleSelectItemDesktop.bind(this, obj)}
      >
        <span className={theme.optionItem}>{obj.name}</span>
      </div>
    ))

    return (
      <Fragment>
        <div
          className={classnames(theme.container,
            {
              [theme.error]: error,
            },
          )}
        >
          <label htmlFor={name} className={theme.label}>
            {label}
          </label>
          <div
            role="button"
            tabIndex={0}
            onBlur={this.handleOnLeave}
            onClick={this.handleOpenOptions}
            className={theme.select}
          >
            <span className={theme.placeholder}>
              {selectedName || placeholder}
            </span>
            {
              isOpen
                ? <AngleUpIcon className={theme.angleDownIcon} />
                : <AngleDownIcon className={theme.angleDownIcon} />
            }
          </div>
          <div className={theme.scrollContainer}>
            <Scrollbars
              style={{ height: 100 }}
              className={classnames(theme.scrollBox,
                {
                  [theme.visible]: isOpen,
                },
              )}
              renderThumbVertical={this.renderThumb}
            >
              <div className={theme.optionsList}>
                {optionsHTML}
              </div>
            </Scrollbars>
          </div>
        </div>
        {
          (hint || error) &&
          <p className={theme.secondaryText}>
            {error || hint}
          </p>
        }
        <select
          name={name}
          className={theme.none}
          defaultValue={value || selectedValue}
        >
          {
            value || selectedValue
              ? <option value={value || selectedValue} />
              : ''
          }
        </select>
      </Fragment>
    )
  }

  render () {
    const { isBigScreen } = this.props

    return (
      !isBigScreen
        ? this.renderOnMobile()
        : this.renderOnDesktop()
    )
  }
}

Select.propTypes = {
  theme: PropTypes.shape({
    container: PropTypes.string,
    boxContainer: PropTypes.string,
    hidden: PropTypes.string,
    visible: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    angleDownIcon: PropTypes.string,
    select: PropTypes.string,
    optionsList: PropTypes.string,
    optionItem: PropTypes.string,
    scroll: PropTypes.string,
    none: PropTypes.string,
    selectArrow: PropTypes.string,
    arrow: PropTypes.string,
    option: PropTypes.string,
    mobileContainer: PropTypes.string,
  }),
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  value: PropTypes.string,
  hint: PropTypes.string,
  disabled: PropTypes.bool,
  isBigScreen: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
}

Select.defaultProps = {
  theme: {},
  error: '',
  hint: '',
  value: null,
  disabled: false,
  onChange: () => {},
}

export default applyThemr(Select)
