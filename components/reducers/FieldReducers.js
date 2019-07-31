import { actionTypes } from '../types'

export const exampleInitialState = {
	cities: null
}

export default (state = exampleInitialState, action) => {
	switch (action.type) {
		case actionTypes.FIELD_CITY_LIST:
			return Object.assign({}, state, {
				cities: action.payload
			})
		default:
			return state
	}
}