import { connect } from 'react-redux'
import Footer from '../../components/Footer'

const mapStateToProps = state => ({
  buttonVisible: state.footerState.button.visible,
})

export default connect(mapStateToProps)(Footer)
