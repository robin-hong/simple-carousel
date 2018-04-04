import {combineReducers} from 'redux-immutable'
import {fromJS, List} from 'immutable'
import {ReduxAction} from '../interfaces'
import * as actionTypes from './Carousel.actionTypes'

const initialState = fromJS({
    imageList: [],
    toggleStatus: {
        cats: false,
        sharks: false
    },
    currentImage: 0,
    loading: false
})

function data(state = initialState, action: ReduxAction) {
    switch (action.type) {
        case actionTypes.CAROUSEL_SET_LIST:
            return state.withMutations(map => {
                map
                    .set('imageList', List(action.payload.list))
                    .set('loading', false)
                    .set('currentImage', 0)
            })
        case actionTypes.CAROUSEL_SET_TOGGLE:
            const active = state.getIn(['toggleStatus', action.payload.animal], false)
            return state.withMutations(map => {
                map.setIn(['toggleStatus', action.payload.animal], !active).set('loading', true)
            })
        case actionTypes.CAROUSEL_NEXT:
            var i: number = state.get('currentImage', 0) + 1
            var length: number = state.get('imageList').size
            if (i >= length) {
                i = 0
            }
            return state.set('currentImage', i)
        case actionTypes.CAROUSEL_PREV:
            var i: number = state.get('currentImage', 0) - 1
            var length: number = state.get('imageList').size
            if (i <= 0) {
                i = length - 1
            }
            return state.set('currentImage', i)
        default:
            return state
    }
}

export default combineReducers({data})
