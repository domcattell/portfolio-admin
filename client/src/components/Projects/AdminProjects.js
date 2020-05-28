import React, { useEffect, useContext } from 'react';
import { ProjectsContext, ProjectsActions } from '../../context/contexts/projects.context';
import AdminPagesList from '../PagesList/AdminPagesList';
import AdminProject from './AdminProject';
import styles from '../../styles/admin/projects/admin_projects.module.scss';

const AdminProjects = () => {
	const { getProjects } = useContext(ProjectsActions);
	const { projects } = useContext(ProjectsContext);

	useEffect(() => {
		getProjects();
	}, []);

	return (
		<div className={styles.projects}>
			<div className={styles.projects__wrapper}>
				<AdminPagesList />
				<div className={styles.projects__container} id={styles.scrollbar}>
					<div className={styles.projects__header}>
						<h5 className={styles.projects__title}>Projects</h5>
					</div>
					{projects.map((project) => (
						<AdminProject
							key={project._id}
							id={project._id}
							title={project.title}
							img={project.projectImg}
							url={project.url}
							description={project.description}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default AdminProjects;
