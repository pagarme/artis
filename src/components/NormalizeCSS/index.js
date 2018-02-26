import PropTypes from 'prop-types'
import { themr } from 'react-css-themr'

const applyThemr = themr('UINormalizeCSS')

const NormalizeCSS = ({ children }) => (children)

NormalizeCSS.propTypes = {
  children: PropTypes.element,
}

NormalizeCSS.defaultProps = {
  children: {},
}

export default applyThemr(NormalizeCSS)
