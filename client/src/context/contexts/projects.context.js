import React, { createContext, useReducer } from 'react';
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
	PROJECT_LOADING
} from '../actions/types';
import projectsReducer from '../reducers/projects.reducer';
import axios from 'axios';
//currently uses react-toastify to show error data from server response as notifcation
import { toast } from 'react-toastify';

export const ProjectsContext = createContext();
export const ProjectsActions = createContext();

export const ProjectsProvider = (props) => {
	const initState = {
		projects: [],
		project: {},
		projectsMsg: '',
		loading: true
	};

	const [ state, dispatch ] = useReducer(projectsReducer, initState);

	const getProjects = async () => {
		try {
			const res = await axios.get('/api/projects', {
				headers: { Accept: 'application/json' }
			});
			dispatch({
				type: GET_PROJECTS,
				payload: res.data
			});
		} catch (e) {
			dispatch({
				type: GET_PROJECTS_FAILED,
				payload: e.response.data
			});
		}
	};

	const getProject = async (projectURL) => {
		try {
			const res = await axios.get(`/api/projects/${projectURL}`);
			dispatch({
				type: GET_PROJECT,
				payload: res.data
			});
		} catch (e) {
			dispatch({
				type: GET_PROJECT_FAILED,
				payload: e.response.data
			});
		}
	};

	const addProject = async (project) => {
		try {
			const res = await axios.post('/api/projects/new', project);
			dispatch({
				type: ADD_PROJECT,
				payload: res.data
			});
		} catch (err) {
			toast(err.response.data.msg)
			dispatch({
				type: ADD_FAILED,
				payload: err.response.data
			});
		}
	};

	const editProject = async (projectURL, project) => {
		try {
			const res = await axios.put(`/api/projects/${projectURL}`, project);
			dispatch({
				type: EDIT_PROJECT,
				payload: res.data
			});
		} catch (err) {
			toast(err.response.data.msg)
			dispatch({
				type: EDIT_FAILED,
				payload: err.response.data,
			});
		}
	};

	const deleteProject = async (projectURL) => {
		try {
			await axios.delete(`/api/projects/${projectURL}`);
			dispatch({
				type: DELETE_PROJECT,
				payload: projectURL
			});
		} catch (err) {
			toast(err.response.data.msg)
			dispatch({
				type: DELETE_FAILED,
				payload: err.response.data
			});
		}
	};

	const clearProjectMsg = () => {
		dispatch({ type: CLEAR_MSG });
	};

	const clearProject = () => {
		dispatch({ type: CLEAR_PROJECT });
	};

	const loadingProject = () => dispatch({ type: PROJECT_LOADING });

	const actions = {
		getProjects,
		getProject,
		addProject,
		editProject,
		deleteProject,
		clearProjectMsg,
		clearProject,
		loadingProject
	};

	return (
		<ProjectsContext.Provider value={state}>
			<ProjectsActions.Provider value={actions}>{props.children}</ProjectsActions.Provider>
		</ProjectsContext.Provider>
	);
};
