import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ReactGA from 'react-ga'

ReactGA.initialize('UA-44419105-12', { testMode: true })

configure({ adapter: new Adapter() })
