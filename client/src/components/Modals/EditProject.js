import React, { useContext, useEffect } from 'react';
import { Form, Modal, Button, Container, Row, Col } from 'react-bootstrap';
import { ProjectsActions, ProjectsContext } from '../../context/contexts/projects.context';
import useInputState from '../../hooks/useInputState';
import TextEditor from '../Utils/TextEditor';

const EditProject = (props) => {
	const [ projectDetails, handleChange, handleDesc, fileChange, resetForm ] = useInputState('');

	const { editProject, getProject, clearProjectMsg, clearProject, loadingProject } = useContext(ProjectsActions);
	const { project } = useContext(ProjectsContext);

	/**
	 * two @useEffect hooks here. 
	 * the first is to fetch the initial data, only on mount, and then do cleanup on close
	 * second hook is to prefill the @useInputState hook with the fetched data. this re renders
	 * when the @project state changes, and fills in the form with data
	 */

	useEffect(
		() => {
			loadingProject();
			getProject(props.url);
			return () => {
				clearProject();
				clearProjectMsg();
			};
		},
		[ props.url ]
	);

	useEffect(
		() => {
			resetForm(project);
		},
		[ project ]
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		const form_data = new FormData(e.target);
		form_data.set('description', projectDetails.description);
		form_data.set('imageName', projectDetails.imageName);
		editProject(props.url, form_data);
	};

	return (
		<Modal size="lg" show={props.show} onHide={props.toggle} centered>
			<Modal.Header closeButton>
				<Modal.Title id="new-project">Edit {props.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Container>
					<Form id="EditProjectForm" onSubmit={handleSubmit}>
						<Form.Group>
							<Form.Control
								name="title"
								value={projectDetails.title || ''}
								onChange={handleChange}
								type="text"
							/>
						</Form.Group>

						<Form.Group>
							<Form.Control
								name="code"
								value={projectDetails.code || ''}
								onChange={handleChange}
								type="text"
								placeholder=""
							/>
						</Form.Group>

						<Form.Group>
							<Form.Control
								name="demo"
								value={projectDetails.demo || ''}
								onChange={handleChange}
								type="text"
								placeholder=""
							/>
						</Form.Group>

						<Form.Group>
							<TextEditor value={projectDetails.description || ''} onChange={handleDesc} />
						</Form.Group>

						<Form.Group>
							<Row noGutters>
								<Col>
									<Button variant="primary" type="submit">
										Save Changes
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
											{projectDetails.projectImg !== project.projectImg ? (
												'Replaced Image'
											) : (
												'Replace Image'
											)}
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

export default EditProject;
