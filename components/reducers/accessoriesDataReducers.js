import { actionTypes } from '../types'

const initialState = null

export default (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ACCESSORIES_CATEGORY:
			return Object.assign({}, state, { category: action.payload });
		case actionTypes.ACCESSORIES_SUBCATEGORY:
			return Object.assign({}, state, { subcategory: action.payload });
		case actionTypes.ACCESSORIES_DATA:
			return Object.assign({}, state, { data: action.payload });
		default:
			return state;
	}
};