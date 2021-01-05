// Init State and Actions
import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = (props) => {
	const initialState = {
		alert: {},
	};

	const [state, dispatch] = useReducer(AlertReducer, initialState);

	// Set Alert
	const setAlert = (msg, type) => {
		console.log(msg, type);
		try {
			dispatch({
				type: SET_ALERT,
				payload: { msg, type },
			});
			setTimeout(() => dispatch({ type: REMOVE_ALERT }), 4000);
		} catch (error) {
			return dispatch({
				type: SET_ALERT,
				payload: { msg: 'Internal error. Try again', type },
			});
		}
	};

	return (
		<AlertContext.Provider
			value={{
				alert: state.alert,
				setAlert,
			}}
		>
			{props.children}
		</AlertContext.Provider>
	);
};
export default AlertState;
