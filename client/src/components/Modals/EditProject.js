import React, { useContext, useEffect } from 'react';
import { Form, Modal, Button, Container, Row, Col } from 'react-bootstrap';
import { ProjectsActions, ProjectsContext } from '../../context/contexts/projects.context';
import useInputState from '../../hooks/useInputState';
import TextEditor from '../Utils/TextEditor';

const EditProject = (props) => {
	const [ projectDetails, handleChange, handleDesc, fileChange, resetForm ] = useInputState('');

	const { editProject, getProject, clearProjectMsg, clearProject, loadingProject } = useContext(ProjectsActions);
	const { project } = useContext(ProjectsContext);

	const handleSubmit = (e) => {
		e.preventDefault();
		const form_data = new FormData(e.target);
		form_data.set('description', projectDetails.description);
		form_data.set('imageName', projectDetails.imageName);
		// form_data.set('title', projectDetails.title)
		// form_data.set('code', projectDetails.code)
		// form_data.set('demo', projectDetails.demo)
		form_data.set('projectImg', projectDetails.projectImg);
		editProject(props.url, form_data);
	};

	/**
	 * two @useEffect hooks here. 
	 * the first is to fetch the initial data, and then do cleanup on close
	 * second hook is to prefill the @useInputState hook with the fetched data. this re renders
	 * when the @project state changes, and fills in the form with data
	 * (the project name is tied to the url, as that is what the url is built from,
	 * so if the title changes, the below @useEffect will run again as it looks for changes
	 * in props.url, and thus then sends a put request to the same new/modified endpoint on the server)
	 */

	useEffect(
		() => {
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

	return (
		<Modal size="lg" show={props.show} onHide={props.toggle} centered>
			<Modal.Header closeButton>
				<Modal.Title id="edit-project">Edit {props.title}</Modal.Title>
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
									<Form.File custom>
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
