import { CLEAR_USERS, SEARCH_USERS, SET_LOADING, GET_REPOS, GET_USER, ERROR, CLEAR_ERROR } from '../types';

export default (state, action) => {
	switch (action.type) {
		case GET_REPOS:
			return {
				...state,
				repos: action.payload,
				loading: false,
				error: null,
			};

		case GET_USER:
			return {
				...state,
				user: action.payload,
				loading: false,
				error: null,
			};

		case CLEAR_USERS:
			return {
				...state,
				users: [],
				loading: false,
				error: null,
			};

		case SEARCH_USERS:
			return {
				...state,
				users: action.payload,
				loading: false,
				error: null,
			};

		case SET_LOADING:
			return {
				...state,
				loading: true,
				error: null,
			};

		case ERROR:
			return {
				...state,
				loading: false,
				error: { msg: 'Check your internet connection', type: 'danger' },
			};
		case CLEAR_ERROR:
			return {
				...state,
				loading: false,
				error: null,
			};

		default:
			return state;
	}
};
