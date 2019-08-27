import { actionTypes } from '../types';

const initialState = null;

export default (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.TRANSACTION_DATA:
            return Object.assign({}, state, { price: action.payload });
		default:
			return state;
	}
};
