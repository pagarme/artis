import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Autocomplete from 'react-autocomplete'
import { prop } from 'ramda'
import ThemeConsumer from '../../former-kit/ThemeConsumer'

const consumeTheme = ThemeConsumer('UIAutocomplete')

class InputAutocomplete extends PureComponent {
  state = {
    value: '',
  }

  getItensToRender = theme => (
    item => (
      <div className={theme.selectItem}>
        {item.label}
      </div>
    )
  )

  getItemValue = prop('label')

  shouldItemRenderer = (item) => {
    const { value } = this.state
    const itemValue = value ? this.valueExistsOnItems(item, value) : item.label

    return itemValue
  }

  valueExistsOnItems = (item, value) =>
    item.label.toLowerCase().indexOf(value.toLowerCase()) > -1

  handleChange = (e) => {
    const { onChange } = this.props

    this.setState({
      value: e.target.value,
    })

    if (onChange) {
      onChange(e)
    }
  }

  handleSelected = (value) => {
    const { onSelect } = this.props

    this.setState({
      value,
    })

    if (onSelect) {
      onSelect(value)
    }
  }

  render () {
    const { value } = this.state
    const {
      error,
      items,
      placeholder,
      theme,
    } = this.props

    const wrapperClasess = classNames(
      theme.selectWrapper,
      {
        [theme.error]: error,
      }
    )

    return (
      <div className={wrapperClasess}>
        <Autocomplete
          getItemValue={this.getItemValue}
          inputProps={{
            placeholder,
          }}
          items={items}
          onChange={this.handleChange}
          onSelect={this.handleSelected}
          renderItem={this.getItensToRender(theme)}
          shouldItemRender={this.shouldItemRenderer}
          value={value}
        />
        {
          error &&
          <p>{ error }</p>
        }
      </div>
    )
  }
}

InputAutocomplete.propTypes = {
  error: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
    })
  ).isRequired,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
  placeholder: PropTypes.string.isRequired,
  theme: PropTypes.shape({
    error: PropTypes.string,
    selectItem: PropTypes.string,
    selectWrapper: PropTypes.string,
  }).isRequired,
}

InputAutocomplete.defaultProps = {
  error: '',
  onChange: null,
  onSelect: null,
}

export default consumeTheme(InputAutocomplete)
