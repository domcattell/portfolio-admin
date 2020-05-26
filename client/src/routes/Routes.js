import React, { useContext, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AuthActions } from '../context/contexts/auth.context';
import PrivateRoute from '../helpers/PrivateRoute';
import authToken from '../helpers/authToken';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

const Routes = () => {
	if (localStorage.token) {
		authToken(localStorage.token);
	}

	const { checkAuth } = useContext(AuthActions);

	useEffect(() => {
		checkAuth();
	}, []);

	return (
		<Switch>
			<Route exact path="/" render={() => <Redirect to="/login" />} />
			<Route exact path="/login" render={(routeProps) => <Login {...routeProps} />} />
			<PrivateRoute exact path="/dashboard" component={Dashboard} />
		</Switch>
	);
};

export default Routes;
