import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  anyPass,
  assocPath,
  ap,
  complement,
  contains,
  defaultTo,
  equals,
  filter,
  is,
  isEmpty,
  isNil,
  lensPath,
  partial,
  partialRight,
  pathEq,
  reduce,
  reject,
  set,
  view,
} from 'ramda'

const isErrorEmpty = anyPass([isNil, isEmpty, complement(Boolean)])

const getValue = (event) => {
  if (event.target) {
    return contains(event.target.value, ['on', 'off'])
      ? event.target.checked
      : event.target.value
  }

  return event
}

const defaultToEmptyString = defaultTo('')

export default class Form extends Component {
  constructor (props) {
    super(props)

    this.state = {
      errors: props.errors || {},
      data: props.data || {},
    }

    this.cloneTree = this.cloneTree.bind(this)
    this.validateTree = this.validateTree.bind(this)
    this.notifyChangeEvent = this.notifyChangeEvent.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    const { data, errors } = nextProps

    if (data && !equals(data, this.props.data)) {
      this.setState({ data })
    }

    if (errors && !equals(errors, this.props.errors)) {
      this.setState({ errors })
    }
  }

  notifyChangeEvent () {
    const { onChange } = this.props

    if (typeof onChange === 'function') {
      const { data, errors } = this.state
      onChange(data, errors)
    }
  }

  handleChange (path, originalOnChange, event) {
    const lens = lensPath(path)
    const value = getValue(event)

    const data = set(lens, value, this.state.data)
    const validate = view(lens, this.props.validation)

    if (typeof originalOnChange === 'function') {
      originalOnChange(event)
    }

    if (typeof validate === 'function') {
      const error = validate(defaultToEmptyString(view(lens, data)))
      const errors = set(lens, error, this.state.errors)

      this.setState({ data, errors }, this.notifyChangeEvent)
    }

    if (validate && validate.constructor === Array) {
      const validationErrors = reject(
        complement(Boolean),
        ap(validate, [value])
      )

      if (validationErrors.length > 0) {
        const error = validationErrors[0]
        const errors = set(lens, error, this.state.errors)

        this.setState({ data, errors }, this.notifyChangeEvent)
        return
      }

      const errors = set(lens, null, this.state.errors)

      this.setState({ data, errors }, this.notifyChangeEvent)
      return
    }

    this.setState({ data }, this.notifyChangeEvent)
  }

  cloneTree (element, index, parentElement, parentPath = []) {
    if (!element || typeof element === 'string') {
      return element
    }

    if (element.props.role === 'alert' && element.props.htmlFor) {
      const path = [...parentPath, element.props.htmlFor]
      const lens = lensPath(path)

      const errors = view(lens, this.state.errors)

      if (errors) {
        const error = is(Array, errors) ? errors[0] : errors

        return React.cloneElement(
          element,
          { children: error }
        )
      }

      return element
    }

    const name = isNil(element.props.name) ? [] : [element.props.name]
    const path = [...parentPath, ...name]

    if (element.props.name) {
      const originalOnChange = element.props.onChange
      const { customErrorProp } = this.props
      const lens = lensPath(path)
      const value = view(lens, this.state.data)
      const error = customErrorProp
        ? { [customErrorProp]: view(lens, this.state.errors) }
        : {}
      const onChange = element.type !== 'fieldset'
        ? { onChange: partial(this.handleChange, [path, originalOnChange]) }
        : {}

      if (parentElement) {
        const siblings = filter(
          pathEq(['props', 'name'], element.props.name),
          parentElement.props.children
        )

        if (siblings.length > 1) {
          return React.cloneElement(element, {
            ...error,
            checked: value === element.props.value,
            ...onChange,
          })
        }
      }

      if (element.props.children) {
        const children = React.Children.map(
          element.props.children,
          partialRight(this.cloneTree, [element, path])
        )

        if (typeof value === 'object') {
          return React.cloneElement(element, { children })
        }

        return React.cloneElement(element, {
          ...error,
          ...onChange,
          value,
          children,
        })
      }

      if (is(Boolean, value)) {
        return React.cloneElement(element, {
          ...error,
          checked: value,
          ...onChange,
        })
      }

      return React.cloneElement(element, {
        ...error,
        value,
        ...onChange,
      })
    }

    if (element.props.children) {
      return React.cloneElement(element, {
        children: React.Children.map(
          element.props.children,
          partialRight(this.cloneTree, [element, path])
        ),
      })
    }

    return element
  }

  validateTree (errors = {}, element, parentPath = []) {
    if (!element || typeof element === 'string') {
      return errors
    }

    if (!element.props) {
      return errors
    }

    const children = React.Children.toArray(element.props.children)

    if (children.length) {
      const path = element.props.name
        ? [...parentPath, element.props.name]
        : parentPath

      return reduce(
        partialRight(this.validateTree, [path]),
        errors,
        children
      )
    }

    if (element.props.name) {
      const path = [...parentPath, element.props.name]
      const lens = lensPath(path)
      const validation = view(lens, this.props.validation)

      if (!validation) {
        return errors
      }

      const value = defaultTo('', view(lens, this.state.data))

      if (is(Array, validation)) {
        const validationErrors = reject(
          complement(Boolean),
          ap(validation, [value])
        )

        if (validationErrors.length > 0) {
          const error = validationErrors[0]

          if (!isErrorEmpty(error)) {
            return assocPath(path, error, errors)
          }
        }

        return errors
      }

      const validationError = validation(value)

      if (isErrorEmpty(validationError)) {
        return errors
      }

      return assocPath(
        path,
        validationError,
        errors
      )
    }

    return errors
  }

  handleSubmit (event) {
    event.preventDefault()
    event.stopPropagation()

    const errors = this.validateTree({}, this)

    this.setState(
      { errors },
      () => isErrorEmpty(this.state.errors) // eslint-disable-line
        ? this.props.onSubmit(this.state.data)
        : this.props.onSubmit(this.state.data, this.state.errors)
    )
  }

  render () {
    const { className } = this.props

    return (
      <form onSubmit={this.handleSubmit} className={className}>
        {React.Children.map(
          this.props.children,
          partialRight(this.cloneTree, [this, []])
        )}
      </form>
    )
  }
}

Form.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  customErrorProp: PropTypes.string,
  data: PropTypes.object, // eslint-disable-line
  errors: PropTypes.object, // eslint-disable-line
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  validation: PropTypes.object, // eslint-disable-line
}

Form.defaultProps = {
  children: null,
  className: '',
  customErrorProp: undefined,
  data: null,
  errors: null,
  onChange: null,
  onSubmit: () => undefined,
  validation: {},
}
