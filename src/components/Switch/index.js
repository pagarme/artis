import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { themr } from 'react-css-themr'

const applyThemr = themr('UISwitch')

class Switch extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selected: 0,
    }
  }

  handleOnChange (index) {
    this.setState({ selected: index })
    this.props.onChange(index)
  }

  renderSwitch () {
    const { theme, items } = this.props

    const maxWidth = (100 / items.length)

    return (
      items.map((item, index) => {
        const id = item.title === 'Cartão de Crédito'
          ? 'creditcard'
          : 'boleto'

        return (
          <label
            id={id}
            key={id}
            className={theme.item}
            htmlFor={`${id}-input`}
            style={{ maxWidth: `${maxWidth}%` }}
          >
            <input
              id={`${id}-input`}
              name={item.name}
              value={item.value}
              type="radio"
              checked={this.state.selected === index}
              onChange={this.handleOnChange.bind(this, index)}
            />
            <div className={theme.label}>
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
            </div>
          </label>
        )
      })
    )
  }

  renderContent () {
    const { theme, items } = this.props

    return items.map((item, index) => (
      <div
        key={item.title}
        className={
          classNames(theme.content, {
            [theme.visible]: index === this.state.selected,
          })
        }
      >
        {item.content}
      </div>
    ))
  }

  render () {
    const { theme } = this.props

    return (
      <React.Fragment>
        <div className={theme.switch}>
          {this.renderSwitch()}
        </div>
        {this.renderContent()}
      </React.Fragment>
    )
  }
}

Switch.propTypes = {
  theme: PropTypes.shape({
    switch: PropTypes.string,
    content: PropTypes.string,
    item: PropTypes.string,
    label: PropTypes.string,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    value: PropTypes.string,
    content: PropTypes.element,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
}

Switch.defaultProps = {
  theme: {},
}

export default applyThemr(Switch)
