import { actionTypes } from '../types'

const initialState = 0

export default (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GALLERY_TOTAL:
			return action.payload
		default:
			return state
	}
}