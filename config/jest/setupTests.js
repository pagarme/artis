import raf from './tempPolyfill'
import localStorageMock from './localStorageMock'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })
