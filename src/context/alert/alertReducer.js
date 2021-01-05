import { SET_ALERT, REMOVE_ALERT } from '../types';

export default (state, action) => {
	switch (action.type) {
		case SET_ALERT:
			return {
				...state,
				alert: action.payload,
				error: null,
			};
		case REMOVE_ALERT:
			return {
				...state,
				alert: null,
				error: null,
			};
		default:
			return state;
	}
};
