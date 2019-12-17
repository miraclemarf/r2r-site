import { actionTypes } from '../types'

const initialState = null

export default (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.MY_GALLERIES:
			return action.payload
		case actionTypes.MY_GALLERIES_MORE:
			return [ ...state, ...action.payload ]
		default:
			return state
	}
}