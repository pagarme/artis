import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'
import classnames from 'classnames'
import shortid from 'shortid'
import { Scrollbars } from 'react-custom-scrollbars'

import AngleDownIcon from 'react-icons/lib/fa/angle-down'
import AngleUpIcon from 'react-icons/lib/fa/angle-up'
import MdArrowDropDown from 'react-icons/lib/md/arrow-drop-down'

const applyThemr = themr('UISelect')

class Select extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedValue: null,
      optionsHidden: true,
    }

    this.changeOptionsListVisibility = this.changeOptionsListVisibility.bind(this)
    this.selectedItemMobile = this.selectedItemMobile.bind(this)
    this.renderThumb = this.renderThumb.bind(this)
    this.instanceId = `${props.name}-${shortid.generate()}`
  }

  selectedItemMobile (event) {
    this.setState({ selectedValue: event.target.value })
  }

  selectItemDesktop (item) {
    this.setState({
      selectedName: item.name,
      selectedValue: item.value,
      optionsHidden: !this.state.optionsHidden,
    })
  }

  changeOptionsListVisibility () {
    this.setState({ optionsHidden: !this.state.optionsHidden })
  }

  renderSelectedOption () {
    const { selectedValue } = this.state
    const { value } = this.props

    return (
      <option value={value || selectedValue} />
    )
  }

  renderThumb({ style, ...props }) { // eslint-disable-line
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

  renderListItemsDesktop () {
    const { theme, choices } = this.props

    const items = choices.map((obj, index) => (
      <div
        role="button"
        tabIndex={index}
        onClick={this.selectItemDesktop.bind(this, obj)}
      >
        <span className={theme.optionItem}>{obj.name}</span>
      </div>
    ))

    return items
  }

  renderListItemsMobile () {
    const { theme, choices } = this.props

    return choices.map(({ value: optValue, name }) => (
      <option
        key={optValue}
        value={optValue}
        className={theme.option}
      >
        {name}
      </option>
    ))
  }

  renderOnMobile () {
    const {
      label,
      hint,
      name,
      error,
      theme,
      placeholder,
    } = this.props

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
      theme.mobileContainer,
    )

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
          onChange={this.selectedItemMobile}
          defaultValue={placeholder}
        >
          <option
            disabled
          >
            {placeholder}
          </option>
          {this.renderListItemsMobile()}
        </select>

        {(hint || error) &&
          <p className={theme.secondaryText}>
            {error || hint}
          </p>
        }

        <MdArrowDropDown
          className={arrowClass}
        />
      </div>
    )
  }

  renderOnDesktop (scrollClass, scrollHeight, inputContainer) {
    const {
      theme,
      placeholder,
      name,
      label,
      error,
      hint,
      value,
    } = this.props

    const { selectedValue } = this.state

    const { selectedName, optionsHidden } = this.state

    return (
      <div className={theme.container}>
        <div className={inputContainer}>
          <label htmlFor={name} className={theme.label}>
            {label}
          </label>
          <div
            role="button"
            tabIndex={0}
            onClick={this.changeOptionsListVisibility}
            className={theme.select}
          >
            <span className={theme.placeholder}>
              {selectedName || placeholder}
            </span>
            {
              optionsHidden
                ? <AngleDownIcon className={theme.angleDownIcon} />
                : <AngleUpIcon className={theme.angleDownIcon} />
            }
          </div>
          <div className={theme.scrollContainer}>
            <Scrollbars
              style={{ height: scrollHeight }}
              className={scrollClass}
              renderThumbVertical={this.renderThumb}
            >
              <div className={theme.optionsList}>
                {this.renderListItemsDesktop()}
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
          {(value || selectedValue) && this.renderSelectedOption()}
        </select>
      </div>
    )
  }

  render () {
    const {
      optionsHidden,
    } = this.state

    const {
      theme,
      error,
    } = this.props

    const inputContainer = classnames(
      theme.inputContainer,
      {
        [theme.error]: error,
      }
    )

    const scrollClass = classnames(
      theme.scrollBox,
      optionsHidden ? theme.invisible : theme.visible,
    )

    const scrollHeight = 100

    const isPalm = window.innerWidth < 640

    return (
      isPalm
        ? this.renderOnMobile()
        : this.renderOnDesktop(scrollClass, scrollHeight, inputContainer)
    )
  }
}

Select.propTypes = {
  theme: PropTypes.shape({
    container: PropTypes.string,
    boxContainer: PropTypes.string,
    invisible: PropTypes.string,
    visible: PropTypes.string,
    inputContainer: PropTypes.string,
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
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  value: PropTypes.string,
  hint: PropTypes.string,
  disabled: PropTypes.bool,
}

Select.defaultProps = {
  theme: {},
  error: '',
  hint: '',
  value: null,
  disabled: false,
}

export default applyThemr(Select)
