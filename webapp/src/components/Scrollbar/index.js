import React from 'react'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars'

const Scrollbar = ({
  children,
  renderTrackHorizontal,
  renderTrackVertical,
  renderThumbHorizontal,
  renderThumbVertical,
  style,
}) => (
  <Scrollbars
    renderTrackHorizontal={renderTrackHorizontal}
    renderTrackVertical={renderTrackVertical}
    renderThumbHorizontal={renderThumbHorizontal}
    renderThumbVertical={renderThumbVertical}
    style={style}
  >
    {children}
  </Scrollbars>
)

Scrollbar.propTypes = {
  children: PropTypes.element.isRequired,
  renderTrackHorizontal: PropTypes.func,
  renderTrackVertical: PropTypes.func,
  renderThumbHorizontal: PropTypes.func,
  renderThumbVertical: PropTypes.func,
  style: PropTypes.shape(),
}

Scrollbar.defaultProps = {
  renderTrackHorizontal: null,
  renderTrackVertical: null,
  renderThumbHorizontal: null,
  renderThumbVertical: null,
  style: null,
}

export default Scrollbar
