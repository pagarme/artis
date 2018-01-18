import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid'
import { themr } from 'react-css-themr'

const applyThemr = themr('UISegmentedSwitch')

class SegmentedSwitch extends PureComponent {
  constructor (props) {
    super(props)
    this.renderItem = this.renderItem.bind(this)
    this.instanceId = `segmented-switch-${shortid.generate()}`
  }

  renderItem (item, index, optionMaxWidth) {
    const {
      value,
      title,
      subtitle,
    } = item

    const {
      selected,
      onChange,
      name,
      theme,
    } = this.props

    const id = `${this.instanceId}-${name}-${value}`

    return (
      <label
        key={id}
        className={theme.item}
        htmlFor={id}
        style={{ maxWidth: `${optionMaxWidth}%` }}
      >
        <input
          id={id}
          name={id}
          value={value}
          type="radio"
          checked={selected.value === value}
          onChange={onChange.bind(this, item, index)}
        />
        <span className={theme.label}>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </span>
      </label>
    )
  }

  render () {
    const optionMaxWidth = (100 / this.props.items.length)
    const {
      theme,
      items,
    } = this.props

    return (
      <div className={theme.segmentedSwitch}>
        {items.map((item, index) =>
          this.renderItem(item, index, optionMaxWidth))
        }
      </div>
    )
  }
}

SegmentedSwitch.propTypes = {
  theme: PropTypes.shape({
    segmentedSwitch: PropTypes.string,
    item: PropTypes.string,
    label: PropTypes.string,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
  })).isRequired,
  selected: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
}

SegmentedSwitch.defaultProps = {
  theme: {},
  selected: '',
}

export default applyThemr(SegmentedSwitch)
