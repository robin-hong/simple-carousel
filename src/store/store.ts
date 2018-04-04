import {Store, createStore, applyMiddleware, compose} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly'
import createSagaMiddleware from 'redux-saga'
import {fromJS} from 'immutable'

import {state, State} from './rootReducer'
import sagas from './rootSaga'
const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = composeWithDevTools(applyMiddleware(sagaMiddleware))
const store: Store<State> = createStore(state, fromJS({}), composeEnhancers)

sagaMiddleware.run(sagas)

export default store
