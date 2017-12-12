import React from 'react'
import {
  string,
} from 'prop-types'
import classNames from 'classnames'

const AddressData = ({ className, active }) =>
  (<div className={classNames(className, active)}>AddressData</div>)

AddressData.propTypes = {
  className: string,
  active: string,
}

AddressData.defaultProps = {
  className: '',
  active: '',
}

export default AddressData
