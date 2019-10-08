import { actionTypes } from '../types'

const initialState = false

export default (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.MY_TRANSACTIONS_FETCHED:
			return action.payload
		default:
			return state
	}
}