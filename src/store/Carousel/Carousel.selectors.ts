import {createSelector} from 'reselect'
import {List, Map} from 'immutable'

export const imageListSelector = state =>
    state.getIn(['carouselDomain', 'data', 'imageList'], List())

export const currentImageSelector = state =>
    state.getIn(['carouselDomain', 'data', 'currentImage'], 0)

export const toggleStatusSelector = state =>
    state.getIn(['carouselDomain', 'data', 'toggleStatus'], Map())

export const loadingSelector = state => state.getIn(['carouselDomain', 'data', 'loading'], false)
