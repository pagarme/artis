import React from 'react'
import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'
import classNames from 'classnames'

const applyThemr = themr('UIDropdownButton')

class DropdownButton extends React.Component {
  constructor () {
    super()

    this.handleClick = this.handleClick.bind(this)
    this.handleBlur = this.handleBlur.bind(this)

    this.state = {
      hidden: true,
    }
  }

  handleClick () {
    this.dropdownButton.focus()
    this.setState({ hidden: !this.state.hidden })
  }

  handleBlur () {
    this.setState({ hidden: true })
  }

  render () {
    const { id, title, children, theme, tabIndex } = this.props
    const { hidden } = this.state

    return (
      <div
        id={id}
        className={theme.dropdownButton}
        onClick={this.handleClick}
        onBlur={this.handleBlur}
        tabIndex={tabIndex}
        ref={(button) => { this.dropdownButton = button }}
        role="button"
      >
        {title}
        <div
          className={
            classNames(
              { [theme.hidden]: hidden },
              theme.content,
            )
          }
        >
          {children}
        </div>
      </div>
    )
  }
}

DropdownButton.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node.isRequired,
  theme: PropTypes.shape({
    dropdownButton: PropTypes.string,
    content: PropTypes.string,
    hidden: PropTypes.string,
  }).isRequired,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  tabIndex: PropTypes.number.isRequired,
}

DropdownButton.defaultProps = {
  id: null,
}

export default applyThemr(DropdownButton)
