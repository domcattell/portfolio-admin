import React,{useContext} from 'react';
import LoginForm from '../components/LoginPage/LoginForm'
import LoginHeader from '../components/LoginPage/LoginHeader'
import {AuthContext} from '../context/contexts/auth.context';

const Login = (props) => {
    const {isAuthenticated} = useContext(AuthContext);
    isAuthenticated && props.history.push("/dashboard");
    return (
        <>
            <LoginHeader text="Dominic Cattell" />
            <LoginForm />
        </>
    );
}

export default Login;
