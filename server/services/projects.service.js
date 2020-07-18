const Project = require('../models/project'),
	{ SAFE_REGEX_NAME } = require('../constants');

const findAllProjects = async () => {
	const projects = await Project.find();
	if (!projects) throw Error('Error finding projects');
	return projects;
};

const findProject = async (projectURL) => {
	const project = Project.findOne({ url: projectURL });
	if (!project) throw Error(`This project couldn't be found`);
	return project;
};

const findProjectByTitle = async (title) => {
	const projectExists = await project.findOne({ titleSearch: title });
	if (projectExists) throw Error('Project with this name already exists');
	return projectExists;
};

const createProject = async (title, demo, code, description, projectImg, imageName) => {
	const newProject = new project({
		title,
		demo,
		code,
		description,
		titleSearch: title,
		url: title.replace(SAFE_REGEX_NAME),
		projectImg,
		imageName
	});

	const createdProject = await newProject.save();
	if (!createdProject) throw Error('Something went wrong saving the project');

	return createdProject;
};

module.exports = {
	findAllProjects,
	findProject,
	createProject,
	findProjectByTitle
};
