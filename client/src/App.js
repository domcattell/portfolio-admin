import React from 'react';
import { ProjectsProvider } from './context/contexts/projects.context';
import { AuthProvider } from './context/contexts/auth.context';
import { toast, Slide } from 'react-toastify';
import Routes from './routes/Routes';
import 'react-toastify/dist/ReactToastify.css';
import './styles/utils/reset.css';
import './styles/utils/_custom_bootstrap_theme.scss';
import './styles/utils/_custom_toastify.css';
import './styles/utils/_custom_quill_editor.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
	faNewspaper,
	faCog,
	faSignOutAlt,
	faHome,
	faExternalLinkAlt,
	faPenSquare,
	faTrash,
	faLink,
	faAt,
	faSmile,
	faUserPlus
} from '@fortawesome/free-solid-svg-icons';

toast.configure({
	hideProgressBar: true,
	autoClose: 3000,
	transition: Slide
});

const App = () => {
	library.add(
		fab,
		faUserPlus,
		faCog,
		faSignOutAlt,
		faHome,
		faNewspaper,
		faExternalLinkAlt,
		faPenSquare,
		faTrash,
		faLink,
		faAt,
		faSmile
	);

	return (
		<AuthProvider>
			<ProjectsProvider>
				<Routes />
			</ProjectsProvider>
		</AuthProvider>
	);
};

export default App;
