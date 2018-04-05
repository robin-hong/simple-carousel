import {call} from 'redux-saga/effects'
import {fromJS, List} from 'immutable'

import * as actionTypes from '@store/Carousel/Carousel.actionTypes'
import * as actions from '@store/Carousel/Carousel.actions'
import reducer from '@store/Carousel/Carousel.reducers'

const initialState = fromJS({
    carouselDomain: {
        data: {
            imageList: [],
            toggleStatus: {
                cats: false,
                sharks: false
            },
            currentImage: 0,
            loading: false
        }
    }
})

const sharksList = [
    'https://founded.media/hiring/photos/sharks/11261840124_dc9ac72bbe_b.jpg',
    'https://founded.media/hiring/photos/sharks/513197047_2f861d56cb_b.jpg',
    'https://founded.media/hiring/photos/sharks/2989909952_b59500107e_o.jpg',
    'https://founded.media/hiring/photos/sharks/4107884442_3baf8985f2_b.jpg',
    'https://founded.media/hiring/photos/sharks/3822452418_ffa66da89d_o.jpg',
    'https://founded.media/hiring/photos/sharks/3800013954_20fea3a9c9_b.jpg',
    'https://founded.media/hiring/photos/sharks/7109693941_250fc6b246_k.jpg',
    'https://founded.media/hiring/photos/sharks/8592704407_75c3c7ff53_h.jpg',
    'https://founded.media/hiring/photos/sharks/14730744390_cebc28aa86_k.jpg',
    'https://founded.media/hiring/photos/sharks/4936728723_91da549b05_b.jpg'
]

const catsList = [
    'https://founded.media/hiring/photos/cats/14157413946_fea785b4d6_k.jpg',
    'https://founded.media/hiring/photos/cats/16175483119_bd7374d8a8_h.jpg',
    'https://founded.media/hiring/photos/cats/13901304865_a444cf4d34_k.jpg',
    'https://founded.media/hiring/photos/cats/8311701653_49ed80202c_k.jpg',
    'https://founded.media/hiring/photos/cats/13336301695_3c06dd41cc_k.jpg',
    'https://founded.media/hiring/photos/cats/38679744435_66279af67c_k.jpg',
    'https://founded.media/hiring/photos/cats/6393395037_9cda69da1a_b.jpg',
    'https://founded.media/hiring/photos/cats/6977309082_44102ddf51_b.jpg',
    'https://founded.media/hiring/photos/cats/11477923503_bbdf86387d_b.jpg',
    'https://founded.media/hiring/photos/cats/4481336172_7f464f180d_b.jpg'
]

describe('carousel test', () => {
    it('Return initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState.get('carouselDomain'))
    })

    it('add cats', () => {
        const expectedState = initialState
            .get('carouselDomain')
            .setIn(['data', 'imageList'], List(catsList))
        const action = {
            type: actionTypes.CAROUSEL_SET_LIST,
            payload: {list: catsList}
        }

        expect(reducer(undefined, action)).toEqual(expectedState)
    })

    it('add sharks', () => {
        const expectedState = initialState
            .get('carouselDomain')
            .setIn(['data', 'imageList'], List(sharksList))
        const action = {
            type: actionTypes.CAROUSEL_SET_LIST,
            payload: {list: sharksList}
        }

        expect(reducer(undefined, action)).toEqual(expectedState)
    })

    it('add both', () => {
        const expectedState = initialState
            .get('carouselDomain')
            .setIn(['data', 'imageList'], List(sharksList.concat(catsList)))
        const action = {
            type: actionTypes.CAROUSEL_SET_LIST,
            payload: {list: sharksList.concat(catsList)}
        }

        expect(reducer(undefined, action)).toEqual(expectedState)
    })

    it('go next', () => {
        const expectedState = initialState
            .get('carouselDomain')
            .setIn(['data', 'imageList'], List(sharksList))
            .setIn(['data', 'currentImage'], 1)

        const state = initialState
            .get('carouselDomain')
            .setIn(['data', 'imageList'], List(sharksList))
            .setIn(['data', 'currentImage'], 0)

        const action = {
            type: actionTypes.CAROUSEL_NEXT
        }

        expect(reducer(state, action)).toEqual(expectedState)
    })

    it('go prev', () => {
        const expectedState = initialState
            .get('carouselDomain')
            .setIn(['data', 'imageList'], List(sharksList))
            .setIn(['data', 'currentImage'], 0)

        const state = initialState
            .get('carouselDomain')
            .setIn(['data', 'imageList'], List(sharksList))
            .setIn(['data', 'currentImage'], 1)

        const action = {
            type: actionTypes.CAROUSEL_PREV
        }

        expect(reducer(state, action)).toEqual(expectedState)
    })

    it('go next to start of list', () => {
        const expectedState = initialState
            .get('carouselDomain')
            .setIn(['data', 'imageList'], List(sharksList))
            .setIn(['data', 'currentImage'], 0)

        const state = initialState
            .get('carouselDomain')
            .setIn(['data', 'imageList'], List(sharksList))
            .setIn(['data', 'currentImage'], 9)

        const action = {
            type: actionTypes.CAROUSEL_NEXT
        }

        expect(reducer(state, action)).toEqual(expectedState)
    })

    it('go prev to end of list', () => {
        const expectedState = initialState
            .get('carouselDomain')
            .setIn(['data', 'imageList'], List(sharksList))
            .setIn(['data', 'currentImage'], 9)

        const state = initialState
            .get('carouselDomain')
            .setIn(['data', 'imageList'], List(sharksList))
            .setIn(['data', 'currentImage'], 0)

        const action = {
            type: actionTypes.CAROUSEL_PREV
        }

        expect(reducer(state, action)).toEqual(expectedState)
    })
})
