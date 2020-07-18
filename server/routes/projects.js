const express = require('express'),
	router = express.Router({ mergeParams: true }),
	checkAuth = require('../middleware/checkAuth'),
	projects = require('../controllers/projects.controller');

/**
 * @route /api/projects
 * @private: @post /new
 * @private: @put /:projectURL
 * @private: @delete /:projectURL
 */

router.get('/', projects.getAllProjects);
router.get('/:projectURL', projects.getProject);
router.post('/new', checkAuth, projects.createProject);
router.put('/:projectURL', checkAuth, projects.editProject);
router.delete('/:projectURL', checkAuth, projects.deleteProject);

module.exports = router;
