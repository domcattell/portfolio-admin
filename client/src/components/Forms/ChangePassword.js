import React, {useContext} from 'react';
import {Form, Button} from 'react-bootstrap';
import {AuthActions} from '../../context/contexts/auth.context';
import useInputState from '../../hooks/useInputState';

const ChangePassword = () => {
    const {changePassword} = useContext(AuthActions);
    const [password, handleChange] = useInputState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        changePassword(password);
    }

    return (
        <Form onSubmit={handleSubmit}>
        <Form.Group>
            <Form.Control
                name="currentPassword"
                size="sm"
                type="password"
                onChange={handleChange}
                value={password.currentPassword || ""}
                placeholder="Current password*"
            />
        </Form.Group>

        <Form.Group>
            <Form.Control
                name="newPassword"
                size="sm"
                type="password"
                onChange={handleChange}
                value={password.newPassword || ""}
                placeholder="New password*"
            />
        </Form.Group>

        <Form.Group>
            <Form.Control
                name="retypePassword"
                size="sm"
                type="password"
                onChange={handleChange}
                value={password.retypePassword || ""}
                placeholder="Confirm password*"
            />
        </Form.Group>

        <Form.Group>
            <Button type="submit" size="sm">Change Password</Button>
        </Form.Group>
    </Form>
    );
}

export default ChangePassword;
