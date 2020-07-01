import React, { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import useInputState from '../../hooks/useInputState';
import { AuthActions } from '../../context/contexts/auth.context';

const RegisterAccount = () => {
	const { registerAccount } = useContext(AuthActions);
	const [ user, handleChange ] = useInputState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		registerAccount(user);
	};
	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group>
                <Form.Control 
                name="username" 
                onChange={handleChange}
                value={user.username || ""}
                size="sm" type="text" 
                placeholder="Username*" />
			</Form.Group>

			<Form.Group>
                <Form.Control 
                name="password" 
                size="sm" 
                onChange={handleChange}
                value={user.password || ""}
                type="password" 
                placeholder="Password*" />
			</Form.Group>

            <Form.Group>
                <Form.Control 
                name="confirmPassword" 
                size="sm" 
                onChange={handleChange}
                value={user.confirmPassword || ""}
                type="password" 
                placeholder="Confirm Password*" />
			</Form.Group>

			<Form.Group>
				<Button type="submit" size="sm">Register Account</Button>
			</Form.Group>
		</Form>
	);
};

export default RegisterAccount;
