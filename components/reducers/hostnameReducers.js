import { actionTypes } from '../types'

const initialState = "http://localhost:3000"

export default (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.HOSTNAME:
			return action.payload
		default:
			return state
	}
}