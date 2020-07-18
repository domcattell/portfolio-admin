const project = require('../models/project'),
	{ uploadFile, renameFile, deleteFile } = require('../utils/fileHelper'),
	is = require('../utils/validation'),
	{ SAFE_REGEX_NAME } = require('../constants'),
projectService = require('../services/projects.service');

const getAllProjects = async (req, res) => {
	try {
		const allProjects = await projectService.findAllProjects();

		res.status(200).json(allProjects);
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
};

const getProject = async (req, res) => {
	const { projectURL } = req.params;
	try {
		const foundProject = await projectService.findProject(projectURL);

		res.status(200).json(foundProject);
	} catch (e) {
		res.status(403).json({ msg: e.message });
	}
};

const createProject = async (req, res) => {
	const { title, description, code, demo } = req.body;

	try {
		is.required(title, description, req.files);

		await projectService.findProjectByTitle(title);

		const image = await uploadFile({ fileName: title, file: req.files.projectImg });

		const newProject = await projectService.createProject(
			title,
			demo,
			code,
			description,
			image.secure_url,
			image.public_id
		);

		res.status(200).json(newProject);
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
};

const editProject = async (req, res) => {
	const { projectURL } = req.params;
	const { title, description, code, demo, imageName } = req.body;

	/**changing the title will make the front end re-look (re-render) for the db entry
	 * as this is the search parameter when getting a project from the db
	 */

	try {
		//check required fields have been filled in
		is.required(title, description);

		const checkProjectExists = await projectService.findProjectByTitle(title);
		if (checkProjectExists && projectURL != checkProjectExists.url) {
			throw Error('Project name already taken');
		}

		//checks if file exists. if so, upload and change project image
		//if currentProject does not exist, the title has been changed and
		//so change the file name to the new title name
		const handleImage = async () => {
			if (req.files) {
				return await uploadFile({ fileName: title, file: req.files.projectImg });
			}
			if (!checkProjectExists) {
				return await renameFile({ oldName: imageName, newName: title });
			}
		};

		const image = await handleImage();

		//object for updating db. uses newProjectImg and newImageName for "projectImg" & "imageName" fields
		const updatedProject = {
			title,
			code,
			demo,
			description,
			titleSearch: title,
			url: title.replace(SAFE_REGEX_NAME),
			projectImg: image ? image.secure_url : checkProjectExists.projectImg,
			imageName: image ? image.public_id : checkProjectExists.imageName
		};

		const updateProject = await project.findOneAndUpdate({ url: projectURL }, updatedProject, { new: true });
		if (!updateProject) throw Error('Error updating project');

		res.status(200).json(updateProject);
	} catch (err) {
		res.status(400).json({ msg: err.message });
		console.log(err);
	}
};

const deleteProject = async (req, res) => {
	const { projectURL } = req.params;

	try {
		//check if project exists
		const findProject = await project.findOne({ url: projectURL });
		if (!findProject) throw Error('Error deleting the project');

		//remove project from db
		const removeProject = await project.remove();
		if (!removeProject) throw Error('Error trying to remove project');

		//delete image from cloudinary
		await deleteFile(findProject.imageName);

		res.status(200).json({ msg: 'Deleted project' });
	} catch (err) {
		res.status(400).json({ msg: err.message });
		console.log(err);
	}
};

module.exports = {
	getAllProjects,
	getProject,
	createProject,
	editProject,
	deleteProject
};
