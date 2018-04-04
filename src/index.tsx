import 'regenerator-runtime/runtime'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {hot} from 'react-hot-loader'

import store from '@store/store'

import {initializeIcons} from '@uifabric/icons'
initializeIcons()

import App from './app'

class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}
ReactDOM.render(<Root />, document.getElementById('root'))
