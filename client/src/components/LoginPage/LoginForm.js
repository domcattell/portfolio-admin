import React, { useContext } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { AuthActions, AuthContext } from '../../context/contexts/auth.context';
import useInputState from '../../hooks/useInputState';

const Login = () => {
	const [ user, handleChange ] = useInputState('');

	const { authMsgs } = useContext(AuthContext);
	const { loginUser } = useContext(AuthActions);

	const handleSubmit = (e) => {
		e.preventDefault();
		loginUser(user);
	};

	return (
		<Container>
			{authMsgs && (
				<Row className="justify-content-md-center">
					<Col lg={5}>
						<Alert variant="warning">{authMsgs}</Alert>
					</Col>
				</Row>
			)}
			<Row className="d-flex justify-content-center">
				<Col lg={5}>
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Username</Form.Label>
							<Form.Control
								size="lg"
								type="text"
								name="username"
								value={user.username || ''}
								onChange={handleChange}
							/>
							<Form.Text className="text-muted" />
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								size="lg"
								type="password"
								name="password"
								value={user.password || ''}
								onChange={handleChange}
							/>
						</Form.Group>
						<Button size="lg" variant="primary" type="submit" block>
							Login
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default Login;
