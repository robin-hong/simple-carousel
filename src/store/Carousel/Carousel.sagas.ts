import {delay} from 'redux-saga'
import {takeLatest, call, put, select} from 'redux-saga/effects'
import * as actionTypes from './Carousel.actionTypes'
import {setImageList} from './Carousel.actions'
import {toggleStatusSelector} from './Carousel.selectors'

const fetchData = async url => {
    let response = await fetch(url)
    return response.json()
}

function* callListApi(action) {
    try {
        const toggleStatus = yield select(toggleStatusSelector)
        let type = 'none'
        if (toggleStatus.get('sharks', false) && toggleStatus.get('cats', false)) {
            type = 'all'
        } else if (toggleStatus.get('cats', false)) {
            type = 'cats'
        } else if (toggleStatus.get('sharks', false)) {
            type = 'sharks'
        }
        yield delay(1000)
        const url = `http://localhost:4000/api/list?type=${type}`
        const response = yield call(fetchData, url)
        yield put(setImageList(response.result))
    } catch (e) {
        console.log(e)
    }
}

function* toggleAnimalSaga() {
    yield takeLatest(actionTypes.CAROUSEL_SET_TOGGLE, callListApi)
}

export default [toggleAnimalSaga()]
