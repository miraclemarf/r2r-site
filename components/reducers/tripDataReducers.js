import { actionTypes } from '../types'

const initialState = null

export default (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.TRIP_LIST:
			return Object.assign([], state, action.payload)
		default:
			return state
	}
}