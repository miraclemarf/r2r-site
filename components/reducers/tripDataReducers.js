import { actionTypes } from '../types';

const initialState = null;

export default (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.TRIP_LIST:
			return Object.assign({}, state, { list: action.payload });
		case actionTypes.TRIP_DETAIL:
			return Object.assign({}, state, { detail: action.payload });
		case actionTypes.TRIP_PRICE:
			return Object.assign({}, state, { price: action.payload });
		case actionTypes.TRIP_MOTOR:
			return Object.assign({}, state, { motor: action.payload });
		default:
			return state;
	}
};