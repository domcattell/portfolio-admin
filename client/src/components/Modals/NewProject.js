import React, { useContext, useEffect } from 'react';
import { Form, Modal, Button, Container, Row, Col } from 'react-bootstrap';
import { ProjectsActions } from '../../context/contexts/projects.context';
import useInputState from '../../hooks/useInputState';
import TextEditor from '../Utils/TextEditor';

const NewProjects = (props) => {
	const [ project, handleChange, handleDesc, fileChange ] = useInputState('');

	const { addProject, clearProjectMsg } = useContext(ProjectsActions);

	const handleSubmit = (e) => {
		e.preventDefault();
		const form_data = new FormData(e.target);
		form_data.append('description', project.description);
		addProject(form_data);
	};

	useEffect(() => {
		return () => {
			clearProjectMsg();
		};
	}, []);

	return (
		<Modal size="lg" show={props.show} onHide={props.toggle} centered style={{ zIndex: '9999' }}>
			<Modal.Header closeButton>
				<Modal.Title id="new-project">New Portfolio Project</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Container>
					<Form id="newProjectForm" onSubmit={handleSubmit}>
						<Form.Group>
							<Form.Control
								name="title"
								value={project.title || ''}
								onChange={handleChange}
								type="text"
								placeholder="Title"
							/>
						</Form.Group>

						<Form.Group>
							<Form.Control
								name="code"
								value={project.code || ''}
								onChange={handleChange}
								type="text"
								placeholder="Source Link"
							/>
						</Form.Group>

						<Form.Group>
							<Form.Control
								name="demo"
								value={project.demo || ''}
								onChange={handleChange}
								type="text"
								placeholder="Demo Link"
							/>
						</Form.Group>

						<Form.Group>
							<TextEditor value={project.description || ''} onChange={handleDesc} />
						</Form.Group>

						<Form.Group>
							<Row noGutters>
								<Col>
									<Button variant="primary" type="submit">
										Create Project
									</Button>
								</Col>
								<Col>
									<Form.File id="formcheck-api-custom" custom>
										<Form.File.Input
											accept=".jpg,.jpeg,.png"
											name="projectImg"
											onChange={fileChange}
										/>
										<Form.File.Label data-browse="Upload Image">
											{project.projectImg ? 'Image Added' : 'Add an Image'}
										</Form.File.Label>
									</Form.File>
								</Col>
							</Row>
						</Form.Group>
					</Form>
				</Container>
			</Modal.Body>
		</Modal>
	);
};

export default NewProjects;
