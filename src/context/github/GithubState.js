// Init State and Actions
import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import { CLEAR_USERS, SEARCH_USERS, SET_LOADING, GET_REPOS, GET_USER, ERROR, CLEAR_ERROR } from '../types';

let githubClientId;
let githubClientSecret;
if (process.env.NODE_ENV !== 'production') {
	githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
	githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
	githubClientId = process.env.GITHUB_CLIENT_ID;
	githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = (props) => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false,
		error: null,
	};

	const [state, dispatch] = useReducer(GithubReducer, initialState);

	// Search GitHub Users
	const searchUsers = async (name) => {
		try {
			setLoading();
			const res = await axios.get(
				`https://api.github.com/search/users?q=${name}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
			);
			res.status === 200
				? dispatch({
						type: SEARCH_USERS,
						payload: res.data.items,
				  })
				: // if internally there are errors
				  dispatch({ type: ERROR });
		} catch (err) {
			// any HTTP error is caught here
			dispatch({ type: ERROR });
		}
	};

	// Get Single User
	// @param: Login as Username
	const getUser = async (username) => {
		try {
			setLoading();
			const res = await axios.get(
				`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
			);
			res.status === 200
				? dispatch({
						type: GET_USER,
						payload: res.data,
				  })
				: // if internally there are errors
				  dispatch({ type: ERROR });
		} catch (err) {
			dispatch({ type: ERROR });
		}
	};

	// Get User Repos
	const getUserRepos = async (username) => {
		try {
			setLoading();
			const res = await axios.get(
				`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
			);
			res.status === 200
				? dispatch({
						type: GET_REPOS,
						payload: res.data,
				  })
				: // if internally there are errors
				  dispatch({ type: ERROR });
		} catch (err) {
			dispatch({ type: ERROR });
		}
	};

	// Clear errors
	const clearError = () => dispatch({ type: CLEAR_ERROR });

	//  Clear Users from State
	const clearUsers = () => dispatch({ type: CLEAR_USERS });

	// Set Loading
	const setLoading = () => dispatch({ type: SET_LOADING });

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				user: state.user,
				repos: state.repos,
				loading: state.loading,
				error: state.error,
				searchUsers,
				clearUsers,
				getUser,
				getUserRepos,
				clearError,
			}}
		>
			{props.children}
		</GithubContext.Provider>
	);
};
export default GithubState;
