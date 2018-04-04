import * as React from 'react'
import {hot} from 'react-hot-loader'

import Carousel from './components/Carousel/Carousel'

import './style/style.scss'

const App = () => {
    return (
        <div>
            <Carousel />
        </div>
    )
}

export default hot(module)(App)
