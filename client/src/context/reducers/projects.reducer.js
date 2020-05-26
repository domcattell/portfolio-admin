import {
	GET_PROJECTS,
	GET_PROJECT,
	ADD_PROJECT,
	ADD_FAILED,
	DELETE_PROJECT,
	DELETE_FAILED,
	EDIT_PROJECT,
	EDIT_FAILED,
	CLEAR_MSG,
	GET_PROJECTS_FAILED,
	GET_PROJECT_FAILED,
	CLEAR_PROJECT,
	PROJECT_LOADING,
} from '../actions/types';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
	switch (action.type) {
		case GET_PROJECTS:
			return {
				...state,
				projects: action.payload
			};

		case GET_PROJECT:
			return {
				...state,
				project: action.payload,
				loading: false
			};

		case PROJECT_LOADING: 
			return {
				...state,
				loading: true
			};

		case ADD_PROJECT:
			return {
				...state,
				projects: [ ...state.projects, action.payload ]
			};

		case DELETE_PROJECT:
			return {
				...state,
				projects: state.projects.filter(project => project.url !== action.payload)
			};

		case EDIT_PROJECT:
			return {
				...state,
				projects: state.projects.map(project => project._id === action.payload._id ? action.payload : project)
			};

		case CLEAR_MSG:
			return {
				...state,
				projectsMsg: ""
			};

		case CLEAR_PROJECT:
			return {
				...state,
				project: {},
				loading: true
			};
		
		case GET_PROJECT_FAILED:
			return {
				...state,
				project: {},
				projectsMsg: action.payload
			};

		case GET_PROJECTS_FAILED:
			return {
				...state,
				projects: [],
				projectsMsg: action.payload
			};

		case EDIT_FAILED:
		case DELETE_FAILED:
		case ADD_FAILED:
			return {
				...state,
				projectsMsg: action.payload
			};

		default:
			return state;
	}
};

export default reducer;
