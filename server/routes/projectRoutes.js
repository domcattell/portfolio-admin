const express = require('express'),
	router = express.Router({ mergeParams: true }),
	projects = require('../models/project'),
	checkAuth = require('../middleware/checkAuth'),
	{ uploadFile, renameFile, deleteFile } = require('../utils/file.utility'),
	is = require('../utils/validation.utility');

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

	try {
		if (!title || !description || !code || !demo || !req.files) throw Error('Please enter all of the fields');
		// is.required({ title, description, code, demo });

		//check if project already exists, if title name already present, throw an error
		const projectExists = await projects.findOne({ titleSearch: title });
		if (projectExists) throw Error('Project with this name already exists');

		//uses fileHelper upload function to upload image to cloudinary
		//has optional paramerts for setting a max file size, allowed formats
		//and a new file type to convert the sent file
		const image = await uploadFile({ fileName: title, file: req.files.projectImg });

		//use body to create new project
		const newProject = new projects({
			title,
			demo,
			code,
			description,
			titleSearch: title,
			url: title.replace(/[&\/\\#,+()$~%.'":*?<>/ /{}]/g, '_'),
			projectImg: image.secure_url,
			imageName: image.public_id
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

	/**changing the title will make the front end re-look (re-render) for the db entry
	 * as this is the search parameter when getting a project from the db
	 */

	try {
		//quick way to do validation check
		if (!title || !description) throw Error('Please enter thr required fields');

		// const currentProject = await projects.findOne({ url: projectURL }, '-created');
		const currentProject = await projects.findOne({ titleSearch: title });
		if (currentProject && projectURL != currentProject.url) {
			throw Error('Project name already taken');
		}

		//checks if file exists. if so, upload and change project image
		//if currentProject does not exist, the title has been changed and
		//so change the file name to the new title name
		const handleImage = async () => {
			if (req.files) {
				return await uploadFile({ fileName: title, file: req.files.projectImg });
			}
			if (!currentProject) {
				return await renameFile({ oldName: imageName, newName: title });
			}
		}
		
		const image = await handleImage();

		//object for updating db. uses newProjectImg and newImageName for "projectImg" & "imageName" fields
		const updatedProject = {
			title,
			code,
			demo,
			description,
			titleSearch: title,
			url: title.replace(/[&\/\\#,+()$~%.'":*?<>/ /{}]/g, '_'),
			projectImg: image ? image.secure_url : currentProject.projectImg,
			imageName: image ? image.public_id : currentProject.imageName
		}

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
		console.log(err);
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
		await deleteFile(project.imageName);

		res.status(200).json({ msg: 'Deleted project' });
	} catch (err) {
		res.status(400).json({ msg: err.message });
		console.log(err);
	}
});

module.exports = router;
