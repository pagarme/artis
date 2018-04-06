import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Switch = ({
  theme,
  base,
  items,
  selected,
  handleSwitchPayment,
}) => {
  const renderSwitch = () => {
    const width = (100 / items.length)

    const handleOnClick = value => () =>
      handleSwitchPayment(value)

    return (
      items.map((item, index) => {
        const { value, title, subtitle } = item

        const switchClasses = classNames(
          theme[base],
          theme.switchButton,
          {
            [theme.checked]: selected === item.name,
          }
        )

        return (
          <div
            key={item.name}
            className={
              switchClasses
            }
            tabIndex={index}
            onClick={handleOnClick(value)}
            role="button"
            style={{ width: `${width}%` }}
          >
            <h3>{title}</h3>
            <p>{subtitle}</p>
          </div>
        )
      })
    )
  }

  const renderContent = () =>
    items.map(item => (
      <div
        key={item.title}
        className={
          classNames(theme[base], theme.content, {
            [theme.visible]: selected === item.value,
          })
        }
      >
        {item.content}
      </div>
    ))

  return (
    <React.Fragment>
      <div className={classNames(theme[base], theme.switch)}>
        {renderSwitch()}
      </div>
      {renderContent()}
    </React.Fragment>
  )
}

Switch.propTypes = {
  theme: PropTypes.shape({
    switch: PropTypes.string,
    content: PropTypes.string,
    item: PropTypes.string,
    label: PropTypes.string,
    light: PropTypes.string,
    dark: PropTypes.string,
  }),
  base: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    value: PropTypes.string,
    content: PropTypes.element,
  })).isRequired,
  selected: PropTypes.string.isRequired,
  handleSwitchPayment: PropTypes.func.isRequired,
}

Switch.defaultProps = {
  theme: {},
  base: 'dark',
}

export default Switch
