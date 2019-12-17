import { actionTypes } from '../types'

const initialState = false

export default (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.MY_GALLERIES_FETCHED:
			return action.payload
		default:
			return state
	}
}