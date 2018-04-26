import PropTypes from 'prop-types'
import { ThemeConsumer } from 'former-kit'

const consumeTheme = ThemeConsumer('UINormalizeCSS')

const NormalizeCSS = ({ children }) => (children)

NormalizeCSS.propTypes = {
  children: PropTypes.element,
}

NormalizeCSS.defaultProps = {
  children: {},
}

export default consumeTheme(NormalizeCSS)
