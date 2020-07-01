import React, { useContext, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthActions } from '../../context/contexts/auth.context';
import useToggle from '../../hooks/useToggle';
import NewProject from '../Modals/NewProject';
import Settings from '../Modals/Settings';
import DashboardButton from '../UI/DashboardButton';
import styles from '../../styles/admin/nav/admin_navbar.module.scss';

const AdminNavbar = () => {
	const { logout } = useContext(AuthActions);
	const [ newProject, toggleNewProject ] = useToggle(false);
	const [settings, toggleSettings] = useToggle(false);

	return (
		<nav className={styles.navbar}>
			
			<div className={styles.navbar__controls}>
				<DashboardButton style="large" onClick={toggleNewProject}>
					<FontAwesomeIcon icon="plus" />
				</DashboardButton>
				<DashboardButton style="large" onClick={toggleSettings}>
					<FontAwesomeIcon icon="cog" />
				</DashboardButton>
				<DashboardButton onClick={logout} style="large">
					<FontAwesomeIcon icon="sign-out-alt" />
				</DashboardButton>
				{newProject && <NewProject show={newProject} toggle={toggleNewProject} />}
				{settings && <Settings show={settings} toggle={toggleSettings} />}
			</div>
		</nav>
	);
};

export default memo(AdminNavbar);
