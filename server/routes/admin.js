const express = require('express'),
    router = express.Router({ mergeParams: true }),
    user = require('../controllers/users.controller'),
    middleware = require('../middleware/index');
/**
 * @route /api/admin
 * @private: @get /user
 * @private: @put /update
 * @private: @post /register
 */

router.post('/login', middleware.findUser, user.login);
router.get('/user', middleware.checkAuth, user.getUser);
router.post('/register', middleware.checkAuth, user.register)
router.put('/account', middleware.checkAuth, middleware.findUser, user.changePassword)

module.exports = router;
