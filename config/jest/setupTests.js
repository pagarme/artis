import raf from './tempPolyfill'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ReactGA from 'react-ga'

ReactGA.initialize('UA-113290482-1', { testMode: true })

configure({ adapter: new Adapter() })
