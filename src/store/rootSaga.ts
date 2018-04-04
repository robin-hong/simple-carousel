import {all, fork} from 'redux-saga/effects'
import carouselSagas from './Carousel/Carousel.sagas'

function* rootSaga() {
    yield all([...carouselSagas])
}

export default rootSaga
