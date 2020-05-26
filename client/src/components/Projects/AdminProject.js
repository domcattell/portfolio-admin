import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useToggle from '../../hooks/useToggle';
import EditProject from '../Modals/EditProject';
import DeleteProject from '../Modals/DeleteProject';
import DashboardButton from '../UI/DashboardButton';
import styles from '../../styles/admin/projects/admin_project.module.scss';

const AdminProject = (props) => {
	const [ editModal, toggleEditModal ] = useToggle(false);
	const [ deleteModal, toggleDeleteModal ] = useToggle(false);
	const description = `${props.description.substring(0, 300)}...`;

	return (
		<div className={styles.project}>
			{editModal && <EditProject show={editModal} toggle={toggleEditModal} url={props.url} title={props.title} />}
			{deleteModal && (
				<DeleteProject show={deleteModal} toggle={toggleDeleteModal} url={props.url} title={props.title} />
			)}
			<div className={styles.project__image}>
				<img className={styles.project__src} src={props.img} alt="project image" />
			</div>
			<div className={styles.project__toolbar}>
				<div className={styles.project__header}>
					<a href="#" className={styles.project__title}>
						{props.title}
					</a>
				</div>
				<section className={styles.project__info} dangerouslySetInnerHTML={{ __html: description }} />
				<div className={styles.project__controls}>
					<DashboardButton style="alternative" onClick={toggleEditModal}>
						<FontAwesomeIcon icon="pen-square" />
					</DashboardButton>
					<DashboardButton style="alternative" onClick={toggleDeleteModal}>
						<FontAwesomeIcon icon="trash" />
					</DashboardButton>
				</div>
			</div>
		</div>
	);
};

export default AdminProject;
