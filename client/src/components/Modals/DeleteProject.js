import React, { useContext, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ProjectsActions } from '../../context/contexts/projects.context';

const DeleteProject = (props) => {
	const { deleteProject } = useContext(ProjectsActions);

	const handleSubmit = (e) => {
		e.preventDefault();
		deleteProject(props.url);
	};

	return (
		<Modal show={props.show} onHide={props.toggle} centered>
			<Modal.Header closeButton>
				<Modal.Title>Delete {props.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>Are you sure you want to delete '{props.title}'?</Modal.Body>
			<Modal.Footer>
				<Button onClick={handleSubmit}>Delete</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default DeleteProject;
