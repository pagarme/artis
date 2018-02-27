import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { themr } from 'react-css-themr'
import { connect } from 'react-redux'
import { omit } from 'ramda'

import { Grid, BillingDataForm } from '../components'
import { addPageInfo } from '../actions'

const applyThemr = themr('UIGeneralForm')

class BillingPage extends Component {
  constructor (props) {
    super(props)

    this.handleStateChange = this.handleStateChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentWillUnmount () {
    this.props.handlePageChange(
      'billing',
      omit(['zipcodeError'], this.state)
    )
  }

  handleStateChange (value) {
    this.setState({ state: value })
  }

  handleInputChange (e) {
    const { name, value } = e.target

    this.setState({ [name]: value })
  }

  render () {
    const { theme, isBigScreen } = this.props

    return (
      <Grid className={
        classNames(theme.page, {
          [theme.noMarginTop]: isBigScreen,
        })}
      >
        <BillingDataForm title="Endereço de Cobrança" />
      </Grid>
    )
  }
}

BillingPage.propTypes = {
  theme: PropTypes.shape({
    page: PropTypes.string,
    title: PropTypes.string,
    titleIcon: PropTypes.string,
  }),
  isBigScreen: PropTypes.bool,
  handlePageChange: PropTypes.func.isRequired,
}

BillingPage.defaultProps = {
  theme: {},
  isBigScreen: false,
}

const mapStateToProps = ({ screenSize, pageInfo }) => ({
  isBigScreen: screenSize.isBigScreen,
  billing: pageInfo.billing,
})

const mapDispatchToProps = dispatch => ({
  handlePageChange: (page, pageInfo) => {
    dispatch(addPageInfo({ page, pageInfo }))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(applyThemr(BillingPage))

