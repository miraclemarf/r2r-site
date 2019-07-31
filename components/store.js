import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from '../components/reducers'

const initialState = {}

export function initializeStore (state = initialState) {
    return createStore(
        reducers,
        state,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    )
}