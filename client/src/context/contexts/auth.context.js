import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import authReducer from '../reducers/auth.reducer';
import authToken from '../../helpers/authToken';
import {toast} from 'react-toastify';
import {
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	AUTH_ERROR,
	CLEAR_MSGS,
	LOGOUT,
	AUTH_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_ERROR,
	PASSWORD_CHANGE_SUCCESS,
	PASSWORD_CHANGE_ERROR
} from '../actions/types';

export const AuthContext = createContext();
export const AuthActions = createContext();

export const AuthProvider = (props) => {
	const init = {
		loadingAuth: false,
		user: '',
		isAuthenticated: false,
		authMsgs: ''
	};

	const [ state, dispatch ] = useReducer(authReducer, init);

	const checkAuth = async () => {
		if (localStorage.token) {
			authToken(localStorage.token);
		}

		try {
			const res = await axios.get('/api/admin/user');
			dispatch({
				type: AUTH_SUCCESS,
				payload: res.data
			});
		} catch (e) {
			dispatch({
				type: AUTH_ERROR,
				payload: e.response.data
			});
		}
	};

	const loginUser = async (user) => {
		const config = {
			header: {
				'Content-Type': 'application/json'
			}
		};

		try {
			const res = await axios.post('/api/admin/login', user, config);
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data
			});
		} catch (e) {
			dispatch({
				type: LOGIN_ERROR,
				payload: e.response.data
			});
		}
	};

	const registerAccount = async (user) => {
		try {
			const res = await axios.post('/api/admin/register', user);
			toast(res.data.msg);
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data
			});
		} catch (e) {
			toast(e.response.data.msg);
			dispatch({
				type: REGISTER_ERROR,
				payload: e.response.data
			});
		}
	};

	const changePassword = async (password) => {
		try {
			const res = await axios.put('/api/admin/account', password);
			toast(res.data.msg);
			dispatch({
				type: PASSWORD_CHANGE_SUCCESS,
				payload: res.data
			});
		} catch (e) {
			toast(e.response.data.msg);
			dispatch({
				type: PASSWORD_CHANGE_ERROR,
				payload: e.response.data
			});
		}
	};

	const logout = () => dispatch({ type: LOGOUT });
	const clearMsgs = () => dispatch({ type: CLEAR_MSGS });

	const actions = {
		checkAuth,
		loginUser,
		logout,
		clearMsgs,
		registerAccount,
		changePassword
	};

	return (
		<AuthContext.Provider value={state}>
			<AuthActions.Provider value={actions}>{props.children}</AuthActions.Provider>
		</AuthContext.Provider>
	);
};
