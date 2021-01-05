import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
	const alertContext = useContext(AlertContext);
	const { alert } = alertContext;

	return alert && alert.msg ? (
		<div className={`alert alert-${alert.type}`}>
			<i className={'fas fa-info-circle'} /> {alert.msg}
		</div>
	) : (
		<div></div>
	);
};
export default Alert;
