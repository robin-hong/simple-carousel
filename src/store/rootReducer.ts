import {combineReducers} from 'redux-immutable'

import carouselReducer from './Carousel/Carousel.reducers'

export interface State {
    carousel: any
}

export const state = combineReducers({
    carouselDomain: carouselReducer
})
