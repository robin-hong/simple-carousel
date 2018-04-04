import 'regenerator-runtime/runtime'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import store from './store/store'

import Carousel from './components/Carousel/Carousel'

import {initializeIcons} from '@uifabric/icons'
initializeIcons()

import './style.scss'

class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Carousel />
            </Provider>
        )
    }
}

ReactDOM.render(<Root />, document.getElementById('root'))
