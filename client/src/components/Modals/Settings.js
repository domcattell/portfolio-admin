import React from 'react';
import { Modal, Button, Accordion, Card, Form } from 'react-bootstrap';
import ChangePassword from '../Forms/ChangePassword';
import RegisterAccount from '../Forms/RegisterAccount';

const Settings = (props) => {
	return (
		<Modal show={props.show} onHide={props.toggle} size="lg" centered>
			<Modal.Header closeButton>
				<Modal.Title>Settings</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Accordion defaultActiveKey="0">
					<Card>
						<Card.Header>
							<Accordion.Toggle as={Button} variant="link" eventKey="0">
								Update Password
							</Accordion.Toggle>
						</Card.Header>
						<Accordion.Collapse eventKey="0">
							<Card.Body>
								<ChangePassword />
							</Card.Body>
						</Accordion.Collapse>
					</Card>

					<Card>
						<Card.Header>
							<Accordion.Toggle as={Button} variant="link" eventKey="1">
								Add New Account
							</Accordion.Toggle>
						</Card.Header>
						<Accordion.Collapse eventKey="1">
							<Card.Body>
								<RegisterAccount />
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				</Accordion>
			</Modal.Body>
		</Modal>
	);
};

export default Settings;
