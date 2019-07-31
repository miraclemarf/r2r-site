import { combineReducers } from 'redux'
import FieldReducer from './FieldReducers'

export default combineReducers({
    field: FieldReducer
})
