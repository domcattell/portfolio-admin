const express = require('express'),
	router = express.Router({ mergeParams: true }),
	projects = require('../models/projects'),
	checkAuth = require('../middleware/checkAuth'),
	{ uploadFile, renameFile, deleteFile } = (fileHelper = require('../helpers/imageUpload'));

/**
 * @route /api/projects/
 * @description get all projects
 * @access Public 
 */
router.get('/', (req, res) => {
	projects.find({}, (err, projects) => {
		if (err) {
			console.log(err);
		} else {
			res.status(200).json(projects);
		}
	});
});

/**
 * @route /api/projects/PROJECT_URL
 * @description get single project
 * @access Public 
 */
router.get('/:projectURL', async (req, res) => {
	const { projectURL } = req.params;
	try {
		// await projects.findById(id, (err, foundProject) => {
		// 	if(err) {
		// 		throw Error('Something went wrong getting the project information');
		// 	} else {
		// 		res.status(200).json(foundProject);
		// 	}
		// })
		await projects.findOne({ url: projectURL }, (err, foundProject) => {
			if (err) {
				throw Error('Something went wrong');
			} else {
				res.status(200).json(foundProject);
			}
		});
	} catch (e) {
		res.status(403).json({ msg: e.message });
	}
});

/**
 * @route /api/projects/new
 * @description add new project
 * @access Private 
 */
router.post('/new', checkAuth, async (req, res) => {
	const { title, description, code, demo } = req.body;
	const url = `${req.protocol}://${req.get('host')}`;

	try {
		console.log(req.body);
		if (!title || !description || !code || !demo || !req.files) throw Error('Please enter all of the fields');

		//check if project already exists, if title name already present, throw an error
		const projectExists = await projects.findOne({ titleSearch: title });
		if (projectExists) throw Error('Project with this name already exists');

		//uses the upload helper function to upload file and desctructures
		//fileName from return to use in object for saving to db
		const { fileName } = uploadFile(title, req.files.projectImg);

		//use body to create new project
		const newProject = new projects({
			title,
			demo,
			code,
			description,
			titleSearch: title,
			url: title.replace(/[&\/\\#,+()$~%.'":*?<>/ /{}]/g, '_'),
			projectImg: `${url}/public/images/${fileName}`,
			imageName: fileName
		});

		//createProject will save project to db
		const createProject = await newProject.save();

		if (!createProject) throw Error('Something went wrong saving the project');

		res.status(200).json(createProject);
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
});

/**
 * @route /api/projects/PROJECT_URL
 * @description edit current project
 * @access Private 
 */
router.put('/:projectURL', checkAuth, async (req, res) => {
	const { projectURL } = req.params;
	const { title, description, code, demo, imageName } = req.body;
	const url = `${req.protocol}://${req.get('host')}`;
	const imagePath = '/public/images/';

	try {
		//quick way to do validation check
		if (!title || !description || !code || !demo) throw Error('Please enter all of the fields');

		// const currentProject = await projects.findOne({ url: projectURL }, '-created');
		const currentProject = await projects.findOne({ titleSearch: title });
		if (currentProject && projectURL != currentProject.url) {
			throw Error('Project name already taken');
		}

		//if currentProject found, and the body and project match
		//then do not query the database. quick and easy way to check

		if (
			currentProject &&
			title === currentProject.title &&
			description === currentProject.description &&
			code === currentProject.code &&
			demo === currentProject.demo &&
			!req.files
		) {
			throw Error('No changes were made');
		}

		//variables for renaming db fields
		let newProjectImg = '';
		let newImageName = '';

		//if req.files exists, then change existing image with new one using uploadFile()
		//else use renameFile() to rename the file based on the title from the body
		//set newProjectImg and newImageName based on user choice
		if (req.files) {
			const { fileName } = uploadFile(title, req.files.projectImg);
			newProjectImg = `${url}${imagePath}${fileName}`;
			newImageName = fileName;
		} else {
			const { newFileName } = renameFile(title, imageName);
			newProjectImg = `${url}${imagePath}${newFileName}`;
			newImageName = newFileName;
		}

		//object for updating db. uses newProjectImg and newImageName for "projectImg" & "imageName" fields
		const updatedProject = {
			title,
			code,
			demo,
			description,
			titleSearch: title,
			url: title.replace(/[&\/\\#,+()$~%.'":*?<>/ /{}]/g, '_'),
			projectImg: newProjectImg,
			imageName: newImageName
		};

		//update db and send updated document/object as json to use in front end
		projects.findOneAndUpdate({ url: projectURL }, updatedProject, { new: true }, (err, project) => {
			if (err) {
				throw Error('Error updating the project');
			} else {
				res.status(200).json(project);
			}
		});
	} catch (err) {
		res.status(400).json({ msg: err.message });
	}
});

/**
 * @route /api/projects/PROJECT_URL
 * @description delete a project
 * @access Private 
 */
router.delete('/:projectURL', checkAuth, async (req, res) => {
	const { projectURL } = req.params;

	try {
		//check if project exists
		const project = await projects.findOne({ url: projectURL });
		if (!project) throw Error('Error deleting the project');

		//remove project from db
		const removeProject = project.remove();
		if (!removeProject) throw Error('Error trying to remove project');

		//deleteFile() from fileHelper to find image and delete it
		deleteFile(project.imageName);

		res.status(200).json({ msg: 'Deleted project' });
	} catch (err) {
		res.status(400).json({ msg: err.message });
		console.log(err);
	}
});

module.exports = router;
